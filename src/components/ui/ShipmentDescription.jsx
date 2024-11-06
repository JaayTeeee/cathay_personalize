
import {Text} from "./Text";
import React from "react";

export default function ShipmentDetails({
    shipmentDescription = (
        <>
            MAWB: DEPT: DEST:
            <br />
            HAWB: PCS: 
        </>
    ),
    ...props
}) {
    return(
        <div {...props} className={'${props.className} flex items-end flex-1'}>
            <Text
                as="p"
                className="mt-[18px] w-full text-[63px] font-normal leading-[76px] text-black-900 lg:text-[48px] md:text-[48px]"
            >
                {shipmentDescription}
            </Text>
        </div>
    );
}