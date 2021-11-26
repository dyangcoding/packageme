import React from 'react';
import LegalTerms, { LegalEntry } from '../utils/legal-terms'

class Legal extends React.Component {
    public componentDidMount(): void {
        window.scrollTo(0, 0);
    }

    public render(): React.ReactNode {
        const terms: ReadonlyArray<LegalEntry> = LegalTerms;
        return (
            <div className="container max-w-6xl mx-auto p-2 md:p-5">
                <div className="flex items-center justify-center mx-auto text-xl md:text-3xl font-extrabold my-4">
                    Terms and Conditions
                </div>
                {terms.map((term, index) => {
                    const section = index + 1;
                    return (
                        <div className="flex flex-col mx-auto my-2 px-5 py-2" key={index}>
                            <div className="text-xl font-medium">
                                {section + '. ' + term.title}
                            </div>
                            <div className="text-sm leading-4 mt-2">
                                {term.terms}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Legal;