import './board.css';
import '../avatar/avatar.css';
import './board.js';

function card({ name, delay = false, star = false, assignee = '박소정', avatarFallback = '박소' }) {
  return `
    <div class="board__card">
      <div class="board__card-title-row">
        ${star ? '<span class="board__card-star"></span>' : ''}
        <p class="board__card-name${delay ? ' board__card-name--delay' : ''}">${name}</p>
      </div>
      <div class="board__card-assignee">
        <div class="avatar avatar--xsmall board__card-avatar">
          <img class="avatar__image" src="/assets/avatars/female01.jpg" alt="${assignee}"
            onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<div class=\\'avatar__fallback\\'>${avatarFallback}</div>')">
        </div>
        <span class="board__card-assignee-name">${assignee}</span>
      </div>
    </div>
  `;
}

const btnCreate = `
  <button class="board__btn-create">
    <span class="board__btn-create-icon">
      <span class="board__btn-create-plus"></span>
    </span>
    <span class="board__btn-create-label">등록</span>
  </button>
`;

function column({ modifier, title, cards }) {
  return `
    <div class="board__column board__column--${modifier}">
      <div class="board__column-header">
        <p class="board__column-title">${title}</p>
        <button class="board__column-more" aria-label="더보기"></button>
      </div>
      <div class="board__card-list">
        ${cards.join('')}
        ${btnCreate}
      </div>
    </div>
  `;
}

function createBoard() {
  const container = document.createElement('div');
  container.style.cssText = '';
  container.innerHTML = `
    <div class="board">
      ${column({
        modifier: 'delay',
        title: 'Delay',
        cards: [
          card({ name: '디자인 시스템 정리', delay: true }),
        ],
      })}
      ${column({
        modifier: 'pending',
        title: 'Pending',
        cards: [
          card({ name: 'EP 제안 기능 작성', star: true }),
          card({ name: '아키텍처 이미지 제작', star: true }),
          card({ name: '웨비나 행사 아젠다 정리' }),
        ],
      })}
      ${column({
        modifier: 'inprogress',
        title: 'In Progress',
        cards: [
          card({ name: '업무 관리 시안 제작' }),
          card({ name: '웨비나 행사 초대 디자인' }),
        ],
      })}
      ${column({
        modifier: 'done',
        title: 'Done',
        cards: [
          card({ name: '업무 관리 시안 제작' }),
        ],
      })}
    </div>
  `;

  requestAnimationFrame(() => {
    const boardEl = container.querySelector('.board');
    if (boardEl && window.__initBoardDnD) {
      window.__initBoardDnD(boardEl);
    }
  });

  return container;
}

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Board',
};

export const Default = {
  render: () => createBoard(),
};

export const DelayCard = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding:24px;background:#f3f4f6;width:380px;';
    wrapper.innerHTML = card({ name: '디자인 시스템 정리', delay: true });
    return wrapper;
  },
};

export const StarCard = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding:24px;background:#f3f4f6;width:380px;';
    wrapper.innerHTML = card({ name: 'EP 제안 기능 작성', star: true });
    return wrapper;
  },
};
