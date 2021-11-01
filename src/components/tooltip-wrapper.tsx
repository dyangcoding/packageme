import React, { Fragment } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import ReactTooltip from "react-tooltip";

export const TOOLTIP_TYPES = ["dark", "success", "warning", "info", "light"] as const
export type TooltipType = typeof TOOLTIP_TYPES[number]

export const TOOLTIP_PLACES = ["top", "right", "left", "bottom"] as const
export type TooltipPlace = typeof TOOLTIP_TYPES[number]

const Content = ({ title, description } : { title: string, description: string } ) => {
    return (
        <div className="flex flex-col w-60 h-40 lg:text-center rounded-lg text-white">
            <h2 className="text-base text-green-600 font-semibold tracking-wide capitalize">{title}</h2>
            <p className="flex-wrap leading-tight text-justify">
                {description}
            </p>
        </div>
    );
}

const Tooltip = ({ id, type, place, title, description } : { id: string, type?: TooltipType, place?: TooltipPlace, title: string, description: string }) => {
    return (
        <Fragment>
            <span><InformationCircleIcon data-tip=" " data-for={id} className="cursor-pointer text-gray-500 h-4 w-4" /></span>
            <ReactTooltip id={id} type={type} data-place={place} getContent={() => Content({title, description})} />
        </Fragment>
    );
}

export default Tooltip