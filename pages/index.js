import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todoCounterEl = document.querySelector(".counter__text");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscape);
};

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_visible");
    closeModal(openedPopup);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id, completed: false };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
  newTodoValidator.resetValidation();
  updateTodoCounts();
  renderTodo();
});

function updateTodoCounts() {
  const todos = todosList.querySelectorAll(".todo");
  const total = todos.length;
  const completed = Array.from(todos).filter((todo) => {
    const checkbox = todo.querySelector(".todo__completed");
    return checkbox && checkbox.checked;
  }).length;
  todoCounterEl.textContent = `Showing ${completed} out of ${total} completed`;
}

todosList.addEventListener("change", (evt) => {
  if (evt.target.classList.contains("todo__completed")) {
    updateTodoCounts();
  }
});

todosList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("todo__delete-btn")) {
    const todoItem = evt.target.closest(".todo");
    if (todoItem) {
      todoItem.remove();
      updateTodoCounts();
    }
  }
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

initialTodos.forEach((item) => {
  renderTodo(item);
});
updateTodoCounts();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
