const { ipcRenderer } = require('electron')
const { $, convertDuration } = require('../helper.js')

const mainWrapperDom = $('main-wrapper')

$('todo').addEventListener('click', (e) => {
    const children = e.target.parentElement.children
    for (c of children) {
        c.classList.remove('side-item-active')
    }
    e.target.classList.add('side-item-active')
    for (c of mainWrapperDom.children) {
        c.setAttribute('style', 'display: none')
    }
    $('todolist-wrapper').setAttribute('style', 'display: block')
})

$('image').addEventListener('click', (e) => {
    const children = e.target.parentElement.children
    for (c of children) {
        c.classList.remove('side-item-active')
    }
    e.target.classList.add('side-item-active')
    for (c of mainWrapperDom.children) {
        c.setAttribute('style', 'display: none')
    }
    $('image-wrapper').setAttribute('style', 'display: block')
})

$('music').addEventListener('click', (e) => {
    const children = e.target.parentElement.children
    for (c of children) {
        c.classList.remove('side-item-active')
    }
    e.target.classList.add('side-item-active')
    for (c of mainWrapperDom.children) {
        c.setAttribute('style', 'display: none')
    }
    $('player-wrapper').setAttribute('style', 'display: block')
})
