# Avatar Component

사용자 프로필 이미지를 표시하는 Avatar 컴포넌트입니다.

## 파일 구조

```
avatar/
├── avatar.css          # 스타일시트
├── avatar.js           # JavaScript 컴포넌트
└── README.md          # 문서

demo/
└── avatar-demo.html    # 데모 페이지
```

## 기능

- ✅ 5가지 크기 지원 (xsmall, small, medium, large, xlarge)
- ✅ 온라인 상태 표시 (online, offline, away, busy)
- ✅ 이미지 로드 실패시 Fallback 처시
- ✅ Avatar Group 지원
- ✅ Stacked 레이아웃
- ✅ 최대 표시 개수 제한
- ✅ Add 버튼 지원

## 사용법

### 기본 사용

```javascript
// 단일 Avatar
const avatar = new Avatar({
  size: 'medium',
  src: '../assets/avatars/male01.jpg',
  alt: 'John Doe',
  status: 'online'
});

avatar.mount('#container');
```

### Avatar 크기

- `xsmall`: 32px
- `small`: 40px (기본값)
- `medium`: 48px
- `large`: 64px
- `xlarge`: 100px

### 상태 표시

- `online`: 초록색 (온라인)
- `offline`: 회색 (오프라인)
- `away`: 노란색 (자리비움)
- `busy`: 빨간색 (다른 용무 중)

### Avatar Group

```javascript
const avatarGroup = new AvatarGroup({
  avatars: [
    { src: '../assets/avatars/male01.jpg', alt: 'User 1', status: 'online' },
    { src: '../assets/avatars/female01.jpg', alt: 'User 2', status: 'offline' },
    { src: '../assets/avatars/male02.jpg', alt: 'User 3', status: 'away' },
    { src: '../assets/avatars/female02.jpg', alt: 'User 4', status: 'busy' }
  ],
  stacked: false,
  max: 4,
  showAddButton: true,
  onAddClick: () => console.log('Add button clicked')
});

avatarGroup.mount('#container');
```

### HTML 사용

```html
<!-- 기본 Avatar -->
<div class="avatar avatar--medium">
  <img class="avatar__image" src="../assets/avatars/male01.jpg" alt="User">
  <div class="avatar__status avatar__status--online"></div>
</div>

<!-- Fallback Avatar -->
<div class="avatar avatar--medium">
  <div class="avatar__fallback">JD</div>
</div>

<!-- Avatar Group -->
<div class="avatar-group">
  <div class="avatar avatar--small">
    <img class="avatar__image" src="../assets/avatars/male01.jpg" alt="User 1">
    <div class="avatar__status avatar__status--online"></div>
  </div>
  <div class="avatar avatar--small">
    <img class="avatar__image" src="../assets/avatars/female01.jpg" alt="User 2">
    <div class="avatar__status avatar__status--offline"></div>
  </div>
  <button class="avatar-group__add">
    <svg class="avatar-group__add-icon" viewBox="0 0 20 20">
      <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor"/>
    </svg>
  </button>
</div>
```

## API

### Avatar

#### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `size` | string | 'medium' | Avatar 크기 |
| `src` | string | null | 이미지 URL |
| `alt` | string | 'Avatar' | 이미지 대체 텍스트 |
| `status` | string | null | 상태 표시 |
| `fallback` | string | null | Fallback 텍스트 |

#### Methods

- `setSize(size)`: 크기 변경
- `setStatus(status)`: 상태 변경
- `setSrc(src)`: 이미지 URL 변경
- `mount(container)`: DOM에 마운트
- `destroy()`: 컴포넌트 제거

### AvatarGroup

#### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `avatars` | array | [] | Avatar 옵션 배열 |
| `stacked` | boolean | false | 겹쳐서 표시 |
| `max` | number | null | 최대 표시 개수 |
| `showAddButton` | boolean | false | Add 버튼 표시 |
| `onAddClick` | function | null | Add 버튼 클릭 핸들러 |

#### Methods

- `addAvatar(avatarOptions)`: Avatar 추가
- `removeAvatar(index)`: Avatar 제거
- `refresh()`: 컴포넌트 새로고침
- `mount(container)`: DOM에 마운트
- `destroy()`: 컴포넌트 제거

## 디자인 토큰

```css
/* 색상 */
--avatar-bg: #e5e7eb;
--avatar-text: #9ca3af;
--status-online: #95de64;
--status-offline: #cbd5e1;
--status-away: #ffc53d;
--status-busy: #ff7875;
--status-border: #fff;

/* 크기 */
--avatar-xsmall: 32px;
--avatar-small: 40px;
--avatar-medium: 48px;
--avatar-large: 64px;
--avatar-xlarge: 100px;

/* 상태 인디케이터 크기 */
--status-xsmall: 10px;
--status-small: 12px;
--status-medium: 14px;
--status-large: 18px;
--status-xlarge: 24px;
```

## 브라우저 지원

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 예제

데모 페이지를 참조하세요: `avatar-demo.html`
