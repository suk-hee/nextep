# LNB (Left Navigation Bar) Component

KLDS (KMSLab Design System)의 LNB 컴포넌트입니다.

## 📋 개요

Next EP 애플리케이션의 좌측 네비게이션 바를 구현한 컴포넌트입니다. Figma 디자인 시스템의 명세를 기반으로 구현되었으며, 기존 아이콘 assets를 재사용합니다.

## 🎨 Figma 디자인 기반

- **Figma Node ID**: `3:3540`
- **Component Name**: `lnb` (COMPONENT)
- **Dimensions**: 80×1000px (full height)
- **Layout**: VERTICAL, padding: 8px, gap: 8px

## 📐 구조

```
lnb/
├── lnb.css              # 컴포넌트 스타일 (Design Tokens 기반)
├── lnb.html             # 사용 예시 HTML
└── README.md            # 문서 (이 파일)
```

## 🔧 사용 방법

### CSS 임포트

```html
<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="components/layout/lnb/lnb.css">
```

### HTML 구조

```html
<nav class="lnb" role="navigation" aria-label="메인 네비게이션">
  <!-- 상단 메뉴 그룹 -->
  <div class="lnb-menu-group">
    <button class="lnb-menu-item" data-menu="home" title="홈">
      <span class="lnb-menu-icon">
        <img src="assets/icons/ic-home01.svg" alt="홈" width="24" height="24">
      </span>
    </button>
    
    <!-- 뱃지 있는 메뉴 -->
    <button class="lnb-menu-item" data-menu="mail" title="메일" data-badge="8">
      <span class="lnb-menu-icon">
        <img src="assets/icons/ic-mail.svg" alt="메일" width="24" height="24">
      </span>
      <span class="lnb-badge lnb-badge--count">8</span>
    </button>
    
    <!-- 활성 메뉴 -->
    <button class="lnb-menu-item active" data-menu="schedule" title="일정">
      <span class="lnb-menu-icon">
        <img src="assets/icons/ic-calendar-days.svg" alt="일정" width="24" height="24">
      </span>
    </button>
  </div>
  
  <!-- 하단 메뉴 그룹 -->
  <div class="lnb-menu-bottom">
    <button class="lnb-menu-item" data-menu="todo" title="할 일">
      <span class="lnb-menu-icon">
        <img src="assets/icons/ic-check02.svg" alt="할 일" width="24" height="24">
      </span>
    </button>
  </div>
</nav>
```

## 📏 디자인 스펙 (Figma 기반)

### 전체 컨테이너
- **너비**: 80px (고정)
- **높이**: 100% (full height)
- **레이아웃**: VERTICAL
- **Padding**: 8px
- **Gap**: 8px
- **배경**: transparent

### 메뉴 아이템
- **크기**: 48×48px
- **Border Radius**: 8px
- **Gap**: 10px
- **Align**: CENTER
- **아이콘**: 24×24px
- **배경 (default)**: transparent
- **배경 (hover)**: #F3F4F6
- **배경 (active)**: #005386 (primary06)

### 뱃지
- **크기**: 20×20px (최소), 높이 고정
- **Border Radius**: 9999px (원형)
- **배경**: #FF4D4F (red05)
- **위치**: top: -5px, right: -5px
- **폰트**: Pretendard 14px / 600 weight / #FFFFFF
- **Line Height**: 14px

## 🎨 CSS 클래스

| 클래스명 | 설명 |
|---------|------|
| `.lnb` | 네비게이션 바 컨테이너 (80×full) |
| `.lnb-menu-group` | 상단 메뉴 그룹 (10개) |
| `.lnb-menu-bottom` | 하단 메뉴 그룹 (2개) |
| `.lnb-menu-item` | 메뉴 버튼 (48×48) |
| `.lnb-menu-item.active` | 활성 메뉴 (배경 #005386, 아이콘 흰색) |
| `.lnb-menu-icon` | 아이콘 래퍼 (24×24) |
| `.lnb-badge` | 뱃지 공통 클래스 (position absolute) |
| `.lnb-badge--count` | 숫자 뱃지 (20×20, 빨간 원형) |
| `.lnb-badge--count.is-large` | 큰 숫자용 (24px 너비, 12px 폰트) |

## 📋 메뉴 목록

### 상단 메뉴 그룹 (10개)
| 메뉴 ID | 아이콘 | 이름 |
|---------|--------|------|
| `home` | ic-home01 | 홈 |
| `workspace` | ic-bag | 워크스페이스 |
| `chat` | ic-chat-circle | 채팅 |
| `mail` | ic-mail | 메일 |
| `schedule` | ic-calendar-days | 일정 |
| `files` | ic-folder1 | 자료실 |
| `video-meeting` | ic-webcam | 화상회의 |
| `org` | ic-sitemap | 조직도 |
| `collect` | ic-file-document | 문서수합 |
| `more` | ic-more-horizontal | 더보기 |

### 하단 메뉴 그룹 (2개)
| 메뉴 ID | 아이콘 | 이름 |
|---------|--------|------|
| `todo` | ic-check02 | 할 일 |
| `help` | ic-circle-help | 도움말 |

## 🎭 상태 (States)

### Default
기본 상태, 배경 투명

### Hover
마우스 오버 시 배경 #F3F4F6 표시

### Active
현재 선택된 메뉴 표시
- 배경: #005386 (primary06)
- 아이콘: 흰색 (filter: brightness(0) invert(1))
- Hover 시: #024A77 (primary07)

### Focus
키보드 포커스 시 outline 표시 (접근성)

## 🎨 토큰 매핑

### 색상
- `transparent` → 배경 투명
- `#F3F4F6` → `--klds-color-background-hover` (hover 배경)
- `#005386` → `--klds-color-primary-primary06` (active 배경)
- `#024A77` → `--klds-color-primary-primary07` (active hover)
- `#FF4D4F` → `--klds-color-red-red05` (뱃지 배경)
- `#FFFFFF` → `--klds-color-text-white` (뱃지 텍스트, active 아이콘)
- `#121212` → svg 자체 색상 (default 아이콘)

### 간격
- `8px` → `--klds-padding-3` / `--klds-gap-3`
- `10px` → `--klds-padding-4`

### 크기
- `48px` → `--klds-height-7` (메뉴 버튼)
- `24px` → `--klds-height-4` (아이콘)
- `20px` → `--klds-height-3` (뱃지)

### 반경
- `8px` → `--klds-radius-xs` (메뉴 버튼)
- `9999px` → `--klds-radius-circle` (뱃지)

### 타이포그래피
- `14px` → `--klds-typography-fontsize-s` (뱃지)
- `Pretendard` → `--klds-typography-fontfamily-text`

## 🔗 재사용한 Assets

### 아이콘 (assets/icons/)
- `ic-home01.svg`, `ic-bag.svg`, `ic-chat-circle.svg`, `ic-mail.svg`
- `ic-calendar-days.svg`, `ic-folder1.svg`, `ic-webcam.svg`, `ic-sitemap.svg`
- `ic-file-document.svg`, `ic-more-horizontal.svg`
- `ic-check02.svg`, `ic-circle-help.svg`

### 디자인 토큰
- `tokens.css`의 모든 토큰 활용
- **하드코딩 없음**: 모든 색상, 간격, 크기가 토큰으로 정의됨

## 📝 구현 원칙

1. ✅ **Figma 노드 데이터 기반**: 모든 속성은 Figma 노드에서 직접 도출
2. ✅ **Design Tokens 사용**: 색상, 간격 등 모든 스타일 값은 tokens.css의 변수 사용
3. ✅ **주석으로 근거 명시**: CSS 속성 옆에 Figma 노드 속성 주석 추가
4. ✅ **하드코딩 금지**: 원시값 대신 CSS 변수 사용
5. ✅ **피그마에 없는 속성 추가 금지**: 실제 디자인에 존재하는 속성만 구현

## 💡 JavaScript 인터랙션 (선택 사항)

### Active 상태 전환
```javascript
// 메뉴 클릭 시 active 클래스 전환
document.querySelectorAll('.lnb-menu-item').forEach(item => {
  item.addEventListener('click', function() {
    // 이전 active 제거
    document.querySelector('.lnb-menu-item.active')?.classList.remove('active');
    // 현재 메뉴 active
    this.classList.add('active');
  });
});
```

### 뱃지 동적 업데이트
```javascript
// 뱃지 숫자 업데이트
function updateBadge(menuId, count) {
  const item = document.querySelector(`[data-menu="${menuId}"]`);
  const badge = item.querySelector('.lnb-badge--count');
  
  if (count > 0) {
    if (!badge) {
      const newBadge = document.createElement('span');
      newBadge.className = 'lnb-badge lnb-badge--count';
      if (count > 99) newBadge.classList.add('is-large');
      newBadge.textContent = count > 99 ? '99+' : count;
      item.appendChild(newBadge);
    } else {
      badge.textContent = count > 99 ? '99+' : count;
      badge.classList.toggle('is-large', count > 99);
    }
  } else {
    badge?.remove();
  }
}

// 사용 예시
updateBadge('mail', 12);  // 메일 뱃지 12로 설정
```

## 🔄 업데이트 이력

- **2026-02-12**: lnb 폴더로 구조 변경
  - `lnb.css`, `lnb.html`, `README.md`를 `lnb/` 폴더로 이동
  - header 컴포넌트와 구조 일관성 확보
  
- **2026-02-11**: 초기 구현
  - Figma node 3:3540 기반 완전 구현
  - Design Tokens 100% 적용
  - 12개 메뉴 아이템 + 뱃지 지원

## 📍 데모

데모 파일: `demo/lnb-preview.html`

---

> 📌 **Figma 출처**: NextEP Design System  
> 📌 **파일 키**: HJdhN6zf8pJq8mh4RvlDd3  
> 📌 **노드 ID**: 3:3540
