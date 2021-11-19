import React from "react";

class Footer extends React.PureComponent {
    render() {
        return (
            <div className="container mx-auto max-w-6xl flex justify-center items-center h-28 border-t py-4">
                <div className="container flex flex-col md:flex-row items-center justify-between m-4">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} <a href="/" className="capitalize mr-1">{process.env.REACT_APP_SITE_NAME}</a>
                        All Rights Reserved.
                    </div>
                    <div className="flex text-sm text-blue-400 py-2 md:py-0">
                        <a href="/tou" className="px-2">Terms Of Use</a>
                        <a href="/privacy" className="px-2">Privacy</a>
                        <a href="/help" className="pl-2">Help</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;