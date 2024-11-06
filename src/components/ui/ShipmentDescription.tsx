import { Text } from "./Text";
import React, { useEffect, useState } from "react";

export default function ShipmentDescription({ shipmentId }) {
    // State to hold input values
    const [shipmentInfo, setShipmentInfo] = useState({
        id: null,
        shipping: "",
        origin: "",
        destination: "",
        pieces: "",
        status: "Null",
    });

    // Effect to fetch shipment data when the component mounts
    useEffect(() => {
        const fetchShipmentData = async () => {
            try {

                // Construct query string from search terms
                const queryString = new URLSearchParams({ searchTerms: JSON.stringify(shipmentId) }).toString();
                
                const response = await fetch(`/api/shipment?${queryString}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                // Check if response is okay
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("DATA: " ,data)
                
                const shipmentData = data['data'][0]; // Assuming we get an array of records
                console.log('Fetched Shipment Data:', shipmentData);

                // Set state with fetched data
                setShipmentInfo({
                    id: shipmentData.id || null,
                    origin: shipmentData.origin || '',
                    destination: shipmentData.destination || '',
                    pieces: shipmentData.pieces || '',
                    shipping: shipmentData.shipping || '',
                    status: shipmentData.status || 'Null',
                });
                
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
                        <Text as="span" className="font-semibold text-black-900">Shipping:</Text>
                        <input
                            type="text"
                            value={shipmentInfo.shipping}
                            onChange={(e) => setShipmentInfo(prev => ({ ...prev, code: e.target.value }))} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter MAWB" // Placeholder value can be different
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">Origin:</Text>
                        <input
                            type="text"
                            value={shipmentInfo.origin}
                            onChange={(e) => setShipmentInfo(prev => ({ ...prev, origin: e.target.value }))} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter DEPT" // Placeholder value can be different
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">Destination:</Text>
                        <input
                            type="text"
                            value={shipmentInfo.destination}
                            onChange={(e) => setShipmentInfo(prev => ({ ...prev, destination: e.target.value }))} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter DEST" // Placeholder value can be different
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">Pieces:</Text>
                        <input
                            type="text"
                            value={shipmentInfo.pieces}
                            onChange={(e) => setShipmentInfo(prev => ({ ...prev, pieces: e.target.value }))} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter HAWB" // Placeholder value can be different
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Text as="span" className="font-semibold text-black-900">Status:</Text>
                        <input
                            type="text"
                            value={shipmentInfo.status}
                            onChange={(e) => setShipmentInfo(prev => ({ ...prev, status: e.target.value }))} // Allow editing if needed
                            className="ml-2 p-2 border border-gray-300 rounded"
                            placeholder="Enter PCS" // Placeholder value can be different
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}