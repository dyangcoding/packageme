import React from "react";
import { XIcon } from '@heroicons/react/outline';
import { ToastProperties } from "../ui/toast";
import { addToast } from "../ui/actions";
import { connect } from "react-redux";

interface OwnProps {
    readonly onToggleDialog: () => void;
}

interface DispatchProps {
    readonly addToast: (toast: ToastProperties) => void;
}

interface FeedbackProps extends OwnProps, DispatchProps {}

interface FeedbackState {
    readonly email: string;
    readonly message: string;
    readonly submitError?: string;
}

class FeedbackComponent extends React.Component<FeedbackProps, FeedbackState> {
    constructor(props: FeedbackProps) {
        super(props);

        this.state = {
            email: '',
            message: ''
        };

        this.onToggleDialog = this.onToggleDialog.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    public render(): React.ReactNode {
        const { email, message } = this.state;
        return (
            <div className="fixed bottom-20 right-2 border border-gray-200 shadow w-4/5 md:w-4/5 lg:w-1/4 xl:w-1/6 text-white bg-gray-700 opacity-90 rounded-md">
                <div className="flex flex-col p-4 mx-auto shadow-sm">
                    <div className="p-1 bg-white rounded-full ml-auto" onClick={this.onToggleDialog}>
                        <XIcon className="cursor-pointer text-red-500 h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="font-medium">Feedback</p>
                    <p className="mt-1 text-sm">If you find a bug or have feedback, don't hesitate to let us know.</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="flex flex-col shadow-sm my-2">
                            <input type="text" name="email" id="email" placeholder="Your Email" value={email} onChange={this.onEmailChange}
                                className="text-black h-10 p-2 border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"/>
                        </div>
                        <div className="mb-1">
                            <textarea id="message" name="message" rows={5} placeholder="Your Message" value={message} onChange={this.onMessageChange}
                                className="text-black p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border border-gray-300 rounded-md"/>
                        </div>
                        {this.renderErrorMessage()}
                        <div className="ml-auto">
                            <button type="submit"
                                className="my-2 p-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Send Feedback
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    private renderErrorMessage(): React.ReactNode {
        const message = this.state.submitError;
        if (message) {
            return (
                <div className="flex items-center text-sm rounded-md mt-4 p-2 bg-red-100 text-red-500">
                    {message}
                </div>
            );
        }
        return null;
    }

    private onEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({email: event.target.value, submitError: ''});
    }

    private onMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        this.setState({message: event.target.value, submitError: ''});
    }

    private onToggleDialog(): void {
        this.props.onToggleDialog();
    }

    private encode(): string {
        const result: string[] = [];
        const data = {'form-name': 'feedback', 'email': this.state.email, 'message': this.state.message};
        for (const [key, value] of Object.entries(data)) {
            result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
        }
        return result.join('&');
    }

    private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (!this.state.email) {
            this.setState({submitError: 'Email can not be empty.'})
            return;
        }
        if (!this.state.message) {
            this.setState({submitError: 'Message can not be empty.'});
            return;
        }
        fetch('/', {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: this.encode()
        })
        .then(() => this.onSuccessSubmit())
        .catch(error => this.setState({submitError: error}))
    }

    private onSuccessSubmit(): void {
        this.props.onToggleDialog();
        this.props.addToast(this.buildToast());
    }

    private buildToast(): ToastProperties {
        return {
            id: 3,
            title: 'Feedback',
            message: 'Thank for your feedback, we will get back to you soon.',
            mode: 'success'
        } as ToastProperties;
    }
}

function mapDispatchToProps(dispatch: any): DispatchProps {
    return {
        addToast: (toast: ToastProperties) => dispatch(addToast(toast)),
    }
}

export const Feedback = connect(null, mapDispatchToProps)(FeedbackComponent);