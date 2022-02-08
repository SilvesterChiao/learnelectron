const { ipcRenderer } = require('electron')
// alert(process.versions.node)

window.addEventListener('DOMContentLoaded', () => {
    // alert('123');
    ipcRenderer.send('message', 'hello from renderer')
    ipcRenderer.on('reply', (event, arg) => {
        document.getElementById('message').innerHTML = arg
    })
    const btn = document.getElementById('btn')
    btn.addEventListener('click', () => {
        ipcRenderer.send('open', 'open')
    })
})