
import { connectToDatabase, closeDatabase } from '../../pages/api/databaseConnection.js';

async function findRecords(searchTerms) {
    const db = await connectToDatabase();
    const collection = db.collection('topics'); 
    console.log("Search terms in database.js: ",searchTerms);
    const results = await collection.aggregate([
        {
            $project: {
                docArray: { $objectToArray: "$$ROOT" }  // Convert document into an array of key-value pairs
            }
        },
        {
            $unwind: "$docArray"  // Unwind the array to create a document for each key-value pair
        },
        {
            $group: {
                _id: "$_id",  // Group back by original document ID
                matchedDocument: { $first: "$$ROOT" },  // Collect the entire matched document
                values: { $addToSet: "$docArray.v" }  // Collect all values for later checking
            }
        },
        {
            $match: {
                values: { $all: searchTerms[0] }  // Match documents that contain all search terms in their values
            }
        }
    ]).toArray();

    // Print results in a more readable format and assign docID
    const matchedDocIDs = [];
    console.log("RESULT:",results)

    if (results.length > 0) {
        results.forEach(doc => {
            matchedDocIDs.push(doc.matchedDocument._id.toString()); // Convert ObjectId to string and add it to the array
            console.log(`Matched Document ID: ${doc.matchedDocument._id}`); // Print matched Document ID
        });
    } else {
        console.log('No documents found matching the search terms.');
    }

    await closeDatabase();
    return matchedDocIDs;// Return the ObjectId as a string or null if no matches found
}

async function findRecordsDetails(ids) {
    const db = await connectToDatabase();
    const collection = db.collection('topics');

    console.log(ids);

    // Fetch all records by their IDs
    recordsList = []
    const records = await collection.find({ _id: { $in: ids.map(id => new ObjectId(id)) } }).toArray();
    
    await closeDatabase(); // Close database connection after fetching records
    return records; // Return the array of records
}



export { findRecords, findRecordsDetails };

