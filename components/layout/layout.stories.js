import './common-layout.css';
import './header/header.css';
import './lnb/lnb.css';
import '../avatar/avatar.css';
import '../switch/mode-switch.css';
import '../button/button-icon.css';
import '../badge/badge.css';
import '../tab/tab.css';
import '../tab/tab.js';
import '../prompt/prompt.css';
import '../ai-assistant/ai-assistant.css';
import { Prompt } from '../prompt/prompt.js';
import { AIAssistant } from '../ai-assistant/ai-assistant.js';
import { CommonLayout } from './common-layout.js';

window['Prompt'] = Prompt;

const ICON = (name) =>
  `-webkit-mask-image:url(/assets/icons/${name});mask-image:url(/assets/icons/${name})`;

const HEADER = `
  <header class="header">
    <div class="header__left">
      <button class="button-icon button-icon--medium button-icon--default" data-action="toggle-lnb" aria-label="메뉴 열기">
        <span class="button-icon__icon" style="${ICON('ic-menu-hamburger.svg')}"></span>
      </button>
      <div class="header__favorite-users">
        <div class="avatar-group">
          <div class="avatar avatar--small"><img src="/assets/avatars/male01.jpg" alt="User 1" class="avatar__image"></div>
          <div class="avatar avatar--small"><img src="/assets/avatars/female01.jpg" alt="User 2" class="avatar__image"></div>
          <div class="avatar avatar--small"><img src="/assets/avatars/male02.jpg" alt="User 3" class="avatar__image"></div>
          <div class="avatar avatar--small"><img src="/assets/avatars/female02.jpg" alt="User 4" class="avatar__image"></div>
        </div>
        <button class="avatar-group__add" aria-label="사용자 추가">
          <img src="/assets/icons/ic-plus.svg" alt="" class="avatar-group__add-icon">
        </button>
      </div>
    </div>
    <div class="header__logo">
      <img src="/assets/images/logo-nextep.svg" alt="Next EP" height="26" onerror="this.style.display='none'">
    </div>
    <div class="header__right">
      <div class="mode-switch" role="tablist" aria-label="모드 전환">
        <button class="mode-switch__btn" role="tab" aria-selected="false" data-mode="classic">
          <span class="mode-switch__icon"><img src="/assets/icons/ic-menu-grid.svg" alt="" width="24" height="24"></span>
          <span class="mode-switch__label">클래식</span>
        </button>
        <button class="mode-switch__btn is-active" role="tab" aria-selected="true" data-mode="ai">
          <span class="mode-switch__icon"><img src="/assets/icons/ic-star02.svg" alt="" width="24" height="24"></span>
          <span class="mode-switch__label">AI</span>
        </button>
      </div>
      <div class="header__right-btns">
        <button class="button-icon button-icon--medium button-icon--default" aria-label="검색">
          <span class="button-icon__icon" style="${ICON('ic-search.svg')}"></span>
        </button>
        <button class="button-icon button-icon--medium button-icon--default" aria-label="빠른 실행">
          <span class="button-icon__icon" style="${ICON('ic-bolt.svg')}"></span>
        </button>
        <button class="button-icon button-icon--medium button-icon--default" aria-label="알림">
          <span class="button-icon__icon" style="${ICON('ic-bell.svg')}"></span>
        </button>
        <button class="button-icon button-icon--medium button-icon--default" aria-label="설정">
          <span class="button-icon__icon" style="${ICON('ic-setting.svg')}"></span>
        </button>
        <button class="header__user-btn" aria-label="사용자 메뉴">
          <div class="header__user-avatar">
            <img src="/assets/icons/ic-user.svg" alt="" width="24" height="24">
          </div>
          <img src="/assets/icons/ic-caret-down02.svg" alt="" class="header__user-dropdown" width="20" height="20">
        </button>
      </div>
    </div>
  </header>
`;

const LNB = `
  <nav class="lnb" role="navigation" aria-label="메인 네비게이션">
    <div class="lnb-menu-group">
      <button class="lnb-menu-item" data-menu="home" title="홈">
        <span class="lnb-menu-icon"><span style="${ICON('ic-home01.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="workspace" title="워크스페이스">
        <span class="lnb-menu-icon"><span style="${ICON('ic-bag.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="chat" title="채팅">
        <span class="lnb-menu-icon"><span style="${ICON('ic-chat-circle.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="mail" title="메일">
        <span class="lnb-menu-icon"><span style="${ICON('ic-mail.svg')}"></span></span>
        <span class="klds-badge klds-badge--number">8</span>
      </button>
      <button class="lnb-menu-item active" data-menu="schedule" title="일정">
        <span class="lnb-menu-icon"><span style="${ICON('ic-calendar-days.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="files" title="자료실">
        <span class="lnb-menu-icon"><span style="${ICON('ic-folder1.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="video-meeting" title="화상회의">
        <span class="lnb-menu-icon"><span style="${ICON('ic-webcam.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="org" title="조직도">
        <span class="lnb-menu-icon"><span style="${ICON('ic-sitemap.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="collect" title="문서수합">
        <span class="lnb-menu-icon"><span style="${ICON('ic-file-document.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="apps" title="Apps">
        <span class="lnb-menu-icon"><span style="${ICON('ic-menu-apps.svg')}"></span></span>
      </button>
    </div>
    <div class="lnb-menu-bottom">
      <button class="lnb-menu-item" data-menu="todo" title="할 일">
        <span class="lnb-menu-icon"><span style="${ICON('ic-check02.svg')}"></span></span>
      </button>
      <button class="lnb-menu-item" data-menu="help" title="도움말">
        <span class="lnb-menu-icon"><span style="${ICON('ic-circle-help.svg')}"></span></span>
      </button>
    </div>
  </nav>
`;

const MIC_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 10C4 9.44772 4.44772 9 5 9C5.55228 9 6 9.44772 6 10C6 11.5913 6.63259 13.117 7.75781 14.2422C8.88303 15.3674 10.4087 16 12 16L12.2979 15.9922C13.7807 15.9185 15.1874 15.297 16.2422 14.2422C17.3674 13.117 18 11.5913 18 10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10C20 12.1217 19.1575 14.1569 17.6572 15.6572C16.3947 16.9198 14.7529 17.7137 13 17.9346V20H16C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21C7 20.4477 7.44772 20 8 20H11V17.9346C9.24713 17.7137 7.60532 16.9198 6.34277 15.6572C4.84248 14.1569 4 12.1217 4 10ZM14 5C14 4.46957 13.7891 3.96101 13.4141 3.58594C13.0858 3.25765 12.6553 3.05515 12.1973 3.00977L12 3C11.4696 3 10.961 3.21087 10.5859 3.58594C10.2109 3.96101 10 4.46957 10 5V10C10 10.5304 10.2109 11.039 10.5859 11.4141C10.961 11.7891 11.4696 12 12 12C12.5304 12 13.039 11.7891 13.4141 11.4141C13.7891 11.039 14 10.5304 14 10V5ZM16 10C16 11.0609 15.5783 12.078 14.8281 12.8281C14.078 13.5783 13.0609 14 12 14C10.9391 14 9.92202 13.5783 9.17188 12.8281C8.42173 12.078 8 11.0609 8 10V5C8 3.93913 8.42173 2.92202 9.17188 2.17188C9.92202 1.42173 10.9391 1 12 1L12.1982 1.00488C13.1869 1.0539 14.1248 1.46859 14.8281 2.17188C15.5783 2.92202 16 3.93913 16 5V10Z" fill="var(--klds-color-icon-black)"/></svg>`;

const EXPAND_SVG = `<svg class="ai-assistant__icon-expand" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6C20 5.73478 19.8946 5.48051 19.707 5.29297C19.5429 5.12883 19.3276 5.02757 19.0986 5.00488L19 5H16V19H19C19.2652 19 19.5195 18.8946 19.707 18.707C19.8946 18.5195 20 18.2652 20 18V6ZM4 18L4.00488 18.0986C4.02757 18.3276 4.12883 18.5429 4.29297 18.707C4.48051 18.8946 4.73478 19 5 19H14V5H5C4.73478 5 4.4805 5.10543 4.29297 5.29297C4.10543 5.4805 4 5.73478 4 6V18ZM22 18C22 18.7957 21.6837 19.5585 21.1211 20.1211C20.5585 20.6837 19.7957 21 19 21H5C4.20435 21 3.44151 20.6837 2.87891 20.1211C2.3163 19.5585 2 18.7956 2 18V6C2 5.20435 2.3163 4.44152 2.87891 3.87891C3.44152 3.3163 4.20435 3 5 3H19C19.7957 3 20.5585 3.3163 21.1211 3.87891C21.6837 4.44151 22 5.20435 22 6V18Z" fill="var(--klds-color-black)"/></svg>`;

const CLOSE_SVG = `<svg class="ai-assistant__icon-close" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.79289 5.29289C5.18342 4.90237 5.81658 4.90237 6.20711 5.29289L11.5 10.5858L16.7929 5.29289C17.1835 4.90237 17.8166 4.90237 18.2071 5.29289C18.5977 5.68342 18.5977 6.31658 18.2071 6.70711L12.9142 12L18.2071 17.2929C18.5976 17.6834 18.5976 18.3165 18.2071 18.7071C17.8165 19.0976 17.1834 19.0976 16.7929 18.7071L11.5 13.4142L6.20711 18.7071C5.81658 19.0977 5.18342 19.0977 4.79289 18.7071C4.40237 18.3166 4.40237 17.6835 4.79289 17.2929L10.0858 12L4.79289 6.70711C4.40237 6.31658 4.40237 5.68342 4.79289 5.29289Z" fill="var(--klds-color-black)"/></svg>`;

const AI_ASSISTANT = `
  <aside class="ai-assistant">

    <div class="ai-assistant__left-menu">
      <div class="ai-assistant__left-top">
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-pencil05.svg')}"></span>
          <span class="ai-assistant__item-label">새 채팅</span>
        </div>
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-book.svg')}"></span>
          <span class="ai-assistant__item-label">AI Note</span>
        </div>
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-chat-voice.svg')}"></span>
          <span class="ai-assistant__item-label">브리핑 설정</span>
        </div>
      </div>
      <div class="ai-assistant__left-group">
        <div class="ai-assistant__left-group-title">Project</div>
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-folder1.svg')}"></span>
          <span class="ai-assistant__item-label">번역</span>
        </div>
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-folder1.svg')}"></span>
          <span class="ai-assistant__item-label">3D Image</span>
        </div>
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-folder1.svg')}"></span>
          <span class="ai-assistant__item-label">2D Illust Image</span>
        </div>
      </div>
      <div class="ai-assistant__left-group">
        <div class="ai-assistant__left-group-title">AI Builder</div>
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-bulb.svg')}"></span>
          <span class="ai-assistant__item-label">Co Work</span>
        </div>
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-terminal.svg')}"></span>
          <span class="ai-assistant__item-label">Automation</span>
        </div>
        <div class="ai-assistant__left-item">
          <span class="ai-assistant__item-icon" style="${ICON('ic-chart-line.svg')}"></span>
          <span class="ai-assistant__item-label">Report</span>
        </div>
      </div>
      <div class="ai-assistant__left-group">
        <div class="ai-assistant__left-group-title">요청한 업무</div>
        <div class="ai-assistant__left-item"><span class="ai-assistant__item-label">IT 시장 상황</span></div>
        <div class="ai-assistant__left-item"><span class="ai-assistant__item-label">4월 17일 연차 신청</span></div>
        <div class="ai-assistant__left-item"><span class="ai-assistant__item-label">Pencil.dev 버튼 상태 처리</span></div>
        <div class="ai-assistant__left-item"><span class="ai-assistant__item-label">PPT 제작 핵심 스킬</span></div>
      </div>
    </div>

    <div class="ai-assistant__default">
      <div class="ai-assistant__wrap">
        <header class="ai-assistant__header">
          <button class="ai-assistant__btn-maximize" aria-label="사이드바 확장">
            ${EXPAND_SVG}
            <h1 class="ai-assistant__title">AI Assistant</h1>
          </button>
          <button class="ai-assistant__btn-close" aria-label="닫기">
            ${CLOSE_SVG}
            <span class="ai-assistant__icon-collapse-btn" style="${ICON('ic-minimize02.svg')}"></span>
          </button>
        </header>

        <div class="ai-assistant__contents">
          <h2 class="ai-assistant__greeting">
            <span class="ai-assistant__greeting-name">박소정님</span>의 업무를<br>스마트하게 도와드립니다.
          </h2>
          <div class="ai-assistant__btn-list">
            <button class="ai-assistant__btn" data-action="rocket">
              <div class="ai-assistant__btn-icon"><img src="/assets/ai-assistant/icon-rocket.svg" alt=""></div>
              <p class="ai-assistant__btn-label">브리핑 보기</p>
            </button>
            <button class="ai-assistant__btn" data-action="mail">
              <div class="ai-assistant__btn-icon"><img src="/assets/ai-assistant/icon-mail.svg" alt=""></div>
              <p class="ai-assistant__btn-label">안읽은 메일 요약</p>
            </button>
            <button class="ai-assistant__btn" data-action="calendar">
              <div class="ai-assistant__btn-icon"><img src="/assets/ai-assistant/icon-calendar.svg" alt=""></div>
              <p class="ai-assistant__btn-label">이번주 일정 확인</p>
            </button>
            <button class="ai-assistant__btn" data-action="beach-ball">
              <div class="ai-assistant__btn-icon"><img src="/assets/ai-assistant/icon-beach-ball.svg" alt=""></div>
              <p class="ai-assistant__btn-label">연차 휴가 등록</p>
            </button>
            <button class="ai-assistant__btn" data-action="reserve">
              <div class="ai-assistant__btn-icon"><img src="/assets/ai-assistant/icon-reserve.svg" alt=""></div>
              <p class="ai-assistant__btn-label">회의실 예약</p>
            </button>
            <button class="ai-assistant__btn" data-action="meeting-minutes">
              <div class="ai-assistant__btn-icon"><img src="/assets/ai-assistant/icon-meeting-minutes.svg" alt=""></div>
              <p class="ai-assistant__btn-label">회의록 작성</p>
            </button>
          </div>
        </div>

        <div class="ai-assistant__prompt">
          <div class="prompt" data-base-path="/assets/icons/">
            <div class="prompt__wrap">
              <button class="prompt__btn-global" aria-label="글로벌 옵션">
                <img src="/assets/icons/ic-global.svg" alt="" width="24" height="24">
              </button>
              <textarea class="prompt__input" placeholder="원하는 업무를 입력하세요." rows="1" aria-label="프롬프트 입력"></textarea>
              <div class="prompt__right-btns">
                <button class="prompt__btn prompt__btn--mic" aria-label="음성 입력">${MIC_SVG}</button>
                <button class="prompt__btn prompt__btn--send" aria-label="전송" disabled>
                  <span class="prompt__btn-icon" style="${ICON('ic-arrow-circle-up02.svg')}"></span>
                </button>
              </div>
              <div class="prompt__btns"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ai-assistant__right-menu">
      <div class="tabs tabs--pill">
        <button class="tab tab--pill tab--active" data-tab="template"><span class="tab__label">Template</span></button>
        <button class="tab tab--pill" data-tab="my-data"><span class="tab__label">My Data</span></button>
      </div>
      <div class="ai-assistant__right-content">
        <div class="ai-assistant__tmpl-group">
          <div class="ai-assistant__tmpl-title">
            <span class="ai-assistant__tmpl-icon" style="${ICON('ic-caret-down02.svg')}"></span>
            <span>마케팅</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>마케팅 자료 생성</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>리뷰 분석</span>
          </div>
        </div>
        <div class="ai-assistant__tmpl-group">
          <div class="ai-assistant__tmpl-title">
            <span class="ai-assistant__tmpl-icon" style="${ICON('ic-caret-down02.svg')}"></span>
            <span>메일</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>어제 수신한 메일 요약</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>미확인 메일 요약</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>메일 작성</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>메일 검색</span>
          </div>
        </div>
        <div class="ai-assistant__tmpl-group">
          <div class="ai-assistant__tmpl-title">
            <span class="ai-assistant__tmpl-icon" style="${ICON('ic-caret-down02.svg')}"></span>
            <span>일정</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>오늘 일정</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>이번주 일정</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>다음주 일정</span>
          </div>
        </div>
        <div class="ai-assistant__tmpl-group">
          <div class="ai-assistant__tmpl-title">
            <span class="ai-assistant__tmpl-icon" style="${ICON('ic-caret-down02.svg')}"></span>
            <span>전자결재</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>결재 현황 조회</span>
          </div>
          <div class="ai-assistant__tmpl-item">
            <span class="ai-assistant__tmpl-sub-icon" style="${ICON('ic-caret-down-left.svg')}"></span>
            <span>기안 작성</span>
          </div>
        </div>
      </div>
    </div>

  </aside>
`;

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Layout',
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="layout-container">
        ${HEADER}
        <div class="layout-main">
          ${LNB}
          <div class="layout-content">
            <div class="layout-content__work-area">
              <div style="color:#374151;font-size:16px;">메인 콘텐츠 영역</div>
            </div>
            ${AI_ASSISTANT}
            <button class="button-icon button-icon--fab layout-fab" aria-label="AI Assistant 열기">
              <span class="button-icon__icon" style="${ICON('ic-star02.svg')}"></span>
            </button>
          </div>
        </div>
        <div class="layout-overlay" aria-hidden="true"></div>
      </div>
    `;

    requestAnimationFrame(() => {
      const container = wrapper.querySelector('.layout-container');
      if (container) CommonLayout.init(container);

      const aiEl = wrapper.querySelector('.ai-assistant');
      if (aiEl && !aiEl.dataset.aiAssistantInitialized) {
        new AIAssistant(aiEl);
        aiEl.dataset.aiAssistantInitialized = 'true';
      }

      const promptEl = wrapper.querySelector('.prompt');
      if (promptEl && !promptEl.dataset.promptInitialized) {
        new Prompt(promptEl);
        promptEl.dataset.promptInitialized = 'true';
      }

      wrapper.querySelectorAll('.tabs').forEach((t) => {
        if (window.KLDSTabs) window.KLDSTabs.init(t);
      });
    });

    return wrapper;
  },
};
