# PANDUAN MIGRASI KE LARAVEL BLADE (SISTEM INFORMASI KLINIK)

Dokumen ini memandu langkah-langkah memindahkan kode frontend HTML, CSS, dan JavaScript **Sistem Informasi Klinik** ke dalam proyek Laravel berbasis **Blade Templating**.

---

## 1. STRUKTUR DIREKTORI & PEMETAAN FILE

Salin berkas-berkas aset dan template ke dalam proyek Laravel Anda:

```text
PROYEK LARAVEL
├── public/
│   ├── css/
│   │   └── clinic.css               <-- assets/css/clinic.css
│   └── js/
│       ├── clinic.js                <-- assets/js/clinic.js
│       └── recommendation.js        <-- assets/js/recommendation.js
│
└── resources/
    └── views/
        ├── layouts/
        │   ├── app.blade.php        <-- Master layout aplikasi
        │   ├── sidebar.blade.php    <-- Navigasi dinamis berbasis role
        │   └── topbar.blade.php     <-- Header atas, profil, notifikasi
        ├── auth/
        │   └── login.blade.php      <-- Halaman login klinik
        ├── owner/
        │   ├── dashboard.blade.php
        │   ├── pasien/
        │   ├── kunjungan/
        │   ├── laporan/
        │   └── pengguna/
        ├── receptionist/
        │   ├── dashboard.blade.php
        │   ├── pasien/
        │   ├── pendaftaran/
        │   └── antrean/
        └── nurse/
            ├── dashboard.blade.php
            ├── antrean/
            ├── pasien/
            └── pemeriksaan/
```

---

## 2. CONTOH ROUTING LARAVEL (`routes/web.php`)

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Owner\OwnerDashboardController;
use App\Http\Controllers\Owner\PasienController as OwnerPasienController;
use App\Http\Controllers\Owner\KunjunganController;
use App\Http\Controllers\Owner\LaporanController;
use App\Http\Controllers\Owner\PenggunaController;
use App\Http\Controllers\Receptionist\ReceptionistDashboardController;
use App\Http\Controllers\Receptionist\PendaftaranController;
use App\Http\Controllers\Receptionist\AntreanController as RecepAntreanController;
use App\Http\Controllers\Nurse\NurseDashboardController;
use App\Http\Controllers\Nurse\PemeriksaanController;

// Auth Routes
Route::get('/', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Group Protected by Auth
Route::middleware(['auth'])->group(function () {

    // Role: OWNER
    Route::middleware(['role:OWNER'])->prefix('owner')->name('owner.')->group(function () {
        Route::get('/dashboard', [OwnerDashboardController::class, 'index'])->name('dashboard');
        Route::resource('/pasien', OwnerPasienController::class);
        Route::resource('/kunjungan', KunjunganController::class)->only(['index', 'show']);
        Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
        Route::resource('/pengguna', PenggunaController::class);
    });

    // Role: RESEPSIONIS
    Route::middleware(['role:RESEPSIONIS'])->prefix('receptionist')->name('receptionist.')->group(function () {
        Route::get('/dashboard', [ReceptionistDashboardController::class, 'index'])->name('dashboard');
        Route::resource('/pasien', OwnerPasienController::class);
        Route::get('/pendaftaran', [PendaftaranController::class, 'index'])->name('pendaftaran.index');
        Route::post('/pendaftaran', [PendaftaranController::class, 'store'])->name('pendaftaran.store');
        Route::get('/antrean', [RecepAntreanController::class, 'index'])->name('antrean.index');
    });

    // Role: PERAWAT
    Route::middleware(['role:PERAWAT'])->prefix('nurse')->name('nurse.')->group(function () {
        Route::get('/dashboard', [NurseDashboardController::class, 'index'])->name('dashboard');
        Route::get('/antrean', [RecepAntreanController::class, 'index'])->name('antrean.index');
        Route::get('/pasien', [OwnerPasienController::class, 'index'])->name('pasien.index');
        Route::get('/pemeriksaan/{antrean_id}', [PemeriksaanController::class, 'show'])->name('pemeriksaan.show');
        Route::post('/pemeriksaan', [PemeriksaanController::class, 'store'])->name('pemeriksaan.store');
    });
});
```

---

## 3. MIDDLEWARE ROLE (`app/Http/Middleware/RoleMiddleware.php`)

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        $user = auth()->user();
        if (!in_array($user->role, $roles)) {
            abort(403, 'Akses tidak sah untuk peranan Anda.');
        }

        return $next($request);
    }
}
```

Daftarkan di `bootstrap/app.php` (Laravel 11) atau `app/Http/Kernel.php` (Laravel 10):
```php
'role' => \App\Http\Middleware\RoleMiddleware::class,
```

---

## 4. INTEGRASI DYNAMIC COMPLAINT RECOMMENDATION DI BLADE

Pada `resources/views/nurse/pemeriksaan/index.blade.php`:

1. Sertakan file JavaScript:
   ```html
   <script src="{{ asset('js/recommendation.js') }}"></script>
   ```
2. Hubungkan textarea keluhan dengan panel rekomendasi:
   ```javascript
   document.addEventListener('DOMContentLoaded', () => {
       const textarea = document.getElementById('keluhanUtama');
       const panel = document.getElementById('dynamicRecommendationPanel');
       
       RecommendationEngine.bindToElement(textarea, panel, { debounceMs: 400 });
   });
   ```
3. Rekomendasi dianalisis secara real-time pada sisi klien tanpa perlu membebani server/reload halaman.

---

## 5. REKOMENDASI SKEMA DATABASE (MIGRATIONS)

1. **`users`**:
   - `id`, `name`, `username`, `email`, `password`, `role` (enum: OWNER, RESEPSIONIS, PERAWAT), `status` (Aktif, Nonaktif).
2. **`pasiens`**:
   - `id`, `no_rm` (unique), `nama`, `nik` (16 digit), `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `alamat`, `telepon`, `golongan_darah`, `kontak_darurat`.
3. **`antreans`**:
   - `id`, `nomor_antrean` (A001, A002...), `pasien_id`, `jam_daftar`, `jam_diperiksa`, `jam_selesai`, `status` (Menunggu, Diperiksa, Selesai), `tanggal`.
4. **`kunjungans` & `pemeriksaans`**:
   - `id`, `antrean_id`, `pasien_id`, `user_id` (perawat/dokter), `keluhan_utama`, `tensi`, `suhu`, `berat_badan`, `tinggi_badan`, `denyut_nadi`, `catatan_pemeriksaan`, `status`.
