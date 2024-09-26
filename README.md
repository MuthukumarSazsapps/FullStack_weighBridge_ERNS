# weighbridge_Main
using correct path for file like server.js or in build file ../build/index.html
using path in nodejs it will help to correct relative path after app packaged.

for developing npm start-
for production ,first you need to do npm run build,then npm run electron-pack for packaging 
it can't delete the dist folder because once app open the sqlite db server is running background ,if you want to delete -> go task manager and end task the nodejs javascript running time

you will learn how to query data from the SQLite database from a Node.js application using sqlite3 API.belowe link
https://www.sqlitetutorial.net/sqlite-nodejs/query/


use express.json on app ,if not u will face req.body undefined error 


"scripts": {
    "start": "concurrently \"npm run react-start\" \"npm run electron-start\"",
    "react-start": "react-scripts start",
    "electron-start": "wait-on http://localhost:3000 && electron .",
    "build": "react-scripts build",
    "electron-pack": "electron-packager . MyApp --platform=win32 --arch=x64 --out=dist"
  },


//nodemon start

    "scripts": {
  "start": "concurrently \"npm run react-start\" \"npm run electron-start\" \"npm run server-start\"",
  "react-start": "react-scripts start",
  "electron-start": "wait-on http://localhost:3000 && electron .",
  "server-start": "nodemon server.js", 
  "build": "react-scripts build",
  "electron-pack": "electron-packager . MyApp --platform=win32 --arch=x64 --out=dist"
},


//tutorial video
https://www.youtube.com/watch?v=VCl8li22mrA

https://www.youtube.com/watch?v=Y-E7eqgv-EQ

https://www.youtube.com/watch?v=ONpVol7B7AY