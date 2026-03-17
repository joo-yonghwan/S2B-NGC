/**
 * app.js
 * JSON 데이터 로딩 유틸리티 및 공통 UI 기능
 */

/**
 * JSON 파일을 로드하여 반환합니다.
 * @param {string} path - 예) 'data/main.json'
 * @returns {Promise<Object>}
 */
async function loadData(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[NGC] 데이터 로드 실패: ${path}`, err);
    return null;
  }
}

/**
 * 진행률 바를 렌더링합니다.
 * @param {string} containerId - 대상 요소 id
 * @param {number} value        - 현재값 (0~100)
 * @param {string} label        - 라벨 텍스트
 * @param {string} colorClass   - '' | 'accent' | 'success'
 */
function renderProgressBar(containerId, value, label, colorClass = '') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="progress-wrap">
      <div class="progress-label">
        <span>${label}</span>
        <span>${value}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill ${colorClass}" style="width: ${value}%"></div>
      </div>
    </div>
  `;
}

/**
 * 날짜 문자열을 한국식으로 포맷합니다. (예: 2026-03-17 → 2026.03.17)
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  return dateStr.replace(/-/g, '.');
}

/**
 * 통계 카드를 렌더링합니다.
 * @param {string} containerId
 * @param {Array<{label, value, unit, colorClass}>} stats
 */
function renderStatCards(containerId, stats) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-label">${s.label}</div>
      <div class="stat-value" style="${s.color ? `color:${s.color}` : ''}">${s.value}</div>
      <div class="stat-unit">${s.unit || ''}</div>
    </div>
  `).join('');
}

/**
 * FAQ 아코디언 초기화
 * @param {string} containerId
 * @param {Array<{category, question, answer}>} items
 */
function renderFAQ(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `<div class="faq-list">` + items.map((item, i) => `
    <div class="faq-item" data-faq="${i}">
      <button class="faq-question">
        <span>${item.question}</span>
        <span class="faq-arrow">▼</span>
      </button>
      <div class="faq-answer">${item.answer}</div>
    </div>
  `).join('') + `</div>`;

  el.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
}

/**
 * 공지 목록을 렌더링합니다.
 * @param {string} containerId
 * @param {Array<{type, title, date}>} items
 * @param {number} limit
 */
function renderNoticeList(containerId, items, limit = 5) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = items.slice(0, limit);
  el.innerHTML = `<div class="notice-list">` + list.map(n => `
    <div class="notice-item">
      <span class="badge badge-${n.type === 'urgent' ? 'urgent' : 'notice'}">
        ${n.type === 'urgent' ? '긴급' : '공지'}
      </span>
      <span class="notice-title">${n.title}</span>
      <span class="notice-date">${formatDate(n.date)}</span>
    </div>
  `).join('') + `</div>`;
}
