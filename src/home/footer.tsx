import React from 'react';
import { NavLink } from 'react-router-dom';
import { Feedback } from './feedback';

interface FooterProps {}

interface FooterState {
    readonly toggleDialog: boolean;
}

class Footer extends React.Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);
        this.state = {
            toggleDialog: false,
        };

        this.onToggleDialog = this.onToggleDialog.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <div className="container mx-auto max-w-6xl flex justify-center items-center h-28 border-t p-5">
                <div className="container flex flex-col md:flex-row items-center justify-between m-4">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} {process.env.REACT_APP_SITE_NAME} All Rights Reserved.
                    </div>
                    <div className="flex text-sm text-indigo-400 py-2 md:py-0">
                        <NavLink to="/legal" className="px-2 hover:underline">Terms Of Use</NavLink>
                        <button className="px-2 hover:underline" onClick={this.onContactClick}>Contact</button>
                        <button className="px-2 hover:underline" onClick={this.onToggleDialog}>Feedback</button>
                    </div>
                </div>
                {this.state.toggleDialog ? <Feedback onToggleDialog={this.onToggleDialog} /> : null}
            </div>
        );
    }

    private onContactClick(_event: React.MouseEvent<HTMLButtonElement>): void {
        const email = process.env.REACT_APP_CONTACT_EMAIL;
        const subject = 'Questions regarding packageme';
        document.location = 'mailto:' + email + '?subject=' + subject;
    }

    private onToggleDialog(): void {
        this.setState(prevState => ({toggleDialog: !prevState.toggleDialog}));
    }
}

export default Footer;