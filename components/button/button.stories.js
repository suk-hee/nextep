import './button.css';

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Button',
  render: (args) =>
    `<button class="button button--${args.size} button--${args.type}"${args.disabled ? ' disabled' : ''}>
      ${args.label}
    </button>`,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    type: {
      control: 'select',
      options: [
        'fill-primary',
        'fill-secondary',
        'outline-primary',
        'outline-secondary',
        'text',
      ],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'medium',
    type: 'fill-primary',
    label: '확인',
    disabled: false,
  },
};

export const FillPrimary = {};

export const FillSecondary = {
  args: { type: 'fill-secondary', label: '취소' },
};

export const OutlinePrimary = {
  args: { type: 'outline-primary' },
};

export const OutlineSecondary = {
  args: { type: 'outline-secondary', label: '취소' },
};

export const TextButton = {
  args: { type: 'text', label: '더보기' },
};

export const Disabled = {
  args: { disabled: true, label: '비활성' },
};

export const AllVariantsMedium = {
  render: () => `
    <div style="display:flex;flex-wrap:wrap;gap:12px;padding:16px;align-items:center;">
      <button class="button button--medium button--fill-primary">Fill Primary</button>
      <button class="button button--medium button--fill-secondary">Fill Secondary</button>
      <button class="button button--medium button--outline-primary">Outline Primary</button>
      <button class="button button--medium button--outline-secondary">Outline Secondary</button>
      <button class="button button--medium button--text">Text</button>
      <button class="button button--medium button--fill-primary" disabled>Disabled</button>
    </div>
  `,
};

export const AllVariantsSmall = {
  render: () => `
    <div style="display:flex;flex-wrap:wrap;gap:12px;padding:16px;align-items:center;">
      <button class="button button--small button--fill-primary">Fill Primary</button>
      <button class="button button--small button--fill-secondary">Fill Secondary</button>
      <button class="button button--small button--outline-primary">Outline Primary</button>
      <button class="button button--small button--outline-secondary">Outline Secondary</button>
      <button class="button button--small button--text">Text</button>
    </div>
  `,
};
