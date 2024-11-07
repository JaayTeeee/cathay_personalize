import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'src/pages/shipments.db');
const db = new sqlite3.Database(dbPath);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { searchTerms } = req.query; 
        console.log("Received search terms: ", searchTerms);

        // Check if searchTerms is provided and is a string
        if (!searchTerms || typeof searchTerms !== 'string') {
            return res.status(400).json({ message: 'Search terms must be a valid string' });
        }

        // Parse searchTerms back into an array
        let parsedSearchTerms;
        try {
            parsedSearchTerms = JSON.parse(searchTerms);
            console.log("Parsed search terms: ", parsedSearchTerms); // Log parsed terms for debugging
        } catch (error) {
            return res.status(400).json({ message: 'Invalid JSON format for search terms' });
        }

        // Validate that parsedSearchTerms is an array and not empty
        if (!Array.isArray(parsedSearchTerms) || parsedSearchTerms.length === 0) {
            return res.status(400).json({ message: 'Search terms must be a non-empty array' });
        }

        // Prepare a SQL query with placeholders for each search term
        const placeholders = parsedSearchTerms.map(() => '?').join(',');
        const sqlQuery = `SELECT * FROM Cargo WHERE id IN (${placeholders})`;

        // Execute the SQL query
        db.all(sqlQuery, parsedSearchTerms, (err, rows) => {
            if (err) {
                console.error('Database query error:', err.message);
                return res.status(500).json({ message: 'Error querying the database', details: err.message });
            }

            if (rows.length > 0) {
                console.log("Shipment details: ", rows);
                res.status(200).json({ data: rows }); // Return all matching records
            } else {
                res.status(404).json({ message: 'No records found' });
            }
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}