/**
 * Mode Switch Component JS
 * Figma: mode-switch (1:17486)
 *
 * 기능:
 * - 클릭 시 해당 버튼 활성화 (is-active 토글)
 * - aria-selected 자동 갱신
 * - 커스텀 이벤트 'mode-change' 발행
 *
 * 사용법:
 * 1. 자동 초기화: mode-switch.js 로드 시 모든 .mode-switch 자동 바인딩
 * 2. 수동 초기화: ModeSwitch.init(containerElement)
 * 3. 이벤트 리스닝:
 *    element.addEventListener('mode-change', (e) => {
 *      console.log(e.detail.mode);     // data-mode 값
 *      console.log(e.detail.index);    // 버튼 인덱스
 *      console.log(e.detail.button);   // 클릭된 버튼 엘리먼트
 *    });
 */

const ModeSwitch = {

    /**
     * 단일 mode-switch 컨테이너 초기화
     */
    init(container) {
        if (!container || container._modeSwitchInit) return;
        container._modeSwitchInit = true;

        const buttons = container.querySelectorAll('.mode-switch__btn');

        buttons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // 이미 활성화된 버튼이면 무시
                if (btn.classList.contains('is-active')) return;

                // 모든 버튼 비활성화
                buttons.forEach(b => {
                    b.classList.remove('is-active');
                    b.setAttribute('aria-selected', 'false');
                });

                // 클릭된 버튼 활성화
                btn.classList.add('is-active');
                btn.setAttribute('aria-selected', 'true');

                // 커스텀 이벤트 발행
                const event = new CustomEvent('mode-change', {
                    bubbles: true,
                    detail: {
                        mode: btn.dataset.mode || null,
                        index: index,
                        button: btn
                    }
                });
                container.dispatchEvent(event);
            });

            // 키보드 접근성: 좌우 화살표로 이동
            btn.addEventListener('keydown', (e) => {
                let target = null;

                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    target = buttons[(index + 1) % buttons.length];
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    target = buttons[(index - 1 + buttons.length) % buttons.length];
                }

                if (target) {
                    target.focus();
                    target.click();
                }
            });
        });
    },

    /**
     * 페이지 내 모든 mode-switch 자동 초기화
     */
    initAll() {
        document.querySelectorAll('.mode-switch').forEach(el => {
            ModeSwitch.init(el);
        });
    },

    /**
     * 프로그래밍으로 특정 모드 활성화
     * @param {HTMLElement} container - .mode-switch 엘리먼트
     * @param {string} mode - data-mode 값
     */
    setMode(container, mode) {
        const btn = container.querySelector(`.mode-switch__btn[data-mode="${mode}"]`);
        if (btn) btn.click();
    }
};

// DOM 로드 시 자동 초기화
document.addEventListener('DOMContentLoaded', () => {
    ModeSwitch.initAll();
});

export { ModeSwitch };
