import React from "react";
import { ParcelProperties } from "../models/parcel";
import { MailIcon, BellIcon, CalendarIcon } from "@heroicons/react/outline";

interface EntryProps {
    readonly parcel: ParcelProperties;
}

interface EntryState {

}

class ParcelEntry extends React.Component<EntryProps, EntryState> {
    constructor(props: EntryProps) {
        super(props);
    }

    public render(): React.ReactNode {
        const parcel = this.props.parcel;
        return (
            <div className="flex items-center bg-gray-100 py-2 rounded-md justify-between">
                <div className="flex items-center space-x-2 mx-2">
                    <MailIcon className="text-yellow-400 h-8 w-8" aria-hidden="true" />
                    <span className="">{parcel.info}</span>
                </div>
                <div className="flex items-center space-x-2 mx-2"> 
                    <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                        <span className="text-sm">{parcel.deliverDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <BellIcon className="h-4 w-4" aria-hidden="true" />
                        <span className="text-sm">{parcel.remark}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParcelEntry;