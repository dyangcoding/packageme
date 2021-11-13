import React, { Fragment } from "react";
import { ParcelProperties } from "../models/parcel";
import ParcelTag from "./ParcelTag";
import moment from "moment";

interface ParcelProps {
    readonly onParcelsChange: (parcels: ReadonlyArray<ParcelProperties>) => void;
}

interface ParcelState {
    readonly parcelInfo: string;
    readonly remark: string;
    readonly parcels: ParcelProperties[];
    readonly error?: string;
}

class ParcelInput extends React.Component<ParcelProps, ParcelState> {
    private infoInput: React.RefObject<HTMLInputElement>;

    constructor(props: ParcelProps) {
        super(props);

        this.state = {
            parcelInfo: "",
            remark: "",
            parcels: [] as ParcelProperties[],
        }

        this.infoInput = React.createRef();

        this.onInfoChange = this.onInfoChange.bind(this);
        this.onRemarkChange = this.onRemarkChange.bind(this);
        this.onInfoKeyDown = this.onInfoKeyDown.bind(this);
        this.onRemarkKeyDown = this.onRemarkKeyDown.bind(this);
        this.onDeleteParcel = this.onDeleteParcel.bind(this);
    }

    public render(): React.ReactNode {
        const info = this.state.parcelInfo;
        const remark = this.state.remark;
        const parcels = this.state.parcels;
        return (
            <Fragment>
                <div className="flex-col rounded-md shadow-sm">
                    <input type="text" name="parcel-info" id="parcel-info" value={info || ""} onChange={this.onInfoChange} onKeyDown={this.onInfoKeyDown}
                        placeholder="22xxxx your package is here (Press 'Enter' to add)" ref={this.infoInput}
                        className="h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                </div>
                <div className=" my-1 text-sm">
                    Remark
                </div>
                <div className="">
                    <input type="text" name="remark" id="remark" value={remark || ""} onChange={this.onRemarkChange} onKeyDown={this.onRemarkKeyDown}
                            placeholder="Pick up at 22xxx1 (Press 'Enter' to add)"
                            className="h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                </div>
                {this.renderErrorMessage()}
                <div className="flex-col space-y-2 mt-2">
                    {parcels.map((parcel, index) => {
                        return <ParcelTag key={index} parcel={parcel} onDelete={this.onDeleteParcel} />;
                    })}
                </div>
            </Fragment>
        );
    }

    private renderErrorMessage(): React.ReactNode {
        const message = this.state.error;
        if (message) {
            return (
                <div className="flex items-center text-sm rounded-md my-2 p-2 bg-red-100 text-red-500">
                    {message}
                </div>
            );
        }
        return null;
    }

    private onInfoChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (this.state.error) {
            this.setState({error: undefined});
        }
        this.setState({parcelInfo: event.target.value});
    }

    private onRemarkChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({remark: event.target.value});
    }

    private onInfoKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        const parcels = this.state.parcels;
        const trimmedInfo = this.state.parcelInfo.trim();
        if (parcels.find(parcel => parcel.info === trimmedInfo)) {
            this.setState({error: "Package Info exists already."});
            return;
        }
        if (event.code === "Enter" && this.validate()) {
            event.preventDefault();
            this.handleChange();
        }
    }

    private onRemarkKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.code === "Enter") {
            const trimmedInfo = this.state.parcelInfo.trim();
            if (!trimmedInfo.length) {
                this.setState({error: "Package Info can not be empty."});
                return;
            }
            if (this.validate()) {
                event.preventDefault();
                this.handleChange();
                this.infoInput.current?.focus();
            }
        }
    }

    private validate(): boolean {
        const info = this.state.parcelInfo.trim();
        const parcels = this.state.parcels;
        return info.length > 0 && !parcels.find(parcel => parcel.info === info);
    }

    private buildParcel(): ParcelProperties {
        return {
            info: this.state.parcelInfo.trim(), 
            remark: this.state.remark, 
            deliverDate: moment.utc().format(), 
            collected: false
        } as ParcelProperties;
    }

    private handleChange(): void {
        this.setState(prevState => 
            ({
                parcels: [...prevState.parcels, this.buildParcel()], 
                parcelInfo: "", 
                remark: ""
            }),
            () => this.props.onParcelsChange(this.state.parcels)
        );
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