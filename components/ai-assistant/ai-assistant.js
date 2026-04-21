/**
 * AI Assistant Component JavaScript — Figma node 3:5433
 *
 * 기능:
 *   1. 액션 버튼 클릭 → 커스텀 이벤트 발생
 *   2. maximize/close 버튼 이벤트
 *   3. prompt 컴포넌트 통합
 */

class AIAssistant {
  constructor(el) {
    this.el = el;
    this.btnMaximize = el.querySelector('.ai-assistant__btn-maximize');
    this.btnClose = el.querySelector('.ai-assistant__btn-close');
    this.actionButtons = el.querySelectorAll('.ai-assistant__btn[data-action]');

    // Prompt 컴포넌트 수동 초기화 (중복 방지)
    this._initPrompt();
    
    this._bind();
  }

  _initPrompt() {
    var promptEl = this.el.querySelector('.prompt');
    if (promptEl && !promptEl.dataset.promptInitialized) {
      if (typeof Prompt !== 'undefined') {
        new Prompt(promptEl);
        promptEl.dataset.promptInitialized = 'true';
      }
    }
  }

  _bind() {
    var self = this;

    // Maximize 버튼 — 확장 상태(is-maximized)에서는 동작 없음
    if (this.btnMaximize) {
      this.btnMaximize.addEventListener('click', function() {
        if (self.el.classList.contains('is-maximized')) return;
        self.el.dispatchEvent(new CustomEvent('ai-assistant:maximize', {
          bubbles: true
        }));
      });
    }

    // Close 버튼 — 확장 상태(is-maximized)면 collapse, 아니면 close
    if (this.btnClose) {
      this.btnClose.addEventListener('click', function() {
        if (self.el.classList.contains('is-maximized')) {
          self.el.dispatchEvent(new CustomEvent('ai-assistant:collapse', {
            bubbles: true
          }));
        } else {
          self.el.dispatchEvent(new CustomEvent('ai-assistant:close', {
            bubbles: true
          }));
        }
      });
    }

    // 액션 버튼들
    this.actionButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var action = btn.dataset.action;
        self.el.dispatchEvent(new CustomEvent('ai-assistant:action', {
          detail: { action: action },
          bubbles: true
        }));
      });
    });

    // 설정 버튼 클릭 → 메뉴 토글
    var btnSettings = this.el.querySelector('.ai-assistant__btn-settings');
    var settingsMenu = this.el.querySelector('.ai-assistant__settings-menu');
    if (btnSettings && settingsMenu) {
      btnSettings.addEventListener('click', function(e) {
        e.stopPropagation();
        settingsMenu.classList.toggle('is-open');
      });
      document.addEventListener('click', function() {
        settingsMenu.classList.remove('is-open');
      });
      settingsMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        settingsMenu.classList.remove('is-open');
      });
    }

    // Template tmpl-icon 클릭 → 하위 아이템 접기/펼치기 (버튼 아이콘만 반응)
    this.el.querySelectorAll('.ai-assistant__tmpl-icon').forEach(function(icon) {
      icon.addEventListener('click', function() {
        icon.closest('.ai-assistant__tmpl-group').classList.toggle('is-collapsed');
      });
    });

    // My Data caret 클릭 → 2depth 접기/펼치기
    var myDataPanelForCaret = this.el.querySelector('.ai-assistant__right-content--my-data');
    if (myDataPanelForCaret) {
      myDataPanelForCaret.querySelectorAll('.ai-assistant__data-caret').forEach(function(caret) {
        caret.addEventListener('click', function() {
          var group = caret.closest('.ai-assistant__data-group');
          var isCollapsed = group.classList.toggle('is-collapsed');
          group.querySelectorAll('.ai-assistant__data-item--2depth').forEach(function(item) {
            item.style.display = isCollapsed ? 'none' : '';
          });
          caret.style.transform = isCollapsed ? 'rotate(-90deg)' : '';
        });
      });
    }

    // My Data 텍스트 클릭 → 체크박스 토글
    var myDataPanel = this.el.querySelector('.ai-assistant__right-content--my-data');
    if (myDataPanel) {
      myDataPanel.querySelectorAll('.ai-assistant__data-label').forEach(function(label) {
        label.addEventListener('click', function() {
          var item = label.closest('.ai-assistant__data-item');
          if (!item) return;
          var cb = item.querySelector('.klds-checkbox__input');
          if (cb) {
            cb.checked = !cb.checked;
            cb.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });
      });
    }

    // My Data 체크박스 연동 (1depth ↔ 2depth)
    if (myDataPanel) {
      myDataPanel.querySelectorAll('.ai-assistant__data-group').forEach(function(group) {
        var parentCb = group.querySelector('.ai-assistant__data-item--1depth .klds-checkbox__input');
        var childCbs = Array.from(group.querySelectorAll('.ai-assistant__data-item--2depth .klds-checkbox__input'));

        // 1depth 체크 → 하위 전체 동기화
        if (parentCb) {
          parentCb.addEventListener('change', function() {
            childCbs.forEach(function(cb) { cb.checked = parentCb.checked; });
          });
        }

        // 2depth 체크 → 상위 동기화
        childCbs.forEach(function(cb) {
          cb.addEventListener('change', function() {
            if (parentCb) {
              parentCb.checked = childCbs.every(function(c) { return c.checked; });
            }
          });
        });
      });
    }

    // Right-menu 탭 전환 (Template / My Data)
    var rightTabs = this.el.querySelectorAll('.ai-assistant__right-menu .tab--pill');
    rightTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var panel = tab.getAttribute('data-tab');
        rightTabs.forEach(function(t) { t.classList.remove('tab--active'); });
        tab.classList.add('tab--active');
        self.el.querySelectorAll('.ai-assistant__right-menu [data-panel]').forEach(function(p) {
          p.style.display = p.getAttribute('data-panel') === panel ? '' : 'none';
        });
      });
    });

    // prompt 이벤트 리스닝
    this.el.addEventListener('prompt:send', function(e) {
      self.el.dispatchEvent(new CustomEvent('ai-assistant:prompt', {
        detail: e.detail,
        bubbles: true
      }));
    });
  }
}

// Auto-init (중복 초기화 방지)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.ai-assistant').forEach(function(el) {
    if (el.dataset.aiAssistantInitialized) return;
    new AIAssistant(el);
    el.dataset.aiAssistantInitialized = 'true';
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIAssistant;
}

export { AIAssistant };
