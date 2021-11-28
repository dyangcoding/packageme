import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../app/store';
import { XIcon, QrcodeIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { login, clearError } from './actions';
import { setSessionID } from '../services/storage';
import { NavLink } from 'react-router-dom';

interface OwnProps {
    readonly onToggleDialog: () => void;
}

interface StateProps {
    readonly isLoading: string;
    readonly error: string | undefined;
    readonly sessionID: string;
}

interface DispatchProps {
    readonly login: (code: string) => PromiseLike<void>;
    readonly clearError: () => void;
}

interface LoginProps extends OwnProps, StateProps, DispatchProps {}

interface LoginState {
    readonly code: string;
    readonly codeError: string;
}

class LoginComponent extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            code: '',
            codeError: this.props.error || '',
        };

        this.onToggleDialog = this.onToggleDialog.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onCodeKeyDown = this.onCodeKeyDown.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onTermsClick = this.onTermsClick.bind(this);
    }

    public componentDidUpdate(prevProps: LoginProps): void {
        if (!prevProps.sessionID && this.props.sessionID) {
            this.props.onToggleDialog();
            setSessionID(this.props.sessionID);
        }
    }

    public render(): React.ReactNode {
        return (
            <Fragment> 
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-auto mx-auto">
                    <div className="relative w-5/6 md:w-2/5 xl:w-1/4 my-6 mx-auto max-w-3xl">
                        {this.renderDialog()}        
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </Fragment>
        );
    }

    private renderDialog(): React.ReactNode {
        return (
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {this.renderHeader()}
                {this.renderMain()}
                {this.renderFooter()}
            </div>
        );
    }

    private renderHeader(): React.ReactNode {
        return (
            <div className="flex items-center justify-between p-3 md:p-5 border-b border-solid rounded-t">
                <h3 className="text-xl md:text-2xl font-semibold">
                    Login
                </h3>
                <XIcon className="cursor-pointer text-red-500 h-6 w-6" aria-hidden="true" onClick={this.onToggleDialog} />
            </div>
        );
    }

    private renderMain(): React.ReactNode {
        return (
            <div className="px-3 md:px-5 py-4 md:py-6">
                {this.renderIntroduction()}
                {this.renderAuthenticators()}
                {this.renderLoginAction()}
                {this.renderErrorMessage()}
            </div>
        );
    }

    private renderIntroduction(): React.ReactNode {
        return (
            <div className="flex justify-center items-center">
                <p className="text-base md:text-lg leading-4">
                    Scan the QR-Code you received using one of the following Authenticators to Login.
                </p>
            </div>
        );
    }

    private renderAuthenticators(): React.ReactNode {
        return (
            <div className="flex items-center my-4 md:my-2">
                <QrcodeIcon className="flex-none text-gray-500 h-16 w-16 md:h-24 md:w-24" aria-hidden="true" />
                <div className="flex flex-col space-y-1">
                    <a className="block text-sm cursor-pointer underline" 
                        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
                        Goolge Authenticator for Android
                    </a>
                    <a className="block text-sm cursor-pointer underline" 
                        href="https://itunes.apple.com/us/app/google-authenticator/id388497605">
                        Goolge Authenticator for IPhone
                    </a>
                    <a className="block text-sm cursor-pointer underline" 
                        href="http://www.windowsphone.com/en-us/store/app/authenticator/e7994dbc-2336-4950-91ba-ca22d653759b">
                        Microsoft Authenticator
                    </a>
                </div>
            </div>
        );
    }

    private renderLoginAction(): React.ReactNode {
        return (
            <div className="flex flex-wrap items-center mt-2">
                <input type="text" name="code" id="code" placeholder="Six digits Code" value={this.state.code || ""} 
                    onChange={this.onCodeChange} onKeyDown={this.onCodeKeyDown}
                    className="mb-1 mr-1 h-10 px-2 border-2 border-indigo-500 rounded-md text-sm"/>
                <div
                    className="mb-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={this.onLoginClick}>
                    Login
                </div>
            </div>
        );
    }

    private renderFooter(): React.ReactNode {
        return (
            <div className="flex items-center justify-start p-2 md:p-5 border-t border-solid border-blueGray-200 rounded-b">
                <InformationCircleIcon className="flex-none text-gray-500 h-4 w-4" aria-hidden="true" />
                <div className="leading-3 text-xs text-gray-500 ml-1">By Login You are agreed with the &nbsp;
                    <NavLink to="/legal" className="underline" onClick={this.onTermsClick}>Terms of Use</NavLink>.</div>
            </div>
        );
    }

    private renderErrorMessage(): React.ReactNode {
        const message = this.props.error || this.state.codeError;
        if (message) {
            return (
                <div className="flex items-center text-sm rounded-md mt-2 p-2 bg-red-100 text-red-500">
                    {message}
                </div>
            );
        }
        return null;
    }

    private onCodeChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (this.props.error) {
            this.props.clearError();
        }
        this.setState({code: event.target.value, codeError: ''});
    }

    private onCodeKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.code === 'Enter') this.handleChange();
    }

    private onLoginClick(): void {
        this.handleChange();
    }

    private onTermsClick(): void {
        this.props.onToggleDialog();
    }

    private handleChange(): void {
        const value = this.state.code;
        if (value.length !== 6 || Number.isNaN(value)) {
            this.setState({codeError: "The Code should be a six digit number."});
            return;
        }
        this.props.login(this.state.code);
    }

    private onToggleDialog(): void {
        if (this.props.error) {
            this.props.clearError();
        }
        this.props.onToggleDialog();
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        isLoading: state.users.loading,
        error: state.users.error,
        sessionID: state.users.sessionID,
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        login: (code: string) => dispatch(login(code)),
        clearError: () => dispatch(clearError())
    }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);