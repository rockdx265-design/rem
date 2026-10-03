<!-- resources/views/nurse/pemeriksaan/index.blade.php -->
@extends('layouts.app')

@section('title', 'Pemeriksaan Pasien')
@section('page_title', 'Pemeriksaan Pasien')
@section('page_subtitle', 'Anamnesis, rekomendasi pemeriksaan dinamis, dan pencatatan tanda vital.')

@section('content')
<!-- Patient Information Card -->
<div class="card mb-4 border-start border-4 border-success">
    <div class="card-header bg-white py-2">
        <div class="d-flex align-items-center justify-content-between w-100">
            <span class="small fw-bold text-uppercase text-muted"><i class="bi bi-person-badge text-success me-1"></i> Identitas Pasien</span>
            <span class="badge bg-warning-subtle text-dark border border-warning font-monospace px-2">Antrean: {{ $antrean->nomor ?? 'A002' }}</span>
        </div>
    </div>
    <div class="card-body">
        <div class="row g-3 align-items-center">
            <div class="col-6 col-md-3">
                <div class="small text-muted">No. Rekam Medis:</div>
                <code class="fs-5 fw-bold text-dark font-monospace">{{ $pasien->no_rm ?? 'RM0001' }}</code>
            </div>
            <div class="col-6 col-md-3">
                <div class="small text-muted">Nama Pasien:</div>
                <div class="fs-5 fw-bold text-dark">{{ $pasien->nama ?? 'Andi Saputra' }}</div>
            </div>
            <div class="col-6 col-md-3">
                <div class="small text-muted">Tanggal Lahir:</div>
                <div class="fw-semibold text-dark">{{ $pasien->tanggal_lahir ?? '12-05-1995' }}</div>
            </div>
            <div class="col-6 col-md-3">
                <div class="small text-muted">Jenis Kelamin:</div>
                <div class="fw-semibold text-dark">{{ $pasien->jenis_kelamin ?? 'Laki-laki' }}</div>
            </div>
        </div>
    </div>
</div>

<form action="{{ route('nurse.pemeriksaan.store') }}" method="POST" novalidate>
    @csrf
    <input type="hidden" name="antrean_id" value="{{ $antrean->id ?? 1 }}">
    <input type="hidden" name="pasien_id" value="{{ $pasien->id ?? 1 }}">

    <!-- Dynamic Complaint Recommendation -->
    <div class="card mb-4">
        <div class="card-header bg-white">
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-chat-left-heart-fill text-success"></i>
                <span class="fw-bold">Keluhan Utama & Rekomendasi Pemeriksaan</span>
            </div>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label for="keluhanUtama" class="form-label fw-bold">Keluhan Utama <span class="required-indicator">*</span></label>
                <textarea class="form-control" id="keluhanUtama" name="keluhan_utama" rows="3" placeholder="Ketik keluhan pasien..." required>{{ old('keluhan_utama') }}</textarea>
            </div>

            <!-- Dynamic Recommendation Panel Target -->
            <div id="dynamicRecommendationPanel" class="recommendation-panel"></div>
        </div>
    </div>

    <!-- Tanda-Tanda Vital -->
    <div class="card mb-4">
        <div class="card-header bg-white">
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-activity text-success"></i>
                <span class="fw-bold">Tanda-Tanda Vital</span>
            </div>
        </div>
        <div class="card-body">
            <div class="row g-3">
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="vital-sign-card">
                        <label class="vital-sign-label">Tekanan Darah <span class="required-indicator">*</span></label>
                        <div class="vital-sign-input-wrap">
                            <input type="text" name="tensi" class="form-control" placeholder="120/80" pattern="^\d{2,3}\/\d{2,3}$" required>
                            <span class="vital-sign-unit">mmHg</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="vital-sign-card">
                        <label class="vital-sign-label">Suhu Tubuh <span class="required-indicator">*</span></label>
                        <div class="vital-sign-input-wrap">
                            <input type="number" step="0.1" name="suhu" class="form-control" placeholder="36.5" required>
                            <span class="vital-sign-unit">°C</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="vital-sign-card">
                        <label class="vital-sign-label">Berat Badan <span class="required-indicator">*</span></label>
                        <div class="vital-sign-input-wrap">
                            <input type="number" step="0.5" name="berat_badan" class="form-control" placeholder="65" required>
                            <span class="vital-sign-unit">kg</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-6">
                    <div class="vital-sign-card">
                        <label class="vital-sign-label">Tinggi Badan <span class="required-indicator">*</span></label>
                        <div class="vital-sign-input-wrap">
                            <input type="number" name="tinggi_badan" class="form-control" placeholder="170" required>
                            <span class="vital-sign-unit">cm</span>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-lg-6">
                    <div class="vital-sign-card">
                        <label class="vital-sign-label">Denyut Nadi <span class="required-indicator">*</span></label>
                        <div class="vital-sign-input-wrap">
                            <input type="number" name="denyut_nadi" class="form-control" placeholder="80" required>
                            <span class="vital-sign-unit">bpm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Catatan Pemeriksaan -->
    <div class="card mb-4">
        <div class="card-header bg-white">
            <span class="fw-bold">Catatan Pemeriksaan</span>
        </div>
        <div class="card-body">
            <textarea class="form-control mb-3" name="catatan" rows="3" placeholder="Masukkan catatan hasil pemeriksaan..."></textarea>
            
            <div class="d-flex align-items-center justify-content-end gap-3 pt-3 border-top">
                <a href="{{ route('nurse.antrean.index') }}" class="btn btn-outline-secondary px-4">BATAL</a>
                <button type="submit" class="btn btn-primary px-4 fw-bold">SIMPAN PEMERIKSAAN</button>
            </div>
        </div>
    </div>
</form>
@endsection

@push('scripts')
<script src="{{ asset('js/recommendation.js') }}"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const textarea = document.getElementById('keluhanUtama');
        const panel = document.getElementById('dynamicRecommendationPanel');
        RecommendationEngine.bindToElement(textarea, panel);
    });
</script>
@endpush
