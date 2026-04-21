# Timetable Component

하루 업무를 시간대별로 확인하는 타임테이블 컴포넌트

## Figma

- **Component**: `timetable` (136:6561)
- **Variants**:
  - `type=me` (136:6559) — 내 업무 (1행, 체크박스 없음)
  - `type=another` (136:6560) — 다른 사람 업무 (다수행, 체크박스 있음)

## 파일 구조

```
timetable/
├── timetable.css     # 스타일
├── timetable.html    # 마크업 템플릿
├── timetable.js      # 체크박스 토글 + 동적 렌더링 API
└── README.md
```

## 사용법

### type=me (내 업무)

```html
<link rel="stylesheet" href="components/avatar/avatar.css">
<link rel="stylesheet" href="components/timetable/timetable.css">

<div class="timetable">
  <div class="timetable__thead">
    <div class="timetable__th timetable__th--name">이름</div>
    <div class="timetable__th timetable__th--time">08:00</div>
    <!-- ... 09:00 ~ 19:00 -->
  </div>
  <div class="timetable__row">
    <div class="timetable__cell-user">
      <div class="timetable__user-info">
        <div class="avatar avatar--small">
          <img src="avatars/user.jpg" alt="박소정" class="avatar__image">
        </div>
        <div class="timetable__user-text">
          <span class="timetable__user-name">박소정</span>
          <span class="timetable__user-role">차장</span>
        </div>
      </div>
    </div>
    <div class="timetable__cell-time">
      <div class="timetable__grid">
        <!-- 24개 그리드 셀 -->
        <div class="timetable__grid-cell"></div>
        <div class="timetable__grid-cell timetable__grid-cell--half"></div>
        <!-- ... 반복 -->

        <!-- 이벤트 -->
        <div class="timetable__event timetable__event--green" style="left: 4.2%; width: 12.5%;">
          <span class="timetable__event-text">회의</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### type=another (다른 사람 업무)

```html
<div class="timetable">
  <div class="timetable__thead">
    <div class="timetable__th timetable__th--checkbox"></div>
    <div class="timetable__th timetable__th--name">이름</div>
    <div class="timetable__th timetable__th--time">08:00</div>
    <!-- ... -->
  </div>
  <div class="timetable__row timetable__row--border timetable__row--checked">
    <div class="timetable__cell-checkbox">
      <div class="timetable__checkbox timetable__checkbox--checked" data-checked="true">
        <span class="timetable__check-icon">
          <svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.5L4.5 7L11 1" stroke="white" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
    <!-- 사용자 + 시간 그리드 -->
  </div>
</div>
```

## 이벤트 색상

| 색상 | CSS 클래스 | 배경 | 텍스트 | 용도 |
|------|-----------|------|--------|------|
| green | `timetable__event--green` | #D9F7BE | #389E0D | 일반 회의/미팅 |
| lightblue | `timetable__event--lightblue` | #BAE7FF | #096DD9 | 면접/디자인 |
| purple | `timetable__event--purple` | #EFDBFF | #722ED1 | 행사/세미나 |
| orange | `timetable__event--orange` | #FFF1B8 | #D48806 | 외부 미팅 |
| mint | `timetable__event--mint` | #B5F5EC | #08979C | 인터뷰 |
| ai | `timetable__event--ai` | #FFFFFF | #005386 | AI 추천 일정 (pill) |

## 이벤트 위치 계산

이벤트의 `left`와 `width`는 08:00~19:00(11시간, 660분) 기준 퍼센트로 계산:

```
left = ((시작시간 - 08:00) ÷ 660분) × 100%
width = ((종료시간 - 시작시간) ÷ 660분) × 100%

예: 10:00~12:00 이벤트
  left = (120 ÷ 660) × 100 ≈ 18.2%
  width = (120 ÷ 660) × 100 ≈ 18.2%
```

## JavaScript API

```html
<script src="components/timetable/timetable.js"></script>
```

### 자동 초기화

`timetable.js`를 포함하면 모든 `.timetable`이 자동 초기화됩니다.

### 수동 초기화

```javascript
// 특정 타임테이블 초기화
KLDSTimetable.init(document.querySelector('.timetable'));

// 모든 타임테이블 재초기화
KLDSTimetable.initAll();
```

### 동적 행 생성

```javascript
var rowHTML = KLDSTimetable.createRowHTML({
  name: '김철수',
  role: '과장',
  avatar: 'avatars/male01.jpg',
  hasCheckbox: true,
  checked: false,
  hasBorder: true,
  events: [
    { title: '팀 미팅', start: '09:00', end: '10:30', color: 'green' },
    { title: '코드 리뷰', start: '14:00', end: '15:00', color: 'lightblue' }
  ]
});

document.querySelector('.timetable').insertAdjacentHTML('beforeend', rowHTML);
KLDSTimetable.initAll(); // 새 체크박스 바인딩
```

### 이벤트 리스너

```javascript
document.querySelector('.timetable').addEventListener('timetable:checkchange', function(e) {
  console.log('Check changed:', e.detail);
  // e.detail.row — 변경된 행
  // e.detail.checked — 체크 상태
  // e.detail.checkbox — 체크박스 요소
});
```

## 의존 컴포넌트

- **avatar** (`components/avatar/avatar.css`) — 사용자 프로필 이미지
- **tokens** (`styles/tokens.css`) — KLDS 디자인 토큰

## 디자인 토큰 매핑

| 속성 | 토큰 | 값 |
|------|------|-----|
| 컨테이너 배경 | `--klds-color-white` | #FFFFFF |
| 컨테이너 border | `--klds-color-border-default` | #E5E7EB |
| 컨테이너 radius | `--klds-radius-m` | 16px |
| 헤더 높이 | — | 40px |
| 행 높이 | — | 60px |
| 이름 열 너비 | — | 150px |
| 체크박스 열 너비 | — | 44px |
| 체크박스 크기 | — | 20x20px |
| 체크박스 체크 색상 | `--klds-color-primary` | #005386 |
| 선택 행 배경 | `--klds-color-background-checked` | #F0F5FF |
| 이벤트 높이 | — | 32px |
| 이벤트 radius | `--klds-radius-xs` | 8px |
| 정시 셀 border | `--klds-color-border-default` | #E5E7EB |
| 30분 셀 border | `--klds-color-gray-gray02` | #F3F4F6 |
