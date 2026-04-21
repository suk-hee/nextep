import './pagination.css';
import './pagination.js';

/** @type { import('@storybook/html').Meta } */
export default {
  title: 'Components/Pagination',
  render: (args) => {
    const nav = document.createElement('nav');
    nav.className = 'pagination';
    nav.style.padding = '16px';
    new window.Pagination(nav, {
      currentPage: args.currentPage,
      totalPages: args.totalPages,
      maxVisiblePages: args.maxVisiblePages,
    });
    return nav;
  },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 20 } },
    totalPages: { control: { type: 'number', min: 1, max: 50 } },
    maxVisiblePages: { control: { type: 'number', min: 3, max: 9 } },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const Default = {};

export const MiddlePage = {
  args: { currentPage: 5, totalPages: 10 },
};

export const LastPage = {
  args: { currentPage: 10, totalPages: 10 },
};

export const ManyPages = {
  args: { currentPage: 12, totalPages: 50, maxVisiblePages: 5 },
};
