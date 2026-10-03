/**
 * Sistem Informasi Klinik - app.js
 * Frontend-Only UI Prototype Controller
 * 
 * Manages role navigation, mock data, view transitions,
 * search filters, modals, toasts, and Chart.js visualizations.
 */

// =============================================================================
// 1. MOCK DATA STORE
// =============================================================================
const MockData = {
  patients: [
    {
      noRM: 'RM0001',
      nama: 'Andi Saputra',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Banda Aceh',
      tanggalLahir: '12-05-1995',
      usia: '31 tahun',
      alamat: 'Jl. Merdeka No. 12, Banda Aceh',
      telepon: '081234567890',
      kontakDarurat: 'Rina Saputri (Istri)',
      noDarurat: '081234567899',
      status: 'Aktif'
    },
    {
      noRM: 'RM0002',
      nama: 'Budi Santoso',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Medan',
      tanggalLahir: '15-01-2000',
      usia: '26 tahun',
      alamat: 'Jl. Sudirman No. 45, Banda Aceh',
      telepon: '082198765432',
      kontakDarurat: 'Joko Santoso (Ayah)',
      noDarurat: '082198765430',
      status: 'Aktif'
    },
    {
      noRM: 'RM0003',
      nama: 'Siti Aminah',
      jenisKelamin: 'Perempuan',
      tempatLahir: 'Sigli',
      tanggalLahir: '20-08-1992',
      usia: '34 tahun',
      alamat: 'Jl. Melati No. 8, Banda Aceh',
      telepon: '085211223344',
      kontakDarurat: 'Hendra (Suami)',
      noDarurat: '085211223340',
      status: 'Aktif'
    },
    {
      noRM: 'RM0004',
      nama: 'Dewi Sartika',
      jenisKelamin: 'Perempuan',
      tempatLahir: 'Langsa',
      tanggalLahir: '04-11-1998',
      usia: '27 tahun',
      alamat: 'Jl. Diponegoro No. 88, Banda Aceh',
      telepon: '081399887766',
      kontakDarurat: 'Sri Rezeki (Ibu)',
      noDarurat: '081399887760',
      status: 'Aktif'
    },
    {
      noRM: 'RM0005',
      nama: 'Hendra Wijaya',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Lhokseumawe',
      tanggalLahir: '19-03-1985',
      usia: '41 tahun',
      alamat: 'Jl. Pahlawan No. 15, Banda Aceh',
      telepon: '087766554433',
      kontakDarurat: 'Maya (Istri)',
      noDarurat: '087766554430',
      status: 'Aktif'
    }
  ],

  queues: [
    { no: '01', antrean: 'A001', noRM: 'RM0001', pasien: 'Andi Saputra', jam: '09:00', jamDaftar: '08:45', status: 'Selesai' },
    { no: '02', antrean: 'A002', noRM: 'RM0002', pasien: 'Budi Santoso', jam: '09:15', jamDaftar: '09:00', status: 'Menunggu' },
    { no: '03', antrean: 'A003', noRM: 'RM0003', pasien: 'Siti Aminah', jam: '09:30', jamDaftar: '09:10', status: 'Diperiksa' },
    { no: '04', antrean: 'A004', noRM: 'RM0004', pasien: 'Dewi Sartika', jam: '09:45', jamDaftar: '09:25', status: 'Menunggu' },
    { no: '05', antrean: 'A005', noRM: 'RM0005', pasien: 'Hendra Wijaya', jam: '10:00', jamDaftar: '09:40', status: 'Menunggu' }
  ],

  visits: [
    { tanggal: '03/10/2026', noRM: 'RM0001', pasien: 'Andi Saputra', keluhan: 'Kontrol rutin hipertensi & flu ringan', dokter: 'dr. Sarah', status: 'Selesai' },
    { tanggal: '03/10/2026', noRM: 'RM0002', pasien: 'Budi Santoso', keluhan: 'Demam tinggi 3 hari dan batuk berdahak', dokter: 'dr. Sarah', status: 'Menunggu' },
    { tanggal: '03/10/2026', noRM: 'RM0003', pasien: 'Siti Aminah', keluhan: 'Sakit kepala berdenyut disertai mual', dokter: 'dr. Sarah', status: 'Diperiksa' },
    { tanggal: '02/10/2026', noRM: 'RM0004', pasien: 'Dewi Sartika', keluhan: 'Nyeri perut kanan bawah dan mual', dokter: 'dr. Sarah', status: 'Selesai' },
    { tanggal: '02/10/2026', noRM: 'RM0005', pasien: 'Hendra Wijaya', keluhan: 'Diare akut 4 kali sejak kemarin', dokter: 'dr. Sarah', status: 'Selesai' },
    { tanggal: '01/10/2026', noRM: 'RM0001', pasien: 'Andi Saputra', keluhan: 'Pemeriksaan tensi darah berkala', dokter: 'dr. Sarah', status: 'Selesai' }
  ],

  users: [
    { nama: 'Admin Klinik', username: 'admin', email: 'admin@klinik.test', role: 'OWNER', status: 'Aktif' },
    { nama: 'Siti', username: 'siti', email: 'siti@klinik.test', role: 'RESEPSIONIS', status: 'Aktif' },
    { nama: 'Andi', username: 'andi', email: 'andi@klinik.test', role: 'PERAWAT', status: 'Aktif' },
    { nama: 'dr. Sarah Sp.PD', username: 'sarah', email: 'sarah@klinik.test', role: 'DOKTER', status: 'Aktif' }
  ],

  patientHistory: [
    { tanggal: '03/10/2026', keluhan: 'Kontrol rutin tensi & pusing', pemeriksaan: 'Tensi: 120/80 mmHg, Nadi: 80x/m', status: 'Selesai' },
    { tanggal: '15/09/2026', keluhan: 'Demam dan radang tenggorokan', pemeriksaan: 'Suhu: 38.2°C, Farang hiperemis', status: 'Selesai' },
    { tanggal: '02/08/2026', keluhan: 'Batuk kering selama 4 hari', pemeriksaan: 'Vesikuler normal, tidak ada ronkhi', status: 'Selesai' }
  ]
};

// =============================================================================
// 2. APPLICATION STATE
// =============================================================================
const AppState = {
  currentRole: 'OWNER', // 'OWNER' | 'RESEPSIONIS' | 'PERAWAT'
  currentView: 'login', // 'login' | 'dashboard' | 'pasien' | etc.
  selectedPatient: MockData.patients[0],
  isLoggedIn: false,
  charts: {}
};

// Role Configuration and Menu definitions
const RoleConfig = {
  OWNER: {
    title: 'Admin Klinik',
    badge: 'OWNER',
    avatar: 'AK',
    homeView: 'owner-dashboard',
    menu: [
      { id: 'owner-dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
      { id: 'pasien', label: 'Data Pasien', icon: 'bi-people' },
      { id: 'kunjungan', label: 'Data Kunjungan', icon: 'bi-clipboard2-pulse' },
      { id: 'laporan', label: 'Laporan', icon: 'bi-file-earmark-bar-graph' },
      { id: 'pengguna', label: 'Pengguna', icon: 'bi-person-gear' }
    ]
  },
  RESEPSIONIS: {
    title: 'Siti Rahma',
    badge: 'RESEPSIONIS',
    avatar: 'SR',
    homeView: 'resepsionis-dashboard',
    menu: [
      { id: 'resepsionis-dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
      { id: 'pasien', label: 'Data Pasien', icon: 'bi-people' },
      { id: 'pendaftaran', label: 'Pendaftaran', icon: 'bi-person-plus' },
      { id: 'antrean', label: 'Antrean', icon: 'bi-list-ol' }
    ]
  },
  PERAWAT: {
    title: 'Ns. Andi Pratama',
    badge: 'PERAWAT',
    avatar: 'AP',
    homeView: 'perawat-dashboard',
    menu: [
      { id: 'perawat-dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
      { id: 'antrean', label: 'Antrean', icon: 'bi-list-ol' },
      { id: 'pasien', label: 'Data Pasien', icon: 'bi-people' },
      { id: 'pemeriksaan', label: 'Pemeriksaan', icon: 'bi-heart-pulse' }
    ]
  }
};

// =============================================================================
// 3. NAVIGATION & ROLE CONTROLLER
// =============================================================================

/**
 * Switch active role in UI demo
 * @param {string} role - 'OWNER' | 'RESEPSIONIS' | 'PERAWAT'
 */
function setRole(role) {
  if (!RoleConfig[role]) return;
  AppState.currentRole = role;

  // Update Topbar UI
  const config = RoleConfig[role];
  const userRoleEl = document.getElementById('topbarUserRole');
  const userNameEl = document.getElementById('topbarUserName');
  const userAvatarEl = document.getElementById('topbarUserAvatar');
  
  if (userRoleEl) userRoleEl.textContent = `${config.badge} ▼`;
  if (userNameEl) userNameEl.textContent = config.title;
  if (userAvatarEl) userAvatarEl.textContent = config.avatar;

  // Update role pill active state
  document.querySelectorAll('.role-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.role === role);
  });

  // Rebuild sidebar menu for the role
  renderSidebarMenu();

  // If in dashboard view, redirect to role's dashboard
  if (['owner-dashboard', 'resepsionis-dashboard', 'perawat-dashboard'].includes(AppState.currentView)) {
    navigateTo(config.homeView);
  }
}

/**
 * Render dynamic sidebar navigation based on active role
 */
function renderSidebarMenu() {
  const menuContainer = document.getElementById('sidebarMenuItems');
  if (!menuContainer) return;

  const currentConfig = RoleConfig[AppState.currentRole];
  let html = `<div class="sidebar-nav-title">Menu ${AppState.currentRole}</div>`;

  currentConfig.menu.forEach(item => {
    const isActive = AppState.currentView === item.id;
    html += `
      <div class="sidebar-nav-item ${isActive ? 'active' : ''}" onclick="navigateTo('${item.id}')">
        <i class="bi ${item.icon}"></i>
        <span>${item.label}</span>
      </div>
    `;
  });

  // Quick Demo Showcase items
  html += `
    <div class="sidebar-nav-title mt-3">Demo & Showcase</div>
    <div class="sidebar-nav-item ${AppState.currentView === 'empty-states' ? 'active' : ''}" onclick="navigateTo('empty-states')">
      <i class="bi bi-inbox"></i>
      <span>Empty States</span>
    </div>
    <div class="sidebar-nav-item ${AppState.currentView === 'demo-showcase' ? 'active' : ''}" onclick="navigateTo('demo-showcase')">
      <i class="bi bi-ui-checks"></i>
      <span>Modals & Toasts</span>
    </div>
  `;

  menuContainer.innerHTML = html;
}

/**
 * Navigate to a specific view
 * @param {string} viewId - View ID to display
 * @param {Object} params - Optional view parameters
 */
function navigateTo(viewId, params = {}) {
  // If navigating to login
  if (viewId === 'login') {
    AppState.isLoggedIn = false;
    document.getElementById('appShell').classList.add('d-none');
    document.getElementById('loginScreen').classList.remove('d-none');
    AppState.currentView = 'login';
    window.scrollTo(0, 0);
    return;
  }

  // Ensure app shell is shown
  AppState.isLoggedIn = true;
  document.getElementById('loginScreen').classList.add('d-none');
  document.getElementById('appShell').classList.remove('d-none');

  // Close mobile sidebar if open
  closeMobileSidebar();

  // Handle default dashboard request based on role
  if (viewId === 'dashboard') {
    viewId = RoleConfig[AppState.currentRole].homeView;
  }

  // Update view state
  AppState.currentView = viewId;

  // Hide all view sections
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.add('d-none');
  });

  // Show target view section
  const targetSec = document.getElementById(`view-${viewId}`);
  if (targetSec) {
    targetSec.classList.remove('d-none');
  }

  // Update Page Title and Breadcrumb
  updateTopbarTitle(viewId);

  // Update sidebar active highlights
  renderSidebarMenu();

  // Specific view hooks
  handleViewMounted(viewId, params);

  window.scrollTo(0, 0);
}

/**
 * Update topbar title and breadcrumb depending on view
 */
function updateTopbarTitle(viewId) {
  const titleEl = document.getElementById('topbarPageTitle');
  const breadcrumbEl = document.getElementById('topbarBreadcrumb');
  if (!titleEl) return;

  const titles = {
    'owner-dashboard': { title: 'Dashboard Owner', breadcrumb: 'Owner / Ringkasan Aktivitas Klinik' },
    'resepsionis-dashboard': { title: 'Dashboard', breadcrumb: 'Resepsionis / Ringkasan Pelayanan' },
    'perawat-dashboard': { title: 'Dashboard Perawat', breadcrumb: 'Perawat / Manajemen Antrean & Pemeriksaan' },
    'pasien': { title: 'Data Pasien', breadcrumb: 'Data Pasien / Indeks Rekam Medis' },
    'pasien-tambah': { title: 'Tambah Pasien', breadcrumb: 'Data Pasien / Registrasi Pasien Baru' },
    'pasien-detail': { title: 'Detail Pasien', breadcrumb: `Data Pasien / ${AppState.selectedPatient.noRM} - ${AppState.selectedPatient.nama}` },
    'pendaftaran': { title: 'Pendaftaran Pasien', breadcrumb: 'Pendaftaran / Pendaftaran Kunjungan Baru' },
    'antrean': { title: 'Antrean Pasien', breadcrumb: 'Antrean / Monitoring Antrean Hari Ini' },
    'pemeriksaan': { title: 'Pemeriksaan Pasien', breadcrumb: `Pemeriksaan / ${AppState.selectedPatient.noRM} - ${AppState.selectedPatient.nama}` },
    'kunjungan': { title: 'Data Kunjungan', breadcrumb: 'Pelayanan / Data Kunjungan Pasien' },
    'laporan': { title: 'Laporan Klinik', breadcrumb: 'Manajemen / Laporan & Analitik Klinik' },
    'pengguna': { title: 'Pengguna Sistem', breadcrumb: 'Pengaturan / Manajemen Akun & Hak Akses' },
    'pengguna-tambah': { title: 'Tambah Pengguna', breadcrumb: 'Pengaturan / Tambah Akun Baru' },
    'empty-states': { title: 'Tampilan Kosong (Empty States)', breadcrumb: 'Demo UI / Ilustrasi Kondisi Data Kosong' },
    'demo-showcase': { title: 'Komponen Dialog & Notifikasi', breadcrumb: 'Demo UI / Modal & Toast Showcase' }
  };

  const item = titles[viewId] || { title: 'Sistem Informasi Klinik', breadcrumb: 'Klinik Sehat Medika' };
  titleEl.textContent = item.title;
  if (breadcrumbEl) breadcrumbEl.textContent = item.breadcrumb;
}

/**
 * Handle hooks when a view is mounted
 */
function handleViewMounted(viewId, params) {
  if (viewId === 'owner-dashboard') {
    renderOwnerChart();
  } else if (viewId === 'laporan') {
    renderLaporanChart();
  } else if (viewId === 'pasien') {
    renderPatientTable(MockData.patients);
  } else if (viewId === 'pemeriksaan') {
    initPemeriksaanView();
  } else if (viewId === 'pendaftaran') {
    initPendaftaranView();
  } else if (viewId === 'antrean') {
    renderAntreanTable();
  }
}

// =============================================================================
// 4. CHART VISUALIZATION (Chart.js via CDN)
// =============================================================================

function renderOwnerChart() {
  const ctx = document.getElementById('ownerWeeklyChart');
  if (!ctx || typeof Chart === 'undefined') return;

  if (AppState.charts.owner) {
    AppState.charts.owner.destroy();
  }

  AppState.charts.owner = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['27 Sep', '28 Sep', '29 Sep', '30 Sep', '01 Okt', '02 Okt', '03 Okt (Hari ini)'],
      datasets: [{
        label: 'Kunjungan Pasien',
        data: [28, 32, 29, 38, 42, 36, 35],
        borderColor: '#198754',
        backgroundColor: 'rgba(25, 135, 84, 0.08)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#198754',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#212529',
          padding: 10,
          titleFont: { size: 12, weight: 'bold' },
          bodyFont: { size: 12 },
          displayColors: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#EDF2F7' },
          ticks: { font: { size: 11 }, color: '#6C757D' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 }, color: '#6C757D' }
        }
      }
    }
  });
}

function renderLaporanChart() {
  const ctx = document.getElementById('laporanChart');
  if (!ctx || typeof Chart === 'undefined') return;

  if (AppState.charts.laporan) {
    AppState.charts.laporan.destroy();
  }

  AppState.charts.laporan = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Pemeriksaan Umum', 'Gigi & Mulut', 'KIA / Imunisasi', 'Konsultasi Gizi', 'Laboratorium'],
      datasets: [{
        label: 'Jumlah Kunjungan',
        data: [58, 24, 18, 12, 8],
        backgroundColor: [
          '#198754',
          '#20c997',
          '#0d6efd',
          '#ffc107',
          '#6f42c1'
        ],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#212529',
          padding: 10
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#EDF2F7' },
          ticks: { font: { size: 11 }, color: '#6C757D' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 }, color: '#6C757D' }
        }
      }
    }
  });
}

// =============================================================================
// 5. DATA PASIEN & SEARCH
// =============================================================================

function renderPatientTable(dataList) {
  const tbody = document.getElementById('patientTableBody');
  const emptyState = document.getElementById('patientTableEmpty');
  if (!tbody) return;

  if (!dataList || dataList.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('d-none');
    return;
  }

  if (emptyState) emptyState.classList.add('d-none');

  tbody.innerHTML = dataList.map((p, idx) => `
    <tr>
      <td class="text-muted fw-medium">${String(idx + 1).padStart(2, '0')}</td>
      <td><span class="badge bg-light text-dark border font-monospace">${p.noRM}</span></td>
      <td>
        <div class="fw-bold text-dark">${p.nama}</div>
        <div class="text-xs text-muted">${p.telepon}</div>
      </td>
      <td>
        <span class="badge ${p.jenisKelamin === 'Laki-laki' ? 'bg-primary-subtle text-primary' : 'bg-danger-subtle text-danger'} border">
          <i class="bi ${p.jenisKelamin === 'Laki-laki' ? 'bi-gender-male' : 'bi-gender-female'} me-1"></i>${p.jenisKelamin}
        </span>
      </td>
      <td>${p.tanggalLahir}</td>
      <td class="text-end">
        <div class="dropdown">
          <button class="btn btn-sm btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown">
            Aksi
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm">
            <li>
              <a class="dropdown-item" href="javascript:void(0)" onclick="viewPatientDetail('${p.noRM}')">
                <i class="bi bi-eye text-primary me-2"></i> Detail Pasien
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="javascript:void(0)" onclick="editPatient('${p.noRM}')">
                <i class="bi bi-pencil text-warning me-2"></i> Edit Data
              </a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <a class="dropdown-item text-danger" href="javascript:void(0)" onclick="openDeleteModal('${p.noRM}', '${p.nama}')">
                <i class="bi bi-trash me-2"></i> Hapus
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  `).join('');
}

function searchPatients() {
  const query = (document.getElementById('patientSearchInput')?.value || '').trim().toLowerCase();
  if (!query) {
    renderPatientTable(MockData.patients);
    return;
  }

  const filtered = MockData.patients.filter(p => 
    p.nama.toLowerCase().includes(query) ||
    p.noRM.toLowerCase().includes(query)
  );

  renderPatientTable(filtered);
}

function viewPatientDetail(noRM) {
  const patient = MockData.patients.find(p => p.noRM === noRM) || MockData.patients[0];
  AppState.selectedPatient = patient;

  // Populate Detail View Fields
  document.getElementById('detailNoRM').textContent = patient.noRM;
  document.getElementById('detailNama').textContent = patient.nama;
  document.getElementById('detailTglLahir').textContent = `${patient.tanggalLahir} (${patient.usia})`;
  document.getElementById('detailGender').textContent = patient.jenisKelamin;
  document.getElementById('detailAlamat').textContent = patient.alamat;
  document.getElementById('detailTelepon').textContent = patient.telepon;
  document.getElementById('detailKontakDarurat').textContent = `${patient.kontakDarurat} - ${patient.noDarurat}`;

  navigateTo('pasien-detail');
}

function editPatient(noRM) {
  showToast('info', `Mode Edit: Membuka formulir pengeditan data pasien ${noRM}. (Demo UI)`);
  navigateTo('pasien-tambah');
}

function openDeleteModal(noRM, nama) {
  document.getElementById('deleteTargetName').textContent = `${nama} (${noRM})`;
  const modalEl = document.getElementById('deleteConfirmModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

function confirmDeletePatient() {
  const modalEl = document.getElementById('deleteConfirmModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();
  showToast('success', 'Data pasien berhasil dihapus.');
}

// =============================================================================
// 6. PENDAFTARAN PASIEN & KUNJUNGAN
// =============================================================================

function initPendaftaranView() {
  // Reset form
  const visitFormCard = document.getElementById('visitRegistrationCard');
  if (visitFormCard) visitFormCard.classList.add('d-none');

  searchRegistrationPatients();
}

function searchRegistrationPatients() {
  const query = (document.getElementById('regPatientSearchInput')?.value || '').trim().toLowerCase();
  const list = query 
    ? MockData.patients.filter(p => p.nama.toLowerCase().includes(query) || p.noRM.toLowerCase().includes(query))
    : MockData.patients.slice(0, 3);

  const tbody = document.getElementById('regPatientSearchResults');
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center py-3 text-muted small">Pasien tidak ditemukan. Klik "+ Pasien Baru" untuk mendaftarkan.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(p => `
    <tr>
      <td><span class="badge bg-light text-dark border font-monospace">${p.noRM}</span></td>
      <td class="fw-bold">${p.nama}</td>
      <td class="text-muted">${p.tanggalLahir}</td>
      <td class="text-end">
        <button type="button" class="btn btn-sm btn-primary-clinic" onclick="selectPatientForVisit('${p.noRM}')">
          <i class="bi bi-check2"></i> PILIH
        </button>
      </td>
    </tr>
  `).join('');
}

function selectPatientForVisit(noRM) {
  const patient = MockData.patients.find(p => p.noRM === noRM) || MockData.patients[0];
  AppState.selectedPatient = patient;

  // Populate selected card
  document.getElementById('regSelectedRM').textContent = patient.noRM;
  document.getElementById('regSelectedNama').textContent = patient.nama;
  document.getElementById('regSelectedTglLahir').textContent = patient.tanggalLahir;
  document.getElementById('regSelectedGender').textContent = patient.jenisKelamin;

  // Show visit form card
  const visitFormCard = document.getElementById('visitRegistrationCard');
  if (visitFormCard) {
    visitFormCard.classList.remove('d-none');
    visitFormCard.scrollIntoView({ behavior: 'smooth' });
  }

  showToast('info', `Pasien ${patient.nama} dipilih. Silakan lengkapi formulir kunjungan.`);
}

function submitVisitRegistration(e) {
  if (e) e.preventDefault();
  
  // Show Registration Success Modal
  document.getElementById('modalQueueNumber').textContent = 'A005';
  document.getElementById('modalPatientName').textContent = AppState.selectedPatient ? AppState.selectedPatient.nama : 'Andi Saputra';

  const modalEl = document.getElementById('registrationSuccessModal');
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

// =============================================================================
// 7. ANTREAN PASIEN
// =============================================================================

function renderAntreanTable() {
  const tbody = document.getElementById('antreanTableBody');
  if (!tbody) return;

  tbody.innerHTML = MockData.queues.map(q => {
    let badgeClass = 'badge-status-menunggu';
    let icon = 'bi-clock';
    if (q.status === 'Selesai') {
      badgeClass = 'badge-status-selesai';
      icon = 'bi-check-circle';
    } else if (q.status === 'Diperiksa' || q.status === 'Dipanggil') {
      badgeClass = 'badge-status-diperiksa';
      icon = 'bi-megaphone';
    }

    const isMenunggu = q.status === 'Menunggu';

    return `
      <tr>
        <td>
          <span class="badge bg-dark-subtle text-dark border font-monospace fs-6 px-2 py-1">${q.antrean}</span>
        </td>
        <td>
          <div class="fw-bold text-dark">${q.pasien}</div>
          <div class="text-xs text-muted font-monospace">${q.noRM}</div>
        </td>
        <td class="text-muted">${q.jamDaftar}</td>
        <td>
          <span class="badge-status ${badgeClass}" id="queue-status-badge-${q.antrean}">
            <i class="bi ${icon}"></i> <span>${q.status}</span>
          </span>
        </td>
        <td>
          ${isMenunggu ? `
            <button type="button" class="btn btn-sm btn-outline-primary" id="btn-call-${q.antrean}" onclick="panggilAntrean('${q.antrean}', '${q.pasien}')">
              <i class="bi bi-volume-up"></i> Panggil
            </button>
          ` : `
            <button type="button" class="btn btn-sm btn-light border" onclick="lihatAntrean('${q.antrean}')">
              <i class="bi bi-eye"></i> Lihat
            </button>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function panggilAntrean(antrean, pasien) {
  // Update status badge visually
  const badge = document.getElementById(`queue-status-badge-${antrean}`);
  if (badge) {
    badge.className = 'badge-status badge-status-diperiksa';
    badge.innerHTML = `<i class="bi bi-megaphone-fill"></i> <span>Dipanggil</span>`;
  }

  const btn = document.getElementById(`btn-call-${antrean}`);
  if (btn) {
    btn.className = 'btn btn-sm btn-success text-white';
    btn.innerHTML = `<i class="bi bi-check2"></i> Sedang Dipanggil`;
  }

  showToast('info', `Memanggil Antrean ${antrean} (${pasien}) menuju Ruang Pemeriksaan.`);
}

function lihatAntrean(antrean) {
  showToast('info', `Melihat rekam medis & status antrean ${antrean}. (Demo UI)`);
}

// =============================================================================
// 8. PEMERIKSAAN & DYNAMIC COMPLAINT RECOMMENDATION
// =============================================================================

function initPemeriksaanView() {
  const patient = AppState.selectedPatient || MockData.patients[0];

  // Set patient card in examination
  document.getElementById('examPatientRM').textContent = patient.noRM;
  document.getElementById('examPatientNama').textContent = patient.nama;
  document.getElementById('examPatientTglLahir').textContent = patient.tanggalLahir;
  document.getElementById('examPatientGender').textContent = patient.jenisKelamin;

  // Bind dynamic recommendation engine
  const textarea = document.getElementById('keluhanUtamaInput');
  const container = document.getElementById('recommendationContainer');

  if (textarea && container && window.RecommendationEngine) {
    RecommendationEngine.bind(textarea, container, 350);
  }
}

function setComplaintText(text) {
  const textarea = document.getElementById('keluhanUtamaInput');
  const container = document.getElementById('recommendationContainer');
  if (!textarea) return;

  textarea.value = text;
  // Trigger input event for dynamic recommendation engine
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

function appendComplaintTag(keyword) {
  const textarea = document.getElementById('keluhanUtamaInput');
  if (!textarea) return;

  if (!textarea.value.trim()) {
    textarea.value = `Pasien mengeluh ${keyword}`;
  } else {
    textarea.value = `${textarea.value.trim()} dan ${keyword}`;
  }
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

function saveExamination() {
  showToast('success', 'Pemeriksaan berhasil disimpan.');
  // Return to queue or dashboard
  setTimeout(() => {
    navigateTo(RoleConfig[AppState.currentRole].homeView);
  }, 1000);
}

// =============================================================================
// 9. TOAST NOTIFICATIONS (Section 25)
// =============================================================================

function showToast(type, message) {
  const toastContainer = document.getElementById('globalToastContainer');
  if (!toastContainer) return;

  const typeConfig = {
    success: { icon: 'bi-check-circle-fill text-success', title: 'Berhasil', defaultMsg: 'Data berhasil disimpan.' },
    error: { icon: 'bi-x-circle-fill text-danger', title: 'Gagal', defaultMsg: 'Terjadi kesalahan.' },
    warning: { icon: 'bi-exclamation-triangle-fill text-warning', title: 'Peringatan', defaultMsg: 'Data belum lengkap.' },
    info: { icon: 'bi-info-circle-fill text-primary', title: 'Informasi', defaultMsg: 'Data sedang diproses.' }
  };

  const cfg = typeConfig[type] || typeConfig.info;
  const toastId = 'toast-' + Date.now();

  const toastHtml = `
    <div id="${toastId}" class="toast toast-clinic align-items-center bg-white" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex p-3">
        <i class="bi ${cfg.icon} fs-4 me-3 flex-shrink-0"></i>
        <div class="flex-grow-1">
          <div class="fw-bold small text-dark mb-0">${cfg.title}</div>
          <div class="small text-muted">${message || cfg.defaultMsg}</div>
        </div>
        <button type="button" class="btn-close ms-2 me-0 align-self-start" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  const toastEl = document.getElementById(toastId);
  const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
  bsToast.show();

  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}

// =============================================================================
// 10. AUTH & LOGIN INTERACTION (Frontend Only)
// =============================================================================

function initLoginInteractions() {
  const togglePassBtn = document.getElementById('togglePasswordBtn');
  const passwordInput = document.getElementById('passwordInput');

  if (togglePassBtn && passwordInput) {
    togglePassBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassBtn.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Transition to dashboard with current role
      showToast('success', 'Masuk berhasil. Selamat datang di Sistem Informasi Klinik.');
      navigateTo(RoleConfig[AppState.currentRole].homeView);
    });
  }
}

function quickFillLogin(role, username, password) {
  const userInput = document.getElementById('usernameInput');
  const passInput = document.getElementById('passwordInput');

  if (userInput) userInput.value = username;
  if (passInput) passInput.value = password;

  setRole(role);
  showToast('info', `Kredensial demo ${role} terisi otomatis. Klik "MASUK" untuk melanjutkan.`);
}

// =============================================================================
// 11. MOBILE SIDEBAR & RESPONSIVE
// =============================================================================

function toggleMobileSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  if (sidebar && backdrop) {
    sidebar.classList.toggle('show');
    backdrop.classList.toggle('show');
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  if (sidebar && backdrop) {
    sidebar.classList.remove('show');
    backdrop.classList.remove('show');
  }
}

// =============================================================================
// 12. INITIALIZATION ON DOM READY
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Init Login handlers
  initLoginInteractions();

  // Set default role
  setRole('OWNER');

  // Check URL hash for direct view navigation or default to login
  const hash = window.location.hash.replace('#', '');
  if (hash && hash !== 'login') {
    navigateTo(hash);
  } else {
    // Default to login view
    navigateTo('login');
  }
});
