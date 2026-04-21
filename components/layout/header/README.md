# Header Component

KLDS (KMSLab Design System)의 Header 컴포넌트입니다.

## 📋 개요

Next EP 애플리케이션의 상단 헤더 영역을 구현한 컴포넌트입니다. Figma 디자인 시스템의 명세를 기반으로 구현되었으며, 기존 avatar 컴포넌트와 아이콘 assets를 최대한 재사용합니다.

## 🎨 Figma 디자인 기반

- **Figma Node ID**: `1:17439`
- **Component Name**: `header` (COMPONENT_SET)
- **Variant**: `company=posco`
- **Dimensions**: 1920×80px

## 📐 구조

```
header/
├── header.css        # 컴포넌트 스타일 (Design Tokens 기반)
├── header.html       # 기본 마크업 (재사용 컴포넌트 활용)
└── README.md         # 문서
```

## 🔧 사용 방법

### CSS 임포트

```html
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="components/avatar/avatar.css">
<link rel="stylesheet" href="components/switch/mode-switch.css">
<link rel="stylesheet" href="components/button/button-icon.css">
<link rel="stylesheet" href="components/layout/header/header.css">
```

### HTML 구조

```html
<header class="header">
  <!-- Left Section -->
  <div class="header__left">
    <!-- Menu Button → button-icon 컴포넌트 -->
    <button class="button-icon button-icon--medium button-icon--default" aria-label="메뉴 열기">
      <span class="button-icon__icon" style="-webkit-mask-image:url(assets/icons/ic-menu-hamburger.svg);mask-image:url(assets/icons/ic-menu-hamburger.svg)"></span>
    </button>
    
    <div class="header__favorite-users">
      <div class="avatar-group">
        <div class="avatar avatar--small">...</div>
        <!-- 4개 아바타 -->
      </div>
      <button class="avatar-group__add">...</button>
    </div>
  </div>
  
  <!-- Center Logo -->
  <div class="header__logo">
    <img src="assets/images/logo-nextep.svg" alt="Next EP" height="26">
  </div>
  
  <!-- Right Section -->
  <div class="header__right">
    <!-- Mode Switch (기존 컴포넌트 재사용) -->
    <div class="mode-switch">...</div>
    
    <div class="header__right-btns">
      <!-- 검색 버튼 → button-icon 컴포넌트 -->
      <button class="button-icon button-icon--medium button-icon--default" aria-label="검색">
        <span class="button-icon__icon" style="-webkit-mask-image:url(assets/icons/ic-search.svg);mask-image:url(assets/icons/ic-search.svg)"></span>
      </button>
      <!-- ... 나머지 버튼들 -->
    </div>
  </div>
</header>
```

## 🎯 주요 구성 요소

### 1. Header Left (좌측 영역)

**Menu Button**
- Figma: `btn-menu` FRAME 48×48 → `button-icon` 인스턴스 40×40
- **button-icon 컴포넌트 재사용**: `.button-icon--medium.button-icon--default`
- 아이콘: `ic-menu-hamburger.svg` (24×24)
- mask-image 방식으로 아이콘 색상 제어

**Favorite Users** (`header__favorite-users`)
- Figma: `favority-user` FRAME 240×56
- 배경: #FFFFFF, cornerRadius: 9999
- 내부: `avata-group-favorite` 인스턴스
  - **기존 avatar 컴포넌트 재사용**: `.avatar-group`, `.avatar--small`, `.avatar-group__add`
  - 아바타 4개 (40×40, gap: 4px)
  - 추가 버튼 (40×40, dashed border)

### 2. Center Logo (중앙 로고)

- Figma: `logo-nextep` 인스턴스 201.5×26
- 위치: absolute, left: 50%, transform: translateX(-50%)
- Next EP 로고 SVG 직접 포함

### 3. Header Right (우측 영역)

**Mode Switch** (`header__mode-switch`)
- Figma: `mode-switch` 인스턴스 202×56
- 배경: #D6E4FF, padding: 8px, cornerRadius: 9999
- 버튼 2개:
  - 클래식: `btn-mode` 106×40 (ic-menu-grid + "클래식")
  - AI: `btn-mode` 80×40, active (ic-star02 + "AI", 배경: #005386)

**Right Buttons** (`header__right-btns`)
- Figma: `right-btns` FRAME 256×56
- 배경: #FFFFFF, padding: 12px, gap: 8px, cornerRadius: 9999
- 버튼 5개:
  1. 검색: **button-icon 컴포넌트** (`.button-icon--medium.button-icon--default`) + `ic-search.svg`
  2. 빠른실행: **button-icon 컴포넌트** + `ic-bolt.svg`
  3. 알림: **button-icon 컴포넌트** + `ic-bell.svg`
  4. 설정: **button-icon 컴포넌트** + `ic-setting.svg`
  5. 사용자 프로필: `btn-me` FRAME
     - 아바타 40×40 (#E5E8EB, radius: 20) + `ic-user.svg`
     - 드롭다운: `ic-caret-down02.svg` (20×20)
- **mask-image 방식**: 모든 버튼 아이콘은 background-color로 색상 제어

## 📏 디자인 스펙 (Figma 노드 기반)

### 레이아웃
- **전체 높이**: 80px
- **패딩**: 0 20px (좌우)
- **Gap**: 16px (메인 영역 간)
- **정렬**: space-between

### 색상 (Design Tokens 활용)
- **배경 (기본)**: transparent
- **배경 (white)**: `--klds-color-white` (#FFFFFF)
- **배경 (모드 스위치)**: `--klds-color-blue-blue02` (#D6E4FF)
- **배경 (활성 버튼)**: `--klds-color-button-fill-surface` (#005386)
- **배경 (호버)**: `--klds-color-background-hover` (#F3F4F6)
- **텍스트 (기본)**: `--klds-color-text-black` (#121212)
- **텍스트 (활성)**: `--klds-color-text-white` (#FFFFFF)
- **테두리**: `--klds-color-gray-gray03` (#E5E7EB), `--klds-color-gray-gray04` (#CBD0D7)

### 간격 (Design Tokens)
- **4px**: `--klds-gap-2`
- **8px**: `--klds-padding-3`, `--klds-gap-3`
- **12px**: `--klds-padding-5`
- **16px**: `--klds-padding-6`, `--klds-gap-5`
- **20px**: `--klds-padding-7`, `--klds-radius-l`

### 크기 (Design Tokens)
- **20px**: `--klds-height-3`
- **24px**: `--klds-height-4`
- **40px**: `--klds-height-6`
- **48px**: `--klds-height-7`
- **56px**: `--klds-height-8`

### Border Radius
- **20px**: `--klds-radius-l`
- **9999px**: `--klds-radius-circle`

### 타이포그래피
- **폰트**: `--klds-typography-fontfamily-text` (Pretendard)
- **크기**: `--klds-typography-fontsize-m` (16px)
- **굵기**: 600 (Figma 원본)
- **줄높이**: `--klds-typography-lineheight-xl` (1.5 → 24px)

## 🎨 CSS 클래스

| 클래스명 | Figma 노드 | 설명 |
|---------|-----------|------|
| `.header` | `company=posco` | 헤더 컨테이너 (1920×80) |
| `.header__left` | `header-left` | 좌측 영역 (320×56) |
| `.button-icon--medium` | `button-icon` | 메뉴/아이콘 버튼 (40×40) — **button-icon.css** |
| `.button-icon--default` | - | button-icon default 타입 |
| `.button-icon__icon` | - | 아이콘 래퍼 (mask-image 방식) |
| `.header__favorite-users` | `favority-user` | 즐겨찾기 사용자 영역 (240×56) |
| `.avatar-group` | `avata-group-favorite` | 아바타 그룹 (기존 컴포넌트) |
| `.avatar-group__add` | `btn-add` | 추가 버튼 (기존 컴포넌트) |
| `.header__logo` | `logo-nextep` | 중앙 로고 (201.5×26) |
| `.header__right` | `header-right` | 우측 영역 (474×56) |
| `.header__mode-switch` | `mode-switch` | 모드 전환 스위치 (202×56) |
| `.header__mode-btn` | `btn-mode` | 모드 버튼 (106×40 / 80×40) |
| `.header__mode-btn--active` | `btn-mode` (AI) | 활성 모드 버튼 |
| `.header__right-btns` | `right-btns` | 우측 버튼 그룹 (256×56) |
| `.header__user-btn` | `btn-me` | 사용자 프로필 버튼 (40×40) |
| `.header__user-avatar` | `avata` | 사용자 아바타 (40×40) |
| `.header__user-dropdown` | `ic-caret-down02` | 드롭다운 아이콘 (20×20) |

## 🎭 상태 (States)

### 버튼 호버
```css
/* button-icon 컴포넌트의 기본 hover 스타일 적용 */
.button-icon--default:hover {
  background-color: var(--klds-color-button-surface-hover); /* #F3F4F6 */
}
```

### 모드 활성화
```css
.header__mode-btn--active {
  background-color: var(--klds-color-button-fill-surface); /* #005386 */
  color: var(--klds-color-text-white);
}
```

## 📱 반응형

### 태블릿 (≤ 1200px)
- 즐겨찾기 사용자 영역 숨김 (`header__favorite-users`)

### 모바일 (≤ 768px)
- 즐겨찾기 사용자 영역 숨김
- 모드 전환 스위치 숨김 (`header__mode-switch`)
- 좌우 패딩 축소 (20px → 12px)
- 로고 정적 위치로 변경 (중앙 정렬 해제)

## 🔗 재사용한 Assets & Components

### 컴포넌트
- **avatar.css**: `.avatar`, `.avatar--small`, `.avatar-group`, `.avatar-group__add` 재사용
- **button-icon.css**: `.button-icon--medium.button-icon--default` 재사용 (메뉴 + 우측 4개 버튼)
- **mode-switch.css**: `.mode-switch`, `.mode-switch__btn` 재사용
- Figma `avata-group-favorite` 인스턴스를 기존 avatar 컴포넌트로 구현
- Figma `button-icon` 인스턴스를 기존 button-icon 컴포넌트로 구현

### 아이콘 (assets/icons/)
- `ic-menu-hamburger.svg` - 메뉴 버튼
- `ic-menu-grid.svg` - 클래식 모드
- `ic-star02.svg` - AI 모드
- `ic-search.svg` - 검색
- `ic-bolt.svg` - 빠른 실행
- `ic-bell.svg` - 알림
- `ic-setting.svg` - 설정
- `ic-user.svg` - 사용자 프로필
- `ic-caret-down02.svg` - 드롭다운
- `ic-plus.svg` - 추가 버튼

### 디자인 토큰
- `tokens.css`의 모든 토큰 활용
- **하드코딩 없음**: 모든 색상, 간격, 크기가 토큰으로 정의됨

## 📝 구현 원칙

본 컴포넌트는 KLDS 디자인 시스템 가이드라인을 엄격히 준수합니다:

1. ✅ **가이드 문서 먼저 읽기**: `KLDS_디자인시스템_구현가이드.md` 숙지 후 작업
2. ✅ **기존 컴포넌트 우선 활용**: avatar 컴포넌트 재사용
3. ✅ **기존 아이콘 assets 활용**: 10개 아이콘 재사용
4. ✅ **Figma 노드 데이터 기반**: 모든 속성은 Figma 노드에서 직접 도출
5. ✅ **Design Tokens 사용**: 색상, 간격 등 모든 스타일 값은 tokens.css의 변수 사용
6. ✅ **주석으로 근거 명시**: CSS 속성 옆에 Figma 노드 속성 주석 추가
7. ✅ **하드코딩 금지**: 원시값 대신 CSS 변수 사용
8. ✅ **피그마에 없는 속성 추가 금지**: 실제 디자인에 존재하는 속성만 구현
9. ✅ **HTML/CSS 기본**: 동적 기능 없으므로 JS 파일 불필요

## 🎯 접근성 (Accessibility)

- 모든 버튼에 `aria-label` 속성 제공
- 키보드 네비게이션 지원 (기본 button 요소 사용)
- 적절한 시맨틱 마크업 사용 (`<header>`, `<button>`)
- 아이콘에 빈 `alt` 속성 (장식적 요소)

## 🔄 업데이트 이력

- **2026-02-12 v2**: button-icon 컴포넌트 적용
  - `.header__menu-btn` → `.button-icon--medium.button-icon--default`로 교체
  - `.header__icon-btn` → `.button-icon--medium.button-icon--default`로 교체
  - 아이콘 5개 모두 mask-image 방식으로 변경 (색상 제어 정확도 향상)
  - button-icon.css 컴포넌트 재사용으로 코드 중복 제거
  
- **2026-02-12 v1**: 완전 재구현
  - Figma node 1:17439 (company=posco) 정확히 반영
  - 기존 avatar, mode-switch 컴포넌트 재사용
  - 기존 아이콘 assets 10개 활용
  - Design Tokens 100% 적용 (하드코딩 제거)
  - KLDS 가이드라인 완벽 준수

## 📍 데모

데모 파일: `demo/header_preview.html`

```bash
# 데모 실행 (브라우저에서 열기)
open demo/header_preview.html
```

---

> 📌 **Figma 출처**: NextEP Design System  
> 📌 **파일 키**: HJdhN6zf8pJq8mh4RvlDd3  
> 📌 **노드 ID**: 1:17439  
> 📌 **Variant**: company=posco
