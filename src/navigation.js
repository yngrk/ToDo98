import { updateStatusBar, updateView } from './view';

const todoContentWrapper = document.querySelector('.todo-content-wrapper');
const all = document.querySelector('.nav-btn.all');
const today = document.querySelector('.nav-btn.today');
const week = document.querySelector('.nav-btn.week');
const important = document.querySelector('.nav-btn.important');

export function initNavigation() {
  all.addEventListener('click', () => {
    todoContentWrapper.dataset.list = 'all';
    updateView('all');
    updateStatusBar();
  });

  today.addEventListener('click', () => {
    todoContentWrapper.dataset.list = 'today';
    updateView('today');
    updateStatusBar();
  });

  week.addEventListener('click', () => {
    todoContentWrapper.dataset.list = 'week';
    updateView('week');
    updateStatusBar();
  });

  important.addEventListener('click', () => {
    todoContentWrapper.dataset.list = 'important';
    updateView('important');
    updateStatusBar();
  });
}
