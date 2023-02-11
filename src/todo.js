import { getTodoByID } from './model';

const todoContentWrapper = document.querySelector('.todo-content-wrapper');

export function cleanup() {
  while (todoContentWrapper.hasChildNodes()) {
    todoContentWrapper.removeChild(todoContentWrapper.firstChild);
  }
}

export function buildTodoFrame(id, title, details, created, due, done) {
  const todoCard = document.createElement('fieldset');
  todoCard.classList.add('todo-card');

  const legend = document.createElement('legend');
  legend.textContent = id;

  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo-container');

  const todoCheck = document.createElement('div');
  todoCheck.classList.add('todo-check');

  const doneInput = document.createElement('input');
  doneInput.id = 'done' + id;
  doneInput.setAttribute('type', 'checkbox');
  doneInput.checked = done;

  const doneLabel = document.createElement('label');
  doneLabel.setAttribute('for', 'done' + id);
  doneLabel.textContent = 'Done';

  const cardContent = document.createElement('div');
  cardContent.classList.add('details');

  const titleDiv = document.createElement('div');
  const titleLabel = document.createElement('strong');
  titleLabel.textContent = 'Title:';
  const titleValue = document.createElement('span');
  titleValue.textContent = title;

  const detailsDiv = document.createElement('div');
  const detailsLabel = document.createElement('strong');
  detailsLabel.textContent = 'Details:';
  const detailsValue = document.createElement('span');
  detailsValue.textContent = details;

  const createdDiv = document.createElement('div');
  const createLabel = document.createElement('strong');
  createLabel.textContent = 'Created:';
  const createValue = document.createElement('span');
  createValue.textContent = created;

  const dueDiv = document.createElement('div');
  const dueLabel = document.createElement('strong');
  dueLabel.textContent = 'Due:';
  const dueValue = document.createElement('span');
  dueValue.textContent = due;

  // EventListener
  doneInput.addEventListener('change', () => {
    const todo = getTodoByID(id);
    if (doneInput.checked) {
      todo.done = true;
      console.log(todo);
    } else {
      todo.done = false;
      console.log(todo);
    }
  });

  // append
  dueDiv.appendChild(dueLabel);
  dueDiv.appendChild(dueValue);

  createdDiv.appendChild(createLabel);
  createdDiv.appendChild(createValue);

  detailsDiv.appendChild(detailsLabel);
  detailsDiv.appendChild(detailsValue);

  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleValue);

  cardContent.appendChild(titleDiv);
  cardContent.appendChild(detailsDiv);
  cardContent.appendChild(createdDiv);
  cardContent.appendChild(dueDiv);

  todoCheck.appendChild(doneInput);
  todoCheck.appendChild(doneLabel);

  todoContainer.appendChild(todoCheck);
  todoContainer.appendChild(cardContent);

  todoCard.appendChild(legend);
  todoCard.appendChild(todoContainer);

  todoContentWrapper.appendChild(todoCard);
}
