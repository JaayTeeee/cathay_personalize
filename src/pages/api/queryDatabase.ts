import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'src/pages/cargo_database.db');
const db = new sqlite3.Database(dbPath);

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'ID is required' });
    return;
  }

  db.get('SELECT * FROM Cargo WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Database query error:', err.message);
      res.status(500).json({ error: 'Error querying the database', details: err.message });
      return;
    }

    if (row) {
      res.status(200).json({ data: row });
    } else {
      res.status(404).json({ error: 'ID does not exist in the database' });
    }
  });
};