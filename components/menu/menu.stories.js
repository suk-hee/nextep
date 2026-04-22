import './menu.css';
import '../checkbox/checkbox.css';

const CHECK_SVG = `<svg class="klds-checkbox__icon" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 3.5L4.5 7L11 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Menu',
};

export const Default = {
  render: () => `
    <div class="klds-menu">
      <div class="klds-menu__item">
        <span class="klds-menu__item-text">안 읽은 메일함</span>
      </div>
      <div class="klds-menu__item is-hover">
        <span class="klds-menu__item-text">받은 메일함</span>
      </div>
      <div class="klds-menu__item">
        <span class="klds-menu__item-text">보낸 메일함</span>
      </div>
      <div class="klds-menu__item">
        <span class="klds-menu__item-text">임시 메일함</span>
      </div>
    </div>
  `,
};

export const WithIcon = {
  render: () => `
    <div class="klds-menu">
      <div class="klds-menu__item">
        <div class="klds-menu__item-icon"
          style="-webkit-mask-image:url(/assets/icons/ic-mail.svg);mask-image:url(/assets/icons/ic-mail.svg);background-color:var(--klds-color-text-black,#121212);"></div>
        <span class="klds-menu__item-text">메일 편지함</span>
      </div>
      <div class="klds-menu__item is-hover">
        <div class="klds-menu__item-icon"
          style="-webkit-mask-image:url(/assets/icons/ic-folder.svg);mask-image:url(/assets/icons/ic-folder.svg);background-color:var(--klds-color-primary,#005386);"></div>
        <span class="klds-menu__item-text">공용 폴더 (Hover)</span>
      </div>
      <div class="klds-menu__item">
        <div class="klds-menu__item-icon"
          style="-webkit-mask-image:url(/assets/icons/ic-trash-empty.svg);mask-image:url(/assets/icons/ic-trash-empty.svg);background-color:var(--klds-color-text-black,#121212);"></div>
        <span class="klds-menu__item-text">휴지통</span>
      </div>
    </div>
  `,
};

export const WithCheckbox = {
  render: () => `
    <div class="klds-menu">
      <label class="klds-menu__item">
        <div class="klds-menu__item-checkbox">
          <div class="klds-checkbox">
            <input type="checkbox" class="klds-checkbox__input">
            <span class="klds-checkbox__box">${CHECK_SVG}</span>
          </div>
        </div>
        <span class="klds-menu__item-text">항목 1</span>
      </label>
      <label class="klds-menu__item">
        <div class="klds-menu__item-checkbox">
          <div class="klds-checkbox">
            <input type="checkbox" class="klds-checkbox__input" checked>
            <span class="klds-checkbox__box">${CHECK_SVG}</span>
          </div>
        </div>
        <span class="klds-menu__item-text">항목 2 (선택됨)</span>
      </label>
      <label class="klds-menu__item">
        <div class="klds-menu__item-checkbox">
          <div class="klds-checkbox">
            <input type="checkbox" class="klds-checkbox__input">
            <span class="klds-checkbox__box">${CHECK_SVG}</span>
          </div>
        </div>
        <span class="klds-menu__item-text">항목 3</span>
      </label>
    </div>
  `,
};
