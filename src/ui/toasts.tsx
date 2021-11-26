import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../app/store';
import { addToast, removeToast } from './actions';
import Toast, { ToastProperties } from './toast';

interface StateProps {
    readonly toasts: ReadonlyArray<ToastProperties>;
    readonly error: string | undefined;
}

interface DispatchProps {
    readonly addToast: (toast: ToastProperties) => void;
    readonly removeToast: (is: number) => void;
}

interface ToastsProps extends StateProps, DispatchProps {}

class ToastsComponent extends React.Component<ToastsProps> {
    constructor(props: ToastsProps) {
        super(props);
        
        this.onDismissToast = this.onDismissToast.bind(this);
    }

    public render(): React.ReactNode {
        const toasts = this.props.toasts;
        return (
            <div className="fixed bottom-10 right-5 w-4/5 lg:w-1/4 xl:w-1/6">
                <div className="flex flex-col space-y-2">
                    {toasts.map((toast, index) => {
                        return <Toast key={index} toast={toast} onDismissToast={this.onDismissToast} />
                    })}
                </div>
            </div>
        );
    }

    private onDismissToast(id: number): void {
        this.props.removeToast(id);
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        toasts: state.ui.toasts,
        error: state.ui.error,
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        addToast: (toast: ToastProperties) => dispatch(addToast(toast)),
        removeToast: (id: number) => dispatch(removeToast(id))
    }
}

export const Toasts = connect(mapStateToProps, mapDispatchToProps)(ToastsComponent)