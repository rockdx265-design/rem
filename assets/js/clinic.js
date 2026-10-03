/**
 * Sistem Informasi Klinik - clinic.js
 * Core application utilities, responsive controls, modals, toasts, audio calling
 */

const Clinic = (() => {
  // Toast container instance
  let toastContainer = null;

  function ensureToastContainer() {
    if (!toastContainer) {
      toastContainer = document.getElementById('clinicToastContainer');
      if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'clinicToastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        document.body.appendChild(toastContainer);
      }
    }
    return toastContainer;
  }

  /**
   * Display standard Bootstrap Toast
   * @param {'success'|'error'|'warning'|'info'} type 
   * @param {string} message 
   */
  function showToast(type, message) {
    ensureToastContainer();

    const config = {
      success: {
        bg: 'bg-success text-white',
        icon: 'bi-check-circle-fill',
        title: 'Sukses'
      },
      error: {
        bg: 'bg-danger text-white',
        icon: 'bi-x-circle-fill',
        title: 'Terjadi Kesalahan'
      },
      warning: {
        bg: 'bg-warning text-dark',
        icon: 'bi-exclamation-triangle-fill',
        title: 'Peringatan'
      },
      info: {
        bg: 'bg-primary text-white',
        icon: 'bi-info-circle-fill',
        title: 'Informasi'
      }
    };

    const currentConfig = config[type] || config.info;
    const toastId = 'toast_' + Date.now();

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center ${currentConfig.bg} border-0 shadow" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi ${currentConfig.icon} fs-5"></i>
            <div>
              <strong>${currentConfig.title}:</strong> ${message}
            </div>
          </div>
          <button type="button" class="btn-close ${type === 'warning' ? '' : 'btn-close-white'} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    if (window.bootstrap && window.bootstrap.Toast) {
      const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
      bsToast.show();
      toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    } else {
      setTimeout(() => toastEl.remove(), 4000);
    }
  }

  /**
   * Universal Delete Confirmation Modal
   */
  let deleteModalInstance = null;
  let onConfirmDeleteCallback = null;

  function initDeleteModal() {
    let modalEl = document.getElementById('clinicDeleteModal');
    if (!modalEl) {
      const html = `
        <div class="modal fade" id="clinicDeleteModal" tabindex="-1" aria-labelledby="clinicDeleteModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header border-0 pb-0">
                <h5 class="modal-title text-danger d-flex align-items-center gap-2" id="clinicDeleteModalLabel">
                  <i class="bi bi-exclamation-triangle-fill"></i> Hapus Data?
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body py-3">
                <p class="mb-0 text-secondary" id="clinicDeleteModalMsg">Apakah Anda yakin ingin menghapus data ini?</p>
              </div>
              <div class="modal-footer border-0 pt-0">
                <button type="button" class="btn btn-light border" data-bs-dismiss="modal">Batal</button>
                <button type="button" class="btn btn-danger" id="clinicConfirmDeleteBtn">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', html);
      modalEl = document.getElementById('clinicDeleteModal');

      document.getElementById('clinicConfirmDeleteBtn').addEventListener('click', () => {
        if (typeof onConfirmDeleteCallback === 'function') {
          onConfirmDeleteCallback();
        }
        if (deleteModalInstance) {
          deleteModalInstance.hide();
        }
      });
    }

    if (window.bootstrap && window.bootstrap.Modal) {
      deleteModalInstance = new bootstrap.Modal(modalEl);
    }
  }

  function confirmDelete(message, onConfirm) {
    initDeleteModal();
    const msgEl = document.getElementById('clinicDeleteModalMsg');
    if (msgEl && message) msgEl.textContent = message;
    onConfirmDeleteCallback = onConfirm;
    if (deleteModalInstance) {
      deleteModalInstance.show();
    } else if (confirm(message || 'Apakah Anda yakin ingin menghapus data ini?')) {
      onConfirm();
    }
  }

  /**
   * Sound & Speech synthesis for Calling Patient in Queue
   */
  function callQueueNumber(nomorAntrean, namaPasien) {
    showToast('info', `Memanggil antrean: ${nomorAntrean} - ${namaPasien}`);

    // If browser supports SpeechSynthesis
    if ('speechSynthesis' in window) {
      try {
        const text = `Nomor antrean, ${nomorAntrean}, ${namaPasien}, silakan menuju ruang pemeriksaan.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('Speech synthesis error:', e);
      }
    }
  }

  /**
   * Setup password visibility toggles
   */
  function initPasswordToggles() {
    document.querySelectorAll('.js-password-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('i');
        if (!input) return;

        if (input.type === 'password') {
          input.type = 'text';
          if (icon) {
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
          }
        } else {
          input.type = 'password';
          if (icon) {
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
          }
        }
      });
    });
  }

  /**
   * Setup responsive sidebar & offcanvas drawer
   */
  function initSidebar() {
    const toggleBtn = document.querySelector('.js-sidebar-toggle');
    const sidebar = document.querySelector('.app-sidebar');

    if (!toggleBtn || !sidebar) return;

    let backdrop = document.querySelector('.sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      backdrop.classList.toggle('show');
    });

    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('show');
      backdrop.classList.remove('show');
    });
  }

  /**
   * Format date into Indonesian locale
   */
  function formatIndoDate(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }

  /**
   * Render badge HTML for queue/visit status
   */
  function getStatusBadge(status) {
    const s = (status || '').toLowerCase();
    if (s === 'selesai') {
      return `<span class="badge-status badge-status-selesai"><i class="bi bi-check2"></i> Selesai</span>`;
    } else if (s === 'menunggu') {
      return `<span class="badge-status badge-status-menunggu"><i class="bi bi-clock"></i> Menunggu</span>`;
    } else if (s === 'diperiksa') {
      return `<span class="badge-status badge-status-diperiksa"><i class="bi bi-hourglass-split"></i> Diperiksa</span>`;
    } else {
      return `<span class="badge-status badge-status-batal"><i class="bi bi-x"></i> ${status}</span>`;
    }
  }

  // Initialize common UI triggers on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggles();
    initSidebar();
    Auth.updateTopbarUI();
  });

  return {
    showToast,
    confirmDelete,
    callQueueNumber,
    initPasswordToggles,
    initSidebar,
    formatIndoDate,
    getStatusBadge
  };
})();
