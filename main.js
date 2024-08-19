const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
  }
}

app.on('ready', () => {
  const serverPath = path.join(__dirname, 'server.js'); // Ensure the correct path
  const serverProcess = exec(`node ${serverPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting server: ${err}`);
      return;
    }
    console.log(`Server output: ${stdout}`);
    if (stderr) {
      console.error(`Server error output: ${stderr}`);
    }
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  // Add a delay to ensure server is up
  setTimeout(() => {
    createWindow();
  }, 3000); // Adjust the delay as needed
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
