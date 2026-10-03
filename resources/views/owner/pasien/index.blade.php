<!-- resources/views/owner/pasien/index.blade.php -->
@extends('layouts.app')

@section('title', 'Data Pasien')
@section('page_title', 'Data Pasien')
@section('page_subtitle', 'Master data pasien dan rekam medis.')

@section('content')
<div class="card mb-4">
    <div class="card-body">
        <div class="row g-3 align-items-center justify-content-between">
            <div class="col-12 col-md-6 col-lg-5">
                <form action="{{ route('owner.pasien.index') }}" method="GET" class="d-flex gap-2">
                    <div class="input-group">
                        <span class="input-group-text bg-white text-muted border-end-0"><i class="bi bi-search"></i></span>
                        <input type="text" name="search" class="form-control border-start-0 ps-0" placeholder="Cari nama / NIK / No. RM..." value="{{ request('search') }}">
                    </div>
                    <button type="submit" class="btn btn-primary px-3">CARI</button>
                </form>
            </div>
            <div class="col-12 col-md-auto text-md-end">
                <a href="{{ route('owner.pasien.create') }}" class="btn btn-primary">
                    <i class="bi bi-person-plus-fill"></i> + Tambah Pasien
                </a>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">
        <div class="d-flex align-items-center gap-2">
            <i class="bi bi-people-fill text-success"></i>
            <span>Daftar Pasien Terdaftar</span>
        </div>
    </div>
    <div class="card-body p-0">
        <div class="table-responsive border-0">
            <table class="table table-custom mb-0">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>No. RM</th>
                        <th>Nama</th>
                        <th>NIK</th>
                        <th>Jenis Kelamin</th>
                        <th>Tanggal Lahir</th>
                        <th class="text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($pasiens ?? [] as $idx => $p)
                        <tr>
                            <td>{{ $idx + 1 }}</td>
                            <td><code>{{ $p->no_rm }}</code></td>
                            <td><div class="fw-semibold text-dark">{{ $p->nama }}</div></td>
                            <td>{{ $p->nik }}</td>
                            <td><span class="badge bg-primary-subtle text-primary border">{{ $p->jenis_kelamin }}</span></td>
                            <td>{{ $p->tanggal_lahir }}</td>
                            <td class="text-end">
                                <a href="{{ route('owner.pasien.show', $p->id) }}" class="btn btn-sm btn-light border text-primary">Detail</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center py-4 text-muted">
                                Belum Ada Data Pasien
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
