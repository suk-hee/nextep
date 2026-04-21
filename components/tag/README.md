# 🏷️ KLDS Tag Component

> Figma 노드: `70:4818` (Section: tag)  
> Component Set: `70:4821`

## 개요

Tag(태그)는 항목을 분류, 필터링, 표시하는 데 사용되는 인라인 컴포넌트입니다.  
선택적으로 leading 아이콘(ic-check)과 trailing 닫기 버튼(ic-close-small)을 포함할 수 있습니다.

---

## 속성 (Properties)

| 속성 | 값 | 기본값 | 설명 |
|------|----|--------|------|
| **size** | `small` \| `medium` \| `large` | `medium` | 태그 크기 |
| **color** | `white` \| `gray` \| `red` \| `orange` \| `green` \| `mint` \| `lightblue` \| `blue` \| `purple` \| `pink` \| `volcano` | `white` | 태그 색상 |
| **state** | `default` \| `active` \| `disabled` | `default` | 태그 상태 |
| **shape** | `round` | `round` | 태그 모양 |

---

## 크기 사양 (Size Specs)

| Size | Height | Font Size | Line Height | Icon | Border Radius |
|------|--------|-----------|-------------|------|---------------|
| **small** | 20px | 12px | 18px | 16×16 | 4px |
| **medium** | 24px | 14px | 21px | 20×20 | 6px |
| **large** | 32px | 16px | 24px | 20×20 | 8px |

---

## 레이아웃 사양 (Layout)

| 속성 | 값 | 토큰 |
|------|----|------|
| Direction | Horizontal | `layout.mode: HORIZONTAL` |
| Padding (L/R) | 8px | `var(--klds-padding-3)` |
| Gap | 4px | `var(--klds-gap-2)` |
| Align | Center | `layout.align: CENTER` |

---

## 사용법 (Usage)

### 기본 태그 (텍스트만)
```html
<span class="klds-tag klds-tag--medium klds-tag--blue">
  <span class="klds-tag__label">Frontend</span>
</span>
```

### Leading 아이콘 + Close 버튼
```html
<span class="klds-tag klds-tag--medium klds-tag--blue">
  <span class="klds-tag__icon"><!-- ic-check SVG --></span>
  <span class="klds-tag__label">Frontend</span>
  <button class="klds-tag__close" aria-label="Remove tag">
    <!-- ic-close-small SVG -->
  </button>
</span>
```

### Active 상태
```html
<span class="klds-tag klds-tag--medium klds-tag--blue klds-tag--active">
  <span class="klds-tag__label">Selected</span>
</span>
```

### Disabled 상태
```html
<span class="klds-tag klds-tag--medium klds-tag--blue klds-tag--disabled">
  <span class="klds-tag__label">Disabled</span>
</span>
```

---

## 색상 매핑 (Color Token Mapping)

### Default 상태

| Color | Background Token | Text/Icon Token |
|-------|-----------------|-----------------|
| white | `--klds-color-white` + border `--klds-color-gray-gray03` | `--klds-color-text-gray` |
| gray | `--klds-color-gray-gray03` | `--klds-color-text-gray` |
| red | `--klds-color-red-red02` | `--klds-color-red-red06` |
| orange | `--klds-color-orange-orange02` | `--klds-color-orange-orange07` |
| green | `--klds-color-green-green02` | `--klds-color-green-green07` |
| mint | `--klds-color-mint-mint02` | `--klds-color-mint-mint07` |
| lightblue | `--klds-color-lightblue-lightblue02` | `--klds-color-lightblue-lightblue07` |
| blue | `--klds-color-blue-blue02` | `--klds-color-blue-blue06` |
| purple | `--klds-color-purple-purple02` | `--klds-color-purple-purple06` |
| pink | `--klds-color-pink-pink02` | `--klds-color-pink-pink06` |
| volcano | `--klds-color-volcano-volcano02` | `--klds-color-volcano-volcano06` |

### Active 상태

| Color | Background Token | Text/Icon |
|-------|-----------------|-----------|
| white | `--klds-color-gray-gray07` | `--klds-color-text-white` |
| gray | `--klds-color-gray-gray07` | `--klds-color-text-white` |
| red | `--klds-color-red-red05` | `--klds-color-text-white` |
| orange | `--klds-color-orange-orange06` | `--klds-color-text-white` |
| green | `--klds-color-green-green05` | `--klds-color-text-white` |
| mint | `--klds-color-mint-mint06` | `--klds-color-text-white` |
| lightblue | `--klds-color-lightblue-lightblue05` | `--klds-color-text-white` |
| blue | `--klds-color-blue-blue06` | `--klds-color-text-white` |
| purple | `--klds-color-purple-purple05` | `--klds-color-text-white` |
| pink | `--klds-color-pink-pink05` | `--klds-color-text-white` |
| volcano | `--klds-color-volcano-volcano05` | `--klds-color-text-white` |

### Disabled 상태 (모든 색상 공통)

| Background | Text/Icon |
|-----------|-----------|
| `--klds-color-gray-gray02` | `--klds-color-text-disabled` |

---

## 파일 구조

```
components/tag/
├── tag.css         # 컴포넌트 스타일
├── tag.html        # HTML 템플릿 예시
└── README.md       # 이 문서

demo/
└── tag_preview.html # 데모 프리뷰 페이지
```

---

> 📌 **최종 업데이트**: 2026-02-13  
> 📌 **Figma 원본**: [NextEP - Tag](https://www.figma.com/design/HJdhN6zf8pJq8mh4RvlDd3/NextEP?node-id=70-4818)
