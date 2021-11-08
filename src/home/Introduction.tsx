import React from "react";
import intro from "../intro.png";

class Introduction extends React.Component {
    public render(): React.ReactNode {
        return (
            <div className="container mx-auto max-w-6xl flex py-4 justify-center">
                <div className="flex items-center justify-center w-1/2">
                    <img className="object-scale-down object-center rounded-lg h-96" src={intro} />
                </div>
                <div className="flex-col my-8 p-8 w-1/2">
                    <div className="text-3xl font-extrabold tracking-tight mb-2">
                        Help the neighbors finding their packages
                    </div>
                    <div className="text-base">
                        Whether you are looking for the delivered Packages or just have received packages
                        for your neighbors. Let Find My Package track all the Packages.
                    </div>
                    <div className="mt-4">
                        <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                            Get started
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Introduction;