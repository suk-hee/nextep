/**
 * Avatar Component
 * 사용자 프로필 이미지를 표시하는 컴포넌트
 */

class Avatar {
  constructor(options = {}) {
    this.options = {
      size: 'medium', // xsmall, small, medium, large, xlarge
      src: null,
      alt: 'Avatar',
      status: null, // online, offline, away, busy
      fallback: null, // 이미지 로드 실패시 표시할 텍스트 또는 아이콘
      ...options
    };
    
    this.element = this.render();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = `avatar avatar--${this.options.size}`;
    
    if (this.options.src) {
      const img = document.createElement('img');
      img.className = 'avatar__image';
      img.src = this.options.src;
      img.alt = this.options.alt;
      
      // 이미지 로드 실패시 fallback 처리
      img.onerror = () => {
        wrapper.innerHTML = '';
        wrapper.appendChild(this.createFallback());
        if (this.options.status) {
          wrapper.appendChild(this.createStatus());
        }
      };
      
      wrapper.appendChild(img);
    } else {
      wrapper.appendChild(this.createFallback());
    }
    
    if (this.options.status) {
      wrapper.appendChild(this.createStatus());
    }
    
    return wrapper;
  }

  createFallback() {
    const fallback = document.createElement('div');
    fallback.className = 'avatar__fallback';
    
    if (this.options.fallback) {
      fallback.textContent = this.options.fallback;
    } else if (this.options.alt) {
      // 이름의 첫 글자 사용
      const initials = this.options.alt
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
      fallback.textContent = initials;
    } else {
      // 기본 아이콘 (SVG) - ic-user.svg
      fallback.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5ZM7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM7.20266 15.3395C8.47422 14.4918 10.1733 14 12 14C13.8267 14 15.5258 14.4918 16.7973 15.3395C18.0619 16.1826 19 17.457 19 19C19 19.5523 18.5523 20 18 20C17.4477 20 17 19.5523 17 19C17 18.3338 16.5949 17.6083 15.6879 17.0036C14.7879 16.4036 13.487 16 12 16C10.513 16 9.21207 16.4036 8.31206 17.0036C7.40506 17.6083 7 18.3338 7 19C7 19.5523 6.55228 20 6 20C5.44772 20 5 19.5523 5 19C5 17.457 5.93809 16.1826 7.20266 15.3395Z" fill="currentColor"/>
        </svg>
      `;
    }
    
    return fallback;
  }

  createStatus() {
    const status = document.createElement('div');
    status.className = `avatar__status avatar__status--${this.options.status}`;
    return status;
  }

  setSize(size) {
    // 기존 사이즈 클래스 제거
    this.element.classList.remove(
      'avatar--xsmall',
      'avatar--small', 
      'avatar--medium',
      'avatar--large',
      'avatar--xlarge'
    );
    // 새 사이즈 클래스 추가
    this.element.classList.add(`avatar--${size}`);
    this.options.size = size;
  }

  setStatus(status) {
    const existingStatus = this.element.querySelector('.avatar__status');
    
    if (status === null || status === undefined) {
      // 상태 제거
      if (existingStatus) {
        existingStatus.remove();
      }
      this.options.status = null;
    } else {
      // 상태 업데이트 또는 추가
      if (existingStatus) {
        existingStatus.className = `avatar__status avatar__status--${status}`;
      } else {
        this.options.status = status;
        this.element.appendChild(this.createStatus());
      }
      this.options.status = status;
    }
  }

  setSrc(src) {
    const img = this.element.querySelector('.avatar__image');
    if (img) {
      img.src = src;
    } else {
      this.options.src = src;
      this.element.innerHTML = '';
      this.element.appendChild(this.render().children[0]);
    }
  }

  mount(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    container.appendChild(this.element);
    return this;
  }

  destroy() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

/**
 * Avatar Group Component
 * 여러 Avatar를 그룹으로 표시
 */
class AvatarGroup {
  constructor(options = {}) {
    this.options = {
      avatars: [],
      stacked: false,
      max: null, // 최대 표시 개수
      showAddButton: false,
      onAddClick: null,
      ...options
    };
    
    this.element = this.render();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.className = `avatar-group ${this.options.stacked ? 'avatar-group--stacked' : ''}`;
    
    const avatarsToShow = this.options.max 
      ? this.options.avatars.slice(0, this.options.max)
      : this.options.avatars;
    
    avatarsToShow.forEach(avatarOptions => {
      const avatar = new Avatar(avatarOptions);
      wrapper.appendChild(avatar.element);
    });
    
    // 나머지 개수 표시
    if (this.options.max && this.options.avatars.length > this.options.max) {
      const remaining = this.options.avatars.length - this.options.max;
      const remainingAvatar = new Avatar({
        size: this.options.avatars[0]?.size || 'medium',
        fallback: `+${remaining}`
      });
      wrapper.appendChild(remainingAvatar.element);
    }
    
    // Add 버튼
    if (this.options.showAddButton) {
      const addButton = document.createElement('button');
      addButton.className = 'avatar-group__add';
      addButton.innerHTML = `
        <svg class="avatar-group__add-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
      
      if (this.options.onAddClick) {
        addButton.addEventListener('click', this.options.onAddClick);
      }
      
      wrapper.appendChild(addButton);
    }
    
    return wrapper;
  }

  addAvatar(avatarOptions) {
    this.options.avatars.push(avatarOptions);
    this.refresh();
  }

  removeAvatar(index) {
    this.options.avatars.splice(index, 1);
    this.refresh();
  }

  refresh() {
    this.element.innerHTML = '';
    const newElement = this.render();
    Array.from(newElement.children).forEach(child => {
      this.element.appendChild(child);
    });
  }

  mount(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    container.appendChild(this.element);
    return this;
  }

  destroy() {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Avatar, AvatarGroup };
}

export { Avatar, AvatarGroup };
