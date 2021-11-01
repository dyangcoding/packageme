import React from "react";

class Footer extends React.PureComponent {
    render() {
        return (
            <div className="container mx-auto max-w-6xl flex justify-center items-center h-24 my-4 bg-indigo-600">
                <div className="container flex items-center justify-center">
                    <p className="p-2 text-white">© 2021 Copyright FindMyPackage.com</p>
                </div>
            </div>
        );
    }
}

export default Footer;