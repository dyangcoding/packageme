import React from "react";
import HeroIcon from "../components/herocon-icon";
import { XIcon } from '@heroicons/react/outline';

export interface ToastProperties {
    readonly id: number;
    readonly title: string;
    readonly message: string;
    readonly mode: Mode;
    readonly duration?: number;
}

export type Mode = 'success' | 'info' | 'error' | 'warning';

interface ToastProps {
    readonly toast: ToastProperties;
    readonly onDismissToast: (id: number) => void;
}

class Toast extends React.Component<ToastProps> {
    constructor(props: ToastProps) {
        super(props);
        this.onDismiss = this.onDismiss.bind(this);
    }

    public componentDidMount(): void {
        const { duration, id } = this.props.toast;
        const timeout = duration ? duration : 5;
        setTimeout(() => this.props.onDismissToast(id), timeout * 1000);
    }

    public render(): React.ReactNode {
        const { title, message } = this.props.toast;
        return (
            <div className="text-white bg-white rounded-md border shadow-md">
                <div className="flex justify-between items-center text-black p-2 border-b border-gray-300">
                    <div className="flex items-center space-x-1">
                        {this.getHeaderIcon()}
                        <p className="font-medium">{title}</p>
                    </div>
                    <XIcon className="cursor-pointer text-gray-500 h-4 w-4" aria-hidden="true" onClick={this.onDismiss} />
                </div>
                <div className="text-black px-4 py-2">
                    {message}
                </div>
            </div>
        );
    }

    private getHeaderIcon(): React.ReactNode {
        let icon;
        const mode = this.props.toast.mode;
        if (mode === 'success') {
            icon = <HeroIcon icon="EmojiHappyIcon" className="text-green-500 h-4 w-4" />;
        } else if (mode === 'info') {
            icon = <HeroIcon icon="InformationCircleIcon" className="text-indigo-500 h-4 w-4" />;
        } else if (mode === 'error') {
            icon = <HeroIcon icon="EmojiSadIcon" className="text-red-500 h-4 w-4" />;
        } else {
            icon = <HeroIcon icon="ExclamationIcon" className="text-yellow-500 h-4 w-4" />
        }
        return icon;
    }

    private onDismiss(): void {
        this.props.onDismissToast(this.props.toast.id);
    }
}

export default Toast;