import React from "react";
import { ParcelProperties } from "../models/parcel";
import { MailIcon, BellIcon, CalendarIcon, CheckIcon } from "@heroicons/react/outline";
import ReactTooltip from "react-tooltip";
import { collectParcel } from "../app/mongo-client";

interface EntryProps {
    readonly parcel: ParcelProperties;
}

interface EntryState {}

class ParcelEntry extends React.Component<EntryProps, EntryState> {
    constructor(props: EntryProps) {
        super(props);

        this.onCollect = this.onCollect.bind(this);
    }

    public render(): React.ReactNode {
        const parcel = this.props.parcel;
        return (
            <div className="grid grid-cols-12 gap-1 items-center py-2 rounded-md justify-between even:bg-gray-100">
                <div className="col-span-5">
                    <div className="flex items-center space-x-2">
                        <MailIcon className="text-yellow-400 h-12 w-12" aria-hidden="true" />
                        <div className="flex-col">
                            <span className="text-base font-medium">{parcel.info}</span>
                            {this.renderDate()}
                        </div>
                    </div>
                </div>
                <div className="col-span-5 flex items-center justify-start">
                    {this.renderRemark()}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                    {this.renderStatus()}
                    {this.renderCollectAction()}
                </div>
            </div>
        );
    }

    private renderDate(): React.ReactNode {
        const date = this.props.parcel.deliverDate;
        return (
            <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm">{date}</span>
            </div>
        );
    }

    private renderRemark(): React.ReactNode {
        const remark = this.props.parcel.remark;
        if (remark) {
            return (
                <div className="flex items-center space-x-1">
                    <BellIcon className="flex-none h-6 w-6" aria-hidden="true" />
                    <span className="flex-auto text-base">{remark}</span>
                </div>
            );
        }
        return null;
    }

    private renderStatus(): React.ReactNode {
        const collected = this.props.parcel.collected;
        if (collected) {
            return (
                <div className="flex items-center p-2 rounded-full cursor-pointer bg-green-100" data-tip="Package is collected.">
                    <CheckIcon className="text-green-500 h-4 w-4" aria-hidden="true" />
                    <ReactTooltip />
                </div>
            );
        }
        return null;
    }

    private renderCollectAction(): React.ReactNode {
        const status = this.props.parcel.collected;
        if (!status) {
            return (
                <div className="flex items-center">
                    <button onClick={this.onCollect} className="text-sm 
                        font-medium text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Collect
                    </button>
                </div>
            );
        }
        return null;
    }

    private async onCollect(): Promise<void> {
        const parcel = this.props.parcel;
        const result = await collectParcel(parcel);
        // TODO: validate that the parcel has been updated.
        if (result) {
            this.setState({collected: true});
        }
    }
}

export default ParcelEntry;