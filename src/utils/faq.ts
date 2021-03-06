export interface faqItem {
    readonly title: string;
    readonly text: string;
}

export const faqs = [
    {
        title: `What is ${process.env.REACT_APP_SITE_NAME} for ?`,
        text: `${process.env.REACT_APP_SITE_NAME} aims to help the local community tackle the issue that delivered package are hard to address. ` +
            `To prevent user privacy ${process.env.REACT_APP_SITE_NAME} does not require any personal informations to login.`
    },
    {
        title: 'Are there any new feutures going to be implemented in the near future ? ',
        text: 'A Real-time Wash Maschine tracker would be neat for all the residents, although it might require additional ' +
            'hardware for the implementation. Suggestions regarding this or any other ideas are more than welcome.'
    },
    {
        title: 'Can we work together on the project ?',
        text: "Any collaboration for the project is welcome. Whether to promote a new design or any new feutures " +
            " you would like to have it implemented. Hit the contact button and drop a message. "
    }
]