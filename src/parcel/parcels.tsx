import React, { Fragment } from 'react';
import { SearchIcon, CheckIcon, InboxIcon, UserCircleIcon } from '@heroicons/react/outline';
import { ParcelProperties } from '../models/parcel';
import { AppState } from '../app/store';
import { connect } from 'react-redux';
import { loadParcels, searchParcels } from './actions';
import ParcelEntry from './parcel-entry';
import { Login } from '../auth/login';
import empty from '../imgs/void.png';

interface StateProps {
    readonly parcels: ReadonlyArray<ParcelProperties>;
    readonly isLoading: string;
    readonly error: string | undefined;
    readonly sessionID: string;
}

interface DispatchProps {
    readonly onLoad: () => void;
    readonly onSearchInput: (searchTerm: string) => ReadonlyArray<ParcelProperties>;
}

interface ParcelListState {
    readonly searchTerm?: string;
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
        this.onSearchInput = this.onSearchInput.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    public componentDidMount(): void {
        this.props.onLoad();
    }

    public render(): React.ReactNode {
        const authenticated = this.props.sessionID;
        return (
            <Fragment>
                <div className="container mx-auto max-w-6xl my-4 p-2 md:p-5">
                    {this.renderHeader()}
                    <div className="flex-col items-center my-4 space-y-2 p-5">
                        { authenticated ? this.renderParcels() : this.renderLogin()}        
                    </div>
                </div>
                {this.state.shown ? <Login onToggleDialog={this.onToggleLogin} /> : null}
            </Fragment>
        );
    }

    private renderHeader() {
        let clazzName = "flex flex-col md:flex-row my-2 p-2 md:p-5";
        const parcels = this.props.parcels;
        const collected = parcels.filter(parcel => parcel.collected).length;
        const uncollected = parcels.length - collected;
        const authenticated = this.props.sessionID;
        clazzName += authenticated ? " justify-between border-b-2" : " justify-center";
        return (
            <div className={clazzName}>
                <div className="flex items-center text-lg md:text-2xl md:divide-x md:divide-green-500 space-x-4">
                    <span className="px-2">
                        Packages in Total: <span className="underline">{parcels.length.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-2 md:px-4">
                        <div className="flex items-center p-2 rounded-full cursor-pointer bg-green-100">
                            <CheckIcon className="text-green-500 h-4 w-4 md:h-6 md:w-6" aria-hidden="true" data-tip="Collected Packages" />
                        </div>
                        <span>{collected.toLocaleString()}</span> 
                    </span>
                    <span className="flex items-center space-x-2 md:px-4">
                        <div className="flex items-center p-2 rounded-full cursor-pointer bg-yellow-100">
                            <InboxIcon className="text-yellow-500 h-4 w-4 md:h-6 md:w-6" aria-hidden="true" data-tip="Uncollected Packages" />
                        </div>
                        <span>{uncollected.toLocaleString()}</span> 
                    </span>
                </div>
                { authenticated ? this.renderSearchInput() : null }
            </div>
        );
    }

    private renderSearchInput(): React.ReactNode {
        return (
            <div className="relative w-full md:w-1/2 my-6 md:my-2">
                <div className="absolute top-3 md:top-2 left-2"> 
                    <SearchIcon className="text-gray-400 z-20 hover:text-gray-500 h4 w-4 md:h-6 md:w-6" aria-hidden="true" />
                </div> 
                <input type="text" className="border border-solid border-gray-200 h-10 w-full pl-8 md:pl-12 pr-18 md:pr-20 rounded-lg z-0 focus:shadow-lg focus:outline-none text-sm md:text-base" 
                    placeholder="Search Name/Apartment number" onChange={this.onSearchInput} />
                <div className="absolute top-1.5 right-1"> 
                    <button className="h-7 w-14 md:w-20 text-white rounded-lg bg-red-500 hover:bg-red-600 text-sm" onClick={this.onSearchClick}>
                        Search
                    </button> 
                </div>
            </div>
        );
    }

    private renderParcels(): React.ReactNode {
        const parcels = this.props.parcels;
        if (!parcels.length) {
            return this.renderEmptyResults();
        }
        return (
            <div className="">
                {parcels.map((parcel, index) => {
                    return <ParcelEntry key={index} parcel={parcel} />;
                })}
            </div>
        );
    }

    private renderEmptyResults(): React.ReactNode {
        let message = '';
        if (this.state.searchTerm) {
            message = 'Oops, No Packages found for the Search, try something else.';
        } else {
            message = 'There are no Packages being uploaded. Help neighbours finding packages by uploading package informations.';
        }
        return (
            <div className="flex flex-col items-center justify-center">
                <img className="object-scale-down object-center rounded-lg h-40 my-4" src={empty} 
                    alt="No results for the action" />
                <div>{message}</div>
            </div>
        );
    }

    private renderLogin(): React.ReactNode {
        return (
            <div className="flex items-center justify-center border-dotted border-2 h-60">
                <div className="flex flex-col md:flex-row items-center justify-center text-base md:text-xl space-x-2">
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

    private onSearchInput(event: React.ChangeEvent<HTMLInputElement>): void {
        const searchTerm = event.target.value;
        if (!searchTerm) {
            this.props.onLoad();
            return;
        }
        this.setState({searchTerm: event.target.value});
    }

    private onSearchClick(event: React.MouseEvent<HTMLButtonElement>): void {
        const searchTerm = this.state.searchTerm;
        if (!searchTerm) {
            return;
        }
        this.props.onSearchInput(searchTerm);
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
        onLoad: () => dispatch(loadParcels()),
        onSearchInput: (searchTerm: string) => dispatch(searchParcels(searchTerm)),
    }
}

export const ParcelList = connect(mapStateToProps, mapDispatchToProps)(ParcelListComponent);