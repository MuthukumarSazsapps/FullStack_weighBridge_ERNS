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


// app.get('/api/capture-image', async (req, res) => {
//   const cameraIp = '192.168.1.10'; // Camera IP
//   const username = 'admin';        // Your camera username
//   const password = 'Advika123';     // Your camera password
//   const tokenNo = req.query.tokenNo; // Accept tokenNo as a query parameter

//   // Create a DigestFetch client
//   const client = new DigestFetch(username, password);

//   console.log("client",client);
  

//   try {
//     // Use Digest Authentication with the camera's API endpoint
//     const response = await client.fetch(`http://${cameraIp}/ISAPI/Streaming/channels/1/picture`, {
//       method: 'GET',
//     });

//     if (response.ok) {
//       const arrayBuffer = await response.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       // Save the image locally
//       const imagePath = path.join(__dirname, `images/weighing_${tokenNo}.jpg`);//adjust image path where you want save image in local
//       fs.writeFileSync(imagePath, buffer);

//       console.log(`Image saved to: ${imagePath}`);
//       res.json({ success: true, imagePath });
//     } else {
//       const responseBody = await response.text();
//       console.error('Camera responded with:', response.status, responseBody);
//       throw new Error('Failed to capture image from camera');
//     }
//   } catch (error) {
//     console.error('Error capturing image:', error);
//     res.status(500).json({ success: false, message: 'Failed to capture image', error: error.message });
//   }
// });
//--------------------------------------------------------------
// import fs from 'fs';
// import fetch from 'node-fetch';
// import DigestFetch from 'digest-fetch'

// import routes from './routes/index.js'; // Ensure routes.js or routes.mjs uses ES module syntax
// import express from 'express';
// import cors from 'cors';
// import sqlite3Module from 'sqlite3';
// import path from 'path';
// import { fileURLToPath } from 'url';


// const sqlite3 = sqlite3Module.verbose();
// const port=5000

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // Now you can proceed with using these modules as usual
// const app = express();

// // Your middleware and route setups
// app.use(cors());
// app.use(express.json());
// // app.use('/api', routes);

// const dbPath = path.join(__dirname, '../database/weighbridge.db');

// export const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error('Error opening database:', err.message);
//   } else {
//     console.log('Connected to the SQLite database.');
//   }
// });


// app.get('/api',(req,res)=>{
//   res.send("hello from server")
// })


// routes(app)

// process.on('SIGINT', () => {
//   db.close((err) => {
//     if (err) {
//       console.error('Error closing database:', err.message);
//     } else {
//       console.log('Database connection closed.');
//     }
//     process.exit(0);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


import express from 'express';
import cors from 'cors';
import sqlite3Module from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { expressCspHeader, SELF } from 'express-csp-header';
import routes from './routes/index.js'; // Ensure routes.js or routes.mjs uses ES module syntax

const sqlite3 = sqlite3Module.verbose();
const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize the app
const app = express();

// Middleware and route setups
app.use(cors());
app.use(express.json());

// Set up expressCspHeader middleware
app.use(expressCspHeader({
  policies: {
    'default-src': [SELF],
    'img-src': ['data:', 'self'], // Allow images from 'data:' and self
    'connect-src': [SELF, 'http://localhost:5000'], // Allow connections to your backend
    'script-src': [SELF], // Only allow scripts from your server
    'style-src': [SELF],  // Only allow styles from your server
  }
}));

const dbPath = path.join(__dirname, '../database/weighbridge.db');

// Set up SQLite database connection
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Example route
app.get('/api', (req, res) => {
  res.send("hello from server");
});

// Apply routes
routes(app);

// Close database connection on server shutdown
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
