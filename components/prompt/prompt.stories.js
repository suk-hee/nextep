import './prompt.css';
import { Prompt } from './prompt.js';

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Prompt',
};

function createPrompt() {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'padding:24px;background:#f5f5f5;min-width:480px;';
  wrapper.innerHTML = `
    <div class="prompt" data-base-path="/assets/icons/">
      <div class="prompt__wrap">
        <button class="prompt__btn-global" aria-label="글로벌 옵션">
          <img src="/assets/icons/ic-global.svg" alt="" width="24" height="24">
        </button>
        <textarea
          class="prompt__input"
          placeholder="원하는 업무를 입력하세요."
          rows="1"
          aria-label="프롬프트 입력"></textarea>
        <div class="prompt__right-btns">
          <button class="prompt__btn prompt__btn--mic" aria-label="음성 입력">
            <span class="prompt__btn-icon"
                  style="-webkit-mask-image:url(/assets/icons/ic-microphone.svg);mask-image:url(/assets/icons/ic-microphone.svg)"></span>
          </button>
          <button class="prompt__btn prompt__btn--send" aria-label="전송" disabled>
            <span class="prompt__btn-icon"
                  style="-webkit-mask-image:url(/assets/icons/ic-arrow-circle-up02.svg);mask-image:url(/assets/icons/ic-arrow-circle-up02.svg)"></span>
          </button>
        </div>
        <div class="prompt__btns"></div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    const el = wrapper.querySelector('.prompt');
    if (el && !el.dataset.promptInitialized) {
      new Prompt(el);
      el.dataset.promptInitialized = 'true';
    }
  });

  return wrapper;
}

export const Default = {
  render: () => createPrompt(),
};
