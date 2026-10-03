<!-- resources/views/layouts/topbar.blade.php -->
<header class="app-topbar">
    <div class="topbar-left">
        <button type="button" class="sidebar-toggle-btn js-sidebar-toggle d-lg-none" aria-label="Toggle Navigation">
            <i class="bi bi-list"></i>
        </button>
        <div class="page-breadcrumb-wrap">
            <h1 class="page-main-title">@yield('page_title', 'Dashboard')</h1>
            <p class="breadcrumb-sub">@yield('page_subtitle', 'Sistem Informasi Klinik Sehat Medika')</p>
        </div>
    </div>

    <div class="topbar-right">
        <!-- Notification Dropdown -->
        <div class="dropdown">
            <button class="notification-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Notifikasi">
                <i class="bi bi-bell"></i>
                <span class="notification-badge"></span>
            </button>
            <div class="dropdown-menu dropdown-menu-end shadow-sm border p-2" style="width: 280px;">
                <h6 class="dropdown-header px-2 py-1 text-uppercase small fw-bold">Notifikasi Hari Ini</h6>
                <div class="list-group list-group-flush small">
                    <div class="list-group-item px-2 py-2 border-0">
                        <div class="fw-semibold text-dark">Antrean Pasien Menunggu</div>
                        <div class="text-muted" style="font-size: 0.75rem;">Baru saja</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- User Avatar & Dropdown -->
        <div class="dropdown">
            <button class="user-profile-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="user-avatar">
                    {{ strtoupper(substr(auth()->user()->name ?? 'U', 0, 2)) }}
                </div>
                <div class="user-info-text d-none d-sm-block">
                    <div class="user-name">{{ auth()->user()->name ?? 'Pengguna Klinik' }}</div>
                    <div class="user-role-badge">{{ auth()->user()->role ?? 'STAF' }} <i class="bi bi-chevron-down ms-1 small"></i></div>
                </div>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm border">
                <li class="dropdown-header">
                    <strong class="d-block text-dark">{{ auth()->user()->name ?? 'Pengguna' }}</strong>
                    <span class="small text-muted">{{ auth()->user()->role ?? 'STAF' }}</span>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#modalProfil" data-bs-toggle="modal"><i class="bi bi-person me-2"></i> Profil</a></li>
                <li><a class="dropdown-item" href="#modalPengaturan" data-bs-toggle="modal"><i class="bi bi-gear me-2"></i> Pengaturan</a></li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <form action="{{ route('logout') }}" method="POST" class="m-0">
                        @csrf
                        <button type="submit" class="dropdown-item text-danger">
                            <i class="bi bi-box-arrow-right me-2"></i> Logout
                        </button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</header>
