import React, { Fragment } from 'react';
import * as INFO from '../utils/string-utils';
import moment from "moment";
import Tooltip from '../components/tooltip-wrapper';
import { insertParcels } from '../app/mongo-client';
import { ToastProperties } from '../ui/toast';
import { addToast } from '../ui/actions';
import { connect } from 'react-redux';
import { ParcelProperties } from '../models/parcel';
import { NavLink } from 'react-router-dom';

interface DispatchProps {
    readonly addToast: (toast: ToastProperties) => void;
}

interface ParcelProps extends DispatchProps {}

interface ParcelState {
    readonly info: string;
    readonly remark: string;
    readonly termsAccepted: boolean;
    readonly inputError?: string;
    readonly insertionError?: string;
}

class ParcelInputComponent extends React.Component<ParcelProps, ParcelState> {
    constructor(props: ParcelProps) {
        super(props);

        this.state = { 
            info: '', 
            remark: '', 
            termsAccepted: false,
        };

        this.onInfoChange = this.onInfoChange.bind(this);
        this.onRemarkChange = this.onRemarkChange.bind(this);
        this.onTermOfUseChange = this.onTermOfUseChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public componentDidMount(): void {
        const inputData = localStorage.getItem('inputData');
        if (inputData) {
            const input = JSON.parse(inputData);
            this.setState({
                info: input.info,
                remark: input.remark,
                termsAccepted: input.termsAccepted,
            });
        }
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
        const message = this.state.inputError || this.state.insertionError;
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
                    <input id="term-of-use" name="term-of-use" type="checkbox" checked={this.state.termsAccepted} onChange={this.onTermOfUseChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                    <label htmlFor="term-of-use" className="ml-2 block text-sm text-gray-500">
                        You are agree with the <NavLink to="/legal" className="underline">Terms of Use</NavLink>.
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
        this.setState({info: event.target.value}, () => this.setStorage());
    }

    private onRemarkChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.clear();
        this.setState({remark: event.target.value}, () => this.setStorage());
    }

    private clear(): void {
        if (this.state.inputError) {
            this.setState({inputError: ''});
        }
    }

    private onTermOfUseChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({termsAccepted: event.target.checked, inputError: ""}, () => this.setStorage());
    }

    private setStorage(): void {
        const data = {
            info: this.state.info, 
            remark: this.state.remark, 
            termsAccepted: this.state.termsAccepted
        };
        localStorage.setItem('inputData', JSON.stringify(data));
    }

    private onSubmit(): void {
        let error = '';
        if (!this.state.info) {
            error = 'Package Info can not be empty.';
        } else if (!this.state.remark) {
            error = 'Remark can not be empty.';
        } else if (!this.state.termsAccepted) {
            error = 'Please agree with the Terms of Use.';
        }
        if (error) {
            this.setState({inputError: error});
            return;
        }
        insertParcels([this.buildParcel()])
            .then(() => this.notifyAndReset())
            .catch(error => this.setState({insertionError: error}));
    }

    private notifyAndReset(): void {
        this.setState({info: '', remark: '', termsAccepted: false});
        localStorage.removeItem('inputData');
        this.props.addToast(this.builToast());
    }

    private builToast(): ToastProperties {
        return {
            id: Date.now(),
            title: 'Package Information',
            message: 'Thanks for helping the Neighbors.',
            mode: 'success'
        } as ToastProperties;
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

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        addToast: (toast: ToastProperties) => dispatch(addToast(toast)),
    }
}

export const ParcelInput = connect(null, mapDispatchToProps)(ParcelInputComponent);