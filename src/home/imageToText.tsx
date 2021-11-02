import React, { Fragment } from "react";
import ImagePicker from "../components/ImagePicker";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { createWorker } from "tesseract.js";
import Tooltip from "../components/tooltip-wrapper";
import Spinner from "../components/Spinner";
import ParcelInput from "../components/ParcelInput";
import { ParcelProperties } from "../models/parcel";

interface ImageToTextProps {}

interface ImageToTextState {
    readonly images: ReadonlyArray<File>;
    readonly text: string;
    readonly processing: boolean;
    readonly parcels: ReadonlyArray<ParcelProperties>;
    readonly checked: boolean;
    readonly error?: string;
}

class ImageToText extends React.Component<ImageToTextProps, ImageToTextState> {
    constructor(props: ImageToTextProps) {
        super(props);
        this.state = {
            images: [],
            text: "",
            processing: false,
            parcels: [] as ParcelProperties[],
            checked: false,
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.onParcelsChange = this.onParcelsChange.bind(this);
        this.onTermOfServiceChange = this.onTermOfServiceChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private async onFileChange(files: ReadonlyArray<File>): Promise<void> {
        if (!files || !files.length) {
            return;
        }
        let result = "";
        const worker = createWorker({
            logger: (m) => console.log(m),
        })
        this.setState({processing: true});
        await worker.load();
        await worker.loadLanguage('deu+eng');
        await worker.initialize('deu+eng');
        for (const file of files) {
            const { data: { text }} = await worker.recognize(file);
            console.log(text);
            result += text;
        }
        await worker.terminate();
        this.setState(prevState => ({processing: false, text: prevState.text + result}));
    }

    public render() {
        if (this.state.processing) {
            return <Spinner />;
        }
        return (
            <div className="container mx-auto max-w-6xl flex space-x-4 bg-gray-100">
                {this.pickImage()}
                {this.renderText()}
                {this.renderPackageInfos()}
            </div>
        );
    }

    private pickImage() {
        return (
            <div className="container w-1/3 my-4 p-4">
                <div className="flex items-center space-x-1">
                    <div className="font-medium text-gray-700">
                        Pick Image
                    </div>
                    <Tooltip id="image-picker" title="Pick Images" description={"DESC.TagDesc"} />
                </div>
                <div className="flex justify-center items-center h-96 mt-2 border-dashed border-4 rounded-md">
                    <div className="flex-col">
                        <ImagePicker clazz="flex justify-center items-center" extensions={["image/*"]} onChange={this.onFileChange} >
                            <CloudUploadIcon className="cursor-pointer h-12 w-12" aria-hidden="true" />
                        </ImagePicker>
                        <ImagePicker clazz="flex justify-center items-center" extensions={["image/*"]} onChange={this.onFileChange}>
                            <a className="underline" href="#">Browse</a>
                        </ImagePicker>
                        <div className="flex justify-center items-center mb-4">
                            JEPG, PNG, WebP up to 50 mb
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private renderText() {
        return (
            <div className="container w-1/3 flex-col my-4 p-4">
                <div className="flex items-center space-x-1">
                    <div className="font-medium text-gray-700">
                        OCR Text
                    </div>
                    <Tooltip id="ocr-text" title="Text detected from the Images" description={"DESC.TagDesc"} />
                </div>
                <div className="mt-2">
                    <textarea id="ocr-text" name="ocr-text" rows={19} value={this.state.text} readOnly
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"/>
                </div>
            </div>
        );
    }

    private renderPackageInfos() {
        return (
            <div className="container w-1/3 flex-col my-4 p-4">
                {this.renderInputSection()}
                {this.renderTermsOfService()}
                {this.renderErrorMessage()}
                {this.renderUploadAction()}
            </div>
        );
    }

    private renderInputSection(): React.ReactNode {
        return (
            <Fragment>
                <div className="flex items-center space-x-1">
                    <div className="font-medium text-gray-700">
                        Package Infos
                    </div>
                    <Tooltip id="package-info" title="Select the most import Info" description={"DESC.TagDesc"} />
                </div>
                <div className="my-2">
                    <ParcelInput onParcelsChange={this.onParcelsChange} />
                </div>
            </Fragment>
        );
    }

    private renderTermsOfService(): React.ReactNode {
        return (
            <div className="flex items-center mt-2">
                <input id="term-of-service" name="term-of-service" type="checkbox" onChange={this.onTermOfServiceChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                <label htmlFor="term-of-service" className="ml-1 block text-xs text-gray-800">
                    You are agree with the Terms of Service.
                </label>
            </div>
        );
    }

    private renderErrorMessage(): React.ReactNode {
        const message = this.state.error;
        const checked = this.state.checked;
        if (message && !checked) {
            return (
                <div className="flex items-center text-sm rounded-md my-2 p-2 bg-red-100 text-red-500">
                    {message}
                </div>
            );
        }
        return null;
    }

    private renderUploadAction(): React.ReactNode {
        return (
            <div className="my-2">
                <button type="submit" onClick={this.onSubmit}
                    className="flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Upload
                </button>
            </div>
        );
    }

    private onParcelsChange(parcels: ReadonlyArray<ParcelProperties>): void {
        this.setState({parcels: parcels});
    }

    private onTermOfServiceChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({checked: event.target.checked});
    }

    private onSubmit(): void {
        // submit all tags
        if (!this.state.checked) {
            this.setState({error: "Please agree with the Terms of Service."});
            return;
        }
    }
}

export default ImageToText;