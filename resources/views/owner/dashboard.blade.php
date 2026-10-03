@extends('layouts.app')

@section('title', 'Dashboard Owner')
@section('page_title', 'Dashboard Owner')
@section('page_subtitle', 'Ringkasan aktivitas klinik hari ini.')

@section('content')
<div class="row g-3 mb-4">
    <!-- Total Pasien -->
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="stat-card">
            <div>
                <div class="stat-label">Total Pasien</div>
                <div class="stat-value">{{ $totalPasien ?? 250 }}</div>
            </div>
            <div class="stat-icon primary">
                <i class="bi bi-people-fill"></i>
            </div>
        </div>
    </div>

    <!-- Total Kunjungan -->
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="stat-card">
            <div>
                <div class="stat-label">Total Kunjungan</div>
                <div class="stat-value">{{ $totalKunjungan ?? 840 }}</div>
            </div>
            <div class="stat-icon info">
                <i class="bi bi-calendar2-check-fill"></i>
            </div>
        </div>
    </div>

    <!-- Kunjungan Hari Ini -->
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="stat-card">
            <div>
                <div class="stat-label">Kunjungan Hari Ini</div>
                <div class="stat-value text-success">{{ $kunjunganHariIni ?? 35 }}</div>
            </div>
            <div class="stat-icon warning">
                <i class="bi bi-clipboard2-pulse-fill"></i>
            </div>
        </div>
    </div>

    <!-- Pengguna Aktif -->
    <div class="col-12 col-sm-6 col-lg-3">
        <div class="stat-card">
            <div>
                <div class="stat-label">Pengguna Aktif</div>
                <div class="stat-value">{{ $penggunaAktif ?? 8 }}</div>
            </div>
            <div class="stat-icon danger">
                <i class="bi bi-shield-lock-fill"></i>
            </div>
        </div>
    </div>
</div>

<div class="row g-4">
    <!-- Chart: Kunjungan 7 Hari Terakhir -->
    <div class="col-12 col-xl-5">
        <div class="card h-100 mb-0">
            <div class="card-header">
                <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-bar-chart-line-fill text-success"></i>
                    <span>Kunjungan 7 Hari Terakhir</span>
                </div>
                <span class="badge bg-light text-secondary border">Minggu Ini</span>
            </div>
            <div class="card-body">
                <div style="height: 280px; position: relative;">
                    <canvas id="kunjungan7HariChart"></canvas>
                </div>
            </div>
        </div>
    </div>

    <!-- Table: Kunjungan Hari Ini -->
    <div class="col-12 col-xl-7">
        <div class="card h-100 mb-0">
            <div class="card-header">
                <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-clock-history text-success"></i>
                    <span>Kunjungan Hari Ini</span>
                </div>
                <a href="{{ route('owner.kunjungan.index') }}" class="btn btn-sm btn-outline-primary">
                    Lihat Semua Kunjungan <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive border-0">
                    <table class="table table-custom">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Pasien</th>
                                <th>No. RM</th>
                                <th>Jam</th>
                                <th>Status</th>
                                <th class="text-end">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($kunjunganList ?? [] as $idx => $k)
                                <tr>
                                    <td>{{ sprintf('%02d', $idx + 1) }}</td>
                                    <td>
                                        <div class="fw-semibold">{{ $k->pasien->nama ?? 'Pasien' }}</div>
                                    </td>
                                    <td><code>{{ $k->pasien->no_rm ?? 'RM0000' }}</code></td>
                                    <td>{{ $k->jam_daftar ?? '-' }}</td>
                                    <td>
                                        <span class="badge-status badge-status-{{ strtolower($k->status) }}">
                                            {{ $k->status }}
                                        </span>
                                    </td>
                                    <td class="text-end">
                                        <a href="{{ route('owner.kunjungan.show', $k->id ?? 1) }}" class="btn btn-sm btn-light border text-primary">
                                            Detail
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td>01</td>
                                    <td><div class="fw-semibold">Andi Saputra</div></td>
                                    <td><code>RM0001</code></td>
                                    <td>09:00</td>
                                    <td><span class="badge-status badge-status-selesai">Selesai</span></td>
                                    <td class="text-end"><a href="#" class="btn btn-sm btn-light border text-primary">Detail</a></td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td><div class="fw-semibold">Budi Santoso</div></td>
                                    <td><code>RM0002</code></td>
                                    <td>09:15</td>
                                    <td><span class="badge-status badge-status-menunggu">Menunggu</span></td>
                                    <td class="text-end"><a href="#" class="btn btn-sm btn-light border text-primary">Detail</a></td>
                                </tr>
                                <tr>
                                    <td>03</td>
                                    <td><div class="fw-semibold">Siti Aminah</div></td>
                                    <td><code>RM0003</code></td>
                                    <td>09:30</td>
                                    <td><span class="badge-status badge-status-diperiksa">Diperiksa</span></td>
                                    <td class="text-end"><a href="#" class="btn btn-sm btn-light border text-primary">Detail</a></td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer bg-white border-top p-3 text-center">
                <a href="{{ route('owner.kunjungan.index') }}" class="btn btn-light-green w-100">
                    <i class="bi bi-list-ul me-1"></i> Lihat Semua Kunjungan
                </a>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const ctx = document.getElementById('kunjungan7HariChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
                datasets: [{
                    label: 'Jumlah Kunjungan',
                    data: [42, 38, 35, 30, 39, 28, 18],
                    backgroundColor: '#198754',
                    borderRadius: 6,
                    barThickness: 24
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#EDF2F0' } },
                    x: { grid: { display: false } }
                }
            }
        });
    });
</script>
@endpush
