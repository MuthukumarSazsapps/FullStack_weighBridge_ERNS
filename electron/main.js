import { app, BrowserWindow } from 'electron';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';


let mainWindow;
let serverProcess; // To hold the server process reference
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '../public/logo.png'), 
    width: 800,   
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    // Terminate the server process when the window is closed
    if (serverProcess) {
      serverProcess.kill();
      serverProcess = null;
    }
  });
}

app.on('ready', () => {
  const serverPath = path.join(__dirname, '../server/server.js');
  serverProcess = exec(`node ${serverPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting server: ${err}`);
      return;
    }
    console.log(`Server output: ${stdout}`);
    if (stderr) {
      console.error(`Server error output: ${stderr}`);
    }
  });

  // Handle server process stdout
  serverProcess.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  // Handle server process stderr
  serverProcess.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('quit', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});
