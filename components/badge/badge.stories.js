import './badge.css';

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Badge',
};

export const Number = {
  render: () => `
    <div style="display:flex;align-items:center;gap:12px;padding:16px;">
      <span class="klds-badge klds-badge--number">3</span>
      <span class="klds-badge klds-badge--number">8</span>
      <span class="klds-badge klds-badge--number">12</span>
      <span class="klds-badge klds-badge--number">99</span>
    </div>
  `,
};

export const Dot = {
  render: () => `
    <div style="display:flex;align-items:center;gap:12px;padding:16px;">
      <span class="klds-badge klds-badge--dot"></span>
    </div>
  `,
};

export const OnAvatar = {
  render: () => `
    <div style="display:flex;align-items:center;gap:24px;padding:16px;">
      <div style="position:relative;display:inline-flex;">
        <div class="avatar avatar--medium">
          <div class="avatar__fallback">JD</div>
        </div>
        <span class="klds-badge klds-badge--dot" style="position:absolute;top:0;right:0;"></span>
      </div>
      <div style="position:relative;display:inline-flex;">
        <div class="avatar avatar--medium">
          <div class="avatar__fallback">AB</div>
        </div>
        <span class="klds-badge klds-badge--number" style="position:absolute;top:-4px;right:-4px;">5</span>
      </div>
    </div>
  `,
};
