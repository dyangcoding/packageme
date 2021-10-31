import React from "react";
import ImagePicker from "../components/ImagePicker";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { createWorker } from 'tesseract.js';
import Spinner from "../components/spinner";

interface ImageToTextProps {}

interface ImageToTextState {
    readonly images: ReadonlyArray<File>;
    readonly text: string;
    readonly processing: boolean,
}

class ImageToText extends React.Component<ImageToTextProps, ImageToTextState> {
    constructor(props: ImageToTextProps) {
        super(props);
        this.state = {
            images: [],
            text: "",
            processing: false,
        }
        this.onFileChange = this.onFileChange.bind(this);
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
            <div className="container flex space-x-4 bg-primary">
                {this.pickImage()}
                {this.renderText()}
                {this.renderPackageInfos()}
            </div>
        );
    }

    private pickImage() {
        return (
            <div className="container w-1/3 my-4 p-4">
                <label className="block font-medium text-gray-700">
                      Pick Image
                </label>
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
                <label className="block font-medium text-gray-700">
                      OCR Text
                </label>
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
                <label className="block font-medium text-gray-700">
                      Package Infos
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                    <input type="text" name="package-info" id="package-info" placeholder="Max Mustermann Lynarstr. 5 AppNr 22xxxx 13353 Berlin"
                        className="h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                </div>
            </div>
        );
    }
}

export default ImageToText;