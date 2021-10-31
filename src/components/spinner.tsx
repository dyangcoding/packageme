import React from "react";

const Spinner = ({ width, high } : { width?: string, high?: string }) => {
    let style = "loader ease-linear rounded-full border-4 border-t-4 border-gray-200 mx-auto ";
    style += width ? width : "w-16 ";
    style += high ? high : "h-16";
    return (
        <div className="text-center py-6">
            <div className={style}></div>
        </div>
    );
}

export default Spinner