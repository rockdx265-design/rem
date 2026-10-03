/**
 * Sistem Informasi Klinik - auth.js
 * Session & role-based authentication management
 */

const Auth = (() => {
  const SESSION_KEY = 'rme_klinik_auth_session';

  // Demo user credentials
  const credentialMap = {
    'owner': {
      id: 1,
      nama: 'dr. Hendra Pratama, Sp.A',
      username: 'owner',
      email: 'owner@klinik.id',
      role: 'OWNER',
      avatarInitial: 'HP'
    },
    'owner@klinik.id': {
      id: 1,
      nama: 'dr. Hendra Pratama, Sp.A',
      username: 'owner',
      email: 'owner@klinik.id',
      role: 'OWNER',
      avatarInitial: 'HP'
    },
    'resepsionis': {
      id: 2,
      nama: 'Siti Rahma',
      username: 'resepsionis',
      email: 'resepsionis@klinik.id',
      role: 'RESEPSIONIS',
      avatarInitial: 'SR'
    },
    'resepsionis@klinik.id': {
      id: 2,
      nama: 'Siti Rahma',
      username: 'resepsionis',
      email: 'resepsionis@klinik.id',
      role: 'RESEPSIONIS',
      avatarInitial: 'SR'
    },
    'perawat': {
      id: 3,
      nama: 'Ns. Dian Kusuma, S.Kep',
      username: 'perawat',
      email: 'perawat@klinik.id',
      role: 'PERAWAT',
      avatarInitial: 'DK'
    },
    'perawat@klinik.id': {
      id: 3,
      nama: 'Ns. Dian Kusuma, S.Kep',
      username: 'perawat',
      email: 'perawat@klinik.id',
      role: 'PERAWAT',
      avatarInitial: 'DK'
    }
  };

  function getCurrentUser() {
    const raw = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      // Default fallback for direct inspection if not logged in
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function login(usernameOrEmail, password, rememberMe = true) {
    const key = (usernameOrEmail || '').trim().toLowerCase();
    const user = credentialMap[key];

    if (!user) {
      return { success: false, message: 'Username atau Email tidak terdaftar dalam sistem.' };
    }

    if (!password || password.length < 4) {
      return { success: false, message: 'Password tidak boleh kosong (minimal 4 karakter).' };
    }

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(user));

    return {
      success: true,
      user: user,
      redirectUrl: getDashboardUrlForRole(user.role)
    };
  }

  function loginAsRole(role) {
    const userMap = {
      'OWNER': credentialMap['owner'],
      'RESEPSIONIS': credentialMap['resepsionis'],
      'PERAWAT': credentialMap['perawat']
    };
    const user = userMap[role] || credentialMap['owner'];
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    window.location.href = getDashboardUrlForRole(user.role);
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    // Find relative path to login.html
    const isInSubdir = window.location.pathname.includes('/owner/') || 
                       window.location.pathname.includes('/receptionist/') || 
                       window.location.pathname.includes('/nurse/');
    window.location.href = isInSubdir ? '../login.html' : 'login.html';
  }

  function getDashboardUrlForRole(role) {
    const isInSubdir = window.location.pathname.includes('/owner/') || 
                       window.location.pathname.includes('/receptionist/') || 
                       window.location.pathname.includes('/nurse/');
    const prefix = isInSubdir ? '../' : '';

    switch (role) {
      case 'OWNER':
        return prefix + 'owner/dashboard.html';
      case 'RESEPSIONIS':
        return prefix + 'receptionist/dashboard.html';
      case 'PERAWAT':
        return prefix + 'nurse/dashboard.html';
      default:
        return prefix + 'login.html';
    }
  }

  function checkAuth(allowedRoles = []) {
    let user = getCurrentUser();
    
    // Auto-login fallback if user opened dashboard directly from file system
    if (!user && allowedRoles.length > 0) {
      user = credentialMap[allowedRoles[0].toLowerCase()] || credentialMap['owner'];
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    }

    if (!user) {
      const isInSubdir = window.location.pathname.includes('/owner/') || 
                         window.location.pathname.includes('/receptionist/') || 
                         window.location.pathname.includes('/nurse/');
      window.location.href = isInSubdir ? '../login.html' : 'login.html';
      return false;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      alert(`Akses Ditolak: Halaman ini hanya untuk role ${allowedRoles.join(', ')}.`);
      window.location.href = getDashboardUrlForRole(user.role);
      return false;
    }

    return user;
  }

  function updateTopbarUI(user) {
    if (!user) user = getCurrentUser();
    if (!user) return;

    const nameEls = document.querySelectorAll('.js-user-name');
    nameEls.forEach(el => el.textContent = user.nama);

    const roleEls = document.querySelectorAll('.js-user-role');
    roleEls.forEach(el => el.textContent = user.role);

    const avatarEls = document.querySelectorAll('.js-user-avatar');
    avatarEls.forEach(el => el.textContent = user.avatarInitial || user.nama.substring(0, 2).toUpperCase());
  }

  return {
    getCurrentUser,
    login,
    loginAsRole,
    logout,
    checkAuth,
    getDashboardUrlForRole,
    updateTopbarUI
  };
})();
