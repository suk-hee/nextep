import './weekly-calendar.css';
import './weekly-calendar.js';

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/WeeklyCalendar',
};

export const Default = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding:16px;';

    const calendarEl = document.createElement('div');
    calendarEl.setAttribute('data-weekly-calendar', JSON.stringify({ startHour: 8, endHour: 20 }));
    wrapper.appendChild(calendarEl);

    requestAnimationFrame(() => {
      if (window.WeeklyCalendar) {
        new window.WeeklyCalendar(calendarEl, { startHour: 8, endHour: 20 });
      }
    });

    return wrapper;
  },
};
