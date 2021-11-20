import React from 'react';
import { HeroIcon, IconName } from './herocon-icon';

interface CardProps {
    readonly title: string;
    readonly icon: IconName;
    readonly iconClassName?: string;
    readonly text: string;
}

class InfoCard extends React.Component<CardProps> {
    constructor(props: CardProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="flex flex-col items-center justify-center m-2 p-5 bg-white rounded-md md:w-1/3">
                <div className="flex mr-auto text-indigo-500 uppercase">
                    {this.props.title}
                </div>
                <div className="flex items-start">
                    <div className="my-4 bg-indigo-500 p-2 rounded-md">
                        <HeroIcon icon={this.props.icon} className={this.props.iconClassName} outline />
                    </div>
                    <div className="p-4">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}

export default InfoCard;
