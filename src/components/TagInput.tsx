import React, { Fragment } from "react";
import Tag from "./Tag";

interface TagInputProps {
    readonly onTagsChange: (tags: ReadonlyArray<string>) => void;
}

interface TagInputState {
    readonly tagInput: string;
    readonly tags: string[];
}

class TagInput extends React.Component<TagInputProps, TagInputState> {
    constructor(props: TagInputProps) {
        super(props);

        this.state = {
            tagInput: "",
            tags: [],
        }

        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
    }

    public render(): React.ReactNode {
        const tagInput = this.state.tagInput;
        const tags = this.state.tags;
        return (
            <Fragment>
                <div className="flex-col rounded-md shadow-sm">
                    <input type="text" name="package-info" id="package-info" value={tagInput || ""} onChange={this.onChange} onKeyDown={this.onKeyDown}
                        placeholder="Max Mustermann Lynarstr. 5 AppNr 22xxxx 13353 Berlin"
                        className="h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                </div>
                <div className="flex-col space-y-2 mt-2">
                    {tags.map((tag, index) => {
                        return <Tag key={index} tag={tag} onDelete={this.onDeleteTag} />;
                    })}
                </div>
            </Fragment>
        );
    }

    private onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({tagInput: event.target.value});
    }

    private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        const tags = this.state.tags;
        const trimmedInput = this.state.tagInput.trim();
        if (event.code === "Enter" && trimmedInput.length && !tags.includes(trimmedInput)) {
            event.preventDefault();
            this.setState(prevState => ({tags: [...prevState.tags, trimmedInput], tagInput: ""}));
        }
    }

    private onDeleteTag(tag: string): void {
        const tags = this.state.tags;
        if (tags.includes(tag)) {
            const removed = tags.filter(t => t !== tag);
            this.setState({tags: removed});
        }
    }
}

export default TagInput;