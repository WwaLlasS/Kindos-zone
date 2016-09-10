const electron = require('electron')
const {app, BrowserWindow} = electron
const path = require('path')

var createMainWindow = () => {

  let mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    center:true,
    icon: (process.platform === 'win32')? path.join(__dirname,'/resources/image/kindos-logo-icon.ico') : path.join(__dirname,'/resources/image/kindos-logo.png')
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.on('close', () => {
    app.quit()
  })
}

app.on('ready',() => {
  createMainWindow()
})


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
