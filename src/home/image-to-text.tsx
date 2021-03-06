import React from 'react';
import ImagePicker from '../components/image-picker';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { createWorker } from 'tesseract.js';
import Tooltip from '../components/tooltip-wrapper';
import * as INFO from '../utils/string-utils';
import Spinner from '../components/spinner';
import { ParcelInput } from './parcel-input';

interface ImageToTextProps {}

interface ImageToTextState {
    readonly images: ReadonlyArray<File>;
    readonly ocrtext: string;
    readonly processing: boolean;
    readonly error?: string;
}

class ImageToText extends React.Component<ImageToTextProps, ImageToTextState> {
    constructor(props: ImageToTextProps) {
        super(props);
        this.state = {
            images: [],
            ocrtext: "",
            processing: false,
        };
        this.onFileChange = this.onFileChange.bind(this);
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
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row md:space-x-4 px-2 md:px-5 py-8">
                {this.renderImagePicker()}
                {this.renderText()}
                {this.renderParcelInput()}
            </div>
        );
    }

    private renderImagePicker() {
        return (
            <div className="container w-full md:w-1/3 p-5 mx-auto">
                <div className="flex items-center space-x-1">
                    <div className="font-medium text-gray-700">
                        1. Pick Image
                    </div>
                    <Tooltip id="image-picker" title="Pick Images" description={INFO.imagePickerInfo} />
                </div>
                <div className="flex justify-center items-center h-60 md:h-96 mt-2 border-dashed border-4 rounded-md">
                    {this.renderInternal()}
                </div>
            </div>
        );
    }

    private renderInternal(): React.ReactNode {
        if (this.state.processing) {
            return <Spinner />;
        }
        return (
            <div className="flex-col">
                <ImagePicker clazz="flex justify-center items-center" extensions={["image/*"]} onChange={this.onFileChange} >
                    <CloudUploadIcon className="cursor-pointer h-8 w-8 md:h-12 md:w-12" aria-hidden="true" />
                </ImagePicker>
                <ImagePicker clazz="flex justify-center items-center" extensions={["image/*"]} onChange={this.onFileChange}>
                    <button className="underline">Browse</button>
                </ImagePicker>
                <div className="flex justify-center items-center my-2 px-2 leading-5">
                    JEPG, PNG, WebP up to 50 mb
                </div>
            </div>
        );
    }

    private renderText() {
        return (
            <div className="container w-full md:w-1/3 flex-col p-5 mx-auto">
                <div className="flex items-center space-x-1">
                    <div className="font-medium text-gray-700">
                        2. OCR Text
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

    private renderParcelInput() {
        return (
            <div className="container w-full md:w-1/3 flex flex-col p-5 overflow-y-auto md:h-112 mx-auto">
                <ParcelInput />
            </div>
        );
    }
}

export default ImageToText;