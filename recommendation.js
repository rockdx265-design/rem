/**
 * Sistem Informasi Klinik - recommendation.js
 * Dynamic Complaint Recommendation Engine (Rekomendasi Obat)
 * 
 * Frontend-only keyword detection with debounce (300-500ms) and Set deduplication.
 * Strictly labeled as "Rekomendasi Obat" with medical disclaimer.
 */

const RecommendationEngine = (() => {
  // Knowledge base for complaint keywords & associated medication recommendations
  const rules = [
    {
      keyword: 'demam',
      aliases: ['demam', 'panas', 'meriang', 'febris'],
      tag: 'Demam',
      recommendations: [
        'Paracetamol 500 mg',
        'Vitamin C 500 mg',
        'Minum air yang cukup'
      ]
    },
    {
      keyword: 'batuk',
      aliases: ['batuk', 'batuk-batuk', 'batuk berdahak', 'batuk kering'],
      tag: 'Batuk',
      recommendations: [
        'Ambroxol sirup',
        'Dextromethorphan',
        'Minum air hangat secara rutin'
      ]
    },
    {
      keyword: 'sakit kepala',
      aliases: ['sakit kepala', 'pusing', 'migrain', 'nyeri kepala', 'pening'],
      tag: 'Sakit kepala',
      recommendations: [
        'Paracetamol 500 mg',
        'Ibuprofen 200 mg',
        'Cukupi kebutuhan cairan'
      ]
    },
    {
      keyword: 'mual',
      aliases: ['mual', 'enek', 'eneg', 'ingin muntah'],
      tag: 'Mual',
      recommendations: [
        'Domperidone 10 mg',
        'Oralit',
        'Hindari makanan yang terlalu pedas'
      ]
    },
    {
      keyword: 'diare',
      aliases: ['diare', 'mencret', 'buang air besar cair', 'bab cair'],
      tag: 'Diare',
      recommendations: [
        'Oralit',
        'Loperamide 2 mg',
        'Hidrasi oral adekuat'
      ]
    },
    {
      keyword: 'nyeri perut',
      aliases: ['nyeri perut', 'sakit perut', 'kram perut', 'melilit', 'mulas', 'ulu hati'],
      tag: 'Nyeri perut',
      recommendations: [
        'Antasida',
        'Paracetamol 500 mg',
        'Hindari makanan pedas dan berlemak'
      ]
    }
  ];

  let debounceTimer = null;

  /**
   * Analyze input text and extract matching symptoms and unique recommendations
   * @param {string} text - User complaint input
   * @returns {Object} { detectedTags: string[], recommendations: string[] }
   */
  function analyze(text) {
    if (!text || text.trim() === '') {
      return {
        detectedTags: [],
        recommendations: []
      };
    }

    const normalizedText = text.toLowerCase();
    const detectedTagsSet = new Set();
    const recommendationsSet = new Set();

    // Check rules
    rules.forEach(rule => {
      const isMatched = rule.aliases.some(alias => {
        // Regex word boundary or direct substring
        const regex = new RegExp(`\\b${alias}\\b`, 'i');
        return regex.test(normalizedText) || normalizedText.includes(alias);
      });

      if (isMatched) {
        detectedTagsSet.add(rule.tag);
        rule.recommendations.forEach(rec => recommendationsSet.add(rec));
      }
    });

    return {
      detectedTags: Array.from(detectedTagsSet),
      recommendations: Array.from(recommendationsSet)
    };
  }

  /**
   * Render the recommendation UI into target container
   * @param {HTMLElement} container - DOM container element
   * @param {Object} result - Result from analyze()
   */
  function render(container, result) {
    if (!container) return;

    if (result.detectedTags.length === 0) {
      container.innerHTML = `
        <div class="recommendation-box empty-state-box">
          <div class="recommendation-header">
            <div class="d-flex align-items-center gap-2">
              <i class="bi bi-lightbulb text-success fs-5"></i>
              <h6 class="mb-0 fw-bold text-dark">Rekomendasi Obat</h6>
            </div>
            <span class="badge bg-light text-muted border">Asisten Klinis</span>
          </div>
          <div class="recommendation-body py-3 text-center text-muted">
            <i class="bi bi-chat-left-text d-block fs-3 text-muted mb-2 opacity-50"></i>
            <p class="mb-0 small fw-medium">Mulai ketik keluhan untuk melihat rekomendasi.</p>
            <div class="mt-2 text-xs text-secondary opacity-75">Contoh: "demam", "demam dan batuk", atau "sakit kepala dan mual"</div>
          </div>
          <div class="recommendation-footer">
            <i class="bi bi-info-circle me-1"></i>
            <span>Rekomendasi ini hanya sebagai bantuan obat dan bukan diagnosis medis.</span>
          </div>
        </div>
      `;
      return;
    }

    const tagsHtml = result.detectedTags
      .map(tag => `<span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i class="bi bi-check2 me-1"></i>${tag}</span>`)
      .join(' ');

    const recsHtml = result.recommendations
      .map(rec => `
        <li class="recommendation-item">
          <i class="bi bi-check-circle-fill text-success me-2"></i>
          <span>${rec}</span>
        </li>
      `)
      .join('');

    container.innerHTML = `
      <div class="recommendation-box active-state-box">
        <div class="recommendation-header">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-magic text-success fs-5"></i>
            <h6 class="mb-0 fw-bold text-dark">Rekomendasi Obat</h6>
          </div>
          <span class="badge bg-success text-white">Terdeteksi Otomatis</span>
        </div>
        
        <div class="recommendation-body py-3">
          <div class="mb-3">
            <div class="text-xs text-uppercase fw-bold text-muted mb-1">Keluhan Terdeteksi:</div>
            <div class="d-flex flex-wrap gap-1">${tagsHtml}</div>
          </div>

          <div>
            <div class="text-xs text-uppercase fw-bold text-muted mb-2">Rekomendasi Obat:</div>
            <ul class="recommendation-list mb-0">
              ${recsHtml}
            </ul>
          </div>
        </div>

        <div class="recommendation-footer">
          <i class="bi bi-shield-exclamation text-warning me-1"></i>
          <span>Rekomendasi ini hanya sebagai bantuan obat dan bukan diagnosis medis.</span>
        </div>
      </div>
    `;
  }

  /**
   * Bind textarea with debounce to recommendation container
   * @param {HTMLTextAreaElement} textarea - Input textarea
   * @param {HTMLElement} container - Output container
   * @param {number} delay - Debounce delay in ms (default 350ms)
   */
  function bind(textarea, container, delay = 350) {
    if (!textarea || !container) return;

    // Initial render
    render(container, analyze(textarea.value));

    textarea.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const result = analyze(textarea.value);
        render(container, result);
      }, delay);
    });
  }

  return {
    rules,
    analyze,
    render,
    bind
  };
})();

// Attach to window
window.RecommendationEngine = RecommendationEngine;
