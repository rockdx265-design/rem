<!-- resources/views/auth/login.blade.php -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masuk - Sistem Informasi Klinik</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link href="{{ asset('css/clinic.css') }}" rel="stylesheet">
</head>
<body class="login-body">

    <div class="login-container">
        <div class="row g-0">
            
            <!-- LEFT: Clinic Branding -->
            <div class="col-lg-6 login-left">
                <div>
                    <div class="login-brand-logo">
                        <i class="bi bi-hospital"></i>
                    </div>
                    <h1 class="login-clinic-name">KLINIK SEHAT MEDIKA</h1>
                    <div class="login-clinic-subtitle">Sistem Informasi Klinik</div>
                    <p class="login-clinic-desc">
                        Kelola data pasien, kunjungan, antrean, dan pemeriksaan dengan mudah.
                    </p>

                    <ul class="login-features-list">
                        <li>
                            <i class="bi bi-check2-circle text-white fs-5"></i>
                            <span>Rekam Medis Pasien Terpadu</span>
                        </li>
                        <li>
                            <i class="bi bi-check2-circle text-white fs-5"></i>
                            <span>Antrean & Pemanggilan Real-time</span>
                        </li>
                        <li>
                            <i class="bi bi-check2-circle text-white fs-5"></i>
                            <span>Rekomendasi Pemeriksaan & Tanda Vital</span>
                        </li>
                    </ul>
                </div>

                <div class="pt-4 border-top border-white border-opacity-25 text-white-50 small">
                    &copy; {{ date('Y') }} Klinik Sehat Medika.
                </div>
            </div>

            <!-- RIGHT: Login Card -->
            <div class="col-lg-6 login-right d-flex flex-column justify-content-center">
                <div>
                    <h2 class="login-card-title">Masuk ke Sistem</h2>
                    <p class="login-card-subtitle">Silakan masukkan kredensial akun Anda.</p>

                    @if($errors->any())
                        <div class="alert alert-danger py-2 px-3 small mb-3">
                            <i class="bi bi-exclamation-circle-fill me-1"></i>
                            {{ $errors->first() }}
                        </div>
                    @endif

                    <form action="{{ route('login') }}" method="POST" novalidate>
                        @csrf
                        
                        <!-- Username / Email -->
                        <div class="mb-3">
                            <label for="username" class="form-label">Username / Email <span class="required-indicator">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-person"></i></span>
                                <input type="text" name="username" id="username" class="form-control border-start-0 ps-0 @error('username') is-invalid @enderror" value="{{ old('username') }}" placeholder="Username atau email" required autofocus>
                            </div>
                            @error('username')
                                <div class="invalid-feedback d-block">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- Password -->
                        <div class="mb-3">
                            <label for="password" class="form-label">Kata Sandi <span class="required-indicator">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text bg-white border-end-0 text-muted"><i class="bi bi-lock"></i></span>
                                <input type="password" name="password" id="password" class="form-control border-start-0 border-end-0 px-0 @error('password') is-invalid @enderror" placeholder="Kata sandi" required>
                                <button type="button" class="btn btn-light bg-white border border-start-0 text-muted js-password-toggle" data-target="password">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>
                            @error('password')
                                <div class="invalid-feedback d-block">{{ $message }}</div>
                            @enderror
                        </div>

                        <!-- Remember Me -->
                        <div class="mb-4 form-check">
                            <input type="checkbox" name="remember" class="form-check-input" id="remember" {{ old('remember') ? 'checked' : '' }}>
                            <label class="form-check-label text-secondary small user-select-none" for="remember">
                                Ingat saya
                            </label>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" class="btn btn-primary w-100 fw-bold">
                            MASUK
                        </button>
                    </form>

                </div>
            </div>

        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{ asset('js/clinic.js') }}"></script>
</body>
</html>
