import { join as pathJoin } from 'path';

import { app, BrowserWindow } from 'electron';
import { AppStore } from './app-store';

// enforcing sandbox on all renderer processes (for better security)
app.enableSandbox();

// Set up electron store
// If you want to use a custom path for application data storage, you can set the path this way:
// app.setPath ('userData', 'path/to/app/data'));
AppStore.init();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: pathJoin(__dirname, './preload.js'),
    },
  });

  // Load the index.html of the app.
  if (process.env['NODE_ENV'] === 'dev') {
    win.loadURL('http://localhost:4200');
  } else win.loadFile(pathJoin(__dirname, '../app/index.html'));
}

app.whenReady().then(createWindow);

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

app.on('web-contents-created', (event, webContents) => {
  // Set the Content-Security-Policy for all web contents
  const csp =
    "default-src 'self'; script-src 'self' 'nonce-{random-string}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';";
  webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp],
      },
    });
  });
});
