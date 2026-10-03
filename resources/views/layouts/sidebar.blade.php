<!-- resources/views/layouts/sidebar.blade.php -->
<aside class="app-sidebar">
    <div class="sidebar-header">
        <div class="sidebar-logo-icon">
            <i class="bi bi-hospital"></i>
        </div>
        <div class="sidebar-brand-text">
            <div class="sidebar-brand-name">KLINIK SEHAT MEDIKA</div>
            <div class="sidebar-brand-subtitle">Sistem Informasi Klinik</div>
        </div>
    </div>

    <div class="sidebar-menu">
        @php
            $role = auth()->user()->role ?? 'OWNER';
        @endphp

        <div class="sidebar-section-title">Menu Utama</div>

        {{-- OWNER MENU --}}
        @if($role === 'OWNER')
            <a href="{{ route('owner.dashboard') }}" class="sidebar-nav-item {{ request()->routeIs('owner.dashboard*') ? 'active' : '' }}">
                <i class="bi bi-speedometer2"></i>
                <span>Dashboard</span>
            </a>
            <a href="{{ route('owner.pasien.index') }}" class="sidebar-nav-item {{ request()->routeIs('owner.pasien*') ? 'active' : '' }}">
                <i class="bi bi-people"></i>
                <span>Data Pasien</span>
            </a>
            <a href="{{ route('owner.kunjungan.index') }}" class="sidebar-nav-item {{ request()->routeIs('owner.kunjungan*') ? 'active' : '' }}">
                <i class="bi bi-clipboard2-pulse"></i>
                <span>Data Kunjungan</span>
            </a>
            <a href="{{ route('owner.laporan.index') }}" class="sidebar-nav-item {{ request()->routeIs('owner.laporan*') ? 'active' : '' }}">
                <i class="bi bi-file-earmark-bar-graph"></i>
                <span>Laporan</span>
            </a>
            <a href="{{ route('owner.pengguna.index') }}" class="sidebar-nav-item {{ request()->routeIs('owner.pengguna*') ? 'active' : '' }}">
                <i class="bi bi-person-gear"></i>
                <span>Pengguna</span>
            </a>
        @endif

        {{-- RESEPSIONIS MENU --}}
        @if($role === 'RESEPSIONIS')
            <a href="{{ route('receptionist.dashboard') }}" class="sidebar-nav-item {{ request()->routeIs('receptionist.dashboard*') ? 'active' : '' }}">
                <i class="bi bi-speedometer2"></i>
                <span>Dashboard</span>
            </a>
            <a href="{{ route('receptionist.pasien.index') }}" class="sidebar-nav-item {{ request()->routeIs('receptionist.pasien*') ? 'active' : '' }}">
                <i class="bi bi-people"></i>
                <span>Data Pasien</span>
            </a>
            <a href="{{ route('receptionist.pendaftaran.index') }}" class="sidebar-nav-item {{ request()->routeIs('receptionist.pendaftaran*') ? 'active' : '' }}">
                <i class="bi bi-person-plus"></i>
                <span>Pendaftaran</span>
            </a>
            <a href="{{ route('receptionist.antrean.index') }}" class="sidebar-nav-item {{ request()->routeIs('receptionist.antrean*') ? 'active' : '' }}">
                <i class="bi bi-list-ol"></i>
                <span>Antrean</span>
            </a>
        @endif

        {{-- PERAWAT MENU --}}
        @if($role === 'PERAWAT')
            <a href="{{ route('nurse.dashboard') }}" class="sidebar-nav-item {{ request()->routeIs('nurse.dashboard*') ? 'active' : '' }}">
                <i class="bi bi-speedometer2"></i>
                <span>Dashboard</span>
            </a>
            <a href="{{ route('nurse.antrean.index') }}" class="sidebar-nav-item {{ request()->routeIs('nurse.antrean*') ? 'active' : '' }}">
                <i class="bi bi-list-ol"></i>
                <span>Antrean</span>
            </a>
            <a href="{{ route('nurse.pasien.index') }}" class="sidebar-nav-item {{ request()->routeIs('nurse.pasien*') ? 'active' : '' }}">
                <i class="bi bi-people"></i>
                <span>Data Pasien</span>
            </a>
            <a href="{{ route('nurse.pemeriksaan.index') }}" class="sidebar-nav-item {{ request()->routeIs('nurse.pemeriksaan*') ? 'active' : '' }}">
                <i class="bi bi-heart-pulse"></i>
                <span>Pemeriksaan</span>
            </a>
        @endif
    </div>

    <!-- Bottom Sidebar Logout -->
    <div class="sidebar-footer">
        <form action="{{ route('logout') }}" method="POST" class="m-0">
            @csrf
            <button type="submit" class="btn btn-logout w-100">
                <i class="bi bi-box-arrow-right"></i>
                <span>Logout</span>
            </button>
        </form>
    </div>
</aside>
