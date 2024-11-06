import {MongoClient} from 'mongodb'

// Connection URL (replace <db_password> with your actual password)
const url = 'mongodb+srv://dbUser:password1234!@cluster0.nxkwhdg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Database Name
const dbName = 'test'; // Replace with your database name

// Create a new MongoClient
const client = new MongoClient(url);

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected successfully to server');

        // Access the database
        const db = client.db(dbName);

        // Call your query function here
        await findRecords(db);

    } finally {
        // Close the connection to the database
        await client.close();
    }
}

// Function to find records in a collection
async function findRecords(db) {
    const collection = db.collection('topics'); // Replace with your collection name

    // Example query: Find records that match specific criteria (adjust as needed)
    const searchTerms = ["wefwefwefwefwe", "wefwefwefwefwef", "345345345345"];

    // Perform the query using $where
    const results = await collection.find({
        $where: function() {
            const docString = JSON.stringify(this);
            return searchTerms.some(term => docString.includes(term));
        }
    }).toArray(); 


    console.log('Found documents:', results);
}

// Run the main function
run().catch(console.error);