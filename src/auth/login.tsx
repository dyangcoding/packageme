import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../app/store';
import { XIcon, QrcodeIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { login } from './actions';
import { setSessionID } from '../services/storage';

interface OwnProps {
    readonly onToggleDialog: () => void;
}

interface StateProps {
    readonly isLoading: string;
    readonly error: string | undefined;
    readonly sessionID: string;
}

interface DispatchProps {
    readonly login: (code: string) => PromiseLike<string>;
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
            codeError: '',
        };

        this.onToggleDialog = this.onToggleDialog.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <Fragment> 
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-auto mx-auto">
                    <div className="relative w-full md:w-1/4 my-6 mx-auto max-w-3xl">
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
            <div className="relative px-3 md:px-5 py-4 md:py-6 flex-col items-center justify-center">
                {this.renderIntroduction()}
                {this.renderAuthenticators()}
                {this.renderLoginAction()}
                {this.renderErrorMessage()}
            </div>
        );
    }

    private renderIntroduction(): React.ReactNode {
        return (
            <div className="flex justify-center items-center space-x-2">
                <p className="text-base md:text-lg leading-4">
                    Scan the QR-Code you received to Login. using one of the following Authenticators.
                </p>
            </div>
        );
    }

    private renderAuthenticators(): React.ReactNode {
        return (
            <div className="flex justify-around items-center my-4 md:my-2">
                <QrcodeIcon className="text-gray-500 h16 w-16 md:h-24 md:w-24" aria-hidden="true" />
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
            <div className="flex justify-center items-center mt-2 space-x-2">
                <input type="text" name="code" id="code" placeholder="Six digits Code" value={this.state.code || ""} onChange={this.onCodeChange}
                    className="h-10 px-2 border-2 border-indigo-500 flex-1 block rounded-md sm:text-sm"/>
                <button
                    className="flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type="button" onClick={this.onLoginClick}>
                    Login
                </button>
            </div>
        );
    }

    private renderFooter(): React.ReactNode {
        return (
            <div className="flex items-center justify-start p-2 md:p-5 border-t border-solid border-blueGray-200 rounded-b space-x-2">
                <InformationCircleIcon className="flex-none text-gray-500 h-4 w-4" aria-hidden="true" />
                <div className="text-sm text-gray-500">By Login You are agreed with the Terms of Use.</div>
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
        this.setState({code: event.target.value, codeError: ''});
    }

    private async onLoginClick(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        const code = this.state.code;
        if (!code.length || Number.isNaN(code) || code.length !== 6) {
            this.setState({codeError: "The Code should be a six digit number."});
            return;
        }
        const sessionID = await this.props.login(this.state.code);
        if (sessionID) {
            this.props.onToggleDialog();
            setSessionID(sessionID);
        } else {
            this.setState({codeError: 'Can not verify the input code, try again.'});
        }
    }

    private onToggleDialog(): void {
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
        login: (code: string) => dispatch(login(code))
    }
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);