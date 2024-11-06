import { Text } from "./Text";
import React, { useEffect, useState } from "react";

export default function ShipmentDescription({ shipmentId }) {
    // State to hold input values
    const [mawb, setMawb] = useState('');
    const [dept, setDept] = useState('');
    const [dest, setDest] = useState('');
    const [hawb, setHawb] = useState('');
    const [pcs, setPcs] = useState('');

    // Effect to fetch shipment data when the component mounts
    useEffect(() => {
        const fetchShipmentData = async () => {
            try {
                const response = await fetch('/api/shipment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ searchTerms: [shipmentId] }), // Pass shipmentId as search term
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }

                const shipmentDataArray = await response.json();
                if (shipmentDataArray.length > 0) {
                    const shipmentData = shipmentDataArray[0]; // Assuming we get an array of records
                    console.log('Fetched Shipment Data:', shipmentData);

                    // Set state with fetched data
                    setMawb(shipmentData.mawb || '');
                    setDept(shipmentData.dept || '');
                    setDest(shipmentData.dest || '');
                    setHawb(shipmentData.hawb || '');
                    setPcs(shipmentData.pcs || '');
                }
            } catch (error) {
                console.error('Error fetching shipment data:', error);
            }
        };

        fetchShipmentData(); // Call the function to fetch data
    }, [shipmentId]); // Dependency array includes shipmentId to refetch if it changes

    return (
        <div className={`flex items-end`}>
            {/* Container for shipment description with limited width */}
            <div className={`p-4 bg-blue-50`}>
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100">
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">MAWB:</Text>
                        <input
                            type="text"
                            value={mawb}
                            onChange={(e) => setMawb(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter MAWB"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">DEPT:</Text>
                        <input
                            type="text"
                            value={dept}
                            onChange={(e) => setDept(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter DEPT"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">DEST:</Text>
                        <input
                            type="text"
                            value={dest}
                            onChange={(e) => setDest(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter DEST"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">HAWB:</Text>
                        <input
                            type="text"
                            value={hawb}
                            onChange={(e) => setHawb(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter HAWB"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">PCS:</Text>
                        <input
                            type="text"
                            value={pcs}
                            onChange={(e) => setPcs(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter PCS"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}