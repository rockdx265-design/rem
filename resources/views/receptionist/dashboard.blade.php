@extends('layouts.app')

@section('title', 'Dashboard Resepsionis')
@section('page_title', 'Dashboard')
@section('page_subtitle', 'Selamat datang, Admin Resepsionis.')

@section('content')
<!-- Header Action -->
<div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
    <div>
        <h3 class="fw-bold mb-1">Aktivitas Loket Pendaftaran</h3>
        <p class="text-muted small mb-0">Kelola registrasi kunjungan dan panggilan antrean harian.</p>
    </div>
    <a href="{{ route('receptionist.pendaftaran.index') }}" class="btn btn-primary px-4 shadow-sm">
        <i class="bi bi-person-plus-fill fs-5"></i>
        <span class="fw-bold">+ Pendaftaran Pasien</span>
    </a>
</div>

<!-- Stats -->
<div class="row g-3 mb-4">
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="stat-card">
            <div>
                <div class="stat-label">Total Pasien</div>
                <div class="stat-value text-dark">{{ $totalPasien ?? 120 }}</div>
            </div>
            <div class="stat-icon primary"><i class="bi bi-people-fill"></i></div>
        </div>
    </div>

    <div class="col-12 col-sm-6 col-lg-3">
        <div class="stat-card">
            <div>
                <div class="stat-label">Kunjungan Hari Ini</div>
                <div class="stat-value text-success">{{ $kunjunganHariIni ?? 35 }}</div>
            </div>
            <div class="stat-icon info"><i class="bi bi-clipboard2-check-fill"></i></div>
        </div>
    </div>

    <div class="col-12 col-sm-6 col-lg-3">
        <div class="stat-card">
            <div>
                <div class="stat-label">Antrean Saat Ini</div>
                <div class="stat-value text-warning">{{ $antreanSaatIni ?? 8 }}</div>
            </div>
            <div class="stat-icon warning"><i class="bi bi-hourglass-split"></i></div>
        </div>
    </div>

    <div class="col-12 col-sm-6 col-lg-3">
        <div class="stat-card">
            <div>
                <div class="stat-label">Pasien Baru</div>
                <div class="stat-value text-primary">{{ $pasienBaru ?? 5 }}</div>
            </div>
            <div class="stat-icon danger"><i class="bi bi-person-plus-fill"></i></div>
        </div>
    </div>
</div>

<!-- Table: Antrean Hari Ini -->
<div class="card">
    <div class="card-header">
        <div class="d-flex align-items-center gap-2">
            <i class="bi bi-list-ol text-success"></i>
            <span>Antrean Hari Ini</span>
        </div>
        <a href="{{ route('receptionist.antrean.index') }}" class="btn btn-sm btn-outline-primary">
            Kelola Semua Antrean <i class="bi bi-arrow-right ms-1"></i>
        </a>
    </div>

    <div class="card-body p-0">
        <div class="table-responsive border-0">
            <table class="table table-custom mb-0">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>No. Antrean</th>
                        <th>Pasien</th>
                        <th>Jam</th>
                        <th>Status</th>
                        <th class="text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td><span class="badge bg-light text-dark border fs-6 font-monospace">A001</span></td>
                        <td>
                            <div class="fw-semibold text-dark">Andi Saputra</div>
                            <div class="small text-muted"><code>RM0001</code></div>
                        </td>
                        <td>09:00</td>
                        <td><span class="badge-status badge-status-selesai">Selesai</span></td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-outline-secondary" disabled>Selesai</button>
                        </td>
                    </tr>
                    <tr>
                        <td>02</td>
                        <td><span class="badge bg-warning-subtle text-dark border border-warning fs-6 font-monospace">A002</span></td>
                        <td>
                            <div class="fw-semibold text-dark">Budi Santoso</div>
                            <div class="small text-muted"><code>RM0002</code></div>
                        </td>
                        <td>09:15</td>
                        <td><span class="badge-status badge-status-menunggu">Menunggu</span></td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-light-green" onclick="Clinic.callQueueNumber('A002', 'Budi Santoso')">
                                <i class="bi bi-megaphone-fill"></i> Panggil
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>03</td>
                        <td><span class="badge bg-primary-subtle text-primary border border-primary fs-6 font-monospace">A003</span></td>
                        <td>
                            <div class="fw-semibold text-dark">Siti Aminah</div>
                            <div class="small text-muted"><code>RM0003</code></div>
                        </td>
                        <td>09:30</td>
                        <td><span class="badge-status badge-status-diperiksa">Diperiksa</span></td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-light-green" onclick="Clinic.callQueueNumber('A003', 'Siti Aminah')">
                                <i class="bi bi-megaphone-fill"></i> Panggil Ulang
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
