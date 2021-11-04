import React from "react";
import { ParcelProperties } from "../models/parcel";
import { MailIcon, BellIcon, CalendarIcon, MailOpenIcon, InboxIcon, CheckIcon } from "@heroicons/react/outline";
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
            <div className="flex items-center bg-gray-100 py-2 rounded-md justify-between">
                <div className="flex items-center space-x-2 mx-2">
                    <MailIcon className="text-yellow-400 h-8 w-8" aria-hidden="true" />
                    <span className="">{parcel.info}</span>
                </div>
                <div className="flex items-center space-x-2 mx-2"> 
                    {this.renderDate()}
                    {this.renderRemark()}
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
                    <BellIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm">{remark}</span>
                </div>
            );
        }
        return null;
    }

    private renderStatus(): React.ReactNode {
        let clazzName = "flex items-center p-2 rounded-full cursor-pointer";
        let status;
        let hint = "Package is ";
        const collected = this.props.parcel.collected;
        if (collected) {
            clazzName += " bg-green-100";
            status = <MailOpenIcon className="text-green-500 h-4 w-4" aria-hidden="true" />;
            hint += " collected.";
        } else {
            clazzName += " bg-yellow-100";
            status = <InboxIcon className="text-yellow-500 h-4 w-4" aria-hidden="true" />;
            hint += " uncollected.";
        }
        return (
            <div className={clazzName} data-tip={hint}>
                {status}
                <ReactTooltip />
            </div>
        );
    }

    private renderCollectAction(): React.ReactNode {
        const status = this.props.parcel.collected;
        if (!status) {
            return (
                <div className="flex items-center bg-gray-200 cursor-pointer rounded-full p-2" onClick={this.onCollect}>
                    <CheckIcon className="text-gray-500 h-6 w-6" aria-hidden="true" data-tip="collect" />
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