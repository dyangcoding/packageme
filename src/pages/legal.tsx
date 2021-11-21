import React from 'react';
import LegalTerms, { LegalEntry } from '../utils/legal-terms'

class Legal extends React.Component {
    public render(): React.ReactNode {
        const terms: ReadonlyArray<LegalEntry> = LegalTerms;
        return (
            <div className="container max-w-6xl mx-auto p-2 md:p-5">
                <div className="flex items-center justify-center mx-auto text-3xl font-extrabold my-4">
                    Terms and Conditions
                </div>
                {terms.map((term, index) => {
                    const section = index + 1;
                    return (
                        <div className="my-4" key={index}>
                            <div className="text-xl font-bold">
                                {section + '. ' + term.title}
                            </div>
                            <div className="text-base leading-5 mt-4">
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