const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path') 
require('electron-reload')(__dirname);

let win  

function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600, autoHideMenuBar: true,  minWidth: 800, minHeight: 600,center: true})
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'home.html'),
      protocol: 'file:', 
      slashes: true 
   }))
}  

app.on('ready', createWindow)

app.on('window-all-closed', () => {
   app.quit()
})