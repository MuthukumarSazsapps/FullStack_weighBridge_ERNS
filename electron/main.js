// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const { exec } = require('child_process');

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: true,
//     },
//   });

//   mainWindow.loadURL('http://localhost:3000');
// }

// app.on('ready', () => {
//   exec('node server.js', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error starting server: ${err}`);
//       return;
//     }
//     console.log(`Server output: ${stdout}`);
//   });
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   } 
        //its not setup for production ,its only for production
// });


// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const { exec } = require('child_process');

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//     //   preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: true,
//     },
//   });

//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.loadURL('http://localhost:3000');
//   } else {
//     mainWindow.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
//   }
// }

// app.on('ready', () => {
//   exec('node server.js', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error starting server: ${err}`);
//       return;
//     }
//     console.log(`Server output: ${stdout}`);
//   });
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
//its setup for both production and development
// });

// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const { exec } = require('child_process');

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: true,
//     },
//   });

//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.loadURL('http://localhost:3000');
//   } else {
//     mainWindow.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
//   }
// }

// app.on('ready', () => {
//   exec('node server.js', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error starting server: ${err}`);
//       return;
//     }
//     console.log(`Server output: ${stdout}`);
//   });
//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });


// const { app, BrowserWindow } = require('electron');
// const path = require('path');
// const { exec } = require('child_process');

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//     //   preload: path.join(__dirname, 'preload.js'),
//       nodeIntegration: true,
//     },
//   });

//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.loadURL('http://localhost:3000');
//   } else {
//     mainWindow.loadURL(`file://${path.join(__dirname, 'build/index.html')}`);
//   }
// }

// app.on('ready', () => {
//   const serverProcess = exec('node server.js', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error starting server: ${err}`);
//       return;
//     }
//     console.log(`Server output: ${stdout}`);
//     if (stderr) {
//       console.error(`Server error output: ${stderr}`);
//     }
//   });

//   serverProcess.stdout.on('data', (data) => {
//     console.log(`Server stdout: ${data}`);
//   });

//   serverProcess.stderr.on('data', (data) => {
//     console.error(`Server stderr: ${data}`);
//   });

//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

//chatopenai

const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let serverProcess; // To hold the server process reference

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
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
    // Terminate the server process when the window is closed
    if (serverProcess) {
      serverProcess.kill();
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

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
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
  }
});
