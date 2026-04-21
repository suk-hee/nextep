# Common Layout Component

KLDS (KMSLab Design System)의 Common Layout 컴포넌트입니다.

## 📋 개요

Next EP 애플리케이션의 공통 레이아웃을 구현한 컴포넌트입니다. Header와 LNB 컴포넌트를 재사용하며, 페이지별 컨텐츠를 삽입할 수 있는 슬롯 구조를 제공합니다.

## 🎨 Figma 디자인 기반

- **Figma Node ID**: `83:4818`
- **Component Name**: `Daily view`
- **Dimensions**: 1920×1080px
- **Layout**: VERTICAL
- **Background**: `#F0F5FF` (--klds-color-background-primary)

## 📐 구조

```
layout/
├── common-layout.css    # 레이아웃 스타일 (Design Tokens 기반)
├── common-layout.html   # 기본 마크업 (재사용 컴포넌트 활용)
├── common-layout.js     # 인터랙션 (LNB 토글, 메뉴 전환)
├── README.md            # 문서 (이 파일)
├── header/              # Header 컴포넌트 (재사용)
│   ├── header.css
│   ├── header.html
│   └── README.md
└── lnb/                 # LNB 컴포넌트 (재사용)
    ├── lnb.css
    ├── lnb.html
    └── README.md
```

## 🏗️ Figma 노드 트리 → HTML 매핑

```
Daily view (83:4818, FRAME, 1920×1080, VERTICAL)
├── header (83:4819, INSTANCE, 1920×80)          → <header class="header">
│   ├── header-left                              →   .header__left
│   │   ├── btn-menu                             →     .button-icon (재사용)
│   │   └── favority-user                        →     .header__favorite-users
│   ├── logo-nextep                              →   .header__logo
│   └── header-right                             →   .header__right
│       ├── mode-switch                          →     .mode-switch (재사용)
│       └── right-btns                           →     .header__right-btns
│
└── wrap (83:4820, FRAME, 1920×1000, HORIZONTAL)
    ├── lnb (83:4821, INSTANCE, 80×1000)         → <nav class="lnb">
    │   ├── group-menus                          →   .lnb-menu-group
    │   └── bottom                               →   .lnb-menu-bottom
    │
    └── contents (83:4822, FRAME, 1840×1000)     → <div class="layout-content">
        ├── work-area (83:4823, FRAME, 1232×976) →   .layout-content__work-area (슬롯)
        │     fills: #FFF, radius: 24, padding: 32, gap: 32
        └── ai-assistant (83:4935, INSTANCE)     →   .ai-assistant (재사용)
```

## 🔧 사용 방법

### CSS 임포트

```html
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="components/avatar/avatar.css">
<link rel="stylesheet" href="components/switch/mode-switch.css">
<link rel="stylesheet" href="components/button/button-icon.css">
<link rel="stylesheet" href="components/layout/header/header.css">
<link rel="stylesheet" href="components/layout/lnb/lnb.css">
<link rel="stylesheet" href="components/layout/common-layout.css">
```

### JS 임포트

```html
<script src="components/switch/mode-switch.js"></script>
<script src="components/layout/common-layout.js"></script>
```

### HTML 구조

```html
<div class="layout-container">
  
  <!-- Header (재사용) -->
  <header class="header">
    <!-- header.html 참조 -->
  </header>

  <!-- Main -->
  <div class="layout-main">
    
    <!-- LNB (재사용) -->
    <nav class="lnb" role="navigation" aria-label="메인 네비게이션">
      <!-- lnb.html 참조 -->
    </nav>

    <!-- Content Slot -->
    <div class="layout-content">
      <!-- 페이지별 컨텐츠 삽입 -->
    </div>

  </div>
</div>
```

### 컨텐츠 슬롯 사용 예시

```html
<div class="layout-content">
  <!-- work-area: 페이지별 컨텐츠 삽입 슬롯 -->
  <div class="layout-content__work-area">
    <!-- 작업 영역 컨텐츠 -->
  </div>
  <!-- AI Assistant 컴포넌트 (재사용) -->
  <aside class="ai-assistant">
    <!-- ai-assistant.html 참조 -->
  </aside>
</div>
```

## 📏 디자인 스펙 (Figma 노드 기반)

### layout-container (Daily view, 83:4818)

| 속성 | Figma | CSS |
|------|-------|-----|
| 크기 | 1920×1080 | `width: 100vw; height: 100vh` |
| 레이아웃 | VERTICAL | `flex-direction: column` |
| 배경 | #F0F5FF | `var(--klds-color-background-primary)` |

### layout-main (wrap, 83:4820)

| 속성 | Figma | CSS |
|------|-------|-----|
| 크기 | 1920×1000 | `flex: 1` |
| 레이아웃 | HORIZONTAL | `flex-direction: row` |
| 정렬 | SPACE_BETWEEN | `justify-content: space-between` |

### layout-content (contents, 83:4822)

| 속성 | Figma | CSS |
|------|-------|-----|
| 크기 | 1840×1000 | `flex: 1` |
| 레이아웃 | HORIZONTAL | `flex-direction: row` |
| Gap | 24px | `var(--klds-gap-7)` |

## 🎨 CSS 클래스

| 클래스명 | Figma 노드 | 설명 |
|---------|-----------|------|
| `.layout-container` | common layout (83:4818) | 최상위 컨테이너 (100vw×100vh) |
| `.layout-main` | wrap (83:4820) | 메인 영역 (header 아래) |
| `.layout-content` | contents (83:4822) | 컨텐츠 슬롯 영역 |
| `.layout-content__work-area` | work-area (83:4823) | 작업 영역 슬롯 (bg:#FFF, radius:24) |
| `.layout-overlay` | — | 모바일 LNB 배경 딤 (피그마 정의 없음) |
| `.header` | header (83:4819) | Header 컴포넌트 (재사용) |
| `.lnb` | lnb (83:4821) | LNB 컴포넌트 (재사용) |
| `.ai-assistant` | ai-assistant (83:4935) | AI Assistant 컴포넌트 (재사용) |

## 🎯 JavaScript API

### 이벤트

| 이벤트 | detail | 설명 |
|--------|--------|------|
| `menu-select` | `{ menuId, button }` | LNB 메뉴 선택 시 |
| `lnb-toggle` | `{ isOpen }` | 모바일 LNB 토글 시 |
| `mode-change` | `{ mode, index, button }` | 모드 전환 시 (mode-switch.js) |

### 메서드

```javascript
// 특정 메뉴 활성화
CommonLayout.setActiveMenu('schedule');

// 수동 초기화
CommonLayout.init(containerElement);
```

### 이벤트 리스닝 예시

```javascript
// 메뉴 선택 이벤트
document.addEventListener('menu-select', (e) => {
  console.log('선택된 메뉴:', e.detail.menuId);
  // 페이지 라우팅 처리 등
});

// 모드 전환 이벤트
document.querySelector('.mode-switch').addEventListener('mode-change', (e) => {
  console.log('모드 변경:', e.detail.mode); // 'classic' or 'ai'
});
```

## 📱 반응형

### 데스크톱 (기본)
- Header(80px) + LNB(80px) + Content(flex-grow)
- Content 내부 가로 배치 (gap: 24px)

### 태블릿 (≤ 1024px)
- Content 내부 세로 배치로 변경 (gap: 16px)

### 모바일 (≤ 768px)
- LNB 기본 숨김, 햄버거 버튼으로 토글
- LNB 열릴 때 오버레이 딤 처리
- ESC 키로 LNB 닫기

## 🔗 재사용한 Components & Assets

### 컴포넌트
| 컴포넌트 | 파일 | 재사용 내역 |
|---------|------|------------|
| **Header** | `layout/header/header.css` | 상단 헤더 전체 |
| **LNB** | `layout/lnb/lnb.css` | 좌측 네비게이션 전체 |
| **Avatar** | `avatar/avatar.css` | 즐겨찾기 사용자 아바타 |
| **Button Icon** | `button/button-icon.css` | 메뉴/검색/알림 등 아이콘 버튼 |
| **Mode Switch** | `switch/mode-switch.css` + `.js` | 클래식/AI 모드 전환 |
| **AI Assistant** | `ai-assistant/ai-assistant.css` | AI 어시스턴트 패널 |
| **Prompt** | `prompt/prompt.css` | AI 프롬프트 입력 |

### 아이콘 (assets/icons/)
- Header: `ic-menu-hamburger`, `ic-search`, `ic-bolt`, `ic-bell`, `ic-setting`, `ic-user`, `ic-caret-down02`, `ic-plus`, `ic-menu-grid`, `ic-star02`
- LNB: `ic-home01`, `ic-bag`, `ic-chat-circle`, `ic-mail`, `ic-calendar-days`, `ic-folder1`, `ic-webcam`, `ic-sitemap`, `ic-file-document`, `ic-more-horizontal`, `ic-check02`, `ic-circle-help`

### 디자인 토큰
- `tokens.css`의 모든 토큰 활용
- **하드코딩 없음**: 모든 색상, 간격, 크기가 토큰으로 정의됨

## 📝 구현 원칙

1. ✅ **기존 컴포넌트 우선 재사용**: header, lnb, avatar, button-icon, mode-switch 활용
2. ✅ **Figma 노드 데이터 기반**: 모든 속성은 Figma 노드에서 직접 도출
3. ✅ **Design Tokens 사용**: 색상, 간격 등 모든 스타일 값은 tokens.css의 변수 사용
4. ✅ **주석으로 근거 명시**: CSS 속성 옆에 Figma 노드 속성 주석 추가
5. ✅ **하드코딩 금지**: 원시값 대신 CSS 변수 사용
6. ✅ **피그마에 없는 기능 분리**: 반응형, 오버레이 등은 별도 섹션으로 분리 + 주석 명기
7. ✅ **슬롯 패턴**: layout-content 영역을 슬롯으로 구성하여 페이지별 유연한 컨텐츠 구성

## 🔄 업데이트 이력

- **2026-02-19 v1**: 초기 구현
  - Figma node 83:4818 (Daily view) 기반
  - header, lnb 컴포넌트 재사용
  - 슬롯 기반 컨텐츠 영역 구성
  - 반응형 레이아웃 (태블릿/모바일)
  - JS 인터랙션 (LNB 토글, 메뉴 전환, 모드 연동)

## 📍 데모

데모 파일: `demo/common-layout_preview.html`

```bash
# 데모 실행 (브라우저에서 열기)
open demo/common-layout_preview.html
```

---

> 📌 **Figma 출처**: NextEP Design System  
> 📌 **파일 키**: HJdhN6zf8pJq8mh4RvlDd3  
> 📌 **노드 ID**: 83:4818
