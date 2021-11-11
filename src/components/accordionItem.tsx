import React from "react"
import { XIcon, PlusIcon } from "@heroicons/react/outline";

interface ItemProps {
    readonly title: string;
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
                <div className="border rounded-md border-white p-2 bg-gray-100" onClick={this.handleClick}>
                    <div className="flex justify-between items-center p-2">
                        <div className="lead">{this.props.title}</div> 
                        {
                            toggled 
                                ? 
                            <XIcon className="cursor-pointer text-red-800 hover:text-red-900 h-5 w-5" aria-hidden="true" />
                                :
                            <PlusIcon className="cursor-pointer text-red-800 hover:text-red-900 h-5 w-5" aria-hidden="true" />
                        }
                    </div>
                </div>
                {
                    this.state.isToggled 
                        && 
                    <div className="text-lg text-left my-2 pl-4 py-2">
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}

export default AccordionItem