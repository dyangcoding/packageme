import React, { Fragment } from "react";
import { CloudUploadIcon, DuplicateIcon, UploadIcon } from "@heroicons/react/outline";
import deliveries from "../imgs/deliveries.png";

class Introduction extends React.Component {
    public render(): React.ReactNode {
        return (
          <Fragment>
              {this.renderIntroduction()}
              <div className="bg-gradient-to-br from-indigo-200 to-white-500">
                {this.renderInstructions()}
              </div>
          </Fragment>
        );
    }

    private renderIntroduction(): React.ReactNode {
        return (
            <div className="container mx-auto sm:max-w-6xl flex flex-col md:flex-row py-6 md:py-8 lg:py-12 justify-left md:bg-hero-pattern md:bg-contain md:bg-no-repeat md:bg-right">
                <div className="flex md:hidden items-center justify-center w-full sm:w-1/2">
                    <img className="object-scale-down object-center rounded-lg h-96" src={deliveries} 
                        alt="packages delivery for home page introduction" />
                </div>
                <div className="flex-col my-4 md:my-8 p-6 md:p-8 w-full sm:w-1/2">
                    <div className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        Help finding packages.
                    </div>
                    <div className="text-2xl font-bold tracking-relaxed mb-2">
                        For you, for the neighbours, for us all.
                    </div>
                    <div className="leading-tight text-lg py-4">
                        Whether you are looking for the delivered Packages or just have received packages
                        for the neighbours. 
                        <a href="/" className="border-b-4 border-indigo-600 px-1 text-base capitalize">
                            {process.env.REACT_APP_SITE_NAME}
                        </a>
                        tracks all the Packages for you.
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
    private renderInstructions(): React.ReactNode {
        return (
            <div className="container mx-auto sm:max-w-6xl flex flex-col items-center justify-center py-4 md:py-8 lg:py-12">
                <div className="text-4xl font-medium my-4">
                    How it works
                </div>
                <div className="flex flex-col md:flex-row my-4">
                    <div className="flex flex-col items-center justify-center m-4 p-5 bg-white rounded-md md:w-1/3">
                        <div className="flex mr-auto text-indigo-500 uppercase">
                            Step 1
                        </div>
                        <div className="flex items-center">
                            <div className="bg-indigo-500 p-2 rounded-md">
                                <CloudUploadIcon className="text-white h-8 w-8" aria-hidden="true" />
                            </div>
                            <div className="p-4">
                                Upload Image containing Package's Informations, make sure that the image is well captured.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center m-5 p-5 bg-white rounded-md md:w-1/3">
                        <div className="flex mr-auto text-indigo-500 uppercase">
                            Step 2
                        </div>
                        <div className="flex items-center">
                            <div className="bg-indigo-500 p-2 rounded-md">
                                <DuplicateIcon className="text-white h-8 w-8" aria-hidden="true" />
                            </div>
                            <div className="p-4">
                                Select the most relevant Package Informations from the Text Box after processing. 
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center m-5 p-5 bg-white rounded-md md:w-1/3">
                        <div className="flex mr-auto text-indigo-500 uppercase">
                            Step 3
                        </div>
                        <div className="flex items-center">
                            <div className="flex justify-start bg-indigo-500 p-2 rounded-md">
                                <UploadIcon className="text-white cursor-pointer h-8 w-8" aria-hidden="true" />
                            </div>
                            <div className="p-4">
                                Input the Package's Informations and give the neighbours some hints for picking up the package.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex text-base text-gray-500 md:my-4 p-5">
                    Note: Both Step 1 and Step 2 are optional, meaning one can just skip them and input all the relevant package's Informations.
                </div>
            </div>
        );
    }
}

export default Introduction;