import React from "react";

class Footer extends React.PureComponent {
    render() {
        return (
            <div className="container mx-auto max-w-6xl flex justify-center items-center h-24 border-t">
                <div className="container flex items-center justify-center">
                    <p className="p-2 text-sm">© 2021 Copyright FindMyPackage.com</p>
                </div>
            </div>
        );
    }
}

export default Footer;