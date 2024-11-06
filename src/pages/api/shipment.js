// pages/api/shipment.js
import { findRecords, findRecordsDetails } from '../../lib/functions/database'; // Adjust path as necessary

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { searchTerms } = req.body; 
        console.log("Search terms: ", searchTerms);

        try {
            const matchedDocIDs = await findRecords(searchTerms); 
            if (matchedDocIDs) {
                const shipmentDetails = await findRecordsDetails(matchedDocIDs);
                console.log("shipment details: ",shipmentDetails)
                res.status(200).json(shipmentDetails); 
                
            } else {
                res.status(404).json({ message: 'No records found' });
            }
        } catch (error) {
            console.error('Error finding records:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}