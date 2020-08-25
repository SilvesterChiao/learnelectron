/*
 * @Author: SilvesterChiao
 * @Date: 2020-06-11 10:44:45
 * @LastEditors: SilvesterChiao
 * @LastEditTime: 2020-08-25 16:17:22
 */

const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const DataStore = require('./MusicDataStore')

const myStore = new DataStore({
    name: 'Music Data',

})
class AppWindow extends BrowserWindow {
    constructor(config, fileLocation) {
        const basicConfig = {
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
            }
        }
        // const finalConfig = Object.assign(basicConfig, config);
        const finalConfig = { ...basicConfig, ...config }
        super(finalConfig)
        this.loadFile(fileLocation)
        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

app.on('ready', () => {
    const mainWindow = new AppWindow({}, './renderer/home/home.html')
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('page did finish load')
        mainWindow.send('getTracks', myStore.getTracks())
    })
    ipcMain.on('add-music-window', () => {
        const addWindow = new AppWindow({
            width: 500,
            height: 400,
            parent: mainWindow,
        }, './renderer/add/add.html')
    })
    ipcMain.on('add-tracks', (event, tracks) => {
        const updatedTracks = myStore.addTracks(tracks).getTracks();
        mainWindow.send('getTracks', updatedTracks)
    })
    ipcMain.on('open-music-file', (event) => {
        dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [{ name: 'Music', extensions: ['mp3'] }]
        }).then(result => {
            if (result) {
                event.sender.send('selected-file', result)
            }
        })
    })
    ipcMain.on('delete-track', (event, id) => {
        const updatedTracks = myStore.deleteTrack(id).getTracks()
        mainWindow.send('getTracks', updatedTracks)
    })
    // ipcMain.on('message', (event, arg) => {
    //     // event.sender.send('reply', 'hello from main')
    //     mainWindow.send('reply', 'hello from mainWindow')
    // })
    // ipcMain.on('open', () => {
    //     const secondWindow = new BrowserWindow({
    //         width: 400,
    //         height: 300,
    //         webPreferences: {
    //             nodeIntegration: true,
    //         },
    //         parent: mainWindow,
    //     })
    //     secondWindow.loadFile('second.html')
    // })
})