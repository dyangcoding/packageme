import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppState } from "../app/store";
import { logout } from "../auth/actions";
import { Login } from "../auth/login";

interface StateProps {
    readonly sessionID: string;
    readonly isLoading: string;
    readonly error: string | undefined;
}

interface DispatchProps {
    readonly logout: () => PromiseLike<void>;
}

interface HeaderProps extends StateProps, DispatchProps {}

interface HeaderState {
    readonly dialogToggled: boolean;
}

class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = {
            dialogToggled: false,
        };

        this.onToggleLogin = this.onToggleLogin.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <Router>
                <div className="container mx-auto max-w-6xl">
                    <div className="header-2">
                        {this.renderNavbar()}
                    </div>
                    <Switch>
                        <Route exact path="/">
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }

    private renderNavbar(): React.ReactNode {
        return (
            <Fragment>
                <nav className="bg-white py-2 md:py-4">
                    <div className="container px-4 mx-auto md:flex md:items-center">
                        <div className="flex justify-between items-center">
                            <a href="#" className="font-bold text-xl text-indigo-600">Find My Package</a>
                            <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                            <i className="fas fa-bars"></i>
                            </button>
                        </div>
                        <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                            <a href="#" className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">
                                Home
                            </a>
                            <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                                About
                            </a>
                            <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                                Contact
                            </a>
                            {this.renderAction()}  
                        </div>
                    </div>
                </nav>
                {this.state.dialogToggled ? <Login onToggleDialog={this.onToggleLogin} /> : null}
            </Fragment>
        );
    }

    private renderAction(): React.ReactNode {
        const sessionID = this.props.sessionID;
        let action = '';
        let onButtonClick;
        if (sessionID) {
            action = 'Log out';
            onButtonClick = this.onLogoutClick;
        } else {
            action = 'Login';
            onButtonClick = this.onLoginClick;
        }
        return (
            <button onClick={onButtonClick} 
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                {action}
            </button>
        );
    }

    private onLoginClick(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({dialogToggled: true});
    }

    private onLogoutClick(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.props.logout();
    }

    private onToggleLogin(): void {
        this.setState(prevState => ({dialogToggled: !prevState.dialogToggled}));
    }
}

function mapStateToProps(state: AppState): StateProps {
    return {
        isLoading: state.users.loading,
        error: state.users.error,
        sessionID: state.users.sessionID
    };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        logout: () => dispatch(logout())
    }
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);