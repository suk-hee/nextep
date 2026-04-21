import './tag.css';

const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.79289 6.29289C6.18342 5.90237 6.81658 5.90237 7.20711 6.29289L11.5 10.5858L15.7929 6.29289C16.1835 5.90237 16.8166 5.90237 17.2071 6.29289C17.5977 6.68342 17.5977 7.31658 17.2071 7.70711L12.9142 12L17.2071 16.2929C17.5976 16.6834 17.5976 17.3165 17.2071 17.7071C16.8165 18.0976 16.1834 18.0976 15.7929 17.7071L11.5 13.4142L7.20711 17.7071C6.81658 18.0977 6.18342 18.0977 5.79289 17.7071C5.40237 17.3166 5.40237 16.6835 5.79289 16.2929L10.0858 12L5.79289 7.70711C5.40237 7.31658 5.40237 6.68342 5.79289 6.29289Z" fill="currentColor"/>
</svg>`;

const COLORS = ['white', 'gray', 'red', 'orange', 'green', 'mint', 'lightblue', 'blue', 'purple', 'pink', 'volcano'];

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Tag',
  render: (args) => `
    <div style="padding:16px;">
      <span class="klds-tag klds-tag--${args.size} klds-tag--${args.color}${args.shape === 'pill' ? ' klds-tag--pill' : ''}${args.state !== 'default' ? ` klds-tag--${args.state}` : ''}">
        <span class="klds-tag__label">${args.label}</span>
        ${args.closable ? `<button class="klds-tag__close" aria-label="Remove tag">${CLOSE_SVG}</button>` : ''}
      </span>
    </div>
  `,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: COLORS },
    shape: { control: 'select', options: ['round', 'pill'] },
    state: { control: 'select', options: ['default', 'active', 'disabled'] },
    label: { control: 'text' },
    closable: { control: 'boolean' },
  },
  args: {
    size: 'medium',
    color: 'blue',
    shape: 'round',
    state: 'default',
    label: 'Tag name',
    closable: false,
  },
};

export const Default = {};

export const Pill = {
  args: { shape: 'pill' },
};

export const WithClose = {
  args: { closable: true },
};

export const Active = {
  args: { state: 'active', color: 'blue' },
};

export const Disabled = {
  args: { state: 'disabled', color: 'blue' },
};

export const AllColors = {
  render: () => `
    <div style="display:flex;flex-wrap:wrap;gap:8px;padding:16px;">
      ${COLORS.map(
        (color) =>
          `<span class="klds-tag klds-tag--medium klds-tag--${color}">
            <span class="klds-tag__label">${color}</span>
          </span>`
      ).join('')}
    </div>
  `,
};

export const AllSizes = {
  render: () => `
    <div style="display:flex;align-items:center;gap:8px;padding:16px;">
      <span class="klds-tag klds-tag--small klds-tag--blue">
        <span class="klds-tag__label">Small</span>
      </span>
      <span class="klds-tag klds-tag--medium klds-tag--blue">
        <span class="klds-tag__label">Medium</span>
      </span>
      <span class="klds-tag klds-tag--large klds-tag--blue">
        <span class="klds-tag__label">Large</span>
      </span>
    </div>
  `,
};
