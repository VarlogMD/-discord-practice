const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 940,
    minHeight: 700,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),

    }
  })

  win.loadFile('index.html')
  //win.webContents.openDevTools()

  ipc.on('minimizeApp', () => {
    win.minimize()
  })

  ipc.on('maxRestApp', () => {
    if(win.isMaximized()) {
      win.restore()
    } else {
      win.maximize();
    } 
  })

  win.on('maximize', () => {
    win.webContents.send('isMaximized')
    console.log('max')
  })

  win.on('unmaximize', () => {
    win.webContents.send('isRestored')
    console.log('rest')
  })



  ipc.on('closeApp', () => {
    win.close()
  })
}



app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

