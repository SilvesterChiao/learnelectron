/*
 * @Author: SilvesterChiao
 * @Date: 2020-06-11 10:44:45
 * @LastEditors: SilvesterChiao
 * @LastEditTime: 2020-09-18 17:41:12
 */

const { app, BrowserWindow, ipcMain, dialog, screen } = require('electron')
const DataStore = require('./src/stores/MusicDataStore')

const myStore = new DataStore({
    name: 'Music Data',

})
class AppWindow extends BrowserWindow {
    constructor(config, fileLocation) {
        const basicConfig = {
            width: screen.getPrimaryDisplay().workAreaSize.width,
            height: screen.getPrimaryDisplay().workAreaSize.height, 
            darkTheme: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
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
    const mainWindow = new AppWindow({
        skipTaskBar: false,
    }, './src/views/home/home.html')
    mainWindow.maximize();
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.send('getTracks', myStore.getTracks())
    })
    ipcMain.on('add-music-window', () => {
        const addWindow = new AppWindow({
            width: 500,
            height: 400,
            frame: false,
            parent: mainWindow,
        }, './src/views/add/add.html')
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
                contextIsolation: false,
            },
            parent: mainWindow,
        })
        secondWindow.loadFile('./src/views/second/second.html')
    })
})