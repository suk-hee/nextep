import './timetable.css';
import '../avatar/avatar.css';
import './timetable.js';

const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

function gridCells() {
  return Array.from({ length: 24 }, (_, i) =>
    `<div class="timetable__grid-cell${i % 2 !== 0 ? ' timetable__grid-cell--half' : ''}"></div>`
  ).join('');
}

function timetableRow({ name, src, role, events = [] }) {
  const eventHTML = events
    .map(
      (e) => `
      <div class="timetable__event timetable__event--${e.color}"
           style="left:${e.left}%;width:${e.width}%;">
        <span class="timetable__event-text">${e.label}</span>
      </div>
    `
    )
    .join('');

  return `
    <div class="timetable__row">
      <div class="timetable__cell-user">
        <div class="timetable__user-info">
          <div class="avatar avatar--small">
            <img src="/assets/avatars/${src}" alt="${name}" class="avatar__image">
          </div>
          <div class="timetable__user-text">
            <span class="timetable__user-name">${name}</span>
            <span class="timetable__user-role">${role}</span>
          </div>
        </div>
      </div>
      <div class="timetable__cell-time">
        <div class="timetable__grid">
          ${gridCells()}
          ${eventHTML}
        </div>
      </div>
    </div>
  `;
}

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Timetable',
};

export const Default = {
  render: () => `
    <div style="padding:16px;overflow-x:auto;">
      <div class="timetable">
        <div class="timetable__thead">
          <div class="timetable__th timetable__th--name">이름</div>
          ${HOURS.map((h) => `<div class="timetable__th timetable__th--time">${h}</div>`).join('')}
        </div>
        ${timetableRow({
          name: '박소정',
          src: 'female01.jpg',
          role: '차장',
          events: [
            { color: 'green', left: 4.2, width: 12.5, label: '차세대 EP 논의 미팅' },
            { color: 'lightblue', left: 20.8, width: 16.7, label: '디자인 시스템 컴포…' },
            { color: 'lightblue', left: 54.2, width: 16.7, label: '콘텐츠 디자이너 면접' },
          ],
        })}
        ${timetableRow({
          name: '이민준',
          src: 'male03.jpg',
          role: '과장',
          events: [
            { color: 'purple', left: 9.1, width: 18.2, label: '기획 미팅' },
            { color: 'orange', left: 54.5, width: 18.2, label: '보고서 작성' },
          ],
        })}
        ${timetableRow({
          name: '김지은',
          src: 'female02.jpg',
          role: '대리',
          events: [
            { color: 'mint', left: 18.2, width: 36.4, label: '디자인 검토' },
          ],
        })}
      </div>
    </div>
  `,
};
