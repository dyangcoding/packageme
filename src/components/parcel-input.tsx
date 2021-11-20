import React, { Fragment } from 'react';
import { ParcelProperties } from '../models/parcel';
import * as INFO from '../utils/string-utils';
import moment from "moment";
import Tooltip from './tooltip-wrapper';
import { AppState } from '../app/store';
import { insertParcel } from '../parcel/actions';
import { connect } from 'react-redux';

interface OwnProps {
    readonly insertionError: string;
}

interface DispatchProps {
    readonly onInsertParcel: (parcel: ParcelProperties) => PromiseLike<void>;
}

interface ParcelProps extends OwnProps, DispatchProps {}

interface ParcelState {
    readonly info: string;
    readonly remark: string;
    readonly checked: boolean;
    readonly inputError?: string;
}

class ParcelInputComponent extends React.Component<ParcelProps, ParcelState> {
    constructor(props: ParcelProps) {
        super(props);

        this.state = { info: "", remark: "", checked: false };

        this.onInfoChange = this.onInfoChange.bind(this);
        this.onRemarkChange = this.onRemarkChange.bind(this);
        this.onTermOfUseChange = this.onTermOfUseChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public render(): React.ReactNode {
        const info = this.state.info;
        const remark = this.state.remark;
        return (
            <Fragment>
                <div className="flex items-center space-x-1">
                    <div className="font-medium text-gray-700">
                        3. Package Infos
                    </div>
                    <Tooltip id="package-info" title="Package Information" description={INFO.parcelInfo} />
                </div>
                <div className="flex-col rounded-md shadow-sm my-2">
                    <input type="text" name="parcel-info" id="parcel-info" value={info || ""} onChange={this.onInfoChange} placeholder="22xxxx your package is here"
                        className="h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                </div>
                <div className="my-1 text-base">
                    Remark
                </div>
                <div className="">
                    <input type="text" name="remark" id="remark" value={remark || ""} onChange={this.onRemarkChange} placeholder="Pick up at 22xxx1"
                        className="h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                </div>
                {this.renderErrorMessage()}
                {this.renderUploadAction()}
            </Fragment>
        );
    }

    private renderErrorMessage(): React.ReactNode {
        const message = this.props.insertionError || this.state.inputError;
        if (message) {
            return (
                <div className="flex items-center text-sm rounded-md my-2 p-2 bg-red-100 text-red-500">
                    {message}
                </div>
            );
        }
        return null;
    }

    private renderUploadAction(): React.ReactNode {
        return (
            <div className="mt-2">
                <div className="flex items-center my-2">
                    <input id="term-of-use" name="term-of-use" type="checkbox" onChange={this.onTermOfUseChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                    <label htmlFor="term-of-use" className="ml-2 block text-sm text-gray-500">
                        You are agree with the Terms of Use.
                    </label>
                </div>
                <button type="submit" onClick={this.onSubmit}
                    className="flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Upload
                </button>
            </div>
        );
    }

    private onInfoChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.clear();
        this.setState({info: event.target.value});
    }

    private onRemarkChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.clear();
        this.setState({remark: event.target.value});
    }

    private clear(): void {
        if (this.state.inputError) {
            this.setState({inputError: ''});
        }
    }

    private onTermOfUseChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({checked: event.target.checked, inputError: ""});
    }

    private onSubmit(): void {
        let error = '';
        if (!this.state.info) {
            error = 'Package Info can not be empty.';
        } else if (!this.state.remark) {
            error = 'Remark can not be empty.';
        } else if (!this.state.checked) {
            error = 'Please agree with the Terms of Service.';
        }
        if (error) {
            this.setState({inputError: error});
            return;
        }
        this.props.onInsertParcel(this.buildParcel()).then(() => this.reset());
    }

    private reset(): void {
        this.setState({info: '', remark: '', checked: false});
    }

    private buildParcel(): ParcelProperties {
        return {
            info: this.state.info.trim(), 
            remark: this.state.remark, 
            deliverDate: moment.utc().format(), 
            collected: false
        } as ParcelProperties;
    }
}

function mapStateToProps(state: AppState): OwnProps {
    return {
        insertionError: state.parcels.error || '',
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        onInsertParcel: (parcel: ParcelProperties) => dispatch(insertParcel(parcel)),
    }
}

export const ParcelInput = connect(mapStateToProps, mapDispatchToProps)(ParcelInputComponent);