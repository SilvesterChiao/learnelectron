/*
 * @Author: SilvesterChiao
 * @Date: 2020-06-11 10:44:45
 * @LastEditors: SilvesterChiao
 * @LastEditTime: 2020-08-24 10:31:53
 */

const { app, BrowserWindow, ipcMain } = require('electron')

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    mainWindow.loadFile('index.html')
    ipcMain.on('message', (event, arg) => {
        // event.sender.send('reply', 'hello from main')
        mainWindow.send('reply', 'hello from mainWindow')
    })
    ipcMain.on('open', () => {
        const secondWindow = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                nodeIntegration: true,
            },
            parent: mainWindow,
        })
        secondWindow.loadFile('second.html')
    })
})