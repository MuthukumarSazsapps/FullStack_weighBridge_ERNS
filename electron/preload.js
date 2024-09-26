// const { contextBridge, ipcRenderer } = require('electron');

// // DOMContentLoaded Event Listener
// window.addEventListener('DOMContentLoaded', () => {
//   const replaceText = (selector, text) => {
//     const element = document.getElementById(selector);
//     if (element) element.innerText = text;
//   };

//   for (const type of ['chrome', 'node', 'electron']) {
//     replaceText(`${type}-version`, process.versions[type]);
//   }
// });

// // Exposing functionality to the renderer process using contextBridge
// contextBridge.exposeInMainWorld('electron', {
//   app: {
//     getPath: (name) => ipcRenderer.invoke('get-app-path', name), // Asynchronous IPC request to get app paths
//   },
// });


const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getImagePath: (imageName) => ipcRenderer.invoke('get-image-path', imageName),
});
