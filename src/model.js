const todolist = [];

class Task {
  constructor(title, details, due, important) {
    const date = new Date();
    this.id = todolist.length + 1;
    this.created =
      date.getDate().toString().padStart(2, '0') +
      '.' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '.' +
      date.getFullYear() +
      ', ' +
      date.getHours() +
      ':' +
      date.getMinutes();
    this.title = title;
    this.details = details;
    this.due = due;
    this.done = false;
    this.important = important;
  }
}

function generateId() {
  for (let i = 0; i < todolist.length; i++) {
    todolist[i].id = i + 1;
  }
}

export function getList() {
  return todolist;
}

export function createNewTask(title, details, due, important) {
  const newTask = new Task(title, details, due, important);
  todolist.push(newTask);
  generateId();
}

export function printList(category) {
  if (category === 'important') {
    todolist
      .filter((todo) => {
        if (todo.important === true) {
          return todo;
        }
        return;
      })
      .forEach((todo) => {
        console.log(todo);
      });
  }
}

export function getTodoByID(id) {
  return todolist[id - 1];
}
