/**
 * Tab Component JavaScript
 * 
 * Features:
 * - 탭 클릭 시 active 상태 전환
 * - 커스텀 이벤트 발행 (tab:change)
 * - 키보드 네비게이션 (Arrow Left/Right)
 */

(function() {
  'use strict';

  /**
   * 탭 그룹 초기화
   * @param {HTMLElement} tabsContainer - .tabs 컨테이너
   */
  function initTabs(tabsContainer) {
    const tabs = Array.from(tabsContainer.querySelectorAll('.tab'));
    
    if (tabs.length === 0) return;

    tabs.forEach((tab, index) => {
      // 클릭 이벤트
      tab.addEventListener('click', function(e) {
        if (tab.disabled) return;
        
        // 기존 active 제거
        tabs.forEach(t => t.classList.remove('tab--active'));
        
        // 현재 탭 active
        tab.classList.add('tab--active');
        
        // 커스텀 이벤트 발행
        const tabId = tab.dataset.tab || `tab-${index}`;
        const event = new CustomEvent('tab:change', {
          detail: {
            tab: tab,
            tabId: tabId,
            index: index
          },
          bubbles: true
        });
        tabsContainer.dispatchEvent(event);
      });

      // 키보드 네비게이션
      tab.addEventListener('keydown', function(e) {
        let targetIndex = -1;

        if (e.key === 'ArrowLeft') {
          targetIndex = index - 1;
        } else if (e.key === 'ArrowRight') {
          targetIndex = index + 1;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex >= 0 && targetIndex < tabs.length) {
          e.preventDefault();
          tabs[targetIndex].focus();
          tabs[targetIndex].click();
        }
      });
    });

    // ARIA 속성 설정
    tabs.forEach((tab, index) => {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', tab.classList.contains('tab--active') ? '0' : '-1');
      tab.setAttribute('aria-selected', tab.classList.contains('tab--active') ? 'true' : 'false');
      
      const tabId = tab.dataset.tab || `tab-${index}`;
      tab.setAttribute('id', `tab-${tabId}`);
    });

    tabsContainer.setAttribute('role', 'tablist');
  }

  /**
   * 모든 탭 그룹 자동 초기화
   */
  function initAllTabs() {
    const allTabsContainers = document.querySelectorAll('.tabs');
    allTabsContainers.forEach(initTabs);
  }

  /**
   * DOM 로드 후 초기화
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTabs);
  } else {
    initAllTabs();
  }

  /**
   * 전역 API: 외부에서 탭 그룹 초기화 가능
   */
  window.KLDSTabs = {
    init: initTabs,
    initAll: initAllTabs
  };

})();
