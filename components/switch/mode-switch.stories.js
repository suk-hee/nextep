import './mode-switch.css';
import { ModeSwitch } from './mode-switch.js';

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/ModeSwitch',
};

function createModeSwitch(html) {
  const container = document.createElement('div');
  container.style.padding = '16px';
  container.innerHTML = html;
  requestAnimationFrame(() => {
    container.querySelectorAll('.mode-switch').forEach((el) => ModeSwitch.init(el));
  });
  return container;
}

export const Default = {
  render: () =>
    createModeSwitch(`
      <div class="mode-switch" role="tablist" aria-label="모드 전환">
        <button class="mode-switch__btn is-active" role="tab" aria-selected="true" data-mode="classic">
          <span class="mode-switch__label">클래식</span>
        </button>
        <button class="mode-switch__btn" role="tab" aria-selected="false" data-mode="ai">
          <span class="mode-switch__label">AI</span>
        </button>
      </div>
    `),
};

export const ThreeOptions = {
  render: () =>
    createModeSwitch(`
      <div class="mode-switch" role="tablist" aria-label="뷰 전환">
        <button class="mode-switch__btn is-active" role="tab" aria-selected="true" data-mode="day">
          <span class="mode-switch__label">일</span>
        </button>
        <button class="mode-switch__btn" role="tab" aria-selected="false" data-mode="week">
          <span class="mode-switch__label">주</span>
        </button>
        <button class="mode-switch__btn" role="tab" aria-selected="false" data-mode="month">
          <span class="mode-switch__label">월</span>
        </button>
      </div>
    `),
};
