@extends('layouts.app')

@section('title', 'Dashboard Perawat')
@section('page_title', 'Dashboard Perawat')
@section('page_subtitle', 'Kelola antrean dan pemeriksaan pasien.')

@section('content')
<!-- Statistics -->
<div class="row g-3 mb-4">
    <div class="col-12 col-md-4">
        <div class="stat-card">
            <div>
                <div class="stat-label">Antrean Menunggu</div>
                <div class="stat-value text-warning">{{ $menunggu ?? 8 }}</div>
                <small class="text-muted">Siap untuk anamnesis & vital</small>
            </div>
            <div class="stat-icon warning"><i class="bi bi-clock-history"></i></div>
        </div>
    </div>

    <div class="col-12 col-md-4">
        <div class="stat-card">
            <div>
                <div class="stat-label">Sedang Diperiksa</div>
                <div class="stat-value text-primary">{{ $diperiksa ?? 1 }}</div>
                <small class="text-muted">Dalam bilik pemeriksaan</small>
            </div>
            <div class="stat-icon info"><i class="bi bi-heart-pulse-fill"></i></div>
        </div>
    </div>

    <div class="col-12 col-md-4">
        <div class="stat-card">
            <div>
                <div class="stat-label">Selesai</div>
                <div class="stat-value text-success">{{ $selesai ?? 24 }}</div>
                <small class="text-muted">Pemeriksaan rampung hari ini</small>
            </div>
            <div class="stat-icon primary"><i class="bi bi-check2-circle"></i></div>
        </div>
    </div>
</div>

<!-- Main Section: Antrean Saat Ini -->
<div class="card mb-4">
    <div class="card-header bg-white">
        <div class="d-flex align-items-center gap-2">
            <i class="bi bi-bell-fill text-success"></i>
            <span class="fw-bold">Antrean Saat Ini</span>
        </div>
        <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1">Giliran Berikutnya</span>
    </div>

    <div class="card-body">
        <!-- Large highlighted card -->
        <div class="highlight-queue-card mb-4">
            <div class="highlight-queue-number">A002</div>
            <div class="highlight-queue-name">Budi Santoso</div>
            <div class="text-muted small mb-2">No. RM: <code>RM0002</code> | Keluhan: Batuk berdahak & sesak napas</div>
            <div class="highlight-queue-status">
                <i class="bi bi-hourglass-split me-1"></i> Menunggu Pemeriksaan
            </div>
            <div>
                <a href="{{ route('nurse.pemeriksaan.show', 'A002') }}" class="btn btn-primary btn-lg px-4 shadow">
                    <i class="bi bi-heart-pulse-fill fs-5"></i>
                    <span>Mulai Pemeriksaan</span>
                </a>
            </div>
        </div>

        <h6 class="fw-bold text-uppercase small text-muted mb-3">Daftar Antrean Menunggu:</h6>
        <div class="table-responsive border rounded">
            <table class="table table-custom mb-0">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>No. Antrean</th>
                        <th>Nama Pasien</th>
                        <th>No. RM</th>
                        <th>Jam Daftar</th>
                        <th>Status</th>
                        <th class="text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td><span class="badge bg-warning-subtle text-dark border border-warning fs-6 font-monospace">A002</span></td>
                        <td class="fw-bold text-dark">Budi Santoso</td>
                        <td><code>RM0002</code></td>
                        <td>09:00</td>
                        <td><span class="badge-status badge-status-menunggu">Menunggu</span></td>
                        <td class="text-end">
                            <a href="{{ route('nurse.pemeriksaan.show', 'A002') }}" class="btn btn-sm btn-primary">
                                Mulai Pemeriksaan
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
