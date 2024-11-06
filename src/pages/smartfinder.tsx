import ShipmentDescription from "../components/ui/ShipmentDescription";
import React from "react";

const SmartFinder: React.FC = () => {
    return (
        <div className="w-full bg-cyan-900">
            <ShipmentDescription shipmentId={['CODE123','HKG']} />
        </div>
    );
};

export default SmartFinder;