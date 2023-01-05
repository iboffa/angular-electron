import * as path from 'path';

import { app, BrowserWindow } from 'electron';

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
    },
  });

  // Load the index.html of the app.
  win.loadFile(path.join(__dirname, '../app/index.html'));
}

app.whenReady().then(createWindow);

app.on('ready', createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
