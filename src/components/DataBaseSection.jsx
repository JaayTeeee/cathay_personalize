import ShipmentDetails from "../../components/ShipmentsDetails";
import React, {Suspense} from "react";

const shipmentHistoryList = [
    {
        shipmentDescription: (
            <>
                MAWB: DEPT: DEST: 
                <br />
                HAWB: PCS: 
            </>
        ),
    },
    {
        shipmentDescription: (
            <>
                MAWB: DEPT: DEST: 
                <br />
                HAWB: PCS: 
            </>
        ),
    },
    {
        shipmentDescription: (
            <>
                MAWB: DEPT: DEST: 
                <br />
                HAWB: PCS: 
            </>
        ),
    },
];

export default function DatabaseSection() {
    return(
        <>
            {/* database section */}
            <div className="m1-[152px] flex w-[84%] flex-col gap-[72px] md:ml-0 md:w-full md:px-5">
                <Suspense fallback={<div>Loading feed...</div>}>
                    {shipmentHistoryList.map((d,index) => (
                        <ShipmentDetails {...d} key={"databaselist"+index} className="bg-blue_gray-100" />
                    ))}
                </Suspense>
            </div>
        </>
    );
}
        