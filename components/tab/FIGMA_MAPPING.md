# Tab Component — Figma Mapping

## 📐 Figma 노드 구조

```
tab (1:17432) — COMPONENT_SET
├─ type=pill,active=false (1:17436)
│  ├─ ic-mail (1:17437)
│  └─ text (1:17438)
├─ type=pill, active=true (1:17433)
│  ├─ ic-mail (1:17434)
│  └─ text (1:17435)
├─ type=line,active=false (128:5699)
│  ├─ ic-mail (128:5710)
│  └─ Team (128:5697)
└─ type=line,active=true (128:5700)
   ├─ ic-mail (128:5714)
   └─ Team (128:5701)
```

## 🎨 디자인 토큰 매핑

### Pill 형태 (type=pill)

| Figma Node | 속성 | 값 | CSS 토큰 |
|-----------|------|----|---------| 
| **1:17436 (비활성)** | | | |
| layout | padding | `8px 16px` | `--klds-spacing-xs` / `--klds-spacing-m` |
| cornerRadius | 모서리 | `9999px` | `--klds-radius-circle` |
| gap | 아이콘-텍스트 간격 | `8px` | `--klds-spacing-xs` |
| overflow | 오버플로우 | `clip` | `overflow: clip` |
| 1:17438 | 텍스트 색상 | `#121212` | `--klds-color-text-black` |
| I1:17437;1451:872 | 아이콘 색상 | `#121212` | `--klds-color-text-black` |
| fontSize | 폰트 크기 | `16px` | `--klds-typography-fontsize-m` |
| fontWeight | 폰트 굵기 | `600` | `600` |
| lineHeight | 라인 높이 | `24px` | `--klds-typography-lineheight-xl` |
| **1:17433 (활성)** | | | |
| fills | 배경색 | `#121212` | `--klds-color-black` |
| 1:17435 | 텍스트 색상 | `#FFFFFF` | `--klds-color-white` |
| I1:17434;1451:872 | 아이콘 색상 | `#FFFFFF` | `--klds-color-white` |

### Line 형태 (type=line)

| Figma Node | 속성 | 값 | CSS 토큰 |
|-----------|------|----|---------| 
| **128:5699 (비활성)** | | | |
| gap | 아이콘-텍스트 간격 | `8px` | `--klds-gap-3` |
| height | 높이 | `44px` | `44px` |
| padding | 상하 패딩 | `pt:12px pb:16px` | `--klds-padding-5` / `--klds-padding-6` |
| 128:5697 | 텍스트 색상 | `#9CA3AF` | `--klds-color-text-placeholder` |
| I128:5710;1451:872 | 아이콘 색상 | `#9CA3AF` | `--klds-color-text-placeholder` |
| fontSize | 폰트 크기 | `16px` | `--klds-typography-fontsize-m` |
| fontWeight | 폰트 굵기 | `600` | `600` |
| lineHeight | 라인 높이 | `0` | `line-height: 0` |
| **128:5700 (활성)** | | | |
| 128:5701 | 텍스트 색상 | `#121212` | `--klds-color-text-black` |
| I128:5714;1451:872 | 아이콘 색상 | `#121212` | `--klds-color-text-black` |
| strokes | 하단 언더라인 | `2px solid #005386` | `--klds-color-primary` |

### 실제 인스턴스 예시

| 인스턴스 | Figma Node | 설명 |
|---------|-----------|------|
| Today (active) | I128:5028 | pill active, 아이콘: `ic-calendar-event` |
| Weekly | I128:5029 | pill 비활성, 아이콘: `ic-calendar-week` |
| Monthly | I128:5030 | pill 비활성, 아이콘: `ic-calendar-30` |
| Me (active) | 128:5035 | line active |
| Team | 128:5037 | line 비활성 |
| Company | 128:5039 | line 비활성 |

## 🔧 CSS 클래스 매핑

| Figma Variant | CSS 클래스 | 상태 |
|--------------|-----------|------|
| `type=pill,active=false` | `.tab--pill` | 기본 |
| `type=pill, active=true` | `.tab--pill.tab--active` | 활성 |
| `type=line,active=false` | `.tab--line` | 기본 |
| `type=line,active=true` | `.tab--line.tab--active` | 활성 |

## 📦 아이콘 매핑

| 아이콘 | Figma Node | data-icon 속성 | SVG 경로 |
|-------|-----------|---------------|---------| 
| 캘린더 이벤트 | 98:414 | `ic-calendar-event` | `assets/icons/ic-calendar-event.svg` |
| 캘린더 주간 | 98:392 | `ic-calendar-week` | `assets/icons/ic-calendar-week.svg` |
| 캘린더 30일 | 98:455 | `ic-calendar-30` | `assets/icons/ic-calendar-30.svg` |
| 메일 | 96:824 | `ic-mail` | `assets/icons/ic-mail.svg` |

## 📋 레이아웃

### Pill Tabs Container
- Layout: `HORIZONTAL`
- Gap: `8px` (`--klds-gap-3`)

### Line Tabs Container
- Layout: `HORIZONTAL`
- Gap: `24px` (`--klds-gap-7`)

## ✅ 검증 체크리스트

- [x] pill 비활성: 투명 배경, 검정 텍스트/아이콘
- [x] pill 활성: 검정 배경, 흰색 텍스트/아이콘
- [x] line 비활성: placeholder 텍스트/아이콘
- [x] line 활성: 검정 텍스트/아이콘, primary 언더라인
- [x] 아이콘 mask 처리: SVG를 mask-image로 적용
- [x] 폰트: Pretendard 600, 16px
- [x] 접근성: focus-visible outline
