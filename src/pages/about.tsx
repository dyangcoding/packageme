import React from 'react';
import about from '../imgs/about.png';
import AccordionItem from '../components/accordion-item';
import { faqs } from '../utils/faq';

class About extends React.Component {
    public render(): React.ReactNode {
        return (
            <div className="flex flex-col">
                {this.renderHeader()}
                <div className="bg-gray-50">
                    {this.renderFAQ()}
                </div>
            </div>
        );
    }

    private renderHeader(): React.ReactNode {
        return (
            <div className="flex flex-col md:flex-row items-center container mx-auto max-w-6xl justify-center px-2 md:px-5 py-8">
                <div className="flex items-center justify-center w-full md:w-1/2">
                    <img className="object-scale-down object-center rounded-lg h-96" src={about} 
                        alt="team introduction for about page" />
                </div>
                <div className="flex-col my-8 p-8 w-full md:w-1/2">
                    <div className="text-3xl font-extrabold tracking-tight">
                        Help finding packages.
                    </div>
                    <div className="text-2xl font-bold tracking-relaxed mb-2">
                        Form the community, for the community.
                    </div>
                    <div className="text-base">
                        Whether you are looking for the delivered Packages or just have received packages
                        for the neighbors. 
                        <a href="/" className="capitalize ml-1 border-b-4 border-indigo-600">{process.env.REACT_APP_SITE_NAME}</a> tracks all the Packages for you.
                    </div>
                </div>
            </div>
        );
    }

    private renderFAQ(): React.ReactNode {
        return (
            <div className="flex flex-col container mx-auto max-w-6xl justify-center px-2 md:px-5 py-8">
                <div className="flex items-center justify-center text-2xl font-bold my-4">
                    Frequently Asked Questions
                </div>
                <div className="p-5">
                    {faqs.map((item, index) => {
                        return (
                            <AccordionItem key={index} title={item.title}>
                                {item.text}
                            </AccordionItem>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default About;