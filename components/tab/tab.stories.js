import './tab.css';
import './tab.js';

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Tab',
};

function initTabs(container) {
  container.querySelectorAll('.tabs').forEach((el) => {
    if (window.KLDSTabs) window.KLDSTabs.init(el);
  });
}

export const Pill = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '16px';
    container.innerHTML = `
      <div class="tabs tabs--pill">
        <button class="tab tab--pill tab--active" data-tab="today">
          <span class="tab__label">Today</span>
        </button>
        <button class="tab tab--pill" data-tab="weekly">
          <span class="tab__label">Weekly</span>
        </button>
        <button class="tab tab--pill" data-tab="monthly">
          <span class="tab__label">Monthly</span>
        </button>
      </div>
    `;
    requestAnimationFrame(() => initTabs(container));
    return container;
  },
};

export const Line = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '16px';
    container.innerHTML = `
      <div class="tabs tabs--line">
        <button class="tab tab--line tab--active" data-tab="me">
          <span class="tab__label">Me</span>
        </button>
        <button class="tab tab--line" data-tab="team">
          <span class="tab__label">Team</span>
        </button>
        <button class="tab tab--line" data-tab="company">
          <span class="tab__label">Company</span>
        </button>
      </div>
    `;
    requestAnimationFrame(() => initTabs(container));
    return container;
  },
};

export const WithDisabled = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '16px';
    container.innerHTML = `
      <div class="tabs tabs--pill">
        <button class="tab tab--pill tab--active" data-tab="enabled">
          <span class="tab__label">활성</span>
        </button>
        <button class="tab tab--pill" data-tab="disabled" disabled>
          <span class="tab__label">비활성</span>
        </button>
        <button class="tab tab--pill" data-tab="other">
          <span class="tab__label">기타</span>
        </button>
      </div>
    `;
    requestAnimationFrame(() => initTabs(container));
    return container;
  },
};

export const BothTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'padding:16px;display:flex;flex-direction:column;gap:24px;';
    container.innerHTML = `
      <div>
        <p style="margin-bottom:8px;font-size:12px;color:#6b7280;">Pill 탭</p>
        <div class="tabs tabs--pill">
          <button class="tab tab--pill tab--active"><span class="tab__label">All</span></button>
          <button class="tab tab--pill"><span class="tab__label">Active</span></button>
          <button class="tab tab--pill"><span class="tab__label">Archived</span></button>
        </div>
      </div>
      <div>
        <p style="margin-bottom:8px;font-size:12px;color:#6b7280;">Line 탭</p>
        <div class="tabs tabs--line">
          <button class="tab tab--line tab--active"><span class="tab__label">받은 메일함</span></button>
          <button class="tab tab--line"><span class="tab__label">보낸 메일함</span></button>
          <button class="tab tab--line"><span class="tab__label">임시 보관</span></button>
        </div>
      </div>
    `;
    requestAnimationFrame(() => initTabs(container));
    return container;
  },
};
