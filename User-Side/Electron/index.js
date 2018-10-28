const {app, BrowserWindow,Menu,Tray,nativeImage} = require('electron')
const path = require('path')
const url = require('url')


let win;
let tray;

function createWindow () {
  var icons=nativeImage.createFromPath('./public/images/prj57-72x72.png')
    tray = new Tray(icons)
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Welcome',sublabel:'welcome to Kalam', type: 'normal' },
    {label: 'Show the Window',sublabel:'Show the window', type: 'normal', click:function(){win.show();}},
    {label: 'Hide the Window',sublabel:'Hide it ' ,type: 'normal',click:function(){win.hide();}},
    {label: 'Quit Kalam', type: 'normal',accelerator:'CommandOrControl+Q',role:'quit'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  win = new BrowserWindow({width: 600, height: 300,icon:icons,
  // frame:false,
  //resizable:false
  })
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
//  win.webContents.openDevTools()
  // win.setProgressBar(0.5)
 // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
