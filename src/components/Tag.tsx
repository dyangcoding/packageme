import React from "react";
import { XIcon } from "@heroicons/react/outline";

interface TagProps {
    readonly tag: string;
    readonly onDelete: (tag: string) => void;
}

class Tag extends React.Component<TagProps> {
    constructor(props: TagProps) {
        super(props);

        this.onDeleteTag = this.onDeleteTag.bind(this);
    }

    public render(): React.ReactNode {
        return (
            <div className="flex justify-between rounded-xl p-2 bg-yellow-400 bg-opacity-75">
                <div className="text-justify text-sm text-white capitalize">{this.props.tag}</div>  
                <button className="flex content-center items-center" onClick={() => this.onDeleteTag()}>
                    <XIcon className="text-red-800 hover:text-red-900 h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        );
    }

    private onDeleteTag(): void {
        this.props.onDelete(this.props.tag);
    }
}

export default Tag;