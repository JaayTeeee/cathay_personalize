import ShipmentDescription from "../components/ui/ShipmentDescription";
import React from "react";

const SmartSuggestion: React.FC = () => {
    return (
        <div className="w-full bg-cyan-900">
            <ShipmentDescription shipmentId={['wefwefwefwefwe','wefwefwefwefwef']} />
        </div>
    );
};

export default SmartSuggestion;