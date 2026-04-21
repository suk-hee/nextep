# Tab Component

탭 내비게이션 컴포넌트 (Pill / Line)

## Figma

- **Component**: `tab` (1:17432)
- **Variants**:
  - `type=pill, active=false/true` — Pill 형태 (배경 + 둥근 모서리)
  - `type=line, active=false/true` — 언더라인 형태 (하단 primary 라인)

## 구조

```
tab/
├── tab.css         # 탭 스타일 (pill/line)
├── tab.html        # 마크업 템플릿
├── tab.js          # 탭 전환 + 키보드 네비게이션
└── README.md
```

## 사용법

### Pill 탭 (type=pill)

```html
<div class="tabs tabs--pill">
  <button class="tab tab--pill tab--active" data-tab="today">
    <span class="tab__icon" data-icon="ic-calendar-event"></span>
    <span class="tab__label">Today</span>
  </button>
  <button class="tab tab--pill" data-tab="weekly">
    <span class="tab__icon" data-icon="ic-calendar-week"></span>
    <span class="tab__label">Weekly</span>
  </button>
  <button class="tab tab--pill" data-tab="monthly">
    <span class="tab__icon" data-icon="ic-calendar-30"></span>
    <span class="tab__label">Monthly</span>
  </button>
</div>
```

**특징:**
- 배경: 투명 (일반) / `#121212` (active)
- 텍스트: `#121212` (일반) / `#FFFFFF` (active)
- 아이콘: 선택 사항 (`.tab__icon` 생략 가능)
- padding: `8px 16px`
- border-radius: `9999px`

### Line 탭 (type=line)

```html
<div class="tabs tabs--line">
  <button class="tab tab--line tab--active" data-tab="me">
    <span class="tab__label">Me</span>
  </button>
  <button class="tab tab--line" data-tab="team">
    <span class="tab__label">Team</span>
  </button>
  <button class="tab tab--line" data-tab="company">
    <span class="tab__label">Company</span>
  </button>
</div>
```

**특징:**
- 배경: 투명 (배경 없음)
- 텍스트: `#9CA3AF` (일반) / `#121212` (active)
- 언더라인: active 시 하단 2px `#005386`
- 아이콘: 선택 사항 (`.tab__icon` 추가 가능)

### 아이콘 옵션

아이콘은 `data-icon` 속성으로 지정:

```html
<span class="tab__icon" data-icon="ic-calendar-event"></span>
<span class="tab__icon" data-icon="ic-calendar-week"></span>
<span class="tab__icon" data-icon="ic-calendar-30"></span>
<span class="tab__icon" data-icon="ic-mail"></span>
```

**추가 아이콘 등록** (tab.css에 추가):

```css
.tab__icon[data-icon="ic-custom"] {
  -webkit-mask-image: url(../../assets/icons/ic-custom.svg);
  mask-image: url(../../assets/icons/ic-custom.svg);
}
```

### Disabled 상태

```html
<button class="tab tab--pill" disabled>
  <span class="tab__label">Disabled</span>
</button>
```

## JavaScript API

### 자동 초기화

`tab.js`를 포함하면 자동으로 모든 `.tabs` 컨테이너가 초기화됩니다.

```html
<script src="components/tab/tab.js"></script>
```

### 수동 초기화

```javascript
// 특정 탭 그룹 초기화
const tabsContainer = document.querySelector('.tabs');
window.KLDSTabs.init(tabsContainer);

// 모든 탭 그룹 재초기화
window.KLDSTabs.initAll();
```

### 이벤트 리스너

탭 변경 시 `tab:change` 커스텀 이벤트 발행:

```javascript
document.querySelector('.tabs').addEventListener('tab:change', function(e) {
  console.log('Tab changed:', e.detail);
  // e.detail.tab — 클릭된 탭 요소
  // e.detail.tabId — data-tab 값
  // e.detail.index — 탭 인덱스 (0부터)
});
```

### 키보드 네비게이션

- `Arrow Left` — 이전 탭 선택
- `Arrow Right` — 다음 탭 선택
- `Home` — 첫 번째 탭 선택
- `End` — 마지막 탭 선택

## 디자인 토큰

| 속성 | Pill | Line |
|------|------|------|
| **gap** | `--klds-spacing-xs` (8px) | `--klds-gap-3` (8px) |
| **container gap** | `--klds-gap-3` (8px) | `--klds-gap-7` (24px) |
| **padding** | `8px 16px` | `12px 0 16px 0` |
| **height** | auto (py 8px) | 44px |
| **border-radius** | `--klds-radius-circle` (9999px) | 없음 |
| **배경 (일반)** | transparent | transparent |
| **배경 (active)** | `--klds-color-black` (#121212) | transparent |
| **텍스트/아이콘 (일반)** | `--klds-color-text-black` (#121212) | `--klds-color-text-placeholder` (#9CA3AF) |
| **텍스트/아이콘 (active)** | `--klds-color-white` (#FFFFFF) | `--klds-color-text-black` (#121212) |
| **아이콘 크기** | `--klds-height-4` (24px) | `--klds-height-4` (24px) |
| **언더라인 (active)** | — | 2px `--klds-color-primary` (#005386) |

## 예제

### 텍스트만 있는 Pill 탭

```html
<div class="tabs tabs--pill">
  <button class="tab tab--pill tab--active">
    <span class="tab__label">All</span>
  </button>
  <button class="tab tab--pill">
    <span class="tab__label">Active</span>
  </button>
</div>
```

### 아이콘 있는 Line 탭

```html
<div class="tabs tabs--line">
  <button class="tab tab--line tab--active">
    <span class="tab__icon" data-icon="ic-mail"></span>
    <span class="tab__label">Inbox</span>
  </button>
  <button class="tab tab--line">
    <span class="tab__icon" data-icon="ic-mail"></span>
    <span class="tab__label">Sent</span>
  </button>
</div>
```

## 접근성 (Accessibility)

- `role="tablist"` — `.tabs` 컨테이너
- `role="tab"` — `.tab` 버튼
- `aria-selected="true/false"` — active 상태
- `tabindex="0/-1"` — 키보드 포커스 관리
- `focus-visible` — 키보드 포커스 시 outline 표시

## 브라우저 지원

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- mask-image를 지원하는 모든 모던 브라우저
