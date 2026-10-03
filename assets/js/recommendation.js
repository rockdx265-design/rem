/**
 * Sistem Informasi Klinik - recommendation.js
 * Dynamic Complaint Recommendation Engine (Rekomendasi Obat)
 * 
 * Analyzes patient complaint text in real-time, extracts keywords,
 * eliminates duplicate recommendations using Set, and provides instant
 * medication suggestions without page reload.
 * 
 * NOTE: Strictly labeled as "Rekomendasi Obat", NOT "Diagnosis".
 */

const RecommendationEngine = (() => {
  // Knowledge base for complaint keywords & associated medication recommendations
  const rules = [
    {
      keyword: 'demam',
      aliases: ['panas', 'demam', 'meriang', 'sumeng'],
      tag: 'Demam',
      recommendations: [
        'Paracetamol 500 mg',
        'Vitamin C 500 mg',
        'Minum air yang cukup'
      ],
      supportingInfo: 'Catat pola demam dan pastikan hidrasi cukup saat pemberian obat.'
    },
    {
      keyword: 'batuk',
      aliases: ['batuk', 'batuk-batuk', 'berdahak', 'batuk kering'],
      tag: 'Batuk',
      recommendations: [
        'Ambroxol sirup',
        'Dextromethorphan',
        'Minum air hangat secara rutin'
      ],
      supportingInfo: 'Pilih obat sesuai karakteristik batuk dan kondisi pasien.'
    },
    {
      keyword: 'sakit kepala',
      aliases: ['sakit kepala', 'kepala pusing', 'migrain', 'nyeri kepala', 'pening'],
      tag: 'Sakit Kepala',
      recommendations: [
        'Paracetamol 500 mg',
        'Ibuprofen 200 mg',
        'Cukupi kebutuhan cairan'
      ],
      supportingInfo: 'Pertimbangkan riwayat hipertensi atau penggunaan obat lain.'
    },
    {
      keyword: 'mual',
      aliases: ['mual', 'enek', 'eneg', 'ingin muntah'],
      tag: 'Mual',
      recommendations: [
        'Domperidone 10 mg',
        'Oralit',
        'Hindari makanan yang terlalu pedas'
      ],
      supportingInfo: 'Catat apakah mual berkaitan dengan waktu makan atau perjalanan.'
    },
    {
      keyword: 'muntah',
      aliases: ['muntah', 'mual muntah', 'gumoh'],
      tag: 'Muntah',
      recommendations: [
        'Oralit',
        'Domperidone 10 mg',
        'Konsumsi makanan ringan berkalori'
      ],
      supportingInfo: 'Perhatikan tanda dehidrasi sebelum dan sesudah pemberian obat.'
    },
    {
      keyword: 'diare',
      aliases: ['diare', 'mencret', 'buang air besar cair', 'bab cair', 'murus'],
      tag: 'Diare',
      recommendations: [
        'Oralit',
        'Loperamide 2 mg',
        'Hidrasi oral adekuat'
      ],
      supportingInfo: 'Periksa durasi diare dan kemungkinan penyebab infeksi atau makanan.'
    },
    {
      keyword: 'nyeri perut',
      aliases: ['nyeri perut', 'sakit perut', 'kram perut', 'melilit', 'mulas', 'ulu hati'],
      tag: 'Nyeri Perut',
      recommendations: [
        'Antasida',
        'Paracetamol 500 mg',
        'Hindari makanan pedas dan berlemak'
      ],
      supportingInfo: 'Evaluasi lokasi nyeri dan riwayat konsumsi makanan sebelum pemberian obat.'
    },
    {
      keyword: 'sesak',
      aliases: ['sesak', 'sesak napas', 'megap-megap', 'sulit bernapas', 'asma'],
      tag: 'Sesak Napas',
      recommendations: [
        'Bronkodilator (jika sesuai indikasi)',
        'Dekongestan nasal',
        'Istirahat dan atur posisi nyaman'
      ],
      supportingInfo: 'Periksa gejala berat dan tingkat kesulitan bernapas sebelum obat.'
    },
    {
      keyword: 'nyeri tenggorokan',
      aliases: ['nyeri tenggorokan', 'sakit tenggorokan', 'radang tenggorokan', 'sakit menelan'],
      tag: 'Nyeri Tenggorokan',
      recommendations: [
        'Paracetamol 500 mg',
        'Lozenges/obat kumur antiseptik',
        'Minum air hangat'
      ],
      supportingInfo: 'Sesuaikan pilihan obat dengan riwayat alergi dan kondisi pasien.'
    },
    {
      keyword: 'lemas',
      aliases: ['lemas', 'lesu', 'lelah', 'tidak bertenaga', 'letoy'],
      tag: 'Lemas',
      recommendations: [
        'Vitamin multivitamin',
        'Elektrolit oral',
        'Istirahat cukup'
      ],
      supportingInfo: 'Periksa tanda anemia atau dehidrasi bila keluhan menetap.'
    }
  ];

  /**
   * Analyze input text and return detected complaints, combined unique recommendations,
   * and supporting insights.
   */
  function analyze(text) {
    if (!text || text.trim().length === 0) {
      return {
        isEmpty: true,
        detectedTags: [],
        recommendations: [],
        supportingNotes: []
      };
    }

    const lower = text.toLowerCase();
    const detectedTags = new Set();
    const recommendationsSet = new Set();
    const supportingNotesSet = new Set();

    rules.forEach(rule => {
      const isMatched = rule.aliases.some(alias => {
        // Match word boundaries or substring
        const regex = new RegExp('(\\b|\\s|^)' + alias + '(\\b|\\s|$)', 'i');
        return regex.test(lower) || lower.includes(alias);
      });

      if (isMatched) {
        detectedTags.add(rule.tag);
        rule.recommendations.forEach(rec => recommendationsSet.add(rec));
        if (rule.supportingInfo) {
          supportingNotesSet.add(rule.supportingInfo);
        }
      }
    });

    // If keywords detected but general supportive care isn't in set, add it
    if (recommendationsSet.size > 0 && !recommendationsSet.has('Istirahat cukup')) {
      recommendationsSet.add('Istirahat cukup');
    }

    return {
      isEmpty: false,
      detectedTags: Array.from(detectedTags),
      recommendations: Array.from(recommendationsSet),
      supportingNotes: Array.from(supportingNotesSet)
    };
  }

  /**
   * Bind dynamic analysis to a textarea and a target panel with debounce
   */
  function bindToElement(textareaElement, targetPanelElement, options = {}) {
    if (!textareaElement || !targetPanelElement) return;

    let debounceTimer = null;
    const debounceMs = options.debounceMs || 400;

    // Render initial empty state
    render(targetPanelElement, analyze(''));

    textareaElement.addEventListener('input', () => {
      const text = textareaElement.value;

      // Show subtle loading state
      if (text.trim().length > 0) {
        showLoading(targetPanelElement);
      }

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const result = analyze(text);
        render(targetPanelElement, result);
      }, debounceMs);
    });
  }

  function showLoading(container) {
    container.innerHTML = `
      <div class="d-flex align-items-center gap-2 py-3 text-success">
        <div class="spinner-border spinner-border-sm text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span class="fw-medium small">Menganalisis keluhan pasien...</span>
      </div>
    `;
  }

  function render(container, data) {
    if (data.isEmpty) {
      container.innerHTML = `
        <div class="recommendation-empty-prompt">
          <i class="bi bi-lightbulb text-warning fs-5"></i>
          <span>Mulai ketik keluhan untuk melihat rekomendasi.</span>
        </div>
      `;
      return;
    }

    if (data.detectedTags.length === 0) {
      container.innerHTML = `
        <div class="recommendation-header">
          <span class="recommendation-title">
            <i class="bi bi-capsule"></i> Rekomendasi Obat
          </span>
          <span class="badge bg-light text-secondary border">Keluhan Umum</span>
        </div>
        <ul class="recommendation-list">
          <li>Paracetamol 500 mg untuk keluhan demam ringan</li>
          <li>Vitamin C 500 mg untuk meningkatkan daya tahan tubuh</li>
          <li>Minum air yang cukup untuk menjaga hidrasi</li>
        </ul>
        <div class="recommendation-disclaimer">
          <i class="bi bi-info-circle-fill text-success me-1"></i>
          <strong>Informasi:</strong> Rekomendasi ini hanya sebagai bantuan pengobatan dan bukan diagnosis medis.
        </div>
      `;
      return;
    }

    const tagsHtml = data.detectedTags
      .map(tag => `<span class="detected-tag"><i class="bi bi-tag-fill"></i> ${tag}</span>`)
      .join('');

    const recsHtml = data.recommendations
      .map(rec => `<li>${rec}</li>`)
      .join('');

    const supportingHtml = data.supportingNotes.length > 0
      ? `<div class="p-2 mb-2 rounded bg-white border border-light-subtle small text-secondary">
          <strong class="text-dark"><i class="bi bi-journal-medical text-primary"></i> Informasi Pendukung:</strong>
          <ul class="mb-0 ps-3 mt-1">
            ${data.supportingNotes.map(n => `<li>${n}</li>`).join('')}
          </ul>
        </div>`
      : '';

    container.innerHTML = `
      <div class="recommendation-header">
        <span class="recommendation-title">
          <i class="bi bi-capsule"></i> REKOMENDASI OBAT
        </span>
        <span class="badge bg-success text-white">Terdeteksi: ${data.detectedTags.length} Keluhan</span>
      </div>

      <div class="mb-2">
        <span class="text-muted small fw-semibold d-block mb-1">Keluhan Terdeteksi:</span>
        <div class="detected-tags-wrap">
          ${tagsHtml}
        </div>
      </div>

      <div class="mb-2">
        <span class="text-muted small fw-semibold d-block mb-1">Rekomendasi Obat:</span>
        <ul class="recommendation-list">
          ${recsHtml}
        </ul>
      </div>

      ${supportingHtml}

      <div class="recommendation-disclaimer">
        <i class="bi bi-shield-exclamation text-success me-1"></i>
        <strong>Perhatian:</strong> Rekomendasi ini hanya sebagai bantuan pengobatan dan bukan diagnosis medis.
      </div>
    `;
  }

  return {
    analyze,
    bindToElement,
    render
  };
})();
