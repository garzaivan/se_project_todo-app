class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._total = todos.length;
    this._completed = todos.filter((todo) => todo.completed).length;
    this._updateText();
  }

  updateCompleted = (isChecked) => {
    if (isChecked) {
      this._completed = this._completed + 1;
    } else {
      this._completed = this._completed - 1;
    }
    this._updateText();
  };

  updateTotal = (shouldIncrement) => {
    if (shouldIncrement) {
      this._total = this._total + 1;
    } else {
      this._total = this._total - 1;
    }
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
