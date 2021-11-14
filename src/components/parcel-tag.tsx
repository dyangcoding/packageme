import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { ParcelProperties } from "../models/parcel";

interface TagProps {
    readonly parcel: ParcelProperties;
    readonly onDelete: (tag: string) => void;
}

class ParcelTag extends React.Component<TagProps> {
    constructor(props: TagProps) {
        super(props);

        this.onDeleteTag = this.onDeleteTag.bind(this);
    }

    public render(): React.ReactNode {
        const parcel = this.props.parcel;
        return (
            <div className="flex justify-between rounded-xl p-2 bg-yellow-400 bg-opacity-75">
                <div className="text-justify text-sm text-white capitalize">
                    <span>Info: {parcel.info}</span>
                    {parcel.remark ? <span> Remark: {parcel.remark}</span> : null}
                </div>  
                <button className="flex content-center items-center" onClick={() => this.onDeleteTag()}>
                    <XIcon className="text-red-800 hover:text-red-900 h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        );
    }

    private onDeleteTag(): void {
        this.props.onDelete(this.props.parcel.info);
    }
}

export default ParcelTag;