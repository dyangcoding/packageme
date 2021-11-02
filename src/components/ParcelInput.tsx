import React, { Fragment } from "react";
import { ParcelProperties } from "../models/parcel";
import Tag from "./Tag";

interface ParcelProps {
    readonly onParcelsChange: (parcels: ReadonlyArray<ParcelProperties>) => void;
}

interface ParcelState {
    readonly parcelInfo: string;
    readonly remark: string;
    readonly parcels: ParcelProperties[];
}

class ParcelInput extends React.Component<ParcelProps, ParcelState> {
    constructor(props: ParcelProps) {
        super(props);

        this.state = {
            parcelInfo: "",
            remark: "",
            parcels: [] as ParcelProperties[],
        }

        this.onInfoChange = this.onInfoChange.bind(this);
        this.onRemarkChange = this.onRemarkChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onDeleteParcel = this.onDeleteParcel.bind(this);
    }

    public render(): React.ReactNode {
        const info = this.state.parcelInfo;
        const remark = this.state.remark;
        const parcels = this.state.parcels;
        return (
            <Fragment>
                <div className="flex-col rounded-md shadow-sm">
                    <input type="text" name="parcel-info" id="parcel-info" value={info || ""} onChange={this.onInfoChange} onKeyDown={this.onKeyDown}
                        placeholder="Max Mustermann / 22xxxx your package is arrived"
                        className="h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                </div>
                <div className=" my-1 text-sm">
                    Remark
                </div>
                <div className="">
                    <input type="text" name="remark" id="remark" value={remark || ""} onChange={this.onRemarkChange} onKeyDown={this.onKeyDown}
                            placeholder="Pick up at 22xxx1"
                            className="h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                </div>
                <div className="flex-col space-y-2 mt-2">
                    {parcels.map((parcel, index) => {
                        return <Tag key={index} tag={parcel.info} onDelete={this.onDeleteParcel} />;
                    })}
                </div>
            </Fragment>
        );
    }

    private onInfoChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({parcelInfo: event.target.value});
    }

    private onRemarkChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({remark: event.target.value});
    }

    private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        const parcels = this.state.parcels;
        const trimmedInput = this.state.parcelInfo.trim();
        if (event.code === "Enter" && trimmedInput.length && !parcels.find(parcel => parcel.info === trimmedInput)) {
            event.preventDefault();
            const parcel = {info: trimmedInput, remark: this.state.remark, deliverDate: Date().toString(), collected: false};
            this.setState(prevState => ({parcels: [...prevState.parcels, parcel], parcelInfo: ""}));
        }
    }

    private onDeleteParcel(parcelInfo: string): void {
        const parcels = this.state.parcels;
        if (parcels.find(parcel => parcel.info === parcelInfo)) {
            const removed = parcels.filter(parcel => parcel.info !== parcelInfo);
            this.setState({parcels: removed});
        }
    }
}

export default ParcelInput;