import React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

interface ItemProps {
    readonly title: string;
    readonly titleTextColor?: string;
    readonly borderColor?: string;
    readonly textColor?: string;
}

interface ItemState {
    readonly isToggled: boolean;
}

class AccordionItem extends React.PureComponent<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props)
        this.state = {
            isToggled: false
        };

        this.handleClick = this.handleClick.bind(this);
    }
    
    private handleClick(): void {
        this.setState(prevState => ({isToggled: !prevState.isToggled}))
    }

    public render(): React.ReactNode {
        const toggled = this.state.isToggled;
        return (
            <div className="p-2">
                <div className="border rounded-md border-gray-600 p-2 bg-gray-100" onClick={this.handleClick}>
                    <div className="flex justify-between items-center p-2">
                        <div className="leading-4">{this.props.title}</div> 
                        {
                            toggled 
                                ? 
                            <ChevronUpIcon className="flex-none cursor-pointer h-5 w-5" aria-hidden="true" />
                                :
                            <ChevronDownIcon className="flex-none cursor-pointer h-5 w-5" aria-hidden="true" />
                        }
                    </div>
                </div>
                {
                    this.state.isToggled 
                        && 
                    <div className="text-lg leading-5 my-2 pl-4 py-2">
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}

export default AccordionItem