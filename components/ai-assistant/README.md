# AI Assistant Component

**Figma node**: `3:5433` (type=default)

AI와 대화할 수 있는 어시스턴트 패널 컴포넌트입니다.

---

## 📐 피그마 정확한 구조

```
ai-assistant (560×976, padding:24, gap:24, radius:24, bg:#FFF)
  └─ ai-default (512×928, VERTICAL, gap:32)
       └─ wrap (512×928, VERTICAL, gap:32)
            ├─ ai-header (512×32, HORIZONTAL, gap:10, SPACE_BETWEEN)
            │    ├─ btn-maximize (146×32, HORIZONTAL, gap:8, CENTER, radius:8)
            │    │    ├─ ic-sidebar-right (24×24)
            │    │    └─ "AI Assistant" (20/700, line:24, #121212)
            │    └─ btn-close (32×32, HORIZONTAL, CENTER, radius:8)
            │         └─ ic-close (32×32)
            │
            ├─ ai-contents-default (512×772, VERTICAL, gap:40, align:CENTER)
            │    ├─ title (339×94)
            │    │    "박소정님의 업무를\n스마트하게 도와드립니다."
            │    │    36/700, line:46.8, align:CENTER, #121212
            │    │
            │    └─ btn-list (512×304, HORIZONTAL, padding:24, gap:16, align:CENTER)
            │         └─ btn ×6 (144×144, VERTICAL, padding:8, gap:8, align:CENTER)
            │              radius:24, border:#E5E7EB (1px), bg:#FFF
            │              ├─ icon (56×56)
            │              └─ label (128×18, 18/600, line:18, align:CENTER, #121212)
            │
            └─ prompt (512×60, padding:16, gap:8, radius:12, border:#E5E7EB)
```

---

## 🎨 디자인 토큰 (피그마 정확 값)

| 요소 | 속성 | 피그마 값 | 토큰 |
|------|------|-----------|------|
| **Container** | width | 560px | - |
| | height | 100vh | - |
| | border-radius | 24px | - |
| | padding | 24px | --klds-padding-8 |
| | background | #FFFFFF | --klds-color-white |
| **Header** | height | 32px | --klds-height-5 |
| | gap | 10px | 직접 사용 |
| **btn-maximize** | gap | 8px | --klds-gap-3 |
| **Title** | font-size | 20px | 직접 사용 |
| | font-weight | 700 | - |
| | line-height | 24px | 직접 사용 |
| | color | #121212 | --klds-color-text-black |
| **Contents** | gap | 40px | --klds-gap-9 |
| | align | CENTER | - |
| **Greeting** | font-size | 36px | 직접 사용 |
| | font-weight | 700 | - |
| | line-height | 46.8px | 직접 사용 |
| **btn-list** | width | 512px | - |
| | height | 304px | - |
| | padding | 24px | --klds-padding-8 |
| | gap | 16px | --klds-gap-5 |
| **btn** | size | 144×144px | - |
| | border-radius | 24px | - |
| | border | 1px solid #E5E7EB | --klds-color-border-default |
| | padding | 8px | --klds-gap-3 |
| | gap | 8px | --klds-gap-3 |
| **icon** | size | 56×56px | - |
| **label** | font-size | 18px | --klds-typography-fontsize-l |
| | font-weight | 600 | - |
| | line-height | 18px | 직접 사용 |

---

## 📦 사용법

### HTML

```html
<div class="ai-assistant">
  <div class="ai-assistant__default">
    <div class="ai-assistant__wrap">
      
      <!-- Header -->
      <header class="ai-assistant__header">
        <button class="ai-assistant__btn-maximize">
          <svg>...</svg>
          <h1 class="ai-assistant__title">AI Assistant</h1>
        </button>
        <button class="ai-assistant__btn-close">
          <svg>...</svg>
        </button>
      </header>

      <!-- Contents -->
      <div class="ai-assistant__contents">
        <h2 class="ai-assistant__greeting">
          박소정님의 업무를
          스마트하게 도와드립니다.
        </h2>

        <div class="ai-assistant__btn-list">
          <button class="ai-assistant__btn" data-action="rocket">
            <div class="ai-assistant__btn-icon">
              <img src="icon-rocket.svg">
            </div>
            <p class="ai-assistant__btn-label">브리핑 보기</p>
          </button>
          <!-- ...나머지 5개 버튼... -->
        </div>
      </div>

      <!-- Prompt -->
      <div class="ai-assistant__prompt">
        <div class="prompt">...</div>
      </div>

    </div>
  </div>
</div>
```

### JavaScript

```javascript
// Auto-init
new AIAssistant(document.querySelector('.ai-assistant'));

// 이벤트 리스닝
document.addEventListener('ai-assistant:maximize', () => {
  console.log('사이드바 확장');
});

document.addEventListener('ai-assistant:close', () => {
  console.log('닫기');
});

document.addEventListener('ai-assistant:action', (e) => {
  console.log('액션:', e.detail.action);
});

document.addEventListener('ai-assistant:prompt', (e) => {
  console.log('프롬프트 전송:', e.detail.text);
});
```

---

## 🎯 액션 버튼 (피그마 순서)

| 순서 | data-action | 아이콘 | 라벨 |
|------|-------------|--------|------|
| 1 | `rocket` | icon-rocket.svg | 브리핑 보기 |
| 2 | `mail` | icon-mail.svg | 안읽은 메일 요약 |
| 3 | `calendar` | icon-calendar.svg | 이번주 일정 확인 |
| 4 | `beach-ball` | icon-beach-ball.svg | 연차 휴가 등록 |
| 5 | `reserve` | icon-reserve.svg | 회의실 예약 |
| 6 | `meeting-minutes` | icon-meeting-minutes.svg | 회의록 작성 |

---

## 🔗 이벤트

| 이벤트 | detail | 설명 |
|--------|--------|------|
| `ai-assistant:maximize` | - | 사이드바 확장 버튼 클릭 |
| `ai-assistant:close` | - | 닫기 버튼 클릭 |
| `ai-assistant:action` | `{ action: string }` | 액션 버튼 클릭 |
| `ai-assistant:prompt` | `{ text: string }` | 프롬프트 전송 |

---

## 📂 파일 구조

```
components/ai-assistant/
├── ai-assistant.css          # 스타일 (피그마 정확 값)
├── ai-assistant.html         # 기본 HTML
├── ai-assistant.js           # 이벤트 핸들러
└── README.md                  # 문서

assets/ai-assistant/
├── icon-rocket.svg            # 브리핑 보기
├── icon-mail.svg              # 안읽은 메일 요약
├── icon-calendar.svg          # 이번주 일정 확인
├── icon-beach-ball.svg        # 연차 휴가 등록
├── icon-reserve.svg           # 회의실 예약
└── icon-meeting-minutes.svg   # 회의록 작성
```

---

## 🔗 의존성

- **Prompt Component** (`../prompt/`) — 입력창 재사용
- **Design Tokens** (`../../styles/tokens.css`)
- **Pretendard Font** (CDN 또는 로컬)

---

## 🚀 데모

`nextep/demo/ai-assistant_preview.html` 참조

---

## 📝 Notes

- **높이**: `height: 100vh`로 브라우저 전체 높이 사용
- **레이아웃**: btn-list는 flex-wrap으로 2행×3열 자동 배치
- **아이콘**: assets/ai-assistant/ 폴더의 SVG 사용
- **gap**: header는 10px, 나머지는 8px, 16px, 32px, 40px 사용
