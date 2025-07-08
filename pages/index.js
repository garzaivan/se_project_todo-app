import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleDelete, handleCheck);
  const todoElement = todo.getView();
  return todoElement;
};

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function addTodo({ name, date }) {
  const todoItem = {
    id: uuidv4(),
    name,
    date,
    completed: false,
  };
  renderTodo(todoItem);
  todoCounter.updateTotal(true);
}

function handleCheck(isChecked) {
  todoCounter.updateCompleted(isChecked);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
    todoCounter.updateTotal(false);
  } else {
    todoCounter.updateTotal(false);
  }
}

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const todoData = {
      name: inputValues.name,
      date: inputValues.date,
    };
    addTodo(todoData);
    addTodoPopup.close();
    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
