import React, { Fragment } from "react";
import { SearchIcon, CheckIcon, InboxIcon, UserCircleIcon } from "@heroicons/react/outline";
import { ParcelProperties } from "../models/parcel";
import { AppState } from "../app/store";
import { connect } from "react-redux";
import { loadParcels } from "./actions";
import ParcelEntry from "./parcel-entry";
import { Login } from "../auth/login";

interface StateProps {
    readonly parcels: ReadonlyArray<ParcelProperties>;
    readonly isLoading: string;
    readonly error: string | undefined;
    readonly sessionID: string;
}

interface DispatchProps {
    readonly onLoad: () => void;
}

interface ParcelListState {
    readonly shown: boolean;
}

interface ParcelListProps extends StateProps, DispatchProps {}

class ParcelListComponent extends React.Component<ParcelListProps, ParcelListState> {
    constructor(props: ParcelListProps){
        super(props);

        this.state = {
            shown: false,
        }

        this.onToggleLogin = this.onToggleLogin.bind(this);
    }

    public componentDidMount(): void {
        this.props.onLoad();
    }

    private renderHeader() {
        let clazzName = "flex bg-white my-2 py-4";
        const parcels = this.props.parcels;
        const collected = parcels.filter(parcel => parcel.collected).length;
        const uncollected = parcels.length - collected;
        const authenticated = this.props.sessionID;
        clazzName += authenticated ? " justify-between border-b-2" : " justify-center";
        return (
            <div className={clazzName}>
                <div className="flex items-center text-2xl divide-x divide-green-500 space-x-4">
                    <span className="px-2">
                        Packages in Total: <span className="underline">{parcels.length.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-2 px-4">
                        <div className="flex items-center p-2 rounded-full cursor-pointer bg-green-100">
                            <CheckIcon className="text-green-500 h-6 w-6" aria-hidden="true" data-tip="Collected Packages" />
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
                { authenticated ? this.renderSearchInput() : null }
            </div>
        );
    }

    public render(): React.ReactNode {
        const authenticated = this.props.sessionID;
        return (
            <Fragment>
                <div className="container mx-auto max-w-6xl p-4 my-4">
                    {this.renderHeader()}
                    <div className="flex-col items-center my-4 space-y-2">
                        { authenticated ? this.renderParcels() : this.renderLogin()}        
                    </div>
                </div>
                {this.state.shown ? <Login onToggleDialog={this.onToggleLogin} /> : null}
            </Fragment>
        );
    }

    private renderSearchInput(): React.ReactNode {
        return (
            <div className="relative w-1/2">
                <div className="absolute top-2 left-2"> 
                    <SearchIcon className="text-gray-400 z-20 hover:text-gray-500 h-6 w-6" aria-hidden="true" />
                </div> 
                <input type="text" className="border border-solid border-indigo-200 h-10 w-full pl-12 pr-20 rounded-lg z-0 focus:shadow-lg focus:outline-none" 
                    placeholder="Search Name/Apartment number..." />
            </div>
        );
    }

    private renderParcels(): React.ReactNode {
        const parcels = this.props.parcels;
        return (
            <Fragment>
                {parcels.map((parcel, index) => {
                    return <ParcelEntry key={index} parcel={parcel} />;
                })}
            </Fragment>
        );
    }

    private renderLogin(): React.ReactNode {
        return (
            <div className="flex items-center justify-center border-dotted border-2 h-60">
                <div className="flex items-center text-xl space-x-2">
                    <UserCircleIcon className="text-green-500 h-6 w-6" aria-hidden="true" />
                    <div>
                        <span className="cursor-pointer underline mr-1" onClick={this.onToggleLogin}>Login</span> 
                        to view the Packages Informations.
                    </div>
                </div> 
            </div>
        );
    }

    private onToggleLogin(): void {
        this.setState(prevState => ({shown: !prevState.shown}));
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        parcels: state.parcels.value,
        isLoading: state.parcels.loading,
        error: state.parcels.error,
        sessionID: state.users.sessionID,
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onLoad: () => dispatch(loadParcels())
    }
}

export const ParcelList = connect(mapStateToProps, mapDispatchToProps)(ParcelListComponent);