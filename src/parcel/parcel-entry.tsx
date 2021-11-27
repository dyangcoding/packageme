import React from 'react';
import { MailIcon, ChatAltIcon, CalendarIcon, CheckIcon } from '@heroicons/react/outline';
import ReactTooltip from 'react-tooltip';
import { collectParcel } from '../app/mongo-client';
import moment from 'moment';
import { addToast } from '../ui/actions';
import { connect } from 'react-redux';
import { ToastProperties } from '../ui/toast';
import { ParcelProperties } from '../models/parcel';

interface OwnProps {
    readonly parcel: ParcelProperties;
}

interface DispatchProps {
    readonly addToast: (toast: ToastProperties) => void;
}

interface EntryProps extends OwnProps, DispatchProps {}

interface EntryState {
    readonly updateError?: string;
}

class ParcelEntryComponent extends React.Component<EntryProps, EntryState> {
    constructor(props: EntryProps) {
        super(props);

        this.onCollect = this.onCollect.bind(this);
    }

    public render(): React.ReactNode {
        const parcel = this.props.parcel;
        return (
            <div className="flex flex-col md:grid md:grid-cols-12 md:gap-2 md:items-center py-4 rounded-md md:justify-between border md:border-none my-4 p-2 md:even:bg-gray-50">
                <div className="md:col-span-5">
                    <div className="flex items-center space-x-2">
                        <MailIcon className="hidden md:flex flex-none text-yellow-400 h-10 w-10" aria-hidden="true" />
                        <div className="flex-col">
                            <span className="text-lg font-medium leading-4">{parcel.info}</span>
                            {this.renderDate()}
                        </div>
                    </div>
                </div>
                <div className="md:col-span-5 flex items-center justify-start p-2 md:p-0">
                    {this.renderRemark()}
                </div>
                <div className="md:col-span-2 flex items-center justify-center my-2">
                    {this.renderStatus()}
                    {this.renderCollectAction()}
                </div>
            </div>
        );
    }

    private renderDate(): React.ReactNode {
        const utcDate = this.props.parcel.deliverDate;
        const localDate = moment(utcDate).local().format("LLLL");
        return (
            <div className="flex items-center space-x-1">
                <CalendarIcon className="flex-none h-4 w-4" aria-hidden="true" />
                <span className="text-sm text-gray-500">{localDate}</span>
            </div>
        );
    }

    private renderRemark(): React.ReactNode {
        const remark = this.props.parcel.remark;
        if (remark) {
            return (
                <div className="flex items-center space-x-2">
                    <div className="flex-none rounded-md bg-gray-100 p-2">
                        <ChatAltIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="text-base leading-4">{remark}</span>
                </div>
            );
        }
        return null;
    }

    private renderStatus(): React.ReactNode {
        const collected = this.props.parcel.collected;
        if (collected) {
            return (
                <div className="flex items-center p-1.5 rounded-full cursor-pointer bg-green-100 w-full md:w-auto" data-tip="Package is collected.">
                    <CheckIcon className="flex text-green-500 h-6 w-6 items-center justify-center mx-auto" aria-hidden="true" />
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
                <div className="flex items-center justify-center w-full md:w-auto bg-indigo-500 md:bg-transparent rounded-full p-1.5" onClick={this.onCollect}>
                    <button className="text-sm
                        font-medium text-white md:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Collect
                    </button>
                </div>
            );
        }
        return null;
    }

    private async onCollect(): Promise<void> {
        const parcel = this.props.parcel;
        if (!parcel._id) {
            throw new Error('Can not update Parcel without _id field.')
        }
        collectParcel(parcel)
        .then(() => this.props.addToast(this.buildToast()))
        .catch(error => this.setState({updateError: error}));
    }

    private buildToast(): ToastProperties {
        return {
            id: Date.now(),
            title: 'Package',
            message: 'You collect your Package.',
            mode: 'success'
        } as ToastProperties;
    }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        addToast: (toast: ToastProperties) => dispatch(addToast(toast)),
    }
}

export const ParcelEntry = connect(null, mapDispatchToProps)(ParcelEntryComponent);