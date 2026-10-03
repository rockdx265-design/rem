<!-- resources/views/owner/pasien/create.blade.php -->
@extends('layouts.app')

@section('title', 'Tambah Pasien')
@section('page_title', 'Tambah Pasien')
@section('page_subtitle', 'Formulir pendaftaran data rekam medis pasien baru.')

@section('content')
<div class="row justify-content-center">
    <div class="col-12 col-xl-10">
        <form action="{{ route('owner.pasien.store') }}" method="POST" novalidate>
            @csrf

            <!-- Section 1: Identitas Pasien -->
            <div class="card mb-4">
                <div class="card-header">
                    <span class="fw-bold">Identitas Pasien</span>
                    <span class="small text-muted"><span class="text-danger">*</span> Wajib diisi</span>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-12 col-md-6">
                            <label class="form-label">Nama Lengkap <span class="required-indicator">*</span></label>
                            <input type="text" name="nama" class="form-control @error('nama') is-invalid @enderror" value="{{ old('nama') }}" required>
                            @error('nama') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">NIK <span class="required-indicator">*</span></label>
                            <input type="text" name="nik" maxlength="16" class="form-control @error('nik') is-invalid @enderror" value="{{ old('nik') }}" required>
                            @error('nik') <div class="invalid-feedback">{{ $message }}</div> @enderror
                        </div>

                        <div class="col-12 col-md-4">
                            <label class="form-label">Tempat Lahir <span class="required-indicator">*</span></label>
                            <input type="text" name="tempat_lahir" class="form-control" value="{{ old('tempat_lahir') }}" required>
                        </div>

                        <div class="col-12 col-md-4">
                            <label class="form-label">Tanggal Lahir <span class="required-indicator">*</span></label>
                            <input type="date" name="tanggal_lahir" class="form-control" value="{{ old('tanggal_lahir') }}" required>
                        </div>

                        <div class="col-12 col-md-4">
                            <label class="form-label">Jenis Kelamin <span class="required-indicator">*</span></label>
                            <select name="jenis_kelamin" class="form-select" required>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">No. Telepon <span class="required-indicator">*</span></label>
                            <input type="tel" name="telepon" class="form-control" value="{{ old('telepon') }}" required>
                        </div>

                        <div class="col-12 col-md-6">
                            <label class="form-label">Alamat Lengkap <span class="required-indicator">*</span></label>
                            <textarea name="alamat" class="form-control" rows="2" required>{{ old('alamat') }}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section 2: Data Tambahan -->
            <div class="card mb-4">
                <div class="card-header"><span class="fw-bold">Data Tambahan</span></div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-12 col-md-4">
                            <label class="form-label">Golongan Darah</label>
                            <select name="golongan_darah" class="form-select">
                                <option value="">Pilih</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select>
                        </div>
                        <div class="col-12 col-md-4">
                            <label class="form-label">Kontak Darurat</label>
                            <input type="text" name="kontak_darurat" class="form-control" value="{{ old('kontak_darurat') }}">
                        </div>
                        <div class="col-12 col-md-4">
                            <label class="form-label">Nomor Kontak Darurat</label>
                            <input type="tel" name="no_kontak_darurat" class="form-control" value="{{ old('no_kontak_darurat') }}">
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex align-items-center justify-content-end gap-3 mb-5">
                <a href="{{ route('owner.pasien.index') }}" class="btn btn-outline-secondary px-4">Batal</a>
                <button type="submit" class="btn btn-primary px-4 fw-semibold">Simpan Pasien</button>
            </div>
        </form>
    </div>
</div>
@endsection
