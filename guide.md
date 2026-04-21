# 🎨 디자인 시스템 구현 가이드: KLDS (KMSLab Design System)

> 이 문서는 첨부된 `primitive_tokens.json` 및 `sementic_tokens.json`을 기반으로 한 디자인 시스템 CSS 구현 가이드입니다.  
> 모든 스타일은 **Figma에 정의된 Variable ID 및 Code Syntax와 1:1로 매칭**되어야 합니다.

---

## 1. 설계 원칙 (Token Architecture)

본 시스템은 **2단계 토큰 체계**를 따릅니다.

| 계층 | 설명 | 사용 규칙 |
|------|------|-----------|
| **Primitive Tokens** | 브랜드의 원천 색상, 수치 | ⛔ 직접 참조 금지 |
| **Semantic Tokens** | 디자인 의도가 담긴 의미론적 토큰 | ✅ UI 개발 시 **반드시** 이 토큰을 사용 |

```
┌─────────────────────────────────────────────┐
│              Semantic Tokens                │
│   (color-text-primary, color-button-fill…)  │
│                    │                        │
│                    ▼  alias (참조)           │
│              Primitive Tokens               │
│   (color-primary-primary06, spacing-m…)     │
└─────────────────────────────────────────────┘
```

---

## 2. CSS 변수 정의 (Root Variables)

### 📋 Primitive Tokens (기초 데이터)

`primitive_tokens.json`에 정의된 값을 `--klds-` 접두어를 사용하여 정의합니다.  
Figma의 `com.figma.codeSyntax` 설정을 **우선적으로** 따릅니다.

```css
:root {
  /* ─── Typography Family ─── */
  --klds-typography-fontfamily-text: "Pretendard";
  --klds-typography-fontfamily-code: "Menlo";

  /* ─── Typography Size (Example) ─── */
  --klds-typography-fontsize-m: 16px;
  --klds-typography-fontsize-s: 14px;

  /* ─── Spacing & Radius (Example) ─── */
  --klds-spacing-m: 16px;
  --klds-radius-m: 16px;

  /* ─── Raw Colors (Red Example) ─── */
  --klds-color-red-red06: #F5222D;
  --klds-color-primary-primary06: #005386;
}
```

### 📋 Semantic Tokens (의미론적 토큰)

`sementic_tokens.json`에 정의된 토큰입니다.  
이 토큰들은 상위 **Primitive 토큰을 참조(Alias)** 하고 있습니다.

```css
:root {
  /* ─── Text Colors ─── */
  --klds-color-text-black: var(--klds-color-black);
  --klds-color-text-primary: var(--klds-color-primary);
  --klds-color-text-disabled: var(--klds-color-gray-gray05);

  /* ─── Button Colors (Interaction) ─── */
  --klds-color-button-fill-surface: var(--klds-color-primary-primary06);
  --klds-color-button-fill-surface-hover: var(--klds-color-primary-primary07);

  /* ─── Layout (Padding / Gap / Height) ─── */
  --klds-padding-6: var(--klds-spacing-m);  /* 16px */
  --klds-gap-5: var(--klds-spacing-m);      /* 16px */
}
```

---

## 3. 컴포넌트 적용 가이드 (Usage)

> ⚠️ 디자인 구현 시 **반드시 Semantic 토큰**을 사용하십시오.

### 🔘 Button Component

Figma 디자인의 버튼 상태(Hover, Click, Disabled)는 아래 토큰과 매칭됩니다.

| 상태 | CSS 변수 | 용도 |
|------|----------|------|
| **Default** | `var(--klds-color-button-fill-surface)` | 기본 배경색 |
| **Hover** | `var(--klds-color-button-fill-surface-hover)` | 호버 배경색 |
| **Disabled (BG)** | `var(--klds-color-button-surface-disabled)` | 비활성 배경색 |
| **Disabled (Border)** | `var(--klds-color-button-border-disabled)` | 비활성 테두리색 |

```css
/* Button 적용 예시 */
.btn-primary {
  background-color: var(--klds-color-button-fill-surface);
  color: var(--klds-color-text-white);
  border: none;
  border-radius: var(--klds-radius-m);
  padding: var(--klds-padding-6);
}

.btn-primary:hover {
  background-color: var(--klds-color-button-fill-surface-hover);
}

.btn-primary:disabled {
  background-color: var(--klds-color-button-surface-disabled);
  border: 1px solid var(--klds-color-button-border-disabled);
}
```

### ⌨️ Input Component

| 상태 | CSS 변수 | 용도 |
|------|----------|------|
| **Border** | `var(--klds-color-input-border)` | 기본 테두리 |
| **Error** | `var(--klds-color-input-border-error)` | 에러 상태 테두리 |
| **Disabled** | `var(--klds-color-input-surface-disabled)` | 비활성 배경 |

```css
/* Input 적용 예시 */
.input-field {
  border: 1px solid var(--klds-color-input-border);
  border-radius: var(--klds-radius-m);
  padding: var(--klds-padding-6);
}

.input-field--error {
  border-color: var(--klds-color-input-border-error);
}

.input-field:disabled {
  background-color: var(--klds-color-input-surface-disabled);
}
```

---

## 4. 개발자 주의사항

### 🚫 외부 디자인 시스템 사용 금지

**Tailwind CSS, Bootstrap, Material-UI 등 모든 외부 디자인 시스템 및 CSS 프레임워크 사용을 금지합니다.**

```html
<!-- ❌ 절대 금지 -->
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<!-- ✅ KLDS 토큰만 사용 -->
<link rel="stylesheet" href="../styles/tokens.css">
<link rel="stylesheet" href="../components/button/button.css">
```

**이유:**
- KLDS는 독자적인 디자인 토큰 체계를 가지고 있습니다
- 외부 프레임워크는 토큰 시스템과 충돌하고 일관성을 해칩니다
- Figma와 1:1 매칭되는 순수한 구현만 허용됩니다

### 🚫 Hard-coded Value 사용 금지

`16px`, `#FFFFFF`와 같은 원시값을 코드에 직접 입력하지 마십시오.  
**반드시 정의된 CSS 변수를 사용**하십시오.

```css
/* ❌ 잘못된 예시 */
.card {
  padding: 16px;
  background-color: #FFFFFF;
  color: #333333;
}

/* ✅ 올바른 예시 */
.card {
  padding: var(--klds-padding-6);
  background-color: var(--klds-color-bg-white);
  color: var(--klds-color-text-black);
}
```

### 🔗 Alias 준수

`sementic_tokens.json` 내의 `$extensions.com.figma.aliasData`를 확인하여  
**토큰 간의 참조 관계를 명확히 유지**하십시오.

```json
// 예시: Semantic → Primitive 참조 구조
{
  "$extensions": {
    "com.figma.aliasData": {
      "collection": "Primitive Tokens",
      "variable": "color/primary/primary06"
    }
  }
}
```

### 📏 Line Height 처리

JSON에 정의된 `lineHeight` 값(예: `1.2`, `1.5`)은 **배수(unitless)**로 적용하여  
유연한 타이포그래피를 구현하십시오.

```css
/* ✅ unitless line-height (권장) */
.body-text {
  font-size: var(--klds-typography-fontsize-m);
  line-height: 1.5;
}

/* ❌ px 단위 line-height (비권장) */
.body-text {
  font-size: var(--klds-typography-fontsize-m);
  line-height: 24px;
}
```

---

## 5. 피그마 연동 작업 규칙

### 🚨 피그마에 없는 속성은 절대 추가하지 않는다

CSS 구현 시 **피그마 노드에 실제로 존재하는 속성만** 코드로 옮깁니다.  
피그마 노드 데이터에 없는 fills, strokes, effects 등을 임의로 추가하지 마십시오.

```
✅ 피그마 노드에 fills 없음  →  background: transparent
✅ 피그마 노드에 strokes 없음  →  border 속성 작성하지 않음
✅ 피그마 노드에 effects 없음  →  box-shadow 작성하지 않음

❌ 피그마에 없는데 "필요할 것 같아서" border-right 추가
❌ 피그마에 없는데 "보기 좋아서" background-color 추가
❌ 피그마에 없는 dot badge 같은 변형을 임의로 추가
```

### 📐 속성 도출 기준

CSS의 모든 시각적 속성은 아래 피그마 노드 데이터에서 **직접 도출**합니다.

| CSS 속성 | 피그마 데이터 소스 |
|----------|-------------------|
| `width`, `height` | `bounds.w`, `bounds.h` |
| `background` | `fills` 배열 (없으면 `transparent`) |
| `border` | `strokes` 배열 (없으면 작성 안 함) |
| `border-radius` | `cornerRadius` |
| `display`, `flex-direction` | `layout.mode` (`VERTICAL` / `HORIZONTAL`) |
| `padding` | `layout.padding` |
| `gap` | `layout.gap` |
| `align-items` | `layout.align` |
| `font-*` | `font.family`, `font.size`, `font.weight` |
| `color` (텍스트) | `fills` (TEXT 노드) |
| `line-height` | `font.lineHeight` |
| `position` (뱃지 등) | 부모-자식 `bounds` 좌표 차이 계산 |

### 주석 금지 

꼭 필요할 경우만 제안 후 허용시 사용합니다.

```css
/* ✅ 주석과 코드가 일치 */
background: transparent;    /* fills: 없음 */

/* ❌ 주석과 코드가 불일치 */
/* fills: 없음 */
background: #FFFFFF;
```

### 📎 피그마에 없는 기능을 부가할 경우

Tooltip, 접근성(focus-visible) 등 **피그마에 정의되지 않았지만 UX 상 필요한 기능**은  
반드시 별도 섹션으로 분리하고 "피그마에 정의 없음" 주석을 명기합니다.

```css
/* ─── Tooltip ─── 피그마에 정의 없음, UX 보조용 */
.item[title]::after { ... }
```

---

## 6. 작업 가이드라인

AI 모델이 작업의 컨텍스트를 정확히 이해하고 일관된 결과물을 생성하기 위해 다음 순서를 반드시 준수합니다.

### 1. 사전 분석 단계

**문서 숙지**: 가장 먼저 `guide.md` 파일을 읽고 디자인 시스템의 기본 원칙과 규격(Naming Convention, 토큰 정보 등)을 파악합니다.

**구조 파악**: `project_skeleton.md`를 읽어 폴더 구조, 컴포넌트 목록, 에셋 경로를 확인합니다. (직접 폴더 탐색 불필요)

### 2. 구현 단계

**Figma 노드 분석**: 전달받은 Figma 디자인 데이터를 분석하여 필요한 UI 요소를 추출합니다.

**코드 생성 원칙**:
- 새로운 코드를 작성하기 전, `assets`와 `components` 폴더에 이미 존재하는 파일(아이콘, 공통 스타일 등)을 우선적으로 참조 및 재사용합니다.
- 결과물은 HTML, CSS를 기본으로 하며, 동적 기능이 필요한 경우에 한해 JS 파일을 생성합니다.

**아이콘 및 이미지 사용 규칙**:
- ✅ **반드시 `assets/` 폴더 우선 탐색**: 새로운 아이콘/이미지를 추가하기 전에 `assets/icons/`, `assets/images/`, `assets/avatars/` 등 기존 리소스를 확인하고 재사용합니다.
- ✅ **경로 참조 형식**: 상대 경로로 명확히 참조합니다.
  ```html
  <!-- ✅ 올바른 예시 -->
  <img src="../assets/icons/ic-filter.svg" alt="필터">
  <svg><use href="../assets/icons/ic-star03-fill.svg#icon"></use></svg>
  ```
- ✅ **인라인 SVG 허용 조건**: `file://` 프로토콜 호환성이나 동적 색상 제어(`currentColor`)가 필요한 경우에만 SVG를 HTML 내부에 인라인으로 삽입합니다.
- ❌ **외부 CDN 아이콘 금지**: Font Awesome, Material Icons, Heroicons 등 외부 아이콘 라이브러리 사용을 금지합니다.
  ```html
  <!-- ❌ 절대 금지 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <i class="fa fa-filter"></i>
  ```
---

---

## 7. Figma MCP 정밀 작업 절차

AI가 Figma MCP를 통해 컴포넌트를 구현할 때 **반드시** 아래 절차를 따릅니다.

### 🔴 핵심 원칙: 추측 금지, 검증 필수

> Figma MCP에서 받아온 JSON 데이터를 **한 속성도 빠짐없이 정확하게** 코드로 옮깁니다.  
> "대략 이 정도겠지"라는 추측은 절대 금지합니다.

### Step 1: 노드 구조 파악 (depth: 3~5)

```
figma_get_file(file_key, node_id, depth: 3)
```

- 전체 노드 트리의 **계층 구조**를 파악합니다.
- 자식 노드 ID 목록을 기록합니다.

### Step 2: 개별 노드 정밀 조회

```
figma_get_file(file_key, node_id: "개별 셀/태그 ID", depth: 5)
```

- Step 1에서 파악한 **각 자식 노드를 개별적으로 조회**합니다.
- 특히 INSTANCE 타입 노드(태그, 아이콘 등)는 반드시 개별 조회하여 내부 구조를 확인합니다.
- **depth: 5가 부족하면 더 깊은 자식 노드를 추가 조회**합니다.

### Step 3: RGB → HEX 정확한 변환

Figma API는 색상을 `r, g, b` (0.0~1.0) 범위로 반환합니다.  
**반드시 아래 공식으로 정확하게 변환**합니다.

```
HEX = #(Math.round(r * 255)).toString(16)(Math.round(g * 255)).toString(16)(Math.round(b * 255)).toString(16)
```

**변환 예시:**

| Figma RGB (0~1) | 계산 | HEX | tokens.css 변수 |
|---|---|---|---|
| `r:0.953, g:0.957, b:0.965` | `243,244,246` | `#F3F4F6` | `--klds-color-gray-gray02` |
| `r:0.898, g:0.906, b:0.922` | `229,231,235` | `#E5E7EB` | `--klds-color-gray-gray03` / `--klds-color-border-default` |
| `r:0.071, g:0.071, b:0.071` | `18,18,18` | `#121212` | `--klds-color-text-black` / `--klds-color-black` |
| `r:0.294, g:0.333, b:0.388` | `75,85,99` | `#4B5563` | `--klds-color-gray-gray07` |
| `r:0.216, g:0.255, b:0.318` | `55,65,81` | `#374151` | `--klds-color-gray-gray08` / `--klds-color-icon-gray` |
| `r:0.0, g:0.325, b:0.525` | `0,83,134` | `#005386` | `--klds-color-primary` |
| `r:1.0, g:0.302, b:0.310` | `255,77,79` | `#FF4D4F` | `--klds-color-red-red05` |
| `r:0.961, g:0.133, b:0.176` | `245,34,45` | `#F5222D` | `--klds-color-red-red06` / `--klds-color-critical` |
| `r:0.831, g:0.533, b:0.024` | `212,136,6` | `#D48806` | `--klds-color-orange-orange07` |
| `r:0.922, g:0.184, b:0.588` | `235,47,150` | `#EB2F96` | `--klds-color-pink-pink06` |
| `r:0.035, g:0.427, b:0.851` | `9,109,217` | `#096DD9` | `--klds-color-lightblue-lightblue07` |
| `r:0.031, g:0.592, b:0.612` | `8,151,156` | `#08979C` | `--klds-color-mint-mint07` |
| `r:0.710, g:0.961, b:0.925` | `181,245,236` | `#B5F5EC` | `--klds-color-mint-mint02` |
| `r:1.0, g:0.941, b:0.965` | `255,240,246` | `#FFF0F6` | `--klds-color-pink-pink01` |
| `r:1.0, g:0.945, b:0.722` | `255,241,184` | `#FFF1B8` | `--klds-color-orange-orange02` |
| `r:0.902, g:0.969, b:1.0` | `230,247,255` | `#E6F7FF` | `--klds-color-lightblue-lightblue01` |
| `r:1.0, g:0.800, b:0.780` | `255,204,199` | `#FFCCC7` | `--klds-color-red-red02` |

### Step 4: tokens.css 변수 매핑 검증

1. Step 3에서 변환한 HEX 값을 `styles/tokens.css`에서 **검색**합니다.
2. **정확히 일치하는 변수가 있으면** 해당 CSS 변수를 사용합니다.
3. **일치하는 변수가 없으면** 피그마 HEX 값을 직접 사용하되 `/* Figma 직접값: #XXXXXX — tokens.css 미등록 */` 주석을 반드시 남깁니다.

```css
/* ✅ 올바른 예시: tokens.css에서 #F3F4F6 = --klds-color-gray-gray02 확인 완료 */
background-color: var(--klds-color-gray-gray02);   /* fills: r:0.953 g:0.957 b:0.965 → #F3F4F6 */

/* ✅ 올바른 예시: tokens.css에 없는 값 */
background-color: #F5F0FF;   /* Figma 직접값: #F5F0FF — tokens.css 미등록 */

/* ❌ 잘못된 예시: 검증 없이 대충 매핑 */
background-color: var(--klds-color-gray-gray02);   /* fills: #F3F4F6 ← RGB 변환 과정 생략 */
```

### Step 5: 레이아웃 속성 정확한 매핑

| Figma `layout` 속성 | CSS | 주의사항 |
|---|---|---|
| `mode: "HORIZONTAL"` | `display: flex; flex-direction: row;` | |
| `mode: "VERTICAL"` | `display: flex; flex-direction: column;` | |
| `padding: 16.0` | `padding: 16px;` → tokens.css에서 `--klds-padding-6` (16px) 사용 | **반드시 tokens.css에서 값 검색** |
| `padding: 8.0` | `padding: 8px;` → `--klds-padding-3` (8px) | |
| `gap: 4.0` | `gap: 4px;` → `--klds-gap-2` (4px) | |
| `gap: 8.0` | `gap: 8px;` → `--klds-gap-3` (8px) | |
| `gap: null` | gap 속성 작성하지 않음 | **null이면 CSS에 작성 금지** |
| `align: "CENTER"` | `align-items: center;` | |
| `align: null` | align-items 작성하지 않음 | **null이면 CSS에 작성 금지** |
| `cornerRadius: 4.0` | `border-radius: 4px;` → `--klds-radius-xxxs` (4px) | |
| `cornerRadius: 16.0` | `border-radius: 16px;` → `--klds-radius-m` (16px) | |

### Step 6: figma_get_images로 시각 비교

```
figma_get_images(file_key, node_ids: ["타겟 노드 ID"], format: "png", scale: 2)
```


### Step 7: 체크리스트

구현 완료 후 아래 항목을 반드시 확인합니다:

- [ ] 모든 색상값이 **RGB→HEX 변환 → tokens.css 매핑** 절차를 거쳤는가?
- [ ] `gap: null`, `align: null`인 속성을 CSS에 임의로 추가하지 않았는가?
- [ ] `fills` 없는 노드에 `background-color`를 추가하지 않았는가?
- [ ] `strokes` 없는 노드에 `border`를 추가하지 않았는가?
- [ ] `cornerRadius` 없는 노드에 `border-radius`를 추가하지 않았는가?
- [ ] 피그마에 없는 `hover`, `transition`, `box-shadow` 등을 추가하지 않았는가?
- [ ] 아이콘은 `assets/icons/` 폴더의 기존 파일을 사용했는가?
- [ ] 기존 컴포넌트(`components/` 폴더)를 재사용할 수 있는 부분은 재사용했는가?


---

> 📌 **최종 업데이트**: 2026-02-20  
> 📌 **관리**: KMSLab Design System Team
