// const express = require('express');
// const cors = require('cors');
// const app = express();
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const port = 5000;

// app.use(cors());



// // const dbFolderPath = path.join(__dirname, 'database');
// const dbPath = path.join(__dirname, '../database/weighbridge.db');
// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error('Error opening database:', err.message);
//   } else {
//     console.log('Connected to the SQLite database.');
//     // Create a table if it doesn't exist
//     // db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, email TEXT)', (err) => {
//     //   // if (err) {
//     //   //   console.error('Error creating table:', err.message);
//     //   // }
//     // });
//   }
// });

// app.get('/api', (req, res) => {
//   const sql = 'SELECT * FROM authlogin';
//   db.all(sql, [], (err, rows) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;  
//     }
//     res.json({
//       message: 'success',
//       data: rows,
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const port = 5000;

const app = express();
app.use(cors());

const dbPath = path.join(__dirname, '../database/weighbridge.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

app.get('/api', (req, res) => {
  const sql = 'SELECT * FROM authlogin';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// Close the database connection on server shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
