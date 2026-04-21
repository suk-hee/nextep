## Button Component

KLDS (KMSLab Design System)의 Button 컴포넌트입니다.

## 📋 개요

NextEP 애플리케이션에서 사용되는 버튼 컴포넌트로, 일반 버튼(텍스트+아이콘), 아이콘 전용 버튼, FAB(Floating Action Button) 3가지 타입을 제공합니다.

## 🎨 Figma 디자인 기반

- **Figma Node ID (일반 버튼)**: `8:4357`
- **Component Name**: `button` (COMPONENT_SET)
- **Variants**: size (small/medium) × state (default/hover/click/disabled) × type (fill-primary/fill-secondary/outline-primary/outline-secondary/text)

- **Figma Node ID (아이콘 버튼)**: `11:5340`
- **Component Name**: `button-icon` (COMPONENT_SET)
- **Variants**: size (small/medium/large) × state (default/hover/click/disabled) × type (default/default-accent/outline/outline-accent)

## 📐 구조

```
button/
├── button.css           # 일반 버튼 스타일
├── button-icon.css      # 아이콘 버튼 스타일
└── README.md            # 문서
```

## 🔧 사용 방법

### CSS 임포트

```html
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="components/button/button.css">
<link rel="stylesheet" href="components/button/button-icon.css">
```

### 일반 버튼 (button) — mask-image 방식

아이콘 색상을 정확히 제어하기 위해 mask-image 방식을 사용합니다.

```html
<!-- Fill Primary (Small) — startIcon + text + endIcon -->
<button class="button button--small button--fill-primary">
  <span class="button__icon" style="-webkit-mask-image:url(assets/icons/ic-info.svg);mask-image:url(assets/icons/ic-info.svg)"></span>
  <span>button</span>
  <span class="button__icon" style="-webkit-mask-image:url(assets/icons/ic-caret-right01.svg);mask-image:url(assets/icons/ic-caret-right01.svg)"></span>
</button>

<!-- Outline Primary (Small) — hover 시 bg 채움 + 흰색 전환 -->
<button class="button button--small button--outline-primary">
  <span class="button__icon" style="-webkit-mask-image:url(assets/icons/ic-info.svg);mask-image:url(assets/icons/ic-info.svg)"></span>
  <span>button</span>
</button>

<!-- Fill Secondary (Medium) — text only -->
<button class="button button--medium button--fill-secondary">
  <span>button</span>
</button>

<!-- Text (Medium) -->
<button class="button button--medium button--text">
  <span>button</span>
</button>

<!-- Disabled -->
<button class="button button--medium button--fill-primary" disabled>
  <span>button</span>
</button>
```

### 아이콘 버튼 (button-icon)

```html
<!-- Default (Small) -->
<button class="button-icon button-icon--small button-icon--default">
  <span class="button-icon__icon" style="-webkit-mask-image:url(assets/icons/ic-star02.svg);mask-image:url(assets/icons/ic-star02.svg)"></span>
</button>

<!-- Outline Accent (Medium) -->
<button class="button-icon button-icon--medium button-icon--outline-accent">
  <span class="button-icon__icon" style="-webkit-mask-image:url(assets/icons/ic-star02.svg);mask-image:url(assets/icons/ic-star02.svg)"></span>
</button>

<!-- FAB (Floating Action Button) -->
<button class="button-icon button-icon--fab">
  <span class="button-icon__icon" style="-webkit-mask-image:url(assets/icons/ic-star02.svg);mask-image:url(assets/icons/ic-star02.svg)"></span>
</button>
```

## 📏 디자인 스펙 (Figma 기반)

### 일반 버튼 (button)

#### Size: Small
- **높이**: 32px
- **Padding**: 8px
- **Gap**: 4px
- **Border Radius**: 6px
- **Font**: Pretendard 14px / 600 weight / 21px line-height
- **Icon**: 20×20px

#### Size: Medium
- **높이**: 40px
- **Padding**: 16px
- **Gap**: 4px
- **Border Radius**: 8px
- **Font**: Pretendard 16px / 700 weight / 24px line-height
- **Icon**: 24×24px

### 아이콘 버튼 (button-icon)

#### Size: Small
- **크기**: 32×32px
- **Icon**: 24×24px
- **Border Radius**: 9999px (원형)

#### Size: Medium
- **크기**: 40×40px
- **Icon**: 24×24px
- **Border Radius**: 9999px (원형)

#### Size: Large
- **크기**: 56×56px
- **Icon**: 32×32px
- **Border Radius**: 9999px (원형)

### FAB (Floating Action Button) — Figma node 501:10390
- **크기**: 56×56px
- **Icon**: 24×24px
- **Border Radius**: 28px
- **Background**: #005386 (`--klds-color-button-fill-surface`)
- **Icon Color**: #FFFFFF
- **Shadow**: `0 2px 4px rgba(0,0,0,0.15)`
- **Positioning**: absolute (우하단 플로팅)

## 🎨 타입 (Type) 분류

### 일반 버튼 (button)

| Type | Size | State | Background | Border | Text Color | Icon Color |
|------|------|-------|------------|--------|------------|------------|
| **fill-primary** | all | default | #005386 | - | #FFFFFF | #FFFFFF |
| **fill-primary** | all | hover | #024A77 | - | #FFFFFF | #FFFFFF |
| **fill-primary** | all | disabled | #F3F4F6 | #E5E7EB | #9CA3AF | #9CA3AF |
| **fill-secondary** | small | default | #FFFFFF | #9CA3AF | #121212 | #374151 |
| **fill-secondary** | medium | default | #FFFFFF | #9CA3AF | #374151 | #374151 |
| **fill-secondary** | all | hover | #FFFFFF | #005386 | #005386 | #005386 |
| **fill-secondary** | all | disabled | #F3F4F6 | #E5E7EB | #9CA3AF | #9CA3AF |
| **outline-primary** | small | default | #FFFFFF | #005386 | #005386 | #005386 |
| **outline-primary** | medium | default | transparent | #005386 | #005386 | #005386 |
| **outline-primary** | all | hover | #024A77 | #005386 | #FFFFFF | #FFFFFF |
| **outline-primary** | all | disabled | #F3F4F6 | #E5E7EB | #9CA3AF | #9CA3AF |
| **outline-secondary** | small | default | transparent | #9CA3AF | #121212 | #374151 |
| **outline-secondary** | medium | default | transparent | #9CA3AF | #374151 | #374151 |
| **outline-secondary** | all | hover | transparent | #005386 | #005386 | #005386 |
| **outline-secondary** | all | disabled | #F3F4F6 | #E5E7EB | #9CA3AF | #9CA3AF |
| **text** | small | default | transparent | - | #121212 | #374151 |
| **text** | medium | default | transparent | - | #374151 | #374151 |
| **text** | all | hover | transparent | - | #005386 | #005386 |
| **text** | all | disabled | #F3F4F6 | #E5E7EB | #9CA3AF | #9CA3AF |

### Variant 매트릭스 (size × type)

| Type | Small | Medium |
|------|-------|--------|
| fill-primary | ✅ | ✅ |
| fill-secondary | ✅ | ✅ |
| outline-primary | ✅ | ✅ |
| outline-secondary | ✅ | ✅ |
| text | ✅ | ✅ |

> **모든 타입이 small + medium 양쪽 모두 지원됩니다.**

### 아이콘 버튼 (button-icon)

| Type | Background | Border | Icon Color |
|------|------------|--------|------------|
| **default** | transparent | - | #121212 |
| **default** (hover) | #F3F4F6 | - | #121212 |
| **default** (disabled) | transparent | - | #9CA3AF |
| **default-accent** | transparent | - | #121212 |
| **default-accent** (hover) | #121212 | - | #FFFFFF |
| **default-accent** (disabled) | transparent | - | #9CA3AF |
| **outline** | transparent | #E5E7EB | #121212 |
| **outline** (hover) | #F3F4F6 | #E5E7EB | #121212 |
| **outline** (disabled) | transparent | #E5E7EB | #9CA3AF |
| **outline-accent** | transparent | #E5E7EB | #121212 |
| **outline-accent** (hover) | #121212 | - | #FFFFFF |
| **outline-accent** (disabled) | transparent | #E5E7EB | #9CA3AF |

## 🎨 CSS 클래스

### 일반 버튼 (button)

| 클래스명 | 설명 |
|---------|------|
| `.button` | 버튼 기본 컨테이너 |
| `.button--small` | Small 사이즈 (32h) |
| `.button--medium` | Medium 사이즈 (40h) |
| `.button--fill-primary` | Fill Primary 스타일 |
| `.button--fill-secondary` | Fill Secondary 스타일 |
| `.button--outline-primary` | Outline Primary 스타일 |
| `.button--outline-secondary` | Outline Secondary 스타일 |
| `.button--text` | Text 스타일 |
| `.button__icon` | 아이콘 래퍼 (mask-image 방식) |

### 아이콘 버튼 (button-icon)

| 클래스명 | 설명 |
|---------|------|
| `.button-icon` | 아이콘 버튼 기본 컨테이너 |
| `.button-icon--small` | Small 사이즈 (32×32) |
| `.button-icon--medium` | Medium 사이즈 (40×40) |
| `.button-icon--large` | Large 사이즈 (56×56) |
| `.button-icon--default` | Default 스타일 |
| `.button-icon--default-accent` | Default Accent 스타일 |
| `.button-icon--outline` | Outline 스타일 |
| `.button-icon--outline-accent` | Outline Accent 스타일 |
| `.button-icon--fab` | FAB 스타일 (56×56, #005386 배경, shadow) |
| `.button-icon__icon` | 아이콘 래퍼 (mask-image 방식) |

## 🎭 상태 (States)

### :hover
Figma에 정의된 hover 상태가 자동으로 적용됩니다.

### :disabled
`disabled` 속성을 사용하여 비활성 상태를 표현합니다.

## 🔗 재사용한 Assets

### 아이콘 (assets/icons/)
- `ic-info.svg` - 정보 아이콘 (20×20, 24×24)
- `ic-caret-right01.svg` - 우측 화살표 (20×20, 24×24)
- `ic-star02.svg` - 별 아이콘 (24×24, 32×32)

### 디자인 토큰
- `tokens.css`의 모든 토큰 활용
- **하드코딩 없음**: 모든 색상, 간격, 크기가 토큰으로 정의됨

## 📝 구현 원칙

1. ✅ **Figma 노드 데이터 기반**: 모든 속성은 Figma 노드에서 직접 도출
2. ✅ **Design Tokens 사용**: 색상, 간격 등 모든 스타일 값은 tokens.css의 변수 사용
3. ✅ **주석으로 근거 명시**: CSS 속성 옆에 Figma 노드 속성 주석 추가
4. ✅ **하드코딩 금지**: 원시값 대신 CSS 변수 사용
5. ✅ **피그마에 없는 속성 추가 금지**: 실제 디자인에 존재하는 속성만 구현

## 🔄 업데이트 이력

- **2026-02-12 v2**: 피그마 변경 반영
  - 신규: `small/outline-primary`, `medium/fill-secondary`, `medium/text`
  - 변경: `outline-primary` hover/click → bg:#024A77 채움 + 흰색 text/icon
  - 변경: `medium/outline-secondary` hover/click → border/text/icon → #005386
  - 변경: `fill-secondary`, `outline-secondary`, `text`의 medium default → text:#374151
  - 모든 5개 타입이 small + medium 양쪽 모두 지원
- **2026-02-12 v1**: 초기 구현 (Figma node 8:4357, 11:5340 기반)

## 📍 데모

데모 파일: `demo/button_preview.html`

---

> 📌 **Figma 출처**: NextEP Design System  
> 📌 **파일 키**: HJdhN6zf8pJq8mh4RvlDd3  
> 📌 **노드 ID**: 8:4357 (button), 11:5340 (button-icon), 501:10390 (button-fab)
