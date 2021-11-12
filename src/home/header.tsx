import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import { AppState } from "../app/store";
import { logout } from "../auth/actions";
import { Login } from "../auth/login";
import About from "../pages/about";
import Home from "../pages/home";

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

        this.onToggleDialog = this.onToggleDialog.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <Router>
                <div className="container mx-auto max-w-6xl">
                    {this.renderNavbar()}
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                </Switch>
            </Router>
        );
    }

    private renderNavbar(): React.ReactNode {
        return (
            <Fragment>
                <nav className="bg-white py-2 md:py-4">
                    <div className="container px-4 mx-auto md:flex md:items-center">
                        <div className="flex justify-between items-center">
                            <NavLink to="/" className="font-bold text-2xl text-indigo-600">Packageme.eu</NavLink>
                            <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                        <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                            <NavLink exact to="/" activeClassName="border-b-4 border-indigo-600"
                                className="p-2 lg:px-4 md:mx-2 hover:bg-gray-200 hover:text-gray-700 rounded transition-colors duration-300">
                                Home
                            </NavLink>
                            <NavLink to="/about" activeClassName="border-b-4 border-indigo-600"
                                className="p-2 lg:px-4 md:mx-2 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                                About
                            </NavLink>
                            <button onClick={this.onContactClick} 
                                className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">
                                Contact
                            </button>
                            {this.renderAction()}  
                        </div>
                    </div>
                </nav>
                {this.state.dialogToggled ? <Login onToggleDialog={this.onToggleDialog} /> : null}
            </Fragment>
        );
    }

    private renderAction(): React.ReactNode {
        const sessionID = this.props.sessionID;
        if (sessionID) {
            return this.renderLogout();
        }
        return this.renderLogin();
    }

    private renderLogin(): React.ReactNode {
        return (
            <button onClick={this.onLoginClick} 
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                Log in
            </button>
        )
    }

    private renderLogout(): React.ReactNode {
        return (
            <button onClick={this.onLogoutClick} 
                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                Log out
            </button>
        )
    }

    private onContactClick(event: React.MouseEvent<HTMLButtonElement>): void {
        const email = 'hello@packageme.eu';
        const subject = 'Questions regarding packageme.eu';
        document.location = 'mailto:' + email + '?subject=' + subject;
    }

    private onLoginClick(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({dialogToggled: true});
    }

    private onLogoutClick(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.props.logout();
    }

    private onToggleDialog(): void {
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