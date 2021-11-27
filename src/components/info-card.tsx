import React from 'react';
import HeroIcon, { IconName } from './herocon-icon';

interface CardProps {
    readonly title: string;
    readonly icon: IconName;
    readonly iconClassName?: string;
    readonly text: string;
}

class InfoCard extends React.Component<CardProps> {
    public render(): React.ReactNode {
        return (
            <div className="flex flex-col items-center justify-center m-2 p-4 bg-white rounded-md md:w-1/3">
                <div className="flex items-center justify-center mx-auto text-indigo-500 uppercase">
                    {this.props.title}
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div className="my-4 bg-indigo-500 p-2 rounded-md">
                        <HeroIcon icon={this.props.icon} className={this.props.iconClassName} outline />
                    </div>
                    <div className="flex items-center justify-center mx-auto px-2 py-4">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoCard;
