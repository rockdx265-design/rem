/**
 * Sistem Informasi Klinik - DataStore
 * LocalStorage-backed realistic database for seamless client-side persistence
 */

const DataStore = (() => {
  const STORAGE_KEYS = {
    PATIENTS: 'rme_klinik_patients',
    QUEUES: 'rme_klinik_queues',
    VISITS: 'rme_klinik_visits',
    USERS: 'rme_klinik_users',
    INIT_FLAG: 'rme_klinik_initialized_v2'
  };

  // Seed data
  const defaultPatients = [
    {
      noRm: 'RM0001',
      nama: 'Andi Saputra',
      tempatLahir: 'Jakarta',
      tanggalLahir: '1995-05-12',
      jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Merdeka No. 12, RT 02/05, Jakarta Pusat',
      telepon: '081234567890',
      golonganDarah: 'O',
      kontakDarurat: 'Rina Saputri (Istri)',
      noKontakDarurat: '081234567899',
      status: 'Aktif',
      createdAt: '2026-09-01'
    },
    {
      noRm: 'RM0002',
      nama: 'Budi Santoso',
      tempatLahir: 'Bandung',
      tanggalLahir: '2000-01-15',
      jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Surya Kencana No. 45, Bandung',
      telepon: '082198765432',
      golonganDarah: 'B',
      kontakDarurat: 'Haryanto (Ayah)',
      noKontakDarurat: '082198765430',
      status: 'Aktif',
      createdAt: '2026-09-10'
    },
    {
      noRm: 'RM0003',
      nama: 'Siti Aminah',
      tempatLahir: 'Surabaya',
      tanggalLahir: '1992-10-20',
      jenisKelamin: 'Perempuan',
      alamat: 'Jl. Diponegoro Blok C No. 7, Surabaya',
      telepon: '085712345678',
      golonganDarah: 'A',
      kontakDarurat: 'Ahmad Fauzi (Suami)',
      noKontakDarurat: '085712345670',
      status: 'Aktif',
      createdAt: '2026-09-15'
    },
    {
      noRm: 'RM0004',
      nama: 'Dewi Sartika',
      tempatLahir: 'Yogyakarta',
      tanggalLahir: '1988-04-08',
      jenisKelamin: 'Perempuan',
      alamat: 'Jl. Malioboro No. 89, Yogyakarta',
      telepon: '087812349988',
      golonganDarah: 'AB',
      kontakDarurat: 'Bambang (Suami)',
      noKontakDarurat: '087812349980',
      status: 'Aktif',
      createdAt: '2026-09-20'
    },
    {
      noRm: 'RM0005',
      nama: 'Ahmad Dahlan',
      tempatLahir: 'Semarang',
      tanggalLahir: '1975-09-30',
      jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Pahlawan No. 104, Semarang',
      telepon: '081398761234',
      golonganDarah: 'O',
      kontakDarurat: 'Nurul (Anak)',
      noKontakDarurat: '081398761230',
      status: 'Aktif',
      createdAt: '2026-09-25'
    },
    {
      noRm: 'RM0006',
      nama: 'Maya Indah',
      tempatLahir: 'Bogor',
      tanggalLahir: '1998-02-14',
      jenisKelamin: 'Perempuan',
      alamat: 'Jl. Pajajaran No. 22, Bogor',
      telepon: '085811223344',
      golonganDarah: 'A',
      kontakDarurat: 'Ratna (Ibu)',
      noKontakDarurat: '085811223340',
      status: 'Aktif',
      createdAt: '2026-10-01'
    }
  ];

  const defaultQueues = [
    {
      nomorAntrean: 'A001',
      noRm: 'RM0001',
      nama: 'Andi Saputra',
      jamDaftar: '08:45',
      jamDiperiksa: '09:00',
      jamSelesai: '09:20',
      status: 'Selesai',
      keluhan: 'Demam sejak kemarin malam dan badan meriang',
      jenisKunjungan: 'Pemeriksaan Umum',
      tanggal: '2026-10-03'
    },
    {
      nomorAntrean: 'A002',
      noRm: 'RM0002',
      nama: 'Budi Santoso',
      jamDaftar: '09:00',
      jamDiperiksa: null,
      jamSelesai: null,
      status: 'Menunggu',
      keluhan: 'Batuk berdahak disertai sesak dan nyeri tenggorokan',
      jenisKunjungan: 'Pemeriksaan Umum',
      tanggal: '2026-10-03'
    },
    {
      nomorAntrean: 'A003',
      noRm: 'RM0003',
      nama: 'Siti Aminah',
      jamDaftar: '09:10',
      jamDiperiksa: '09:30',
      jamSelesai: null,
      status: 'Diperiksa',
      keluhan: 'Sakit kepala berdenyut dan mual muntah',
      jenisKunjungan: 'Pemeriksaan Umum',
      tanggal: '2026-10-03'
    },
    {
      nomorAntrean: 'A004',
      noRm: 'RM0004',
      nama: 'Dewi Sartika',
      jamDaftar: '09:25',
      jamDiperiksa: null,
      jamSelesai: null,
      status: 'Menunggu',
      keluhan: 'Nyeri perut bagian bawah dan lemas',
      jenisKunjungan: 'Pemeriksaan Umum',
      tanggal: '2026-10-03'
    },
    {
      nomorAntrean: 'A005',
      noRm: 'RM0005',
      nama: 'Ahmad Dahlan',
      jamDaftar: '09:40',
      jamDiperiksa: null,
      jamSelesai: null,
      status: 'Menunggu',
      keluhan: 'Pusing berputar dan tengkuk terasa berat',
      jenisKunjungan: 'Pemeriksaan Umum',
      tanggal: '2026-10-03'
    }
  ];

  const defaultVisits = [
    {
      id: 'KNJ-20261003-001',
      tanggal: '2026-10-03',
      nomorAntrean: 'A001',
      noRm: 'RM0001',
      nama: 'Andi Saputra',
      jamDaftar: '08:45',
      jamDiperiksa: '09:00',
      jamSelesai: '09:20',
      keluhan: 'Demam sejak kemarin malam, suhu tinggi dan sakit kepala',
      jenisKunjungan: 'Pemeriksaan Umum',
      tandaVital: {
        tensi: '120/80',
        suhu: '38.2',
        berat: '68',
        tinggi: '172',
        nadi: '84'
      },
      catatanPemeriksaan: 'Pasien mengalami demam akut hari ke-2. Faring tampak hiperemis ringan. Diberikan edukasi hidrasi oral dan antipiretik.',
      rekomendasiTindakan: ['Periksa suhu tubuh', 'Periksa tekanan darah', 'Evaluasi kondisi umum pasien'],
      status: 'Selesai'
    },
    {
      id: 'KNJ-20261002-002',
      tanggal: '2026-10-02',
      nomorAntrean: 'A018',
      noRm: 'RM0002',
      nama: 'Budi Santoso',
      jamDaftar: '10:15',
      jamDiperiksa: '10:30',
      jamSelesai: '10:50',
      keluhan: 'Batuk berdahak 3 hari',
      jenisKunjungan: 'Pemeriksaan Umum',
      tandaVital: {
        tensi: '115/75',
        suhu: '36.8',
        berat: '65',
        tinggi: '170',
        nadi: '78'
      },
      catatanPemeriksaan: 'Ronkhi basah halus minimal di apeks basal. Anjuran minum air hangat dan istirahat.',
      rekomendasiTindakan: ['Periksa kondisi pernapasan', 'Evaluasi kondisi umum pasien'],
      status: 'Selesai'
    },
    {
      id: 'KNJ-20261001-003',
      tanggal: '2026-10-01',
      nomorAntrean: 'A012',
      noRm: 'RM0003',
      nama: 'Siti Aminah',
      jamDaftar: '14:00',
      jamDiperiksa: '14:15',
      jamSelesai: '14:40',
      keluhan: 'Mual muntah dan nyeri lambung',
      jenisKunjungan: 'Pemeriksaan Umum',
      tandaVital: {
        tensi: '110/70',
        suhu: '36.5',
        berat: '52',
        tinggi: '158',
        nadi: '82'
      },
      catatanPemeriksaan: 'Nyeri tekan epigastrium (+). Disarankan pola makan teratur dan kurangi makanan pedas.',
      rekomendasiTindakan: ['Catat keluhan penyerta', 'Evaluasi lokasi dan durasi nyeri'],
      status: 'Selesai'
    }
  ];

  const defaultUsers = [
    {
      id: 1,
      nama: 'dr. Hendra Pratama, Sp.A',
      username: 'owner',
      email: 'owner@klinik.id',
      role: 'OWNER',
      status: 'Aktif',
      createdAt: '2026-01-10'
    },
    {
      id: 2,
      nama: 'Siti Rahma',
      username: 'resepsionis',
      email: 'resepsionis@klinik.id',
      role: 'RESEPSIONIS',
      status: 'Aktif',
      createdAt: '2026-02-15'
    },
    {
      id: 3,
      nama: 'Ns. Dian Kusuma, S.Kep',
      username: 'perawat',
      email: 'perawat@klinik.id',
      role: 'PERAWAT',
      status: 'Aktif',
      createdAt: '2026-03-01'
    }
  ];

  function init() {
    if (!localStorage.getItem(STORAGE_KEYS.INIT_FLAG)) {
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(defaultPatients));
      localStorage.setItem(STORAGE_KEYS.QUEUES, JSON.stringify(defaultQueues));
      localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(defaultVisits));
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
      localStorage.setItem(STORAGE_KEYS.INIT_FLAG, 'true');
    }
  }

  // Patients
  function getPatients() {
    init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENTS) || '[]');
  }

  function getPatientByRm(noRm) {
    const list = getPatients();
    return list.find(p => p.noRm.toLowerCase() === (noRm || '').toLowerCase());
  }

  function addPatient(patient) {
    const list = getPatients();
    // generate RM if not present
    if (!patient.noRm) {
      const nextNum = list.length + 1;
      patient.noRm = 'RM' + String(nextNum).padStart(4, '0');
    }
    patient.status = patient.status || 'Aktif';
    patient.createdAt = new Date().toISOString().split('T')[0];
    list.unshift(patient);
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(list));
    return patient;
  }

  function updatePatient(noRm, updatedData) {
    const list = getPatients();
    const index = list.findIndex(p => p.noRm === noRm);
    if (index !== -1) {
      list[index] = { ...list[index], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(list));
      return list[index];
    }
    return null;
  }

  function deletePatient(noRm) {
    let list = getPatients();
    list = list.filter(p => p.noRm !== noRm);
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(list));
    return true;
  }

  // Queues
  function getQueues() {
    init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUEUES) || '[]');
  }

  function getNextQueueNumber() {
    const list = getQueues();
    const count = list.length + 1;
    return 'A' + String(count).padStart(3, '0');
  }

  function addQueue(queueData) {
    const list = getQueues();
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const newQueue = {
      nomorAntrean: queueData.nomorAntrean || getNextQueueNumber(),
      noRm: queueData.noRm,
      nama: queueData.nama,
      jamDaftar: timeStr,
      jamDiperiksa: null,
      jamSelesai: null,
      status: 'Menunggu',
      keluhan: queueData.keluhan || '',
      jenisKunjungan: queueData.jenisKunjungan || 'Pemeriksaan Umum',
      tanggal: '2026-10-03'
    };
    list.push(newQueue);
    localStorage.setItem(STORAGE_KEYS.QUEUES, JSON.stringify(list));
    return newQueue;
  }

  function updateQueueStatus(nomorAntrean, status) {
    const list = getQueues();
    const item = list.find(q => q.nomorAntrean === nomorAntrean);
    if (item) {
      item.status = status;
      const now = new Date();
      const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      if (status === 'Diperiksa') item.jamDiperiksa = timeStr;
      if (status === 'Selesai') item.jamSelesai = timeStr;
      localStorage.setItem(STORAGE_KEYS.QUEUES, JSON.stringify(list));
      return item;
    }
    return null;
  }

  // Visits
  function getVisits() {
    init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITS) || '[]');
  }

  function getVisitById(id) {
    const list = getVisits();
    return list.find(v => v.id === id);
  }

  function addVisit(visitData) {
    const list = getVisits();
    const now = new Date();
    const id = 'KNJ-20261003-' + String(list.length + 1).padStart(3, '0');
    const newVisit = {
      id: id,
      tanggal: '2026-10-03',
      ...visitData,
      status: 'Selesai'
    };
    list.unshift(newVisit);
    localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(list));
    return newVisit;
  }

  // Users
  function getUsers() {
    init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  }

  function addUser(userData) {
    const list = getUsers();
    const newUser = {
      id: Date.now(),
      ...userData,
      status: userData.status || 'Aktif',
      createdAt: '2026-10-03'
    };
    list.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(list));
    return newUser;
  }

  function updateUser(idOrUsername, updatedData) {
    const list = getUsers();
    const idx = list.findIndex(u => u.username === idOrUsername || u.id === Number(idOrUsername));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(list));
      return list[idx];
    }
    return null;
  }

  function deleteUser(idOrUsername) {
    let list = getUsers();
    list = list.filter(u => u.username !== idOrUsername && u.id !== Number(idOrUsername));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(list));
    return true;
  }

  function resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.PATIENTS);
    localStorage.removeItem(STORAGE_KEYS.QUEUES);
    localStorage.removeItem(STORAGE_KEYS.VISITS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.INIT_FLAG);
    init();
  }

  return {
    init,
    getPatients,
    getPatientByRm,
    addPatient,
    updatePatient,
    deletePatient,
    getQueues,
    getNextQueueNumber,
    addQueue,
    updateQueueStatus,
    getVisits,
    getVisitById,
    addVisit,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    resetAllData
  };
})();

// Auto initialize on load
DataStore.init();
