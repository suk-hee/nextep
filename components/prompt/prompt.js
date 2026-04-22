/**
 * Prompt Component JavaScript — Figma node 3:5651
 *
 * status=default 레이아웃:
 *   prompt__wrap (HORIZONTAL)
 *     ├─ btn-global
 *     ├─ textarea
 *     └─ right-btns
 *
 * status=focus 레이아웃:
 *   prompt__wrap (VERTICAL)
 *     ├─ textarea (전체 너비)
 *     └─ prompt__btns (SPACE_BETWEEN)
 *          ├─ btn-global
 *          └─ right-btns
 *
 * 기능:
 *   1. focus → 레이아웃 전환 (btn-global, right-btns DOM 이동)
 *   2. Shift+Enter → 줄바꿈, textarea 자동 높이 조절
 *   3. 텍스트 입력 → btn-send 활성화 (#CBD0D7 → #121212)
 *   4. 마이크 클릭 → ic-microphone ↔ ic-microphone-fill 토글
 *   5. Enter → 전송
 */

class Prompt {
  constructor(el) {
    this.el = el;
    this.wrap = el.querySelector('.prompt__wrap');
    this.textarea = el.querySelector('.prompt__input');
    this.btnGlobal = el.querySelector('.prompt__btn-global');
    this.rightBtns = el.querySelector('.prompt__right-btns');
    this.btnsArea = el.querySelector('.prompt__btns');
    this.btnMic = el.querySelector('.prompt__btn--mic');
    this.btnSend = el.querySelector('.prompt__btn--send');

    this.basePath = el.dataset.basePath || '../assets/icons/';
    this.isFocus = false;

    this._bind();
    this.updateSendButton();
  }

  _bind() {
    var self = this;

    // textarea 이벤트
    this.textarea.addEventListener('input', function () {
      self.autoResize();
      self.updateSendButton();
    });

    this.textarea.addEventListener('focus', function () {
      if (!self.isFocus) self._toFocusLayout();
    });

    this.textarea.addEventListener('blur', function () {
      // 텍스트 없으면 default로 복귀
      if (!self.textarea.value.trim()) {
        self._toDefaultLayout();
      }
    });

    this.textarea.addEventListener('keydown', function (e) {
      // 한글(IME) 입력 중 Enter 시 이벤트 중복 방지
      if (e.isComposing || e.keyCode === 229) return;

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        self.handleSend();
      }
      // Shift+Enter: 줄바꿈 후 다음 프레임에서 높이 재조정
      if (e.key === 'Enter' && e.shiftKey) {
        setTimeout(function () { self.autoResize(); }, 0);
      }
    });

    // 마이크 토글
    if (this.btnMic) {
      this.btnMic.addEventListener('click', function () { self.toggleMic(); });
    }

    // 전송
    if (this.btnSend) {
      this.btnSend.addEventListener('click', function () { self.handleSend(); });
    }
  }

  /* ─── 레이아웃 전환 ─── */

  /**
   * default → focus 레이아웃
   * btn-global, right-btns를 btnsArea로 이동
   */
  _toFocusLayout() {
    this.isFocus = true;
    this.el.classList.add('is-focus');

    // DOM 이동: btn-global → btnsArea 왼쪽
    this.btnsArea.appendChild(this.btnGlobal);

    // DOM 이동: right-btns → btnsArea 오른쪽
    this.btnsArea.appendChild(this.rightBtns);
  }

  /**
   * focus → default 레이아웃
   * btn-global, right-btns를 wrap으로 복귀
   */
  _toDefaultLayout() {
    this.isFocus = false;
    this.el.classList.remove('is-focus');

    // DOM 복귀: btn-global → wrap 맨 앞 (textarea 앞)
    this.wrap.insertBefore(this.btnGlobal, this.textarea);

    // DOM 복귀: right-btns → wrap에서 btnsArea 앞
    this.wrap.insertBefore(this.rightBtns, this.btnsArea);

    // 높이 리셋
    this.textarea.style.height = '27px';
    this.textarea.style.overflowY = 'hidden';
  }

  /* ─── textarea 자동 높이 ─── */

  autoResize() {
    // 1줄 높이로 리셋 후 scrollHeight 측정
    this.textarea.style.height = 'auto';
    var scrollH = this.textarea.scrollHeight;
    var maxH = 216; // 27px × 8줄

    if (scrollH > maxH) {
      this.textarea.style.height = maxH + 'px';
      this.textarea.style.overflowY = 'auto';
    } else {
      this.textarea.style.height = scrollH + 'px';
      this.textarea.style.overflowY = 'hidden';
    }
  }

  /* ─── 전송 버튼 활성화 ─── */

  updateSendButton() {
    if (!this.btnSend) return;
    var has = this.textarea.value.trim().length > 0;

    this.btnSend.disabled = !has;
    if (has) {
      this.btnSend.classList.add('is-active');
    } else {
      this.btnSend.classList.remove('is-active');
    }
  }

  /* ─── 마이크 토글 ─── */

  toggleMic() {
    var active = this.btnMic.classList.toggle('is-active');

    // SVG 인라인 방식 (prompt_preview.html과 동일)
    var svgDefault = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10C4 9.44772 4.44772 9 5 9C5.55228 9 6 9.44772 6 10C6 11.5913 6.63259 13.117 7.75781 14.2422C8.88303 15.3674 10.4087 16 12 16L12.2979 15.9922C13.7807 15.9185 15.1874 15.297 16.2422 14.2422C17.3674 13.117 18 11.5913 18 10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10C20 12.1217 19.1575 14.1569 17.6572 15.6572C16.3947 16.9198 14.7529 17.7137 13 17.9346V20H16C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21C7 20.4477 7.44772 20 8 20H11V17.9346C9.24713 17.7137 7.60532 16.9198 6.34277 15.6572C4.84248 14.1569 4 12.1217 4 10ZM14 5C14 4.46957 13.7891 3.96101 13.4141 3.58594C13.0858 3.25765 12.6553 3.05515 12.1973 3.00977L12 3C11.4696 3 10.961 3.21087 10.5859 3.58594C10.2109 3.96101 10 4.46957 10 5V10C10 10.5304 10.2109 11.039 10.5859 11.4141C10.961 11.7891 11.4696 12 12 12C12.5304 12 13.039 11.7891 13.4141 11.4141C13.7891 11.039 14 10.5304 14 10V5ZM16 10C16 11.0609 15.5783 12.078 14.8281 12.8281C14.078 13.5783 13.0609 14 12 14C10.9391 14 9.92202 13.5783 9.17188 12.8281C8.42173 12.078 8 11.0609 8 10V5C8 3.93913 8.42173 2.92202 9.17188 2.17188C9.92202 1.42173 10.9391 1 12 1L12.1982 1.00488C13.1869 1.0539 14.1248 1.46859 14.8281 2.17188C15.5783 2.92202 16 3.93913 16 5V10Z" fill="#374151"/></svg>';
    var svgFill = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9C19.2652 9 19.5196 9.10536 19.7071 9.29289C19.8946 9.48043 20 9.73478 20 10C20.0002 11.9485 19.2893 13.8301 18.0006 15.2917C16.712 16.7532 14.9342 17.6942 13.001 17.938L13 20H16C16.2652 20 16.5196 20.1054 16.7071 20.2929C16.8946 20.4804 17 20.7348 17 21C17 21.2652 16.8946 21.5196 16.7071 21.7071C16.5196 21.8946 16.2652 22 16 22H8C7.73478 22 7.48043 21.8946 7.29289 21.7071C7.10536 21.5196 7 21.2652 7 21C7 20.7348 7.10536 20.4804 7.29289 20.2929C7.48043 20.1054 7.73478 20 8 20H11V17.938C9.06661 17.6944 7.28861 16.7535 5.99975 15.292C4.7109 13.8304 3.99982 11.9487 4 10C4 9.73478 4.10536 9.48043 4.29289 9.29289C4.48043 9.10536 4.73478 9 5 9C5.26522 9 5.51957 9.10536 5.70711 9.29289C5.89464 9.48043 6 9.73478 6 10C6 11.5913 6.63214 13.1174 7.75736 14.2426C8.88258 15.3679 10.4087 16 12 16C13.5913 16 15.1174 15.3679 16.2426 14.2426C17.3679 13.1174 18 11.5913 18 10C18 9.73478 18.1054 9.48043 18.2929 9.29289C18.4804 9.10536 18.7348 9 19 9ZM12 1C13.0609 1 14.0783 1.42143 14.8284 2.17157C15.5786 2.92172 16 3.93913 16 5V10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10V5C8 3.93913 8.42143 2.92172 9.17157 2.17157C9.92172 1.42143 10.9391 1 12 1Z" fill="url(#paint0_linear_62_5044)"/><defs><linearGradient id="paint0_linear_62_5044" x1="20" y1="19.5" x2="4" y2="3.5" gradientUnits="userSpaceOnUse"><stop stop-color="#005386"/><stop offset="1" stop-color="#00A9E5"/></linearGradient></defs></svg>';

    this.btnMic.innerHTML = active ? svgFill : svgDefault;
  }

  /* ─── 전송 ─── */

  handleSend() {
    var text = this.textarea.value.trim();
    if (!text) return;

    // 커스텀 이벤트
    this.el.dispatchEvent(new CustomEvent('prompt:send', {
      detail: { text: text },
      bubbles: true
    }));

    // 초기화
    this.textarea.value = '';
    this.textarea.style.height = '27px';
    this.textarea.style.overflowY = 'hidden';
    this.updateSendButton();
    this._toDefaultLayout();
    this.textarea.blur();
  }
}

// Auto-init (중복 초기화 방지)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.prompt').forEach(function (el) {
    if (el.dataset.promptInitialized) return;
    new Prompt(el);
    el.dataset.promptInitialized = 'true';
  });
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Prompt;
}

window.Prompt = Prompt;
export { Prompt };
