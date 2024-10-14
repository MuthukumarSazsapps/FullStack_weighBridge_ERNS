// import { app, BrowserWindow } from 'electron';
// import path from 'path';
// import { exec } from 'child_process';
// import { fileURLToPath } from 'url';

// let mainWindow;
// let serverProcess; // To hold the server process reference
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     icon: path.join(__dirname, '../public/logo.png'), 
//     width: 800,   
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true, // Enable Node.js integration
//     },
//   });

//   mainWindow.removeMenu()


//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.loadURL('http://localhost:3000');
//   } else {
//     mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
//   }

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//     // Terminate the server process when the window is closed
//     if (serverProcess) {
//       serverProcess.kill();
//       serverProcess = null;
//     }
//   });
// }


// app.on('ready', () => {
//   const serverPath = path.join(__dirname, '../server/server.js');
//   serverProcess = exec(`node ${serverPath}`, (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error starting server: ${err}`);
//       return;
//     }
//     console.log(`Server output: ${stdout}`);
//     if (stderr) {
//       console.error(`Server error output: ${stderr}`);
//     }
//   });

//   // Handle server process stdout
//   serverProcess.stdout.on('data', (data) => {
//     console.log(`Server stdout: ${data}`);
//   });

//   // Handle server process stderr
//   serverProcess.stderr.on('data', (data) => {
//     console.error(`Server stderr: ${data}`);
//   });

//   createWindow();
// });

// app.on('window-all-closed', () => {
//   if (serverProcess) {
//     serverProcess.kill();
//     serverProcess = null;
//   }
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.on('quit', () => {
//   if (serverProcess) {
//     serverProcess.kill();
//     serverProcess = null;
//   }
// });

//----------------------------------------------------------------------------------

// import { app, BrowserWindow, Menu, MenuItem } from 'electron';
// import path from 'path';
// import { exec } from 'child_process';
// import { fileURLToPath } from 'url';

// let mainWindow;
// let serverProcess;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// function createWindow() {
//   mainWindow = new BrowserWindow({
//     icon: path.join(__dirname, '../public/logo.png'),
//     width: 800,
//     height: 600,
//     autoHideMenuBar: true,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   });

//   if (process.env.NODE_ENV === 'development') {
//     mainWindow.loadURL('http://localhost:3000');
//   } else {
//     mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
//   }

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//     if (serverProcess) {
//       serverProcess.kill();
//       serverProcess = null;
//     }
//   });

//   // Remove default menu
//   // Menu.setApplicationMenu(null);

//   // Create custom context menu
//   // const contextMenu = new Menu();
//   // contextMenu.append(new MenuItem({ label: 'Refresh', click: () => mainWindow.reload() }));
//   // contextMenu.append(new MenuItem({ label: 'Inspect', click: () => mainWindow.webContents.openDevTools() }));

//   // // Listen for right-click (context menu)
//   // mainWindow.webContents.on('context-menu', (e, params) => {
//   //   contextMenu.popup(mainWindow, params.x, params.y);
//   // });
// }

// app.on('ready', () => {
//   const serverPath = path.join(__dirname, '../server/server.js');
//   serverProcess = exec(`node ${serverPath}`, (err, stdout, stderr) => {
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
//   if (serverProcess) {
//     serverProcess.kill();
//     serverProcess = null;
//   }
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

// app.on('quit', () => {
//   if (serverProcess) {
//     serverProcess.kill();
//     serverProcess = null;
//   }
// });



//--------
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

let mainWindow;
let serverProcess;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const preloadPath = path.join(__dirname, 'preload.js');
  console.log(`Preload script path: ${preloadPath}`);

  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '../public/logo.png'),
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false, // Keep node integration off for security
      contextIsolation: true,  // Enable context isolation
      preload: preloadPath, // Reference to the preload script
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  }

  mainWindow.maximize();
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (serverProcess) {
      serverProcess.kill();
      serverProcess = null;
    }
  });
}

// Start server process
app.on('ready', () => {
  const serverPath = path.join(__dirname, '../server/server.js');
  const imageSavePath = path.join(app.getPath('userData'), 'camImages');
  
  serverProcess = exec(`node ${serverPath}`, {
    env: { ...process.env, IMAGE_SAVE_PATH: imageSavePath }
  }, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting server: ${err}`);
      return;
    }
    console.log(`Server output: ${stdout}`);
    if (stderr) {
      console.error(`Server error output: ${stderr}`);
    }
  });

   // Ensure that stdout and stderr are captured
   serverProcess.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  createWindow();
});

// Graceful shutdown of server on window close
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

// Handle IPC to send image path
ipcMain.handle('get-image-path', (event, imageName) => {
  const imagePath = path.join(app.getPath('userData'), 'camImages', imageName);
  return imagePath;
});
