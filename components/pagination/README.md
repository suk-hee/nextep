# 📑 Pagination Component

> **Figma 노드**: `141:9263` - pagination  
> **디자인 시스템**: KLDS (KMSLab Design System)

---

## 📐 구조 분석 (Figma)

### 전체 컴포넌트
- **Type**: COMPONENT
- **Layout**: HORIZONTAL, gap: 4px, align: CENTER
- **Size**: 304×32px

### 구성 요소

#### 1. **IconButton (이전/다음 버튼)**
- **크기**: 32×32px
- **cornerRadius**: 6px
- **아이콘 크기**: 20×20px
- **아이콘 색상**: `#374151` (gray08)

#### 2. **페이지 번호 (기본 상태)**
- **크기**: 32×32px
- **cornerRadius**: 4px
- **Typography**: 
  - font: Pretendard
  - size: 16px
  - weight: 400
  - lineHeight: 24px
- **색상**: `#121212` (black)

#### 3. **페이지 번호 (활성 상태)**
- **크기**: 32×32px
- **cornerRadius**: 9999px (원형)
- **배경색**: `#005386` (primary)
- **텍스트 색상**: `#FFFFFF` (white)
- **테두리**: 1px solid `#005386`

#### 4. **Ellipsis (...)**
- **크기**: 16×16px
- **아이콘**: ic-more-horizontal
- **색상**: `#9CA3AF` (gray05)

---

## 🎨 토큰 매핑

| Figma 속성 | 값 | KLDS 토큰 |
|-----------|-----|-----------|
| height | 32px | `var(--klds-height-5)` |
| gap | 4px | `var(--klds-gap-2)` |
| cornerRadius (page) | 4px | `var(--klds-radius-xxxs)` |
| cornerRadius (button) | 6px | `var(--klds-radius-xxs)` |
| cornerRadius (active) | 9999px | `var(--klds-radius-circle)` |
| font-size | 16px | `var(--klds-typography-fontsize-m)` |
| line-height | 24px | `1.5` |
| color primary | #005386 | `var(--klds-color-primary)` |
| color black | #121212 | `var(--klds-color-text-black)` |
| color white | #FFFFFF | `var(--klds-color-white)` |
| color gray | #374151 | `var(--klds-color-icon-gray)` |
| color gray05 | #9CA3AF | `var(--klds-color-icon-lightgray)` |

---

## 💻 사용 예시

### HTML 구조
```html
<div class="pagination" id="myPagination">
  <!-- JavaScript로 자동 생성됨 -->
</div>
```

### JavaScript 초기화
```javascript
const pagination = new Pagination(document.getElementById('myPagination'), {
  currentPage: 2,        // 현재 페이지 (기본값: 1)
  totalPages: 20,        // 전체 페이지 수 (기본값: 10)
  maxVisiblePages: 5,    // 표시할 최대 페이지 수 (기본값: 5)
  onChange: (page) => {  // 페이지 변경 콜백
    console.log(`Page changed to: ${page}`);
    // API 호출 또는 데이터 로드
  }
});
```

### 메서드
```javascript
// 특정 페이지로 이동
pagination.goToPage(5);

// 전체 페이지 수 변경
pagination.setTotalPages(30);

// 현재 페이지 가져오기
const currentPage = pagination.getCurrentPage();
```

---

## 🎯 주요 기능

### 1. **자동 페이지 계산**
- 총 페이지가 많을 경우 자동으로 ellipsis(`...`) 표시
- 현재 페이지 중심으로 최대 `maxVisiblePages`개 표시

### 2. **인터랙션**
- 이전/다음 버튼 클릭
- 페이지 번호 직접 클릭
- 첫/마지막 페이지에서 버튼 자동 비활성화

### 3. **상태 관리**
- 활성 페이지 시각적 강조 (원형 배경)
- Hover 효과 (비활성 페이지)
- Disabled 상태 처리

---

## 📦 파일 구조

```
components/pagination/
├── pagination.css       # 스타일 정의
├── pagination.js        # JavaScript 로직
└── README.md           # 이 문서
```

---

## 🔄 페이지 표시 로직

### 예시 1: 총 20페이지, 현재 2페이지
```
[<] [1] [2] [3] [4] [5] [...] [20] [>]
```

### 예시 2: 총 20페이지, 현재 10페이지
```
[<] [1] [...] [8] [9] [10] [11] [12] [...] [20] [>]
```

### 예시 3: 총 20페이지, 현재 19페이지
```
[<] [1] [...] [16] [17] [18] [19] [20] [>]
```

### 예시 4: 총 5페이지 (ellipsis 없음)
```
[<] [1] [2] [3] [4] [5] [>]
```

---

## 🎨 스타일 커스터마이징

### CSS 변수로 색상 변경
```css
.pagination {
  --custom-active-bg: var(--klds-color-blue-blue06);
  --custom-hover-bg: var(--klds-color-blue-blue01);
}

.pagination__item--active {
  background-color: var(--custom-active-bg);
}
```

### 크기 조정
```css
.pagination--large .pagination__item {
  width: var(--klds-height-6);   /* 40px */
  height: var(--klds-height-6);
  font-size: var(--klds-typography-fontsize-l);  /* 18px */
}
```

---

## ⚠️ 주의사항

1. **아이콘 경로**: `assets/icons/` 폴더에 다음 아이콘이 필요합니다:
   - `ic-caret-left.svg`
   - `ic-caret-right.svg`
   - `ic-more-horizontal.svg`

2. **토큰 의존성**: `styles/tokens.css`가 먼저 로드되어야 합니다.

3. **JavaScript 필수**: 인터랙션을 위해 `pagination.js` 필요

---

## 🔗 관련 컴포넌트

- **IconButton**: 이전/다음 버튼 베이스
- **Button**: 페이지 번호 버튼 스타일 참조

---

## 📝 변경 이력

- **2026-02-19**: 초기 버전 작성 (Figma 141:9263 기반)
