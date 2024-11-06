import { Text } from "./Text";
import React, { useEffect, useState } from "react";

export default function ShipmentDescription({ shipmentId }) {
    // State to hold input values
    const [id, setId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [shipping, setShipping] = useState('');
    const [pieces, setPieces] = useState('');

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
                    setId(shipmentData.id || '');
                    setOrigin(shipmentData.origin || '');
                    setDestination(shipmentData.destination || '');
                    setShipping(shipmentData.shipping || '');
                    setPIeces(shipmentData.pieces || '');
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
                        <Text as="span" className="font-semibold text-black-900">ID:</Text>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter ID"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">Origin:</Text>
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setDept(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter Origin"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">Destination:</Text>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDest(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter Destination"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">Shipping:</Text>
                        <input
                            type="text"
                            value={shipping}
                            onChange={(e) => setHawb(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter Shipping"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">Pieces:</Text>
                        <input
                            type="text"
                            value={pieces}
                            onChange={(e) => setPcs(e.target.value)} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter Pieces"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
