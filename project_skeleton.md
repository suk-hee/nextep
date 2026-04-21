# 📐 NextEP Project Skeleton

> **AI 작업 시작 전 반드시 이 파일을 먼저 읽을 것.**  
> 프로젝트의 전체 구조, 컴포넌트 목록, 에셋 경로, 파일 역할을 정리한 맵입니다.  
> 자세한 구현 원칙은 `guide.md`, 디자인 토큰은 `styles/tokens.css`를 참고하세요.

---

## 📁 루트 디렉토리

```
nextep/
├── project-skeleton.md       ← 이 파일 (프로젝트 구조 맵)
├── guide.md                  ← KLDS 디자인 시스템 구현 가이드 (작업 원칙 총정리)
├── primitive_tokens.json     ← Primitive 컬러/타이포/스페이싱 원천 토큰 (Figma 연동)
├── sementic_tokens.json      ← Semantic 토큰 (Primitive alias, UI 의도별 분류)
├── daily-view.html           ← 메인 페이지 (WorkPanel 래퍼, 전체 레이아웃)
│
├── styles/                   ← 전역 스타일 (컴포넌트 CSS와 별개)
├── assets/                   ← 아이콘, 이미지, 아바타, AI 관련 에셋
├── components/               ← KLDS UI 컴포넌트 (HTML + CSS + JS + README)
├── demo/                     ← 컴포넌트별 preview 페이지
└── workpanel/                ← WorkPanel 화면 (메인 대시보드 UI)
```

---

## 🎨 styles/ — 전역 CSS

| 파일 | 역할 |
|------|------|
| `styles/tokens.css` | **핵심.** CSS 변수 전체 정의. Primitive + Semantic 토큰. 항상 최우선 import |
| `styles/reset.css` | 브라우저 기본 스타일 초기화 |
| `styles/global.css` | 전역 공통 스타일 (폰트, body 기본 설정 등) |
| `styles/daily-view.css` | daily-view.html 전용 레이아웃 스타일 |

### CSS 임포트 순서 (필수)
```html
<link rel="stylesheet" href="../styles/tokens.css">
<link rel="stylesheet" href="../styles/reset.css">
<link rel="stylesheet" href="../styles/global.css">
<!-- 이후 컴포넌트 CSS -->
```

---

## 🧩 components/ — UI 컴포넌트

> 각 컴포넌트는 `README.md`에 사용법이 정의되어 있음.  
> `components/components.js` : 주요 컴포넌트(Header, LNB, TopBox, BottomBox)를 HTML 문자열 상수로 export (workpanel.html에서 사용).

### 컴포넌트 목록

| 폴더 | 파일 | 설명 |
|------|------|------|
| `button/` | `button.css`, `button-icon.css`, `README.md` | 기본 버튼 + 아이콘 버튼. `.button`, `.button-icon` BEM 클래스 |
| `avatar/` | `avatar.css`, `avatar.js`, `README.md` | 사용자 아바타. `.avatar`, `.avatar-group` |
| `tag/` | `tag.html`, `tag.css`, `README.md` | 태그/뱃지. solid/outline, round/pill, 다양한 컬러 variant |
| `tab/` | `tab.html`, `tab.css`, `tab.js`, `FIGMA_MAPPING.md`, `README.md` | 탭. `tabs--pill` / `tabs--line` 두 가지 형태 |
| `timetable/` | `timetable.html`, `timetable.css`, `timetable.js`, `README.md` | 타임테이블. `type=me` (단일행) / `type=another` (체크박스 포함 다중행) |
| `table/` | `table.html`, `table.css` | 데이터 테이블. `.klds-table`, `.klds-table__header`, `.klds-table__row` |
| `pagination/` | `pagination.css`, `pagination.js`, `README.md` | 페이지네이션 |
| `checkbox/` | `checkbox.html`, `checkbox.css` | 체크박스 |
| `switch/` | `mode-switch.html`, `mode-switch.css`, `mode-switch.js` | 모드 전환 스위치 (클래식/AI) |
| `prompt/` | `prompt.html`, `prompt.css`, `prompt.js`, `README.md` | AI 프롬프트 입력 컴포넌트 |
| `ai-assistant/` | `ai-assistant.html`, `ai-assistant.css`, `ai-assistant.js`, `README.md` | AI 어시스턴트 패널 |
| `layout/` | (아래 세부 참고) | 공통 레이아웃 컴포넌트 |

### layout/ 하위 구조

```
components/layout/
├── common-layout.html / .css / .js / README.md  ← 전체 페이지 레이아웃 래퍼
├── header/
│   ├── header.html       ← 헤더 HTML 구조 (로고, 메뉴, 유저 버튼)
│   ├── header.css        ← 헤더 스타일 (.header, .header__left/right/logo)
│   └── README.md
└── lnb/
    ├── lnb.html          ← 사이드 내비게이션 HTML (.lnb, .lnb-menu-item)
    ├── lnb.css           ← LNB 스타일
    └── README.md
```

---

## 🖼️ assets/ — 정적 에셋

### 아이콘 (261개 SVG)
- **경로**: `assets/icons/ic-*.svg`
- **네이밍**: `ic-{이름}.svg` 형식
- **사용법**: `mask-image` CSS 방식 또는 `<img>` 태그
- **⚠️ 외부 CDN 아이콘 절대 금지**

```html
<!-- mask-image 방식 (색상 제어 필요 시) -->
<span class="button-icon__icon"
  style="-webkit-mask-image:url(/assets/icons/ic-plus.svg);mask-image:url(/assets/icons/ic-plus.svg)">
</span>

<!-- img 태그 방식 -->
<img src="../assets/icons/ic-filter.svg" alt="필터">
```

#### 주요 아이콘 목록 (자주 사용)

| 파일명 | 용도 |
|--------|------|
| `ic-plus.svg` | 추가/생성 버튼 |
| `ic-close.svg` / `ic-close-small.svg` | 닫기 |
| `ic-search.svg` | 검색 |
| `ic-bell.svg` | 알림 |
| `ic-setting.svg` | 설정 |
| `ic-menu-hamburger.svg` | 햄버거 메뉴 |
| `ic-caret-down01.svg` / `ic-caret-down02.svg` | 드롭다운 화살표 |
| `ic-caret-right01.svg` / `ic-caret-right02.svg` | 우측 화살표 |
| `ic-caret-left.svg` | 좌측 화살표 |
| `ic-check.svg` / `ic-check02.svg` | 체크 |
| `ic-calendar.svg` / `ic-calendar-event.svg` / `ic-calendar-week.svg` / `ic-calendar-30.svg` | 캘린더 관련 |
| `ic-home01.svg` / `ic-home02.svg` | 홈 |
| `ic-user.svg` / `ic-users.svg` | 사용자 |
| `ic-trash-empty.svg` / `ic-trash-full.svg` | 삭제 |
| `ic-pencil01.svg` ~ `ic-pencil05.svg` | 편집 |
| `ic-more-horizontal.svg` / `ic-more-vertical.svg` | 더보기 |
| `ic-arrow-left.svg` / `ic-arrow-up-right.svg` | 방향 화살표 |
| `ic-bolt.svg` | 빠른 실행 |
| `ic-star02.svg` / `ic-star03-fill.svg` | 별/AI 관련 |
| `ic-filter.svg` | 필터 |
| `ic-download.svg` | 다운로드 |
| `ic-info.svg` / `ic-circle-help.svg` | 정보/도움말 |
| `ic-chat-circle.svg` / `ic-chat.svg` | 채팅 |
| `ic-mail.svg` | 메일 |
| `ic-sitemap.svg` | 조직도 |
| `ic-folder1.svg` | 폴더 |
| `ic-webcam.svg` | 화상회의 |
| `ic-bag.svg` | 워크스페이스 |
| `ic-list-unordered.svg` | 리스트 |
| `ic-table.svg` | 테이블/보드 |
| `ic-sort.svg` / `ic-sort-asce.svg` / `ic-sort-desc.svg` | 정렬 |
| `ic-drag-vertical.svg` / `ic-drag-horizontal.svg` | 드래그 핸들 |

### 아바타 이미지 (14개 JPG)
- **경로**: `assets/avatars/`
- **파일**: `male01.jpg` ~ `male06.jpg`, `female01.jpg` ~ `female06.jpg`, `init.jpg`

### AI 어시스턴트 아이콘 (6개 SVG)
- **경로**: `assets/ai-assistant/`
- **파일**: `icon-beach-ball.svg`, `icon-calendar.svg`, `icon-mail.svg`, `icon-meeting-minutes.svg`, `icon-reserve.svg`, `icon-rocket.svg`

### 이미지
- **경로**: `assets/images/`
- 로고 등 일반 이미지

---

## 🖥️ workpanel/ — 메인 대시보드 화면

```
workpanel/
├── workpanel.html    ← WorkPanel 메인 HTML (Header + LNB + TopBox + BottomBox 조합)
├── workpanel.css     ← WorkPanel 전용 스타일
└── assets/
    ├── chart-my-task.svg       ← My Task 도넛 차트 SVG
    └── chart-request-task.svg  ← Request Task 도넛 차트 SVG
```

### workpanel.html 구조 개요
```
<div class="workpanel">
  <header class="header">            ← components/layout/header
  <nav class="lnb">                  ← components/layout/lnb
  <main class="workpanel__main">
    <div class="top-box">            ← 인사말 + My Task/Request Task 차트 카드
    <div class="bottom-box">         ← Today's Schedule (타임테이블 + Task Box + 미팅 카드)
```

---

## 🗂️ demo/ — 컴포넌트 Preview 페이지

| 파일 | 대상 컴포넌트 |
|------|--------------|
| `button_preview.html` | button, button-icon |
| `avatar-preview.html` | avatar |
| `tag_preview.html` | tag |
| `tab_preview.html` | tab |
| `timetable_preview.html` | timetable |
| `table_preview.html` | table |
| `pagination_preview.html` | pagination |
| `checkbox_preview.html` | checkbox |
| `prompt_preview.html` | prompt |
| `ai-assistant_preview.html` | ai-assistant |
| `header_preview.html` | layout/header |
| `lnb-preview.html` | layout/lnb |
| `common-layout_preview.html` | layout/common-layout |
| `mode-switch-preview.html` | switch/mode-switch |
| `icon-preview.html` | 전체 아이콘 목록 |

> **새 컴포넌트 데모 파일명 규칙**: `{컴포넌트명}_preview.html`  
> **저장 위치**: 반드시 `demo/` 폴더 안

---

## 🎨 디자인 토큰 요약 (tokens.css)

> 전체 토큰 목록은 `styles/tokens.css` 참고. 아래는 자주 쓰는 카테고리만 요약.

### Typography
```css
--klds-typography-fontfamily-text: "Pretendard"
--klds-typography-fontfamily-code: "Menlo"
--klds-typography-fontsize-{xxxs~xxxl}   /* 10px ~ 40px */
--klds-typography-fontweight-{regular|medium|semibold|bold}
--klds-typography-lineheight-{xs~xl}
```

### Spacing / Padding / Gap / Radius
```css
--klds-spacing-{1~12}        /* 2px ~ 48px */
--klds-padding-{1~12}        /* 동일 */
--klds-gap-{1~12}            /* 동일 */
--klds-radius-{xxxs|xxs|xs|s|m|l|xl|circle}
```

### Semantic Colors (UI에서 사용하는 토큰)
```css
/* 텍스트 */
--klds-color-text-black / -white / -primary / -secondary / -tertiary / -disabled / -invert

/* 아이콘 */
--klds-color-icon-black / -white / -primary / -gray / -disabled

/* 버튼 */
--klds-color-button-fill-surface           /* Primary 버튼 배경 */
--klds-color-button-fill-surface-hover
--klds-color-button-surface-disabled
--klds-color-button-border-disabled

/* 배경 */
--klds-color-bg-white / -gray / -primary-light

/* 테두리 */
--klds-color-border-default / -strong / -disabled

/* 상태 */
--klds-color-critical   /* 에러/위험 */
--klds-color-warning    /* 경고 */
--klds-color-success    /* 성공 */
--klds-color-info       /* 정보 */
```

### Primitive Colors (직접 사용 자제, Semantic 토큰 우선)
```css
/* 주요 팔레트 키 */
--klds-color-primary-primary{01~10}
--klds-color-gray-gray{01~10}
--klds-color-red-red{01~10}
--klds-color-orange-orange{01~10}
--klds-color-yellow-yellow{01~10}
--klds-color-lightgreen-lightgreen{01~10}
--klds-color-green-green{01~10}
--klds-color-mint-mint{01~10}
--klds-color-lightblue-lightblue{01~10}
--klds-color-blue-blue{01~10}
--klds-color-purple-purple{01~10}
--klds-color-pink-pink{01~10}
--klds-color-black / --klds-color-white
```

---

## ⚠️ 작업 시 필수 준수 사항

1. **Semantic 토큰 우선** — Primitive 토큰 직접 참조 금지 (단, 컬러 팔레트 독립 사용 시 예외)
2. **Hard-coded 값 금지** — `16px`, `#FFFFFF` 같은 원시값 사용 금지
3. **외부 라이브러리 금지** — Tailwind, Bootstrap, Font Awesome 등 절대 금지
4. **Figma 수치 준수** — 디자인에 없는 hover/shadow/transition 추가 금지
5. **아이콘은 `assets/icons/`에서만** — 외부 CDN 아이콘 금지
6. **컴포넌트 재사용** — 기존 `components/` 내 파일 최대한 활용
7. **데모는 `demo/`에** — `{이름}_preview.html` 파일명 규칙 준수

---

> 📌 최종 업데이트: 2026-03-03  
> 📌 관리: KMSLab Design System Team
