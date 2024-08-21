# weighbridge_Main
using correct path for file like server.js or in build file ../build/index.html
using path in nodejs it will help to correct relative path after app packaged.

for developing npm start-
for production ,first you need to do npm run build,then npm run electron-pack for packaging 
it can't delete the dist folder because once app open the sqlite db server is running background ,if you want to delete -> go task manager and end task the nodejs javascript running time

you will learn how to query data from the SQLite database from a Node.js application using sqlite3 API.belowe link
https://www.sqlitetutorial.net/sqlite-nodejs/query/


use express.json on app ,if not u will face req.body undefined error 