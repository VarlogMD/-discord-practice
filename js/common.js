//const path = require('path')
const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;
const MaxRestBtn = document.getElementById('minMaxIcon')


document.getElementById('maxBtn').addEventListener('click', () => {
    ipc.send('maxRestApp')
})  


document.getElementById('minBtn').addEventListener('click', () => {
    ipc.send('minimizeApp')
})   


document.getElementById('closeBtn').addEventListener('click', () => {
    ipc.send('closeApp')
})   

changeMaxRestoreBtn = (isMaximizedApp) => {
    if(isMaximizedApp) {
        MaxRestBtn.title = 'Restore'
        MaxRestBtn.classList.remove('fa-window-maximize')
        MaxRestBtn.classList.add('fa-window-restore')
    } else {
        MaxRestBtn.title = 'Maximize'
        MaxRestBtn.classList.remove('fa-window-restore')
        MaxRestBtn.classList.add('fa-window-maximize')
    }
}    

ipc.on('isMaximized', () => {
    changeMaxRestoreBtn(true)
    })
 
ipc.on('isRestored', () => {
    changeMaxRestoreBtn(false)
    })    
