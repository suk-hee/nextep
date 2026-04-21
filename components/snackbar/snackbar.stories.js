import './snackbar.css';
import { Snackbar } from './snackbar.js';

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Snackbar',
};

export const Simple = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '16px';
    wrapper.innerHTML = `
      <button id="snackbar-trigger-simple" class="button button--medium button--fill-primary" style="all:unset;cursor:pointer;padding:8px 16px;background:#005386;color:#fff;border-radius:8px;font-size:14px;">
        스낵바 표시
      </button>
    `;
    wrapper.querySelector('#snackbar-trigger-simple').addEventListener('click', () => {
      Snackbar.show('저장되었습니다.');
    });
    return wrapper;
  },
};

export const WithAction = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '16px';
    wrapper.innerHTML = `
      <button id="snackbar-trigger-action" style="all:unset;cursor:pointer;padding:8px 16px;background:#005386;color:#fff;border-radius:8px;font-size:14px;">
        액션 포함 스낵바
      </button>
    `;
    wrapper.querySelector('#snackbar-trigger-action').addEventListener('click', () => {
      Snackbar.show('휴지통으로 이동했습니다.', {
        action: {
          label: '실행 취소',
          onClick: () => alert('실행 취소'),
        },
        duration: 5000,
      });
    });
    return wrapper;
  },
};

export const WithoutClose = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '16px';
    wrapper.innerHTML = `
      <button id="snackbar-trigger-no-close" style="all:unset;cursor:pointer;padding:8px 16px;background:#005386;color:#fff;border-radius:8px;font-size:14px;">
        닫기 버튼 없는 스낵바
      </button>
    `;
    wrapper.querySelector('#snackbar-trigger-no-close').addEventListener('click', () => {
      Snackbar.show('저장되었습니다.', { closable: false, duration: 2000 });
    });
    return wrapper;
  },
};
