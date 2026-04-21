/**
 * Pagination Component JavaScript
 * Figma node: 141:9263
 *
 * SVG 아이콘을 인라인으로 삽입하여 file:// 프로토콜에서도 정상 렌더링
 */

(function() {
  /* ── 인라인 SVG 아이콘 (Figma 원본 기준 24×24 viewBox) ── */
  var ICONS = {
    caretLeft: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7071 5.29289C16.0976 5.68342 16.0976 6.31658 15.7071 6.70711L10.4142 12L15.7071 17.2929C16.0976 17.6834 16.0976 18.3166 15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929L14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289Z" fill="currentColor"/></svg>',
    caretRight: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 5.29289C7.90237 5.68342 7.90237 6.31658 8.29289 6.70711L13.5858 12L8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071C8.68342 19.0976 9.31658 19.0976 9.70711 18.7071L15.7071 12.7071C16.0976 12.3166 16.0976 11.6834 15.7071 11.2929L9.70711 5.29289C9.31658 4.90237 8.68342 4.90237 8.29289 5.29289Z" fill="currentColor"/></svg>',
    moreHorizontal: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.125 12C4.125 10.8954 5.02043 10 6.125 10C7.22957 10 8.125 10.8954 8.125 12C8.125 13.1046 7.22957 14 6.125 14C5.02043 14 4.125 13.1046 4.125 12ZM10.125 12C10.125 10.8954 11.0204 10 12.125 10C13.2296 10 14.125 10.8954 14.125 12C14.125 13.1046 13.2296 14 12.125 14C11.0204 14 10.125 13.1046 10.125 12ZM16.125 12C16.125 10.8954 17.0204 10 18.125 10C19.2296 10 20.125 10.8954 20.125 12C20.125 13.1046 19.2296 14 18.125 14C17.0204 14 16.125 13.1046 16.125 12Z" fill="currentColor"/></svg>'
  };

  function Pagination(container, options) {
    options = options || {};
    this.container   = container;
    this.currentPage = options.currentPage || 1;
    this.totalPages  = options.totalPages  || 10;
    this.maxVisible  = options.maxVisiblePages || 5;
    this.onChange     = options.onChange || function() {};

    this.render();
    this._bindEvents();
  }

  /* ── 렌더 ── */
  Pagination.prototype.render = function() {
    var pages = this._calcPages();
    var parts = [];
    var self = this;

    /* 이전 버튼 — Figma: IconButton 141:9242, 32×32, r6 */
    parts.push(
      '<button class="pagination__button pagination__button--prev"' +
      (self.currentPage === 1 ? ' disabled' : '') +
      ' aria-label="이전 페이지">' + ICONS.caretLeft + '</button>'
    );

    /* 페이지 아이템들 */
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (p === '...') {
        /* ellipsis — Figma: 141:9248, 16×16 ic-more-horizontal */
        parts.push(
          '<span class="pagination__ellipsis" aria-hidden="true">' + ICONS.moreHorizontal + '</span>'
        );
      } else {
        /* 페이지 번호 — Figma: 32×32, r4 / active: r9999 bg:#005386 */
        var cls = (p === self.currentPage) ? ' pagination__item--active' : '';
        var aria = (p === self.currentPage) ? ' aria-current="page"' : '';
        parts.push(
          '<button class="pagination__item' + cls + '" data-page="' + p + '"' + aria + '>' + p + '</button>'
        );
      }
    }

    /* 다음 버튼 — Figma: IconButton 141:9250, 32×32, r6 */
    parts.push(
      '<button class="pagination__button pagination__button--next"' +
      (self.currentPage === self.totalPages ? ' disabled' : '') +
      ' aria-label="다음 페이지">' + ICONS.caretRight + '</button>'
    );

    self.container.innerHTML = parts.join('');
  };

  /* ── 이벤트 위임 (한 번만 바인딩) ── */
  Pagination.prototype._bindEvents = function() {
    var self = this;
    self.container.addEventListener('click', function(e) {
      var btn = e.target.closest('.pagination__button, .pagination__item');
      if (!btn || btn.disabled) return;

      if (btn.classList.contains('pagination__button--prev')) {
        self.goToPage(self.currentPage - 1);
      } else if (btn.classList.contains('pagination__button--next')) {
        self.goToPage(self.currentPage + 1);
      } else if (btn.dataset.page) {
        self.goToPage(Number(btn.dataset.page));
      }
    });
  };

  /* ── 공개 API ── */
  Pagination.prototype.goToPage = function(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.render();
    this.onChange(page);
  };

  Pagination.prototype.setTotalPages = function(total) {
    this.totalPages = total;
    if (this.currentPage > total) this.currentPage = total;
    this.render();
  };

  Pagination.prototype.getCurrentPage = function() {
    return this.currentPage;
  };

  /* ── 페이지 번호 계산 ── */
  Pagination.prototype._calcPages = function() {
    var cur   = this.currentPage;
    var total = this.totalPages;
    var max   = this.maxVisible;
    var pages = [];

    if (total <= max + 2) {
      for (var i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    var half  = Math.floor(max / 2);
    var start = Math.max(2, cur - half);
    var end   = Math.min(total - 1, cur + half);

    if (cur <= half + 1) end = max;
    if (cur >= total - half) start = total - max + 1;

    pages.push(1);
    if (start > 2) pages.push('...');
    for (var j = start; j <= end; j++) pages.push(j);
    if (end < total - 1) pages.push('...');
    pages.push(total);

    return pages;
  };

  /* 전역 노출 */
  window.Pagination = Pagination;
})();
