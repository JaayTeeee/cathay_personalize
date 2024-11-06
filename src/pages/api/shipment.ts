import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'src/pages/shipments.db');
const db = new sqlite3.Database(dbPath);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Log the entire request object to see what's being received
    console.log("Request Method:", req.method);
    console.log("Request Headers:", req.headers);

    // Check if the request method is GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Get searchTerms from query parameters
    const { searchTerms } = req.query;

    // Parse searchTerms back into an array if necessary
    let parsedSearchTerms;
    try {
        parsedSearchTerms = JSON.parse(searchTerms as string); // Cast to string for parsing
    } catch (error) {
        return res.status(400).json({ message: 'Invalid search terms format' });
    }

    if (!Array.isArray(parsedSearchTerms) || parsedSearchTerms.length === 0) {
        return res.status(400).json({ message: 'Search terms must be a non-empty array' });
    }

    // Get the column names dynamically from the database
    const getColumnsQuery = `PRAGMA table_info(shipments);`;
    
    db.all(getColumnsQuery, [], (err, columns) => {
        if (err) {
            console.error('Error fetching columns:', err.message);
            return res.status(500).json({ message: 'Error querying the database', details: err.message });
        }

        // Extract column names
        const columnNames = columns.map(column => column.name);
        
        // Create a dynamic SQL query
        const conditions = columnNames.map(col => {
            const placeholders = parsedSearchTerms.map(() => '?').join(',');
            return `${col} IN (${placeholders})`;
        }).join(' OR ');

        const sqlQuery = `SELECT * FROM shipments WHERE ${conditions}`;
        
        // Flatten the params array for all placeholders
        const params = parsedSearchTerms.flatMap(term => Array(columnNames.length).fill(term));

        db.all(sqlQuery, params, (err, rows) => {
            if (err) {
                console.error('Database query error:', err.message);
                return res.status(500).json({ message: 'Error querying the database', details: err.message });
            }

            if (rows.length > 0) {
                res.status(200).json({ data: rows }); // Return all matching records
            } else {
                res.status(404).json({ message: 'No records found' });
            }
        });
    });
}