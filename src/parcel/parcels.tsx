import React, { Fragment } from 'react';
import { SearchIcon, CheckIcon, InboxIcon, UserCircleIcon } from '@heroicons/react/outline';
import { ParcelProperties } from '../models/parcel';
import { AppState } from '../app/store';
import { connect } from 'react-redux';
import { loadParcels, searchParcels } from './actions';
import ParcelEntry from './parcel-entry';
import { Login } from '../auth/login';
import empty from '../imgs/void.png';
import { HeroIcon } from '../components/herocon-icon';
import ReactTooltip from 'react-tooltip';

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
    readonly searchTerm: string;
    readonly shown: boolean;
}

interface ParcelListProps extends StateProps, DispatchProps {}

class ParcelListComponent extends React.Component<ParcelListProps, ParcelListState> {
    constructor(props: ParcelListProps){
        super(props);

        this.state = {
            searchTerm: '',
            shown: false,
        }

        this.onToggleLogin = this.onToggleLogin.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onSearchInputKeyDown = this.onSearchInputKeyDown.bind(this);
        this.onClearSearchInput = this.onClearSearchInput.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.validateSearchInput = this.validateSearchInput.bind(this);
    }

    public componentDidMount(): void {
        this.props.onLoad();
    }

    public render(): React.ReactNode {
        const authenticated = this.props.sessionID;
        return (
            <Fragment>
                <div className="container mx-auto max-w-6xl px-2 md:px-5 py-8">
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
        clazzName += authenticated ? " justify-between border-b-2" : " justify-center space-x-2-4";
        return (
            <div className={clazzName}>
                <div className="flex md:flex-none items-center text-lg md:text-2xl md:divide-x md:divide-green-500 space-x-4 md:w-1/2">
                    <div className="px-2">
                        Packages in Total: <span className="underline">{parcels.length.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 md:px-4">
                        <div className="flex items-center p-2 rounded-full cursor-pointer bg-green-100">
                            <CheckIcon className="text-green-500 h-4 w-4 md:h-6 md:w-6" aria-hidden="true" data-tip="Collected Packages" />
                        </div>
                        <span>{collected.toLocaleString()}</span> 
                    </div>
                    <div className="flex items-center space-x-2 md:px-4">
                        <div className="flex items-center p-2 rounded-full cursor-pointer bg-yellow-100">
                            <InboxIcon className="text-yellow-500 h-4 w-4 md:h-6 md:w-6" aria-hidden="true" data-tip="Uncollected Packages" />
                        </div>
                        <span>{uncollected.toLocaleString()}</span> 
                    </div>
                </div>
                { authenticated ? this.renderSearchInput() : <ReactTooltip /> }
            </div>
        );
    }

    private renderSearchInput(): React.ReactNode {
        const searchTerm = this.state.searchTerm;
        return (
            <div className="flex items-center md:w-1/2">
                <div className="relative w-full md:w-5/6 my-6 md:my-2">
                    <div className="absolute top-3 md:top-2 left-2"> 
                        <SearchIcon className="text-gray-400 z-20 hover:text-gray-500 h4 w-4 md:h-6 md:w-6" aria-hidden="true" />
                    </div> 
                    <input type="text" value={searchTerm || ''} className="border border-solid border-gray-200 h-10 w-full pl-8 md:pl-10 pr-18 md:pr-20 rounded-lg z-0 focus:shadow-lg focus:outline-none text-sm md:text-base" 
                        placeholder="Search Name/Apartment number" onChange={this.onSearchInputChange} onKeyDown={this.onSearchInputKeyDown} />
                    {this.renderClearAction()}
                </div>
                <div className="ml-2 px-1">
                    <button className="p-2 text-white rounded-lg bg-red-500 hover:bg-red-600" onClick={this.onSearchClick}>
                        Search
                    </button>
                </div>
            </div>
        );
    }

    private renderClearAction(): React.ReactNode {
        if (this.state.searchTerm) {
            return (
                <div className="absolute top-1.5 right-1" onClick={this.onClearSearchInput}>
                    <HeroIcon icon="XIcon" className="cursor-pointer w-5 h-5 mr-1 mt-1 text-gray-500" />
                </div>
            );
        }
        return null;
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
                    <UserCircleIcon className="text-green-500 h-8 w-8" aria-hidden="true" />
                    <div>
                        <span className="cursor-pointer underline mr-1" onClick={this.onToggleLogin}>Login</span> 
                        to view the Package's Informations.
                    </div>
                </div> 
            </div>
        );
    }

    private onToggleLogin(): void {
        this.setState(prevState => ({shown: !prevState.shown}));
    }

    private onClearSearchInput(): void {
        this.setState({searchTerm: ''});
        this.props.onSearchInput('');
    }

    private onSearchInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({searchTerm: event.target.value});
    }

    private onSearchInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.code === 'Enter' && this.validateSearchInput()) {
            this.props.onSearchInput(this.state.searchTerm);
        }
    }

    private onSearchClick(_event: React.MouseEvent<HTMLButtonElement>): void {
        if (this.validateSearchInput()) {
            this.props.onSearchInput(this.state.searchTerm);
        }
    }

    private validateSearchInput(): boolean {
        return this.state.searchTerm.length ? true : false;
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