import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { AppState } from '../app/store';
import { logout } from '../auth/actions';
import { Login } from '../auth/login';
import About from '../pages/about';
import Home from '../pages/home';
import Legal from '../pages/legal';

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
    readonly menuToggled: boolean;
    readonly dialogToggled: boolean;
}

class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.state = {
            menuToggled: false,
            dialogToggled: false,
        };

        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onToggleDialog = this.onToggleDialog.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    public render(): React.ReactNode {
        const toggleMenu = this.state.menuToggled;
        return (
            <Router>
                {toggleMenu ? this.renderMobileNavbar() : this.renderNavbar()}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/legal">
                        <Legal />
                    </Route>
                </Switch>
            </Router>
        );
    }

    private renderMobileNavbar(): React.ReactNode {
        return (
            <div className="h-full">
                <div className="flex flex-col overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 my-24">
                    <div className="ml-auto mx-8 bg-white rounded-full" onClick={this.onToggleMenu}>
                        <XIcon className="text-black cursor-pointer h-10 w-10 p-2" aria-hidden="true" />
                    </div>
                    <div className="md:hidden flex flex-col text-2xl text-white mt-8 items-center justify-center" id="navbar-collapse">
                        <NavLink exact to="/" className="p-2" onClick={this.onToggleMenu}>Home</NavLink>
                        <NavLink to="/about" className="p-2" onClick={this.onToggleMenu}>About</NavLink>
                        <button onClick={this.onContactClick} className="p-2">Contact</button>
                        {this.renderAuthAction()}  
                    </div>
                </div>
                <div className="opacity-95 fixed inset-0 z-40 bg-gradient-to-br from-green-400 to-blue-500"></div>
            </div>
        );
    }

    private renderNavbar(): React.ReactNode {
        return (
            <div className="container mx-auto max-w-6xl">
                <nav className="container p-5 mx-auto md:flex md:items-center">
                    <div className="flex justify-between items-center">
                        <NavLink to="/" className="font-bold text-2xl text-indigo-600 capitalize">
                            {process.env.REACT_APP_SITE_NAME}
                        </NavLink>
                        <button className="px-2 py-1 hover:opacity-75 md:hidden" id="navbar-toggle" onClick={this.onToggleMenu}>
                            <MenuIcon className="text-black cursor-pointer h-6 w-6" aria-hidden="true" />
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
                        {this.renderAuthAction()}  
                    </div>
                </nav>
                {this.state.dialogToggled ? <Login onToggleDialog={this.onToggleDialog} /> : null}
            </div>
        );
    }

    private renderAuthAction(): React.ReactNode {
        return this.props.sessionID ? this.renderLogout() : this.renderLogin();
    }

    private renderLogin(): React.ReactNode {
        return (
            <button onClick={this.onLoginClick} 
                className="p-2 lg:px-4 md:mx-2 text-white md:text-indigo-600 text-center md:border md:border-solid md:border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                Log in
            </button>
        )
    }

    private renderLogout(): React.ReactNode {
        return (
            <button onClick={this.onLogoutClick} 
                className="p-2 lg:px-4 md:mx-2 text-white md:text-indigo-600 text-center md:border md:border-solid md:border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                Log out
            </button>
        )
    }

    private onContactClick(_event: React.MouseEvent<HTMLButtonElement>): void {
        const email = 'hello.packageme@gmail.com';
        const subject = 'Questions regarding packageme';
        document.location = 'mailto:' + email + '?subject=' + subject;
    }

    private onLoginClick(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({dialogToggled: true, menuToggled: false});
    }

    private onLogoutClick(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({menuToggled: false});
        this.props.logout();
    }

    private onToggleMenu(): void {
        this.setState(prevState => ({menuToggled: !prevState.menuToggled}));
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