const { ipcRenderer } = require('electron')
const { $ } = require('./../helper')
const todoList = JSON.parse(window.localStorage.getItem('todoList')) || []
const todolistDom = $('todolist')
const clearDom = $('btn-todo-clear')
const todolistAddInputDom = $('todolist-add-input')

const addTodoItem = (todoItem, index) => {
  const todolistItemDom = document.createElement('div')
  const todolistRadioWrapperDom = document.createElement('div')
  const todolistCheckboxDom = document.createElement('input')
  todolistCheckboxDom.type = 'checkbox'
  const todolistCheckboxIconDom = document.createElement('i')
  const todolistItemTitleDom = document.createElement('div')
  if (todoItem.done) {
    todolistCheckboxDom.checked = true;
    todolistItemDom.classList.add('todolist-item-done')
  }
  todolistItemDom.classList.add('todolist-item')
  todolistRadioWrapperDom.classList.add('todolist-radio-wrapper')
  todolistItemTitleDom.classList.add('todolist-item-title')
  todolistItemTitleDom.innerHTML = todoItem.title
  todolistRadioWrapperDom.appendChild(todolistCheckboxDom);
  todolistRadioWrapperDom.appendChild(todolistCheckboxIconDom);
  todolistItemDom.appendChild(todolistRadioWrapperDom)
  todolistItemDom.appendChild(todolistItemTitleDom)
  todolistDom.appendChild(todolistItemDom)

  todolistRadioWrapperDom.addEventListener('click', () => {
    console.log(todoItem)
    todoItem.done = true
    todolistCheckboxDom.checked = true
    todoList.splice(index, 1, todoItem);
    todolistItemDom.classList.add('todolist-item-done')
    window.localStorage.setItem('todoList', JSON.stringify(todoList))
  })
}

document.body.onload = () => {
  if (todoList.length !== 0) {
    todoList.forEach((item, index) => {
      addTodoItem(item, index)
    })
  }
}

clearDom.addEventListener('click', () => {
  todolistDom.innerHTML = ''
  window.localStorage.removeItem('todoList')
})

todolistAddInputDom.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    todoList.push({
      title: todolistAddInputDom.value,
      done: false,
    })
    window.localStorage.setItem('todoList', JSON.stringify(todoList))
    addTodoItem({
      title: todolistAddInputDom.value,
      done: false,
    }, todoList.length - 1)
    todolistAddInputDom.value = ''
  }
})