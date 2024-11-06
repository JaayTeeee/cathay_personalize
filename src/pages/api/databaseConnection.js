import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://dbUser:password1234!@cluster0.nxkwhdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'test';
let client;
let db;
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(url);
        await client.connect();
        console.log('Connected successfully to server');
        db = client.db(dbName);
    }
    return db;
}

async function closeDatabase() {
    if (client) {
        await client.close();
        console.log('Database connection closed');
    }
}

export { connectToDatabase, closeDatabase };