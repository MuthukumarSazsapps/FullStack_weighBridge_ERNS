import routes from './routes/index.js'; // Ensure routes.js or routes.mjs uses ES module syntax
import express from 'express';
import cors from 'cors';
import sqlite3Module from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const sqlite3 = sqlite3Module.verbose();
const port=5000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Your middleware and route setups
const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
// app.use('/api', routes);

const dbPath = path.join(__dirname, '../database/weighbridge.db');
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


app.get('/api',(req,res)=>{
  res.send("hello from server")
})

routes(app)


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
