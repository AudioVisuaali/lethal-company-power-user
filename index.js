const { app, BrowserWindow, globalShortcut } = require('electron')
const { keyboard, Key } = require("@nut-tree/nut-js");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

keyboard.config.autoDelayMs = 0;
app.whenReady().then(() => {
  createWindow()
  // Register a 'CommandOrControl+X' shortcut listener.
  globalShortcut.register('F1', () => {
    keyboard.type("switch can")
    keyboard.type(Key.Enter)
  })
  globalShortcut.register('F2', () => {
    keyboard.type("switch leon")
    keyboard.type(Key.Enter)
  })
  globalShortcut.register('F3', () => {
    keyboard.type("switch ark")
    keyboard.type(Key.Enter)
  })
  console.log("F1", globalShortcut.isRegistered("F1"))
  console.log("F2", globalShortcut.isRegistered("F2"))
  console.log("F3", globalShortcut.isRegistered("F3"))
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

