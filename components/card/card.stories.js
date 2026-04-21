import './dynamic-card.css';
import '../tag/tag.css';
import '../button/button.css';
import '../button/button-icon.css';

const ICON = (name) =>
  `-webkit-mask-image:url(/assets/icons/${name});mask-image:url(/assets/icons/${name})`;

const NEWS_FALLBACK = `this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23CBD0D7%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%23ffffff%22 font-family=%22sans-serif%22 font-size=%2214%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22>Image</text></svg>'`;

const CARD_MAIL_LAYER1 = `
  <div class="dynamic-card dynamic-card--mail">
    <div class="dynamic-card__header">
      <div class="dynamic-card__title">
        <span class="dynamic-card__title-icon" style="${ICON('ic-mail.svg')}"></span>
        <span class="dynamic-card__title-text">메일</span>
      </div>
      <button class="dynamic-card__close" aria-label="닫기"><span class="dynamic-card__close-icon"></span></button>
    </div>
    <div class="dynamic-card__contents">
      <div class="dynamic-card__info">
        <div class="dynamic-card__user">
          <div class="dynamic-card__avatar">
            <img src="/assets/avatars/female01.jpg" alt="윤지영" />
            <span class="dynamic-card__avatar-status dynamic-card__avatar-status--online"></span>
          </div>
          <div class="dynamic-card__user-info">
            <p class="dynamic-card__user-meta">윤지영ㆍ11-04 (화) 오전 11:32</p>
            <p class="dynamic-card__user-subject">EP 제안 요청서</p>
          </div>
        </div>
        <div class="dynamic-card__mail-contents">
          <span class="klds-tag klds-tag--small klds-tag--red"><span class="klds-tag__label">긴급</span></span>
          <div class="dynamic-card__summary-item">
            <span class="dynamic-card__summary-bullet"></span>
            <p class="dynamic-card__summary-text">긴급건으로 11월 5일 오전 중으로 파일을 전달해야 돼요.</p>
          </div>
          <div class="dynamic-card__summary-item">
            <span class="dynamic-card__summary-icon dynamic-card__summary-icon--star"></span>
            <p class="dynamic-card__summary-text">11월 5일 오후 3시에 회의 참석을 요청했어요. 일정에 등록할까요?</p>
          </div>
        </div>
      </div>
      <div class="dynamic-card__bottom">
        <div class="dynamic-card__left-btns">
          <button class="button button--small button--outline-secondary">
            <span class="button__icon" style="${ICON('ic-star02.svg')}"></span><span>AI 답장</span>
          </button>
          <button class="button button--small button--outline-secondary">
            <span class="button__icon" style="${ICON('ic-check02.svg')}"></span><span>할일 등록</span>
          </button>
        </div>
        <div class="dynamic-card__right-btns">
          <button class="button-icon button-icon--small button-icon--default" aria-label="더보기">
            <span class="button-icon__icon" style="${ICON('ic-more-horizontal.svg')}"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

const CARD_APPROVAL_LAYER1 = `
  <div class="dynamic-card dynamic-card--approval">
    <div class="dynamic-card__header">
      <div class="dynamic-card__title">
        <span class="dynamic-card__title-icon" style="${ICON('ic-stamp.svg')}"></span>
        <span class="dynamic-card__title-text">결재</span>
      </div>
      <button class="dynamic-card__close" aria-label="닫기"><span class="dynamic-card__close-icon"></span></button>
    </div>
    <div class="dynamic-card__contents">
      <div class="dynamic-card__info">
        <div class="dynamic-card__user">
          <div class="dynamic-card__avatar">
            <img src="/assets/avatars/female01.jpg" alt="윤지영" />
            <span class="dynamic-card__avatar-status dynamic-card__avatar-status--online"></span>
          </div>
          <div class="dynamic-card__user-info">
            <p class="dynamic-card__user-meta">윤지영ㆍ11-04 (화) 오전 11:32</p>
            <p class="dynamic-card__user-subject">경비청구 지불 요청서</p>
          </div>
        </div>
        <div class="dynamic-card__approval-body">
          <span class="klds-tag klds-tag--small klds-tag--red"><span class="klds-tag__label">반려 추천</span></span>
          <p class="dynamic-card__approval-text">예산 초과 및 세부내역이 누락되었어요.</p>
        </div>
      </div>
      <div class="dynamic-card__bottom">
        <div class="dynamic-card__left-btns">
          <button class="button button--small button--outline-secondary">
            <span class="button__icon" style="${ICON('ic-check.svg')}"></span><span>승인</span>
          </button>
          <button class="button button--small button--outline-secondary">
            <span class="button__icon" style="${ICON('ic-circle-refusal.svg')}"></span><span>반려</span>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

const CARD_VIDEOMEETING_LAYER1 = `
  <div class="dynamic-card dynamic-card--videomeeting">
    <div class="dynamic-card__header">
      <div class="dynamic-card__title">
        <span class="dynamic-card__title-icon" style="${ICON('ic-webcam.svg')}"></span>
        <span class="dynamic-card__title-text">화상회의</span>
      </div>
      <button class="dynamic-card__close" aria-label="닫기"><span class="dynamic-card__close-icon"></span></button>
    </div>
    <div class="dynamic-card__contents">
      <div class="dynamic-card__info">
        <span class="klds-tag klds-tag--small klds-tag--orange"><span class="klds-tag__label">오전 11:00 - 오전 12:00</span></span>
        <div class="dynamic-card__meeting-body">
          <p class="dynamic-card__meeting-title">디자인 시스템 컴포넌트 회의</p>
          <p class="dynamic-card__meeting-desc">신규 컴포넌트와 구 컴포넌트 관리에 대해 개발자와 함께 논의해요.</p>
        </div>
        <div class="dynamic-card__attendees">
          <div class="dynamic-card__avatar-group-stack">
            <div class="dynamic-card__avatar-small"><img src="/assets/avatars/init.jpg" alt="참석자1" /></div>
            <div class="dynamic-card__avatar-small"><img src="/assets/avatars/female02.jpg" alt="참석자2" /></div>
            <div class="dynamic-card__avatar-small"><img src="/assets/avatars/male01.jpg" alt="참석자3" /></div>
            <span class="dynamic-card__avatar-more">+3</span>
          </div>
        </div>
      </div>
      <div class="dynamic-card__bottom">
        <div class="dynamic-card__left-btns">
          <button class="button button--small button--outline-secondary">
            <span class="button__icon" style="${ICON('ic-login.svg')}"></span><span>회의 입장</span>
          </button>
          <button class="button button--small button--outline-secondary">
            <span class="button__icon" style="${ICON('ic-file-document.svg')}"></span><span>지난 회의 요약</span>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

const CARD_SCHEDULE_LAYER1 = `
  <div class="dynamic-card dynamic-card--schedule">
    <div class="dynamic-card__header">
      <div class="dynamic-card__title">
        <span class="dynamic-card__title-icon" style="${ICON('ic-calendar-days.svg')}"></span>
        <span class="dynamic-card__title-text">일정</span>
      </div>
      <button class="dynamic-card__close" aria-label="닫기"><span class="dynamic-card__close-icon"></span></button>
    </div>
    <div class="dynamic-card__contents">
      <div class="dynamic-card__info">
        <span class="klds-tag klds-tag--small klds-tag--orange"><span class="klds-tag__label">오후 3:00 - 오후 4:00</span></span>
        <p class="dynamic-card__schedule-title">웨비나 행사 회의</p>
        <p class="dynamic-card__schedule-desc">마케팅팀과 함께 행사 아젠다와 부스 디자인을 회의해요.</p>
        <div class="dynamic-card__attendees-large">
          <div class="dynamic-card__avatar-group-stack">
            <div class="dynamic-card__avatar-small"><img src="/assets/avatars/init.jpg" alt="참석자1" /></div>
            <div class="dynamic-card__avatar-small"><img src="/assets/avatars/female02.jpg" alt="참석자2" /></div>
            <div class="dynamic-card__avatar-small"><img src="/assets/avatars/male01.jpg" alt="참석자3" /></div>
            <div class="dynamic-card__avatar-small"><img src="/assets/avatars/male02.jpg" alt="참석자4" /></div>
          </div>
        </div>
      </div>
      <div class="dynamic-card__bottom">
        <div class="dynamic-card__left-btns">
          <button class="button button--small button--outline-secondary">
            <span class="button__icon" style="${ICON('ic-compass.svg')}"></span><span>회의실 조회</span>
          </button>
          <button class="button button--small button--outline-secondary">
            <span class="button__icon" style="${ICON('ic-file-document.svg')}"></span><span>지난 회의 요약</span>
          </button>
        </div>
      </div>
    </div>
  </div>
`;

const CARD_NEWS_LAYER1 = `
  <div class="dynamic-card dynamic-card--news">
    <div class="dynamic-card__header">
      <div class="dynamic-card__title">
        <span class="dynamic-card__title-icon" style="${ICON('ic-news.svg')}"></span>
        <span class="dynamic-card__title-text">뉴스</span>
      </div>
      <button class="dynamic-card__close" aria-label="닫기"><span class="dynamic-card__close-icon"></span></button>
    </div>
    <div class="dynamic-card__contents">
      <div class="dynamic-card__info">
        <div class="dynamic-card__news-thumb">
          <img src="/assets/news/placeholder.jpg" alt="뉴스 썸네일" onerror="${NEWS_FALLBACK}" />
        </div>
        <div class="dynamic-card__news-wrap-info">
          <div class="dynamic-card__news-summary">
            <p class="dynamic-card__news-title">포스코 그룹 이웃 연말 돕기 성금 100억 기탁</p>
            <p class="dynamic-card__news-desc">포스코 그룹이 사회복지 공동모금회에 연말 이웃돕기 성금 100억원을 기탁했다. 불확실한 경영 환경</p>
          </div>
          <div class="dynamic-card__bottom">
            <div class="dynamic-card__left-btns">
              <button class="button button--small button--outline-secondary">
                <span class="button__icon" style="${ICON('ic-external-link.svg')}"></span><span>원문보기</span>
              </button>
              <button class="button button--small button--outline-secondary">
                <span class="button__icon" style="${ICON('ic-share.svg')}"></span><span>기사 공유</span>
              </button>
            </div>
            <div class="dynamic-card__right-btns">
              <button class="button-icon button-icon--small button-icon--default" aria-label="더보기">
                <span class="button-icon__icon" style="${ICON('ic-more-horizontal.svg')}"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

function stackedActions() {
  return `
    <div class="dynamic-card__actions">
      <button class="dynamic-card__icon-btn" aria-label="확대">
        <span class="dynamic-card__icon-btn-icon" style="${ICON('ic-expand.svg')}"></span>
      </button>
      <button class="dynamic-card__icon-btn" aria-label="닫기">
        <span class="dynamic-card__icon-btn-icon" style="${ICON('ic-close-small.svg')}"></span>
      </button>
    </div>
  `;
}

const CARD_MAIL_LAYER2 = `
  <div class="dynamic-card-group dynamic-card-group--layer-2">
    <div class="dynamic-card-group__backdrop dynamic-card--mail"></div>
    <div class="dynamic-card dynamic-card--mail">
      <div class="dynamic-card__header">
        <div class="dynamic-card__title">
          <span class="dynamic-card__title-icon" style="${ICON('ic-mail.svg')}"></span>
          <span class="dynamic-card__title-text">메일</span>
          <span class="dynamic-card__badge">2</span>
        </div>
        ${stackedActions()}
      </div>
      <div class="dynamic-card__contents">
        <div class="dynamic-card__info">
          <div class="dynamic-card__user">
            <div class="dynamic-card__avatar">
              <img src="/assets/avatars/female01.jpg" alt="윤지영" />
            </div>
            <div class="dynamic-card__user-info">
              <p class="dynamic-card__user-meta">윤지영ㆍ11-04 (화) 오전 11:32</p>
              <p class="dynamic-card__user-subject">EP 제안 요청서</p>
            </div>
          </div>
          <div class="dynamic-card__mail-contents">
            <span class="klds-tag klds-tag--small klds-tag--red"><span class="klds-tag__label">긴급</span></span>
            <div class="dynamic-card__summary-item">
              <span class="dynamic-card__summary-bullet"></span>
              <p class="dynamic-card__summary-text">긴급건으로 11월 5일 오전 중으로 파일을 전달해야 돼요.</p>
            </div>
            <div class="dynamic-card__summary-item">
              <span class="dynamic-card__summary-icon dynamic-card__summary-icon--star"></span>
              <p class="dynamic-card__summary-text">11월 5일 오후 3시에 회의 참석을 요청했어요. <span class="dynamic-card__summary-link">일정에 등록할까요?</span></p>
            </div>
          </div>
        </div>
        <div class="dynamic-card__bottom">
          <div class="dynamic-card__left-btns">
            <button class="button button--small button--outline-secondary">
              <span class="button__icon" style="${ICON('ic-star02.svg')}"></span><span>AI 답장</span>
            </button>
            <button class="button button--small button--outline-secondary">
              <span class="button__icon" style="${ICON('ic-check02.svg')}"></span><span>할일 등록</span>
            </button>
          </div>
          <div class="dynamic-card__right-btns">
            <button class="button-icon button-icon--small button-icon--default" aria-label="더보기">
              <span class="button-icon__icon" style="${ICON('ic-more-horizontal.svg')}"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const CARD_MAIL_LAYER3 = `
  <div class="dynamic-card-group dynamic-card-group--layer-3">
    <div class="dynamic-card-group__backdrop-2 dynamic-card--mail"></div>
    <div class="dynamic-card-group__backdrop dynamic-card--mail"></div>
    <div class="dynamic-card dynamic-card--mail">
      <div class="dynamic-card__header">
        <div class="dynamic-card__title">
          <span class="dynamic-card__title-icon" style="${ICON('ic-mail.svg')}"></span>
          <span class="dynamic-card__title-text">메일</span>
          <span class="dynamic-card__badge">5</span>
        </div>
        ${stackedActions()}
      </div>
      <div class="dynamic-card__contents">
        <div class="dynamic-card__info">
          <div class="dynamic-card__user">
            <div class="dynamic-card__avatar">
              <img src="/assets/avatars/female01.jpg" alt="윤지영" />
            </div>
            <div class="dynamic-card__user-info">
              <p class="dynamic-card__user-meta">윤지영ㆍ11-04 (화) 오전 11:32</p>
              <p class="dynamic-card__user-subject">EP 제안 요청서</p>
            </div>
          </div>
          <div class="dynamic-card__mail-contents">
            <span class="klds-tag klds-tag--small klds-tag--red"><span class="klds-tag__label">긴급</span></span>
            <div class="dynamic-card__summary-item">
              <span class="dynamic-card__summary-bullet"></span>
              <p class="dynamic-card__summary-text">긴급건으로 11월 5일 오전 중으로 파일을 전달해야 돼요.</p>
            </div>
            <div class="dynamic-card__summary-item">
              <span class="dynamic-card__summary-icon dynamic-card__summary-icon--star"></span>
              <p class="dynamic-card__summary-text">11월 5일 오후 3시에 회의 참석을 요청했어요. <span class="dynamic-card__summary-link">일정에 등록할까요?</span></p>
            </div>
          </div>
        </div>
        <div class="dynamic-card__bottom">
          <div class="dynamic-card__left-btns">
            <button class="button button--small button--outline-secondary">
              <span class="button__icon" style="${ICON('ic-star02.svg')}"></span><span>AI 답장</span>
            </button>
            <button class="button button--small button--outline-secondary">
              <span class="button__icon" style="${ICON('ic-check02.svg')}"></span><span>할일 등록</span>
            </button>
          </div>
          <div class="dynamic-card__right-btns">
            <button class="button-icon button-icon--small button-icon--default" aria-label="더보기">
              <span class="button-icon__icon" style="${ICON('ic-more-horizontal.svg')}"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Card',
  parameters: { layout: 'centered' },
};

export const Mail = {
  render: () => `<div style="padding:24px;background:#f3f4f6;">${CARD_MAIL_LAYER1}</div>`,
};

export const Approval = {
  render: () => `<div style="padding:24px;background:#f3f4f6;">${CARD_APPROVAL_LAYER1}</div>`,
};

export const VideoMeeting = {
  render: () => `<div style="padding:24px;background:#f3f4f6;">${CARD_VIDEOMEETING_LAYER1}</div>`,
};

export const Schedule = {
  render: () => `<div style="padding:24px;background:#f3f4f6;">${CARD_SCHEDULE_LAYER1}</div>`,
};

export const News = {
  render: () => `<div style="padding:24px;background:#f3f4f6;">${CARD_NEWS_LAYER1}</div>`,
};

export const AllTypes = {
  render: () => `
    <div style="display:flex;flex-wrap:wrap;gap:24px;padding:24px;background:#f3f4f6;">
      ${CARD_MAIL_LAYER1}
      ${CARD_APPROVAL_LAYER1}
      ${CARD_VIDEOMEETING_LAYER1}
      ${CARD_SCHEDULE_LAYER1}
      ${CARD_NEWS_LAYER1}
    </div>
  `,
};

export const MailLayer2 = {
  name: 'Mail — Layer 2',
  render: () => `<div style="padding:40px;background:#f3f4f6;">${CARD_MAIL_LAYER2}</div>`,
};

export const MailLayer3 = {
  name: 'Mail — Layer 3',
  render: () => `<div style="padding:40px;background:#f3f4f6;">${CARD_MAIL_LAYER3}</div>`,
};
