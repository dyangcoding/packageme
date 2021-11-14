import React, { Fragment } from "react";
import Introduction from "../home/Introduction";
import ImageToText from "../home/image-to-text";
import { ParcelList } from "../parcel/parcels";

function Home() {
    return (
        <Fragment>
            <Introduction />
            <div className="bg-gray-100">
                <ImageToText />
            </div>
            <ParcelList />
        </Fragment>
    );
}

export default Home;