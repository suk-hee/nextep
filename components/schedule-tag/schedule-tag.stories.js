import './schedule-tag.css';
import '../avatar/avatar.css';

const COLORS = ['white', 'gray', 'red', 'orange', 'green', 'lightblue', 'blue', 'purple', 'pink', 'volcano'];

function avatarImg(src, alt, fallback) {
  return `
    <div class="avatar">
      <img class="avatar__image" src="/assets/avatars/${src}" alt="${alt}"
        onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<div class=\\'avatar__fallback\\'>${fallback}</div>')">
    </div>
  `;
}

function scheduleTag(color, title = 'Schedule Title') {
  return `
    <div class="klds-schedule-tag klds-schedule-tag--${color}">
      <div class="klds-schedule-tag__content">
        <span class="klds-schedule-tag__title">${title}</span>
        <div class="klds-schedule-tag__avatars">
          ${avatarImg('male01.jpg', '홍길동', '홍')}
          ${avatarImg('female01.jpg', '이영희', '이')}
          ${avatarImg('male02.jpg', '김철수', '김')}
        </div>
      </div>
    </div>
  `;
}

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/ScheduleTag',
  render: (args) => `
    <div style="padding:16px;width:240px;">
      ${scheduleTag(args.color, args.title)}
    </div>
  `,
  argTypes: {
    color: { control: 'select', options: COLORS },
    title: { control: 'text' },
  },
  args: {
    color: 'blue',
    title: '오전 팀 스탠드업',
  },
};

export const Default = {};

export const AllColors = {
  render: () => `
    <div style="display:flex;flex-direction:column;gap:8px;padding:16px;width:260px;">
      ${COLORS.map((color) => scheduleTag(color, color.charAt(0).toUpperCase() + color.slice(1) + ' 스케줄')).join('')}
    </div>
  `,
};
