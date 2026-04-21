/**
 * Timetable Component JavaScript
 * 
 * Figma: timetable (136:6561)
 * 
 * 기능:
 *   - 체크박스 토글 (type=another)
 *   - 이벤트 동적 렌더링
 *   - 행 선택/해제 시 배경색 변경
 */

(function () {
  'use strict';

  /* ─── Constants ─── */
  var START_HOUR = 8;     // 타임테이블 시작 시간
  var END_HOUR = 19;      // 타임테이블 종료 시간
  var TOTAL_HOURS = END_HOUR - START_HOUR; // 11
  var SLOTS_PER_HOUR = 2; // 30분 단위
  var TOTAL_SLOTS = TOTAL_HOURS * SLOTS_PER_HOUR; // 22
  var TOTAL_CELLS = TOTAL_SLOTS + 2; // 마지막 30분 셀 포함 + 마지막 빈칸

  /* ─── Color Map ─── */
  var EVENT_COLORS = {
    green: 'timetable__event--green',
    lightblue: 'timetable__event--lightblue',
    purple: 'timetable__event--purple',
    orange: 'timetable__event--orange',
    mint: 'timetable__event--mint',
    ai: 'timetable__event--ai'
  };

  /* ─── Time Utilities ─── */

  /**
   * 시간 문자열을 분으로 변환 (08:00 기준 0분)
   * @param {string} timeStr - 'HH:MM' 형식
   * @returns {number} 분 단위 오프셋
   */
  function timeToMinutes(timeStr) {
    var parts = timeStr.split(':');
    var hours = parseInt(parts[0], 10);
    var mins = parseInt(parts[1], 10);
    return (hours - START_HOUR) * 60 + mins;
  }

  /**
   * 분을 퍼센트 위치로 변환
   * @param {number} minutes - 08:00 기준 offset(분)
   * @returns {number} 퍼센트 (0~100)
   */
  function minutesToPercent(minutes) {
    var totalMinutes = TOTAL_HOURS * 60;
    return (minutes / totalMinutes) * 100;
  }


  /* ─── Grid Generator ─── */

  /**
   * 30분 단위 그리드 셀 HTML 생성
   * @returns {string} HTML 문자열
   */
  function generateGridCells() {
    var html = '';
    for (var i = 0; i < TOTAL_CELLS; i++) {
      if (i === TOTAL_CELLS - 1) {
        // 마지막 셀: border 없음
        html += '<div class="timetable__grid-cell"></div>';
      } else if (i % 2 === 1) {
        // 30분 경계: 가는 선
        html += '<div class="timetable__grid-cell timetable__grid-cell--half"></div>';
      } else {
        // 정시 경계: 두꺼운 선
        html += '<div class="timetable__grid-cell"></div>';
      }
    }
    return html;
  }


  /* ─── Event Renderer ─── */

  /**
   * 이벤트 태그 HTML 생성
   * @param {Object} event
   * @param {string} event.title - 이벤트 제목
   * @param {string} event.start - 시작 시간 'HH:MM'
   * @param {string} event.end - 종료 시간 'HH:MM'
   * @param {string} event.color - 색상 키 (green, lightblue, purple, orange, mint, ai)
   * @param {string} [event.icon] - 아이콘 경로 (ai 타입 전용)
   * @returns {string} HTML 문자열
   */
  function createEventHTML(event) {
    var startMin = timeToMinutes(event.start);
    var endMin = timeToMinutes(event.end);
    var leftPercent = minutesToPercent(startMin);
    var widthPercent = minutesToPercent(endMin - startMin);
    var colorClass = EVENT_COLORS[event.color] || EVENT_COLORS.lightblue;

    var style = 'left:' + leftPercent.toFixed(1) + '%;width:' + widthPercent.toFixed(1) + '%';

    var iconHTML = '';
    if (event.icon) {
      iconHTML = '<span class="timetable__event-icon">' +
        '<img src="' + event.icon + '" alt="" width="20" height="20">' +
        '</span>';
    }

    return '<div class="timetable__event ' + colorClass + '" style="' + style + '">' +
      iconHTML +
      '<span class="timetable__event-text">' + event.title + '</span>' +
      '</div>';
  }


  /* ─── Row Renderer ─── */

  /**
   * 타임테이블 행 HTML 생성
   * @param {Object} rowData
   * @param {string} rowData.name - 사용자 이름
   * @param {string} rowData.role - 직급
   * @param {string} rowData.avatar - 아바타 이미지 경로
   * @param {Array<Object>} rowData.events - 이벤트 배열
   * @param {boolean} [rowData.hasCheckbox] - 체크박스 포함 여부
   * @param {boolean} [rowData.checked] - 체크 상태
   * @param {boolean} [rowData.hasBorder] - 하단 구분선
   * @returns {string} HTML 문자열
   */
  function createRowHTML(rowData) {
    var rowClasses = ['timetable__row'];
    if (rowData.hasBorder) rowClasses.push('timetable__row--border');
    if (rowData.checked) rowClasses.push('timetable__row--checked');

    var html = '<div class="' + rowClasses.join(' ') + '">';

    // 체크박스 셀
    if (rowData.hasCheckbox) {
      var cbCheckedClass = rowData.checked ? ' timetable__checkbox--checked' : '';
      var cbDataChecked = rowData.checked ? 'true' : 'false';
      html += '<div class="timetable__cell-checkbox">';
      html += '<div class="timetable__checkbox' + cbCheckedClass + '" data-checked="' + cbDataChecked + '">';
      if (rowData.checked) {
        html += '<span class="timetable__check-icon">' +
          '<svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M1 3.5L4.5 7L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg></span>';
      }
      html += '</div></div>';
    }

    // 사용자 셀
    html += '<div class="timetable__cell-user">';
    html += '<div class="timetable__user-info">';
    html += '<div class="avatar avatar--small">';
    html += '<img src="' + rowData.avatar + '" alt="' + rowData.name + '" class="avatar__image">';
    html += '</div>';
    html += '<div class="timetable__user-text">';
    html += '<span class="timetable__user-name">' + rowData.name + '</span>';
    html += '<span class="timetable__user-role">' + rowData.role + '</span>';
    html += '</div></div></div>';

    // 시간 그리드 셀
    html += '<div class="timetable__cell-time">';
    html += '<div class="timetable__grid">';
    html += generateGridCells();

    // 이벤트 렌더링
    if (rowData.events) {
      rowData.events.forEach(function (event) {
        html += createEventHTML(event);
      });
    }

    html += '</div></div>';
    html += '</div>';

    return html;
  }


  /* ─── Checkbox Handler ─── */

  function handleCheckboxClick(e) {
    var checkbox = e.currentTarget;
    var isChecked = checkbox.dataset.checked === 'true';
    var newChecked = !isChecked;

    checkbox.dataset.checked = String(newChecked);

    if (newChecked) {
      checkbox.classList.add('timetable__checkbox--checked');
      // 체크 아이콘 추가
      if (!checkbox.querySelector('.timetable__check-icon')) {
        checkbox.innerHTML = '<span class="timetable__check-icon">' +
          '<svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M1 3.5L4.5 7L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg></span>';
      }
    } else {
      checkbox.classList.remove('timetable__checkbox--checked');
      checkbox.innerHTML = '';
    }

    // 행 배경 토글
    var row = checkbox.closest('.timetable__row');
    if (row) {
      if (newChecked) {
        row.classList.add('timetable__row--checked');
      } else {
        row.classList.remove('timetable__row--checked');
      }
    }

    // 커스텀 이벤트 발행
    var timetable = checkbox.closest('.timetable');
    if (timetable) {
      var event = new CustomEvent('timetable:checkchange', {
        detail: {
          row: row,
          checked: newChecked,
          checkbox: checkbox
        },
        bubbles: true
      });
      timetable.dispatchEvent(event);
    }
  }


  /* ─── Init ─── */

  /**
   * 타임테이블 초기화 — 체크박스 이벤트 바인딩
   * @param {HTMLElement} container - .timetable 컨테이너
   */
  function initTimetable(container) {
    var checkboxes = container.querySelectorAll('.timetable__checkbox');
    checkboxes.forEach(function (cb) {
      cb.addEventListener('click', handleCheckboxClick);
    });
  }

  /**
   * 모든 타임테이블 초기화
   */
  function initAllTimetables() {
    document.querySelectorAll('.timetable').forEach(initTimetable);
  }


  /* ─── Public API ─── */
  window.KLDSTimetable = {
    init: initTimetable,
    initAll: initAllTimetables,
    createRowHTML: createRowHTML,
    createEventHTML: createEventHTML,
    generateGridCells: generateGridCells,
    timeToMinutes: timeToMinutes,
    minutesToPercent: minutesToPercent,
    EVENT_COLORS: EVENT_COLORS,
    START_HOUR: START_HOUR,
    END_HOUR: END_HOUR
  };

  /* ─── Auto-init on DOM ready ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTimetables);
  } else {
    initAllTimetables();
  }
})();
