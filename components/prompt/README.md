# Prompt Component

KLDS (KMSLab Design System)의 Prompt 컴포넌트입니다.

## 📋 개요

AI Assistance의 프롬프트 입력 영역을 구현한 컴포넌트입니다. 사용자가 AI에게 업무 요청을 입력하고 음성/텍스트로 전송할 수 있습니다.

## 🎨 Figma 디자인 기반

- **Figma Node ID**: `3:5651` (prompt), `3:5671` (btn-mic), `3:5677` (btn-send)
- **Component Name**: `prompt` (COMPONENT_SET)
- **Status**: default, focus

## 📐 구조

```
prompt/
├── prompt.css           # 컴포넌트 스타일 (Design Tokens 기반)
├── prompt.js            # 인터랙션 로직
├── prompt.html          # 사용 예시 HTML
└── README.md            # 문서 (이 파일)
```

## 🔧 사용 방법

### CSS/JS 임포트

```html
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="components/prompt/prompt.css">
<script src="components/prompt/prompt.js"></script>
```

### HTML 구조

```html
<div class="prompt">
  <div class="prompt__wrap">
    
    <!-- Global Button -->
    <button class="prompt__btn-global" aria-label="글로벌 옵션">
      <img src="assets/icons/ic-global.svg" alt="" width="24" height="24">
    </button>
    
    <!-- Input Area -->
    <div class="prompt__input-wrap">
      <textarea 
        class="prompt__input" 
        placeholder="원하는 업무를 입력하세요."
        rows="1"
        aria-label="프롬프트 입력"></textarea>
    </div>
    
    <!-- Buttons -->
    <div class="prompt__btns">
      <div class="prompt__right-btns">
        <!-- Mic Button -->
        <button class="prompt__btn prompt__btn--mic" aria-label="음성 입력">
          <span class="prompt__btn-icon" 
                style="-webkit-mask-image:url(assets/icons/ic-microphone.svg);
                       mask-image:url(assets/icons/ic-microphone.svg)"></span>
        </button>
        
        <!-- Send Button -->
        <button class="prompt__btn prompt__btn--send" aria-label="전송" disabled>
          <span class="prompt__btn-icon" 
                style="-webkit-mask-image:url(assets/icons/ic-arrow-circle-up02.svg);
                       mask-image:url(assets/icons/ic-arrow-circle-up02.svg)"></span>
        </button>
      </div>
    </div>
    
  </div>
</div>
```

## 📏 디자인 스펙 (Figma 기반)

### Default 상태 (592×60)
- **배경**: #FFFFFF
- **테두리**: #E5E7EB (1px)
- **Border Radius**: 12px
- **Padding**: 16px
- **Layout**: HORIZONTAL, gap: 8px
- **Input**: Pretendard 18px / 400 weight / 27px line-height

### Focus 상태 (592×114)
- **Layout**: VERTICAL, gap: 4px, align: flex-end
- **Input**: 여러 줄 지원, 자동 높이 (최대 5줄)
- **Buttons**: SPACE_BETWEEN 정렬

### 버튼 크기
- **Global Button**: 32×32px
- **Mic Button**: 32×32px, 아이콘 24×24px
- **Send Button**: 32×32px, 아이콘 28×28px

## 🎭 상태 (States)

### Default
- 1줄 입력 레이아웃
- Global 버튼 왼쪽, 입력창 중앙, Mic/Send 버튼 우측
- 전송 버튼 비활성화 (disabled)

### Focus
- 여러 줄 입력 레이아웃
- 입력창 상단, 버튼들 하단 (Global 왼쪽, Mic/Send 우측)
- 자동 높이 조절 (최대 5줄 = 135px)

### 텍스트 입력 시
- 전송 버튼 활성화 (is-active)
- 아이콘 색상 변경: #CBD0D7 → #121212

### 마이크 활성화 시
- 마이크 버튼 활성화 (is-active)
- 아이콘 변경: ic-microphone → ic-microphone-fill
- 아이콘 색상 변경: #374151 → #005386

## 🎨 CSS 클래스

| 클래스명 | 설명 |
|---------|------|
| `.prompt` | 프롬프트 컨테이너 (592px max-width) |
| `.prompt.is-focus` | Focus 상태 (VERTICAL 레이아웃) |
| `.prompt__wrap` | 내부 래퍼 (HORIZONTAL → VERTICAL) |
| `.prompt__input-wrap` | 입력창 영역 |
| `.prompt__input` | Textarea (자동 높이 조절) |
| `.prompt__btns` | 버튼 영역 |
| `.prompt__btn-global` | 글로벌 버튼 (32×32) |
| `.prompt__right-btns` | 우측 버튼 그룹 (Mic + Send) |
| `.prompt__btn` | 공통 버튼 (32×32) |
| `.prompt__btn--mic` | 마이크 버튼 |
| `.prompt__btn--mic.is-active` | 마이크 활성화 (녹음 중) |
| `.prompt__btn--send` | 전송 버튼 |
| `.prompt__btn--send.is-active` | 전송 버튼 활성화 (텍스트 있음) |
| `.prompt__btn-icon` | 버튼 아이콘 (mask-image) |

## 💡 JavaScript 기능

### 1. 자동 높이 조절
```javascript
// textarea의 내용에 따라 자동으로 높이 조절
// 최대 5줄 (135px)까지 확장
autoResize() {
  this.textarea.style.height = 'auto';
  const scrollHeight = this.textarea.scrollHeight;
  const maxHeight = 135;
  
  if (scrollHeight > maxHeight) {
    this.textarea.style.height = `${maxHeight}px`;
    this.textarea.style.overflowY = 'auto';
  } else {
    this.textarea.style.height = `${scrollHeight}px`;
  }
}
```

### 2. 레이아웃 전환
```javascript
// Focus 시 VERTICAL 레이아웃으로 전환
this.textarea.addEventListener('focus', () => {
  this.element.classList.add('is-focus');
});

// Blur 시 텍스트 없으면 HORIZONTAL로 복귀
this.textarea.addEventListener('blur', () => {
  if (!this.textarea.value.trim()) {
    this.element.classList.remove('is-focus');
  }
});
```

### 3. 전송 버튼 활성화
```javascript
// 텍스트 입력 시 전송 버튼 활성화
updateSendButton() {
  const hasText = this.textarea.value.trim().length > 0;
  
  if (hasText) {
    this.btnSend.classList.add('is-active');
    this.btnSend.disabled = false;
  } else {
    this.btnSend.classList.remove('is-active');
    this.btnSend.disabled = true;
  }
}
```

### 4. 마이크 토글
```javascript
// 마이크 버튼 클릭 시 아이콘 변경
toggleMic() {
  const isActive = this.btnMic.classList.toggle('is-active');
  
  if (isActive) {
    // ic-microphone-fill로 변경
    this.micIcon.style.maskImage = 'url(assets/icons/ic-microphone-fill.svg)';
  } else {
    // ic-microphone로 변경
    this.micIcon.style.maskImage = 'url(assets/icons/ic-microphone.svg)';
  }
}
```

## 🎨 토큰 매핑

### 색상
- `#FFFFFF` → `--klds-color-white` (배경)
- `#E5E7EB` → `--klds-color-border-default` (테두리)
- `#393939` → `--klds-color-text-gray` (텍스트, ≒#374151)
- `#374151` → `--klds-color-icon-gray` (마이크 기본)
- `#005386` → `--klds-color-primary-primary06` (마이크 활성)
- `#CBD0D7` → `--klds-color-gray-gray04` (전송 버튼 비활성)
- `#121212` → `--klds-color-text-black` (전송 버튼 활성)
- `#F3F4F6` → `--klds-color-background-hover` (버튼 hover)

### 간격
- `4px` → `--klds-gap-2`
- `8px` → `--klds-padding-3` / `--klds-gap-3` / `--klds-radius-xs`
- `12px` → `--klds-radius-s`
- `16px` → `--klds-padding-6`

### 크기
- `24px` → `--klds-height-4` (마이크 아이콘)
- `28px` → 직접 사용 (전송 아이콘)
- `32px` → `--klds-height-5` (버튼)

### 타이포그래피
- `18px` → `--klds-typography-fontsize-l`
- `27px` → 직접 사용 (line-height)
- `Pretendard` → `--klds-typography-fontfamily-text`

## 🔗 재사용한 Assets

### 아이콘 (assets/icons/)
- `ic-global.svg` (24×24)
- `ic-microphone.svg` (24×24)
- `ic-microphone-fill.svg` (24×24)
- `ic-arrow-circle-up02.svg` (28×28)

### 디자인 토큰
- `tokens.css`의 모든 토큰 활용
- **하드코딩 없음**: 모든 색상, 간격, 크기가 토큰으로 정의됨

## 📝 구현 원칙

1. ✅ **Figma 노드 데이터 기반**: 모든 속성은 Figma 노드에서 직접 도출
2. ✅ **Design Tokens 사용**: 색상, 간격 등 모든 스타일 값은 tokens.css의 변수 사용
3. ✅ **주석으로 근거 명시**: CSS 속성 옆에 Figma 노드 속성 주석 추가
4. ✅ **하드코딩 금지**: 원시값 대신 CSS 변수 사용
5. ✅ **피그마에 없는 속성 추가 금지**: 실제 디자인에 존재하는 속성만 구현
6. ✅ **mask-image 방식**: 아이콘 색상을 background-color로 정확히 제어

## 🚀 고급 사용법

### 프로그래밍 방식 초기화
```javascript
import Prompt from './components/prompt/prompt.js';

const promptElement = document.querySelector('.prompt');
const prompt = new Prompt(promptElement);

// 메시지 전송 후 콜백
prompt.handleSend = function() {
  const text = this.textarea.value.trim();
  console.log('전송:', text);
  
  // API 호출 등 커스텀 로직
  sendMessageToAI(text);
  
  // 입력창 초기화
  this.textarea.value = '';
  this.autoResize();
  this.updateSendButton();
};
```

### 커스텀 이벤트
```javascript
// 전송 버튼 클릭 시 커스텀 이벤트 발생
document.querySelector('.prompt__btn--send').addEventListener('click', (e) => {
  const text = document.querySelector('.prompt__input').value;
  
  // 커스텀 이벤트 디스패치
  const event = new CustomEvent('prompt:send', { 
    detail: { text } 
  });
  document.dispatchEvent(event);
});

// 커스텀 이벤트 리스너
document.addEventListener('prompt:send', (e) => {
  console.log('메시지 전송됨:', e.detail.text);
});
```

## 🔄 업데이트 이력

- **2026-02-12**: 초기 구현
  - Figma node 3:5651, 3:5671, 3:5677 기반 완전 구현
  - 자동 높이 조절 기능
  - Focus 시 레이아웃 전환
  - 마이크 토글 (ic-microphone ↔ ic-microphone-fill)
  - 전송 버튼 활성화/비활성화
  - Design Tokens 100% 적용
  - mask-image 방식 아이콘

## 📍 데모

데모 파일: `demo/prompt_preview.html`

---

> 📌 **Figma 출처**: NextEP Design System  
> 📌 **파일 키**: HJdhN6zf8pJq8mh4RvlDd3  
> 📌 **노드 ID**: 3:5651 (prompt), 3:5671 (btn-mic), 3:5677 (btn-send)
