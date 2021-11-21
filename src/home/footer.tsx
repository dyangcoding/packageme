import React from 'react';

class Footer extends React.PureComponent {
    render() {
        return (
            <div className="container mx-auto max-w-6xl flex justify-center items-center h-28 border-t p-5">
                <div className="container flex flex-col md:flex-row items-center justify-between m-4">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} {process.env.REACT_APP_SITE_NAME} All Rights Reserved.
                    </div>
                    <div className="flex text-sm text-indigo-400 py-2 md:py-0">
                        <a href="/legal" className="px-2 hover:underline">Terms Of Use</a>
                        <button className="px-2 hover:underline" onClick={this.onContactClick}>Contact</button>
                        <a href="/feedback" className="pl-2 hover:underline">Feedback</a>
                    </div>
                </div>
            </div>
        );
    }

    private onContactClick(_event: React.MouseEvent<HTMLButtonElement>): void {
        const email = 'hello.packageme@gmail.com';
        const subject = 'Questions regarding packageme';
        document.location = 'mailto:' + email + '?subject=' + subject;
    }
}

export default Footer;