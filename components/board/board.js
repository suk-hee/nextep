/**
 * KLDS Board Component — Drag and Drop
 * Vanilla JS, HTML5 DnD API
 * 카드를 드래그해서 다른 컬럼으로 이동
 */

(function (global) {
  'use strict';

  function initBoardDnD(boardEl) {
    if (!boardEl) return;
    if (boardEl.__dndInit) return; // 중복 초기화 방지
    boardEl.__dndInit = true;

    var dragging = null;
    var indicator = null; // 드롭 위치 표시선

    // 모든 카드에 draggable 속성 부여
    function makeCardsDraggable() {
      boardEl.querySelectorAll('.board__card').forEach(function (card) {
        card.setAttribute('draggable', 'true');
      });
    }
    makeCardsDraggable();

    // 드롭 위치 표시선 생성
    function createIndicator() {
      var el = document.createElement('div');
      el.className = 'board__drop-indicator';
      return el;
    }

    // 마우스 Y 좌표 기준으로 삽입 위치(insertBefore 대상) 결정
    function getInsertTarget(cardList, clientY) {
      var cards = Array.from(
        cardList.querySelectorAll('.board__card:not(.board__card--dragging)')
      );
      for (var i = 0; i < cards.length; i++) {
        var rect = cards[i].getBoundingClientRect();
        if (clientY < rect.top + rect.height / 2) {
          return cards[i];
        }
      }
      return null; // 마지막에 삽입 (등록 버튼 앞)
    }

    // 표시선 제거
    function removeIndicator() {
      if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }

    // drag-over 상태 전체 초기화
    function clearDragOver() {
      boardEl.querySelectorAll('.board__column--drag-over').forEach(function (c) {
        c.classList.remove('board__column--drag-over');
      });
      removeIndicator();
    }

    // ── 이벤트 핸들러 ──────────────────────────────────────────

    boardEl.addEventListener('dragstart', function (e) {
      var card = e.target.closest('.board__card');
      if (!card) return;
      dragging = card;
      indicator = createIndicator();
      // 브라우저가 ghost 이미지 캡처한 뒤 opacity 적용
      requestAnimationFrame(function () {
        card.classList.add('board__card--dragging');
      });
      e.dataTransfer.effectAllowed = 'move';
    });

    boardEl.addEventListener('dragend', function () {
      if (dragging) dragging.classList.remove('board__card--dragging');
      dragging = null;
      clearDragOver();
    });

    boardEl.addEventListener('dragover', function (e) {
      e.preventDefault();
      if (!dragging) return;
      e.dataTransfer.dropEffect = 'move';

      var col = e.target.closest('.board__column');
      if (!col) return;

      // 컬럼 highlight
      boardEl.querySelectorAll('.board__column--drag-over').forEach(function (c) {
        if (c !== col) c.classList.remove('board__column--drag-over');
      });
      col.classList.add('board__column--drag-over');

      // 드롭 위치 표시선 배치
      var cardList = col.querySelector('.board__card-list');
      if (!cardList) return;

      var insertBefore = getInsertTarget(cardList, e.clientY);
      var btnCreate = cardList.querySelector('.board__btn-create');

      removeIndicator();
      if (insertBefore) {
        cardList.insertBefore(indicator, insertBefore);
      } else if (btnCreate) {
        cardList.insertBefore(indicator, btnCreate);
      } else {
        cardList.appendChild(indicator);
      }
    });

    boardEl.addEventListener('dragleave', function (e) {
      // board 영역을 완전히 벗어났을 때만 초기화
      if (!boardEl.contains(e.relatedTarget)) {
        clearDragOver();
      }
    });

    boardEl.addEventListener('drop', function (e) {
      e.preventDefault();
      if (!dragging) return;

      var col = e.target.closest('.board__column');
      if (!col) { clearDragOver(); return; }

      var cardList = col.querySelector('.board__card-list');
      if (!cardList) { clearDragOver(); return; }

      var insertBefore = getInsertTarget(cardList, e.clientY);
      var btnCreate = cardList.querySelector('.board__btn-create');

      // 카드 이동
      if (insertBefore) {
        cardList.insertBefore(dragging, insertBefore);
      } else if (btnCreate) {
        cardList.insertBefore(dragging, btnCreate);
      } else {
        cardList.appendChild(dragging);
      }

      clearDragOver();
      dragging.classList.remove('board__card--dragging');
    });
  }

  // board.html에서 직접 열었을 때 자동 초기화
  document.addEventListener('DOMContentLoaded', function () {
    var boardEl = document.querySelector('.board');
    if (boardEl) initBoardDnD(boardEl);
  });

  // workpanel 등 외부에서 주입 후 호출할 수 있도록 전역 노출
  global.__initBoardDnD = initBoardDnD;

}(window));
