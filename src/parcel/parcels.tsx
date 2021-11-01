import React from "react";
import { SearchIcon } from "@heroicons/react/outline";

interface ParcelListProps {

}

interface ParcelListState {

}

class ParcelList extends React.Component<ParcelListProps, ParcelListState> {
    constructor(props: ParcelListProps){
        super(props);
    }

    private renderHeader() {
        return (
            <div className="flex justify-between bg-white my-2 py-4 border-b-2">
                <div className="flex items-center text-2xl">
                    Uncollected Packages in Total: <span className="underline px-2">123</span>
                </div>
                <div className="relative w-1/2">
                    <div className="absolute top-2 left-2"> 
                        <SearchIcon className="text-gray-400 z-20 hover:text-gray-500 h-6 w-6" aria-hidden="true" />
                    </div> 
                    <input type="text" className="h-10 w-full pl-12 pr-20 rounded-lg z-0 focus:shadow-lg focus:outline-none" 
                        placeholder="Search Name, Apartment number ..." />
                    <div className="absolute top-1 right-1"> 
                        <button className="h-7 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600">
                            Search
                        </button> 
                    </div>
                </div>
            </div>
        );
    }

    public render(): React.ReactNode {
        return (
            <div className="container mx-auto max-w-6xl p-4 my-4">
                {this.renderHeader()}
                <div className="divide-solid w-full"></div>
                <div className="flex-col items-center mt-4">
                    {["package1", "package2", "package3"].map((entry, index) => {
                        return <div key={index}>{entry}</div>
                    })}
                </div>
            </div>
        );
    }
}

export default ParcelList;