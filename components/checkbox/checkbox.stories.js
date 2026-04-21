import './checkbox.css';

const CHECK_SVG = `<svg class="klds-checkbox__icon" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 3.5L4.5 7L11 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function checkbox({ checked = false, disabled = false } = {}) {
  return `
    <label class="klds-checkbox">
      <input type="checkbox" class="klds-checkbox__input"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}>
      <span class="klds-checkbox__box">${CHECK_SVG}</span>
    </label>
  `;
}

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Checkbox',
  render: (args) => `
    <div style="padding:24px;">
      ${checkbox(args)}
    </div>
  `,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    checked: false,
    disabled: false,
  },
};

export const Unchecked = {};

export const Checked = {
  args: { checked: true },
};

export const Disabled = {
  args: { disabled: true },
};

export const CheckedDisabled = {
  args: { checked: true, disabled: true },
};

export const AllStates = {
  render: () => `
    <div style="display:flex;align-items:center;gap:24px;padding:24px;">
      ${checkbox({ checked: false })}
      ${checkbox({ checked: true })}
      ${checkbox({ checked: false, disabled: true })}
      ${checkbox({ checked: true, disabled: true })}
    </div>
  `,
};
