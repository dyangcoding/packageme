import React from 'react';

interface ImagePickerProps{
    readonly clazz?: string,
    readonly extensions: ReadonlyArray<string>,
    readonly multiple?: boolean,
    readonly onChange: (files: ReadonlyArray<File>) => void,
    readonly onError?: (error: string) => void,
    // max file size in MB
    readonly maxSize?: number,
}

class ImagePicker extends React.Component<ImagePickerProps> {
    fileInput: any;

    constructor(props: ImagePickerProps) {
        super(props);
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    private onChangeFile(event: React.ChangeEvent<HTMLInputElement>): void {
        event.preventDefault();
        event.stopPropagation();
        const files = event.target.files;
        if (!files || !files.length) {
            return;
        }
        const result = this.validate(files);
        if (this.props.onChange) {
            this.props.onChange(result);
            // free up the fileInput again
            this.fileInput.value = null;
        }
    }

    private validate(files: FileList): ReadonlyArray<File> {
        const { onError, maxSize } = this.props;
        // convert maxSize from megabytes to bytes
        const maxBytes = maxSize ? maxSize * 1000000 : 10 * 1000000;
        const result: File[] = [];
        let error = "";
        Array.from(files).forEach(file => {
            if (file.size > maxBytes) {
                error += `File ${file.name} size must be less than ${maxSize} MB.`;
            } else {
                result.push(file);
            }
        })
        if (error.length && onError) {
            onError(error);
        }
        return result;
    }

    public render() {
        const { clazz, extensions, multiple } = this.props
        return (
            <div className={clazz}>
                <input
                    type="file"
                    accept={extensions.join(",")}
                    style={{ display: this.props.children ? "none" : "inline-block"}}
                    onChange={this.onChangeFile}
                    multiple={multiple ? multiple : false}
                    ref={ele => (this.fileInput = ele)}
                />
                {this.props.children 
                    ? 
                    React.Children.map(this.props.children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {
                                onClick: (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    this.fileInput.click()
                                }}
                            )
                        } else {
                            return child;
                        }
                    })
                    :
                    null
                }
            </div>
        );
    }
}

export default ImagePicker