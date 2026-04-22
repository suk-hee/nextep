/**
 * Common Layout Component JavaScript
 * Figma: common layout (node 83:4818)
 * 
 * 기능:
 * - LNB 모바일 토글 (햄버거 메뉴)
 * - 오버레이 클릭 시 LNB 닫기
 * - ESC 키로 LNB 닫기
 * - LNB 메뉴 선택 이벤트 발행
 * - Mode Switch 연동 (mode-switch.js와 협업)
 * - AI Assistant 닫기/열기 + FAB 토글
 */

const CommonLayout = (function () {
  'use strict';

  // ========================================
  // State
  // ========================================
  let isLnbOpen = false;
  let container = null;
  let lnb = null;
  let overlay = null;
  let hamburgerBtn = null;
  let aiAssistant = null;
  let fabBtn = null;
  let isClosedByUser = false;       // 사용자가 직접 닫은 경우
  let isAutoHidden = false;         // 브레이크포인트로 자동 숨김된 경우
  const BREAKPOINT = 1440;

  // ========================================
  // Initialize
  // ========================================
  function init(layoutContainer) {
    container = layoutContainer || document.querySelector('.layout-container');
    if (!container) {
      console.warn('[CommonLayout] .layout-container를 찾을 수 없습니다.');
      return;
    }

    lnb = container.querySelector('.lnb');
    overlay = container.querySelector('.layout-overlay');
    hamburgerBtn = container.querySelector('.header [data-action="toggle-lnb"]');
    aiAssistant = container.querySelector('.ai-assistant');
    fabBtn = container.querySelector('.layout-fab');

    if (!lnb) {
      console.warn('[CommonLayout] .lnb를 찾을 수 없습니다.');
    }

    attachEvents();
    initLnbMenus();
    initResponsive();
    console.log('[CommonLayout] 초기화 완료');
  }

  // ========================================
  // Event Handlers
  // ========================================
  function attachEvents() {
    // 햄버거 메뉴 클릭
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', toggleLnb);
    }

    // 오버레이 클릭 → LNB 닫기
    if (overlay) {
      overlay.addEventListener('click', closeLnb);
    }

    // ESC 키 → LNB 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isLnbOpen) {
        closeLnb();
      }
    });

    // LNB 메뉴 클릭 이벤트
    if (lnb) {
      lnb.addEventListener('click', handleLnbMenuClick);
    }

    // AI Assistant 닫기 이벤트 (ai-assistant.js에서 발행) — 사용자가 직접 닫은 경우
    document.addEventListener('ai-assistant:close', function () {
      isClosedByUser = true;
      closeAiAssistant();
    });

    // AI Assistant 확장 이벤트
    document.addEventListener('ai-assistant:maximize', function () {
      if (!aiAssistant) return;
      if (window.innerWidth <= 1200) return;
      aiAssistant.classList.add('is-maximized');
      var workArea = container.querySelector('.layout-content__work-area');
      if (workArea) workArea.classList.add('is-hidden');
    });

    // AI Assistant 축소 이벤트 (확장 → 기본)
    document.addEventListener('ai-assistant:collapse', function () {
      if (!aiAssistant) return;
      aiAssistant.classList.remove('is-maximized');
      var workArea = container.querySelector('.layout-content__work-area');
      if (workArea) workArea.classList.remove('is-hidden');
    });

    // FAB 클릭 → AI Assistant 다시 열기
    if (fabBtn) {
      fabBtn.addEventListener('click', function () {
        openAiAssistant();
      });
    }
  }

  function toggleLnb() {
    if (isLnbOpen) {
      closeLnb();
    } else {
      openLnb();
    }
  }

  function openLnb() {
    if (!lnb) return;

    isLnbOpen = true;
    lnb.classList.add('is-open');

    if (overlay) {
      overlay.classList.add('is-visible');
    }

    // 커스텀 이벤트 발행
    container.dispatchEvent(new CustomEvent('lnb-toggle', {
      detail: { isOpen: true },
      bubbles: true
    }));
  }

  function closeLnb() {
    if (!lnb) return;

    isLnbOpen = false;
    lnb.classList.remove('is-open');

    if (overlay) {
      overlay.classList.remove('is-visible');
    }

    // 커스텀 이벤트 발행
    container.dispatchEvent(new CustomEvent('lnb-toggle', {
      detail: { isOpen: false },
      bubbles: true
    }));
  }

  // ========================================
  // LNB Menu Handling
  // ========================================
  function initLnbMenus() {
    if (!lnb) return;

    const menus = lnb.querySelectorAll('.lnb__menu');
    menus.forEach((menu) => {
      // data-menu 속성이 없으면 href에서 추출
      if (!menu.dataset.menu) {
        const href = menu.getAttribute('href');
        if (href && href.startsWith('#')) {
          menu.dataset.menu = href.substring(1);
        }
      }
    });
  }

  function handleLnbMenuClick(e) {
    const menuButton = e.target.closest('.lnb__menu');
    if (!menuButton) return;

    // 기본 동작 방지 (href="#" 처리)
    const href = menuButton.getAttribute('href');
    if (href === '#' || href === '') {
      e.preventDefault();
    }

    // 메뉴 활성화
    setActiveMenu(menuButton);

    // 메뉴 ID 추출
    const menuId = menuButton.dataset.menu || menuButton.getAttribute('href')?.substring(1) || '';

    // 커스텀 이벤트 발행
    container.dispatchEvent(new CustomEvent('menu-select', {
      detail: {
        menuId,
        button: menuButton
      },
      bubbles: true
    }));

    // 모바일에서 메뉴 선택 시 LNB 자동 닫기
    if (window.innerWidth <= 768 && isLnbOpen) {
      setTimeout(() => closeLnb(), 200);
    }
  }

  function setActiveMenu(menuButton) {
    if (!lnb) return;

    // 모든 메뉴 비활성화
    const allMenus = lnb.querySelectorAll('.lnb__menu');
    allMenus.forEach(menu => menu.classList.remove('lnb__menu--active'));

    // 선택된 메뉴 활성화
    if (typeof menuButton === 'string') {
      // menuId로 찾기
      const target = lnb.querySelector(`.lnb__menu[data-menu="${menuButton}"]`);
      if (target) {
        target.classList.add('lnb__menu--active');
      }
    } else {
      // Element로 직접 활성화
      menuButton.classList.add('lnb__menu--active');
    }
  }

  // ========================================
  // AI Assistant 닫기/열기
  // ========================================
  function closeAiAssistant() {
    if (!aiAssistant) return;

    // maximize 상태 해제 + work-area 복원
    aiAssistant.classList.remove('is-maximized');
    var workArea = container.querySelector('.layout-content__work-area');
    if (workArea) workArea.classList.remove('is-hidden');

    aiAssistant.classList.add('is-hidden');

    // FAB 슬라이드 업 표시
    if (fabBtn) {
      fabBtn.classList.add('is-visible');
    }

    console.log('[CommonLayout] AI Assistant 닫힘, FAB 표시');
  }

  function openAiAssistant() {
    if (!aiAssistant) return;

    isClosedByUser = false;
    isAutoHidden = false;

    // FAB 슬라이드 다운 숨김
    if (fabBtn) {
      fabBtn.classList.remove('is-visible');
    }

    aiAssistant.classList.remove('is-hidden');

    // 1440px 이하: work-area 숨김
    var workArea = container.querySelector('.layout-content__work-area');
    if (workArea && window.innerWidth <= 1440) {
      workArea.classList.add('is-hidden');
    }

    console.log('[CommonLayout] AI Assistant 열림, FAB 숨김');
  }

  // ========================================
  // Responsive: 브레이크포인트 자동 숨김/복원
  // ========================================
  function initResponsive() {
    if (!aiAssistant) return;

    // 초기 상태 처리
    handleBreakpoint();

    // resize 감지 (debounce 150ms)
    let resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleBreakpoint, 150);
    });
  }

  function handleBreakpoint() {
    if (!aiAssistant) return;

    const isNarrow = window.innerWidth <= BREAKPOINT;

    if (isNarrow) {
      // 좁아졌을 때 — AI가 열려 있으면 자동으로 숨김
      if (!aiAssistant.classList.contains('is-hidden')) {
        isAutoHidden = true;
        closeAiAssistant();
      }
    } else {
      // 넓어졌을 때 — 자동 숨김 상태였고 사용자가 직접 닫지 않은 경우에만 복원
      if (isAutoHidden && !isClosedByUser) {
        isAutoHidden = false;
        openAiAssistant();
      }
    }
  }

  // ========================================
  // Public API
  // ========================================
  return {
    init,
    openLnb,
    closeLnb,
    toggleLnb,
    setActiveMenu,
    closeAiAssistant,
    openAiAssistant
  };
})();

// ========================================
// Auto Initialize
// ========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    CommonLayout.init();
  });
} else {
  CommonLayout.init();
}

// ========================================
// Export for module systems
// ========================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CommonLayout;
}

export { CommonLayout };
