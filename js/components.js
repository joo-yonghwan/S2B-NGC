/**
 * components.js
 * 헤더/푸터를 동적으로 주입합니다.
 * 각 HTML 페이지에서 <script src="js/components.js"></script> 로 로드.
 */

const NAV_ITEMS = [
  { label: '메인',              href: 'index.html' },
  { label: 'S2B Next',         href: 's2b-next.html' },
  { label: '미리보기',          href: 'preview.html' },
  { label: '프리오픈 가이드',   href: 'preopen.html' },
  { label: '사용자테스트',      href: 'uat.html' },
  { label: '오픈 안정화',       href: 'stabilization.html' },
  { label: '커뮤니케이션',      href: 'communication.html' },
];

// 현재 파일명 기준으로 active 항목 결정
function getCurrentPage() {
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
}

function renderHeader() {
  const current = getCurrentPage();
  const navLinks = NAV_ITEMS.map(item => {
    const isActive = item.href === current ? ' active' : '';
    return `<a href="${item.href}" class="${isActive}">${item.label}</a>`;
  }).join('');

  return `
    <header id="site-header">
      <div class="container">
        <a href="index.html" class="header-logo">
          <span class="logo-title">S2B NGC</span>
          <span class="logo-sub">Next Guide Center</span>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="메뉴 열기">
          <span></span><span></span><span></span>
        </button>
        <nav class="gnb" id="gnb">${navLinks}</nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer id="site-footer">
      <div class="container">
        <span>S2B Next Guide Center &nbsp;|&nbsp; 변화관리 플랫폼</span>
        <span class="footer-copy">&copy; ${year} S2B NGC. All rights reserved.</span>
      </div>
    </footer>
  `;
}

// DOM 삽입
document.addEventListener('DOMContentLoaded', () => {
  // 헤더
  const headerEl = document.getElementById('header-mount');
  if (headerEl) headerEl.outerHTML = renderHeader();

  // 푸터
  const footerEl = document.getElementById('footer-mount');
  if (footerEl) footerEl.outerHTML = renderFooter();

  // 햄버거 메뉴 토글
  const toggle = document.getElementById('menuToggle');
  const gnb    = document.getElementById('gnb');
  if (toggle && gnb) {
    toggle.addEventListener('click', () => {
      const isOpen = gnb.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    });
  }
});
