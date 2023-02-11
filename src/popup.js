import { format, parseISO } from 'date-fns';
import { initDragPopupWindow } from './dragWindow';
import { createNewTask } from './model';
import { updateStatusBar, updateView } from './view';

const popupContainer = document.querySelector('#popup-container');
const todoContentWrapper = document.querySelector('.todo-content-wrapper');

function buildPopupFrame(title = 'Popup') {
  const popup = document.createElement('div');
  popup.id = 'popup';

  const window = document.createElement('div');
  window.classList.add('window');

  const titleBar = document.createElement('div');
  titleBar.classList.add('title-bar');
  titleBar.classList.add('drag');

  const titleBarText = document.createElement('div');
  titleBarText.classList.add('title-bar-text');
  titleBarText.textContent = title;

  const titleBarControls = document.createElement('div');
  titleBarControls.classList.add('title-bar-controls');

  const closeBtn = document.createElement('button');
  closeBtn.ariaLabel = 'Close';

  // closeBtn EventListener
  closeBtn.addEventListener('click', cleanup);

  // append
  titleBarControls.appendChild(closeBtn);
  titleBar.appendChild(titleBarText);
  titleBar.appendChild(titleBarControls);
  window.appendChild(titleBar);
  popup.appendChild(window);

  return popup;
}

export function buildNewTaskPopup() {
  const popup = buildPopupFrame('New Task');

  const popupContent = document.createElement('div');
  popupContent.classList.add('popup-content');
  popupContent.classList.add('window-body');

  const form = document.createElement('form');
  const fieldset = document.createElement('fieldset');

  const legend = document.createElement('legend');
  legend.textContent = 'New Task';

  const titleDiv = document.createElement('div');
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  titleLabel.textContent = 'Title:';
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.id = 'title';

  const detailsDiv = document.createElement('div');
  const detailsLabel = document.createElement('label');
  detailsLabel.setAttribute('for', 'details');
  detailsLabel.textContent = 'Details:';
  const detailsInput = document.createElement('textarea');
  detailsInput.id = 'details';

  const dueDiv = document.createElement('div');
  const dueLabel = document.createElement('label');
  dueLabel.textContent = 'Due:';
  dueLabel.setAttribute('for', 'due');
  const dueInput = document.createElement('input');
  dueInput.setAttribute('type', 'datetime-local');
  dueInput.id = 'due';

  const importantDiv = document.createElement('div');
  importantDiv.classList.add('importantContainer');
  const importantLabel = document.createElement('label');
  importantLabel.setAttribute('for', 'important');
  importantLabel.textContent = 'Important';
  const importantInput = document.createElement('input');
  importantInput.setAttribute('type', 'checkbox');
  importantInput.id = 'important';

  const popupBtnContainer = document.createElement('div');
  popupBtnContainer.classList.add('popup-btn-container');
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';

  // EventListeners
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (titleInput.value === '') {
      return;
    }

    let date;
    if (dueInput.value === '') {
      date = 'no due date';
    } else {
      date = format(parseISO(dueInput.value), 'dd.MM.yyyy, HH:mm');
    }

    if (detailsInput.value === '') {
      detailsInput.value = 'no details provided';
    }

    createNewTask(
      titleInput.value,
      detailsInput.value,
      date,
      importantInput.checked
    );
    updateView(todoContentWrapper.dataset.list);
    updateStatusBar();
    cleanup();
  });

  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cleanup();
  });

  // append
  popupBtnContainer.appendChild(submitBtn);
  popupBtnContainer.appendChild(cancelBtn);

  importantDiv.appendChild(importantInput);
  importantDiv.appendChild(importantLabel);

  dueDiv.appendChild(dueLabel);
  dueDiv.appendChild(dueInput);

  detailsDiv.appendChild(detailsLabel);
  detailsDiv.appendChild(detailsInput);

  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);

  fieldset.appendChild(legend);
  fieldset.appendChild(titleDiv);
  fieldset.appendChild(detailsDiv);
  fieldset.appendChild(dueDiv);
  fieldset.appendChild(importantDiv);

  form.appendChild(fieldset);
  form.appendChild(popupBtnContainer);

  popupContent.appendChild(form);

  popup.firstChild.appendChild(popupContent);

  popupContainer.appendChild(popup);
  initDragPopupWindow();
}

function cleanup() {
  while (popupContainer.hasChildNodes()) {
    popupContainer.removeChild(popupContainer.firstChild);
  }
}
