import React from "react";
import { SearchIcon } from "@heroicons/react/outline";

interface PackageListProps {

}

interface PackageListState {

}

class PackageList extends React.Component {
    search() {
        return (
            <div className="relative">
                <div className="absolute top-3 left-2"> 
                    <SearchIcon className="text-gray-400 z-20 hover:text-gray-500 h-8 w-8" aria-hidden="true" />
                </div> 
                <input type="text" className="h-14 w-full pl-12 pr-20 rounded-lg z-0 focus:shadow focus:outline-none" placeholder="Search Name, Apartment number ..." />
                <div className="absolute top-2 right-2"> 
                    <button className="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600">
                        Search
                    </button> 
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container p-4 my-4 bg-tertiary">
                {this.search()}
                <div className="mt-4 text-white">
                    all the packages will be rendered hier...
                </div>
            </div>
        );
    }
}

export default PackageList;