import React, { useState } from "react";
import ShipmentDescription from "../../components/ui/ShipmentDescription";
import WebcamOCR from "@/components/WebcamOCR";

const SmartFinder: React.FC = () => {
    const [extractedTexts, setExtractedTexts] = useState<string[]>([]); // Initialize as an array
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

    return (
        <div className="w-full bg-cyan-900">
            <WebcamOCR 
                setExtractedTexts={setExtractedTexts} 
                setIsLoading={setIsLoading} 
                extractedTexts={extractedTexts} // Pass extracted texts as a prop
            />
            {!isLoading && <ShipmentDescription shipmentId={extractedTexts} />} {/* Render only if not loading */}
        </div>
    );
};

export default SmartFinder;