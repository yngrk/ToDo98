import { isThisWeek, isToday, parse } from 'date-fns';
import { getList } from './model';
import { buildTodoFrame, cleanup } from './todo';

let list;
let today;
let week;
let important;

const statusBarAll = document.querySelector('.status-bar .all');
const statusBarToday = document.querySelector('.status-bar .today');
const statusBarWeek = document.querySelector('.status-bar .week');
const statusBarImportant = document.querySelector('.status-bar .important');

function getCurrentList() {
  list = getList();
  today = list.filter((todo) => {
    try {
      const due = parse(todo.due, 'dd.MM.yyyy, HH:mm', new Date());
      if (isToday(due)) {
        return todo;
      }
    } catch (err) {
      return;
    }
  });
  week = list.filter((todo) => {
    try {
      const due = parse(todo.due, 'dd.MM.yyyy, HH:mm', new Date());
      if (isThisWeek(due)) {
        return todo;
      }
    } catch (err) {
      return;
    }
  });

  important = list.filter((todo) => todo.important === true);
}

export function updateView(category = 'all') {
  getCurrentList();
  cleanupView();

  if (category === 'important') {
    important.forEach((todo) => {
      buildTodoFrame(
        todo.id,
        todo.title,
        todo.details,
        todo.created,
        todo.due,
        todo.done
      );
    });
    return;
  }

  if (category === 'all') {
    list.forEach((todo) => {
      buildTodoFrame(
        todo.id,
        todo.title,
        todo.details,
        todo.created,
        todo.due,
        todo.done
      );
    });
    return;
  }

  if (category === 'today') {
    today.forEach((todo) => {
      buildTodoFrame(
        todo.id,
        todo.title,
        todo.details,
        todo.created,
        todo.due,
        todo.done
      );
    });
    return;
  }

  if (category === 'week') {
    week.forEach((todo) => {
      buildTodoFrame(
        todo.id,
        todo.title,
        todo.details,
        todo.created,
        todo.due,
        todo.done
      );
    });
    return;
  }
}

export function updateStatusBar() {
  statusBarAll.textContent = `Total: ${list.length}`;
  statusBarToday.textContent = `Today: ${today.length}`;
  statusBarWeek.textContent = `This Week: ${week.length}`;
  statusBarImportant.textContent = `Important: ${important.length}`;
}

function cleanupView() {
  cleanup();
}
