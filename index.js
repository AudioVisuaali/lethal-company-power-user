const { app, BrowserWindow, globalShortcut } = require('electron')
const robot = require("robotjs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  // Register a 'CommandOrControl+X' shortcut listener.
  globalShortcut.register('F1', () => {
    robot.typeString("switch rac")
    robot.keyTap("enter")
  })
  globalShortcut.register('F2', () => {
    robot.typeString("switch leon")
    robot.keyTap("enter")
  })
  globalShortcut.register('F3', () => {
    robot.typeString("switch ark")
    robot.keyTap("enter")
  })
  console.log("F1", globalShortcut.isRegistered("F1"))
  console.log("F2", globalShortcut.isRegistered("F2"))
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

