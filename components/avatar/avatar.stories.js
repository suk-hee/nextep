import './avatar.css';
import { Avatar, AvatarGroup } from './avatar.js';

const AVATARS = [
  { src: '/assets/avatars/female01.jpg', alt: '박소정' },
  { src: '/assets/avatars/male01.jpg',   alt: '홍길동' },
  { src: '/assets/avatars/female02.jpg', alt: '이영희' },
  { src: '/assets/avatars/male02.jpg',   alt: '김철수' },
  { src: '/assets/avatars/female03.jpg', alt: '윤지영' },
  { src: '/assets/avatars/male03.jpg',   alt: '이민준' },
];

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Avatar',
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;align-items:center;gap:16px;padding:16px;';
    new Avatar(args).mount(wrapper);
    return wrapper;
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    status: {
      control: 'select',
      options: [null, 'online', 'offline', 'away', 'busy'],
    },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
  args: {
    size: 'medium',
    src: '/assets/avatars/female01.jpg',
    alt: '박소정',
    status: null,
  },
};

export const Default = {};

export const WithStatus = {
  args: { status: 'online' },
};

export const AllStatuses = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;align-items:center;gap:12px;padding:16px;';
    [null, 'online', 'offline', 'away', 'busy'].forEach((status, i) => {
      new Avatar({ size: 'medium', src: AVATARS[i % AVATARS.length].src, alt: AVATARS[i % AVATARS.length].alt, status }).mount(wrapper);
    });
    return wrapper;
  },
};

export const AllSizes = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;align-items:flex-end;gap:12px;padding:16px;';
    ['xsmall', 'small', 'medium', 'large', 'xlarge'].forEach((size) => {
      new Avatar({ size, src: AVATARS[0].src, alt: AVATARS[0].alt }).mount(wrapper);
    });
    return wrapper;
  },
};

export const Initials = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;align-items:center;gap:12px;padding:16px;';
    ['박소정', '홍길동', '이영희', '김철수'].forEach((name) => {
      new Avatar({ size: 'medium', alt: name }).mount(wrapper);
    });
    return wrapper;
  },
};

export const Group = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;flex-direction:column;gap:24px;padding:16px;';

    const group1 = new AvatarGroup({
      avatars: AVATARS.slice(0, 3).map((a) => ({ size: 'medium', ...a })),
      stacked: true,
    });
    group1.mount(wrapper);

    const group2 = new AvatarGroup({
      avatars: AVATARS.map((a) => ({ size: 'medium', ...a })),
      stacked: true,
      max: 4,
    });
    group2.mount(wrapper);

    return wrapper;
  },
};
