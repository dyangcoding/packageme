import React, { Fragment } from "react";
import ImagePicker from "../components/ImagePicker";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { createWorker } from "tesseract.js";
import Tooltip from "../components/tooltip-wrapper";
import Spinner from "../components/Spinner";
import ParcelInput from "../components/ParcelInput";
import { ParcelProperties } from "../models/parcel";
import * as INFO from "../utils/stringUtils";
import { insertParcels } from "../app/mongo-client";

interface ImageToTextProps {}

interface ImageToTextState {
    readonly images: ReadonlyArray<File>;
    readonly ocrtext: string;
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
            ocrtext: "",
            processing: false,
            parcels: [] as ParcelProperties[],
            checked: false,
        };
        this.onFileChange = this.onFileChange.bind(this);
        this.onParcelsChange = this.onParcelsChange.bind(this);
        this.onTermOfUseChange = this.onTermOfUseChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    private async onFileChange(files: ReadonlyArray<File>): Promise<void> {
        if (!files || !files.length) {
            return;
        }
        let result = "";
        const worker = createWorker()
        this.setState({processing: true});
        await worker.load();
        await worker.loadLanguage('deu+eng');
        await worker.initialize('deu+eng');
        for (const file of files) {
            const { data: { text }} = await worker.recognize(file);
            result += text;
        }
        await worker.terminate();
        this.setState(prevState => ({processing: false, ocrtext: prevState.ocrtext + result}));
    }

    public render() {
        return (
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row md:space-x-4 bg-gray-100 py-2">
                {this.pickImage()}
                {this.renderText()}
                {this.renderParcelInfos()}
            </div>
        );
    }

    private pickImage() {
        return (
            <div className="container w-full md:w-1/3 md:my-4 p-5">
                <div className="flex items-center space-x-1">
                    <div className="font-medium text-gray-700">
                        Pick Image
                    </div>
                    <Tooltip id="image-picker" title="Pick Images" description={INFO.imagePickerInfo} />
                </div>
                <div className="flex justify-center items-center h-60 md:h-96 mt-2 border-dashed border-4 rounded-md">
                    {this.state.processing
                        ?
                        <Spinner />
                        :
                        <div className="flex-col">
                            <ImagePicker clazz="flex justify-center items-center" extensions={["image/*"]} onChange={this.onFileChange} >
                                <CloudUploadIcon className="cursor-pointer h-8 w-8 md:h-12 md:w-12" aria-hidden="true" />
                            </ImagePicker>
                            <ImagePicker clazz="flex justify-center items-center" extensions={["image/*"]} onChange={this.onFileChange}>
                                <a className="underline" href="#">Browse</a>
                            </ImagePicker>
                            <div className="flex justify-center items-center mb-4">
                                JEPG, PNG, WebP up to 50 mb
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }

    private renderText() {
        return (
            <div className="container w-full md:w-1/3 flex-col md:my-4 p-5">
                <div className="flex items-center space-x-1">
                    <div className="font-medium text-gray-700">
                        OCR Text
                    </div>
                    <Tooltip id="ocr-text" title="Optical character recongnition" description={INFO.ocrTextInfo} />
                </div>
                <div className="mt-2">
                    <textarea id="ocr-text" name="ocr-text" rows={19} value={this.state.ocrtext} readOnly
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-2 block w-full text-sm border border-gray-300 rounded-md"/>
                </div>
            </div>
        );
    }

    private renderParcelInfos() {
        return (
            <div className="container w-full md:w-1/3 flex flex-col md:my-4 p-5 overflow-y-auto md:h-112">
                {this.renderInputSection()}
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
                    <Tooltip id="package-info" title="Package Information" description={INFO.parcelInfo} />
                </div>
                <div className="my-2">
                    <ParcelInput onParcelsChange={this.onParcelsChange} />
                </div>
            </Fragment>
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
            <div className="upload my-2">
                <div className="flex items-center my-2">
                    <input id="term-of-use" name="term-of-use" type="checkbox" onChange={this.onTermOfUseChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                    <label htmlFor="term-of-use" className="ml-1 block text-xs text-gray-800">
                        You are agree with the Terms of Use.
                    </label>
                </div>
                <button type="submit" onClick={this.onSubmit}
                    className="flex py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Upload
                </button>
            </div>
        );
    }

    private onParcelsChange(parcels: ReadonlyArray<ParcelProperties>): void {
        this.setState({parcels: parcels}, () => console.log(this.state.parcels));
    }

    private onTermOfUseChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({checked: event.target.checked, error: ""});
    }

    private onSubmit(): void {
        if (!this.state.parcels.length) {
            this.setState({error: "No Package Info was added."});
            return;
        }
        if (!this.state.checked) {
            this.setState({error: "Please agree with the Terms of Service."});
            return;
        }
        insertParcels(this.state.parcels).then(result => console.log(result));
    }
}

export default ImageToText;