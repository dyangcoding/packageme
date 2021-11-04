import React from "react";
import { SearchIcon, MailOpenIcon, InboxIcon } from "@heroicons/react/outline";
import { ParcelProperties } from "../models/parcel";
import { AppState } from "../app/store";
import { connect } from "react-redux";
import { loadParcels } from "./actions";
import ParcelEntry from "./parcel-entry";

interface StateProps {
    readonly parcels: ReadonlyArray<ParcelProperties>;
    readonly isLoading: string;
    readonly error: string | undefined;
}

interface DispatchProps {
    readonly onLoad: () => void;
}

interface ParcelListProps extends StateProps, DispatchProps {}

class ParcelListComponent extends React.Component<ParcelListProps> {
    constructor(props: ParcelListProps){
        super(props);
    }

    public componentDidMount(): void {
        this.props.onLoad();
    }

    private renderHeader() {
        const parcels = this.props.parcels;
        const collected = parcels.filter(parcel => parcel.collected).length;
        const uncollected = parcels.length - collected;
        return (
            <div className="flex justify-between bg-white my-2 py-4 border-b-2">
                <div className="flex items-center text-2xl divide-x divide-green-500 space-x-4">
                    <span className="px-2">
                        Packages in Total: <span className="underline">{parcels.length.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-2 px-4">
                        <div className="flex items-center p-2 rounded-full cursor-pointer bg-green-100">
                            <MailOpenIcon className="text-green-500 h-6 w-6" aria-hidden="true" data-tip="Collected Packages" />
                        </div>
                        <span>{collected.toLocaleString()}</span> 
                    </span>
                    <span className="flex items-center space-x-2 px-4">
                        <div className="flex items-center p-2 rounded-full cursor-pointer bg-yellow-100">
                            <InboxIcon className="text-yellow-500 h-6 w-6" aria-hidden="true" data-tip="Uncollected Packages" />
                        </div>
                        <span>{uncollected.toLocaleString()}</span> 
                    </span>
                </div>
                <div className="relative w-1/2">
                    <div className="absolute top-2 left-2"> 
                        <SearchIcon className="text-gray-400 z-20 hover:text-gray-500 h-6 w-6" aria-hidden="true" />
                    </div> 
                    <input type="text" className="h-10 w-full pl-12 pr-20 rounded-lg z-0 focus:shadow-lg focus:outline-none" 
                        placeholder="Search Name/Apartment number..." />
                </div>
            </div>
        );
    }

    public render(): React.ReactNode {
        const parcels = this.props.parcels;
        return (
            <div className="container mx-auto max-w-6xl p-4 my-4">
                {this.renderHeader()}
                <div className="flex-col items-center my-4 space-y-2">
                    {parcels.map((parcel, index) => {
                        return <ParcelEntry key={index} parcel={parcel} />;
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        parcels: state.parcels.value,
        isLoading: state.parcels.loading,
        error: state.parcels.error
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onLoad: () => dispatch(loadParcels())
    }
}

export const ParcelList = connect(mapStateToProps, mapDispatchToProps)(ParcelListComponent);