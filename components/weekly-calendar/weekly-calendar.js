/**
 * KLDS Weekly Calendar Component
 *
 * Figma 노드: 1386:24698 (weekly-celanedar)
 *
 * 의존 CSS:
 *   - styles/tokens.css
 *   - components/avatar/avatar.css
 *   - components/schedule-tag/schedule-tag.css
 *   - components/weekly-calendar/weekly-calendar.css
 *
 * ─── 사용법 ──────────────────────────────────────────────────
 *
 *   const cal = new WeeklyCalendar('#container', {
 *     startDate: new Date('2025-04-13'), // 주의 일요일
 *     startHour: 8,
 *     endHour:   20,
 *     events: [
 *       {
 *         title:       '디자인 시스템 컴포넌트 회의',
 *         dayIndex:    1,           // 0=일, 1=월, …, 6=토
 *         startHour:   9,
 *         startMinute: 0,
 *         endHour:     10,
 *         endMinute:   0,
 *         color:       'lightblue', // schedule-tag 색상 variant
 *         avatars: [
 *           { src: '/path/to/photo.jpg', name: '홍길동' }, // 이미지
 *           { name: '김철수' },                            // fallback
 *         ]
 *       }
 *     ]
 *   });
 *
 *   cal.update({ events: [...] }); // 이벤트/옵션 갱신 후 재렌더
 *   cal.destroy();                 // DOM 정리
 *
 * ─── 자동 초기화 ─────────────────────────────────────────────
 *
 *   <div data-weekly-calendar='{"startHour":8}'></div>
 *   (이벤트는 JS로 .update() 호출 권장)
 */

class WeeklyCalendar {

  /* ── 상수 ──────────────────────────────────────────────── */

  static DAY_NAMES  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  static ROW_HEIGHT = 80;   // px / hour  (Figma: 각 hour row h=80px)
  static TIME_GUTTER = 100; // px         (Figma: time column w=100px)

  /* ── 생성자 ────────────────────────────────────────────── */

  constructor(el, options = {}) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el;

    if (!this.el) {
      console.error('[WeeklyCalendar] element not found:', el);
      return;
    }

    /* 기본값: 이번 주 일요일 */
    const today  = new Date();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay());
    sunday.setHours(0, 0, 0, 0);

    this.options = {
      startDate:  options.startDate  ?? sunday,
      startHour:  options.startHour  ?? 8,
      endHour:    options.endHour    ?? 20,
      events:     options.events     ?? [],
    };

    this._render();
  }

  /* ── Public API ─────────────────────────────────────────── */

  /** 옵션을 병합하고 재렌더링합니다. */
  update(options) {
    Object.assign(this.options, options);
    this._render();
  }

  /** 컴포넌트 DOM을 초기화합니다. */
  destroy() {
    this.el.innerHTML = '';
  }

  /* ── 내부 헬퍼 ──────────────────────────────────────────── */

  /** startDate 기준 7일 배열 반환 (startDate = 해당 주 일요일) */
  _getWeekDates() {
    const base = new Date(this.options.startDate);
    base.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  }

  _isToday(date) {
    const t = new Date();
    return date.getFullYear() === t.getFullYear()
        && date.getMonth()    === t.getMonth()
        && date.getDate()     === t.getDate();
  }

  _pad2(n) {
    return String(n).padStart(2, '0');
  }

  /** XSS 방지용 간단한 이스케이프 */
  _esc(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── 렌더링 ─────────────────────────────────────────────── */

  _render() {
    const days = this._getWeekDates();
    this.el.innerHTML = `
      <div class="weekly-calendar">
        ${this._renderHeader(days)}
        <div class="weekly-calendar__body">
          ${this._renderAllday()}
          <div class="weekly-calendar__scroll">
            ${this._renderGrid()}
          </div>
        </div>
      </div>
    `;
  }

  /* ── 헤더 ── */

  _renderHeader(days) {
    const cols = days.map((date, i) => {
      const today = this._isToday(date);
      return `
        <div class="weekly-calendar__col">
          <span class="weekly-calendar__col-day">${WeeklyCalendar.DAY_NAMES[i]}</span>
          <div class="weekly-calendar__col-date${today ? ' weekly-calendar__col-date--today' : ''}">
            ${date.getDate()}
          </div>
        </div>`;
    }).join('');

    return `
      <div class="weekly-calendar__header">
        <div class="weekly-calendar__time-gutter"></div>
        ${cols}
      </div>`;
  }

  /* ── 종일 행 ── */

  _renderAllday() {
    const cells = Array.from({ length: 7 }, () =>
      `<div class="weekly-calendar__allday-cell"></div>`
    ).join('');

    return `
      <div class="weekly-calendar__allday">
        <div class="weekly-calendar__allday-gutter">종일</div>
        ${cells}
      </div>`;
  }

  /* ── 시간 그리드 ── */

  _renderGrid() {
    const { startHour, endHour } = this.options;
    const rows = [];
    for (let h = startHour; h < endHour; h++) {
      rows.push(this._renderRow(h));
    }

    return `
      <div class="weekly-calendar__grid">
        ${rows.join('')}
        <div class="weekly-calendar__events-layer">
          ${this._renderEvents()}
        </div>
      </div>`;
  }

  _renderRow(hour) {
    const cells = Array.from({ length: 7 }, () =>
      `<div class="weekly-calendar__day-cell"></div>`
    ).join('');

    return `
      <div class="weekly-calendar__row">
        <div class="weekly-calendar__row-label">${this._pad2(hour)}:00</div>
        ${cells}
      </div>`;
  }

  /* ── 이벤트 카드 ── */

  _renderEvents() {
    const { startHour, events } = this.options;
    const R = WeeklyCalendar.ROW_HEIGHT; // 80px/hour

    return events.map(ev => {
      /* 픽셀 위치 계산 */
      const startMin  = (ev.startHour - startHour) * 60 + (ev.startMinute ?? 0);
      const endMin    = (ev.endHour   - startHour) * 60 + (ev.endMinute   ?? 0);
      const topPx     = startMin * R / 60;
      const heightPx  = Math.max((endMin - startMin) * R / 60, 40); // 최소 40px
      const color     = this._esc(ev.color ?? 'white');

      /* timetable 패턴과 동일: JS에서 퍼센트로 직접 계산 */
      const leftPct = (ev.dayIndex * 100 / 7).toFixed(4);

      return `
        <div class="weekly-calendar__event"
             style="left:${leftPct}%; top:${topPx}px; height:${heightPx}px;">
          <div class="klds-schedule-tag klds-schedule-tag--${color}">
            <div class="klds-schedule-tag__content">
              <span class="klds-schedule-tag__title">${this._esc(ev.title)}</span>
              <div class="klds-schedule-tag__avatars">
                ${this._renderAvatars(ev.avatars)}
              </div>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  _renderAvatars(avatars = []) {
    return avatars.map(av => {
      if (av.src) {
        return `<div class="avatar">
          <img class="avatar__image" src="${this._esc(av.src)}" alt="${this._esc(av.name ?? '')}" />
        </div>`;
      }
      return `
        <div class="avatar">
          <div class="avatar__fallback" aria-label="${this._esc(av.name ?? '사용자')}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zM4.05 19a8 8 0 0 1 15.9 0H4.05z"
                fill="currentColor"/>
            </svg>
          </div>
        </div>`;
    }).join('');
  }
}

/* ── 전역 노출 (외부 스크립트에서 new WeeklyCalendar() 사용 가능) ── */
window.WeeklyCalendar = WeeklyCalendar;

/* ── 자동 초기화 ─────────────────────────────────────────────
   <div data-weekly-calendar='{"startHour":8}'></div>
   형태로 마크업만으로 초기화 (이벤트는 JS로 추가)          */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-weekly-calendar]').forEach(el => {
    try {
      const opts = JSON.parse(el.dataset.weeklyCalendar || '{}');
      new WeeklyCalendar(el, opts);
    } catch (e) {
      console.error('[WeeklyCalendar] invalid data-weekly-calendar JSON:', e);
    }
  });
});
