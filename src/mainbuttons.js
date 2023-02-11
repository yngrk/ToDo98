import { buildNewTaskPopup } from './popup';
import { updateView } from './view';

const newTaskBtn = document.querySelector('#btn-newtask');
const removeSelectedBtn = document.querySelector('#btn-removeSel');

export function initMainButtons() {
  newTaskBtn.addEventListener('click', () => {
    buildNewTaskPopup();
    updateView(document.querySelector('.todo-content-wrapper').dataset.list);
  });

  removeSelectedBtn.addEventListener('click', () => {});
}
