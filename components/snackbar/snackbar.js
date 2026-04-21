/**
 * Snackbar Component — Figma node 1378:23836
 *
 * 사용법:
 *   // 단순 메시지
 *   Snackbar.show('휴지통으로 이동했습니다.');
 *
 *   // 액션 버튼 포함
 *   Snackbar.show('휴지통으로 이동했습니다.', {
 *     action: { label: '실행 취소', onClick: () => undoDelete() },
 *     duration: 4000,
 *   });
 *
 *   // 닫기 버튼 숨김
 *   Snackbar.show('저장되었습니다.', { closable: false, duration: 2000 });
 */

var Snackbar = (function () {

    var ICON_PATH = '/assets/icons/ic-close-small.svg';
    var DURATION_DEFAULT = 3000;

    /* ── 컨테이너 획득 (없으면 생성) ── */
    function getContainer() {
        var el = document.querySelector('.klds-snackbar-container');
        if (!el) {
            el = document.createElement('div');
            el.className = 'klds-snackbar-container';
            document.body.appendChild(el);
        }
        return el;
    }

    /* ── 스낵바 닫기 (퇴장 애니메이션 후 제거) ── */
    function close(snackbarEl, timerId) {
        if (!snackbarEl || snackbarEl.dataset.closing === 'true') return;
        snackbarEl.dataset.closing = 'true';
        clearTimeout(timerId);
        snackbarEl.classList.remove('klds-snackbar--enter');
        snackbarEl.classList.add('klds-snackbar--leave');
        snackbarEl.addEventListener('animationend', function () {
            if (snackbarEl.parentNode) {
                snackbarEl.parentNode.removeChild(snackbarEl);
            }
        }, { once: true });
    }

    /* ── 스낵바 생성 ── */
    function show(message, options) {
        options = options || {};
        var duration  = options.duration  !== undefined ? options.duration  : DURATION_DEFAULT;
        var closable  = options.closable  !== undefined ? options.closable  : true;
        var action    = options.action    || null; /* { label, onClick } */

        /* 루트 */
        var el = document.createElement('div');
        el.className = 'klds-snackbar klds-snackbar--enter';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');

        /* 메시지 */
        var msgEl = document.createElement('span');
        msgEl.className = 'klds-snackbar__message';
        msgEl.textContent = message;
        el.appendChild(msgEl);

        /* 액션 버튼 (선택적) */
        if (action && action.label) {
            var actionsEl = document.createElement('div');
            actionsEl.className = 'klds-snackbar__actions';
            var actionBtn = document.createElement('button');
            actionBtn.className = 'klds-snackbar__action';
            actionBtn.textContent = action.label;
            actionsEl.appendChild(actionBtn);
            el.appendChild(actionsEl);
            actionBtn.addEventListener('click', function () {
                if (typeof action.onClick === 'function') action.onClick();
                close(el, timerId);
            });
        }

        /* 닫기 버튼 (선택적) */
        var timerId;
        if (closable) {
            var closeBtn = document.createElement('button');
            closeBtn.className = 'klds-snackbar__close';
            closeBtn.setAttribute('aria-label', '닫기');
            var iconEl = document.createElement('span');
            iconEl.className = 'klds-snackbar__close-icon';
            iconEl.style.webkitMaskImage = 'url(' + ICON_PATH + ')';
            iconEl.style.maskImage = 'url(' + ICON_PATH + ')';
            closeBtn.appendChild(iconEl);
            el.appendChild(closeBtn);
            closeBtn.addEventListener('click', function () {
                close(el, timerId);
            });
        }

        getContainer().appendChild(el);

        /* 자동 닫기 */
        if (duration > 0) {
            timerId = setTimeout(function () {
                close(el, timerId);
            }, duration);
        }

        return {
            close: function () { close(el, timerId); }
        };
    }

    return { show: show };

}());

export { Snackbar };
