export interface LegalEntry {
    readonly title: string;
    readonly terms: string;
}

const legalTerms: ReadonlyArray<LegalEntry> = [
    {
        title: 'Agreement to terms',
        terms: 'Welcome to Packageme (“Company”, “we”, “our”, “us”)! ' +
        'These Terms of Service (“Terms”, “Terms of Service”) govern your use of our website located at https://packageme.netlify.app (together or individually “Service”) operated by Packageme. ' +
        'Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. ' +
        'Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them. ' +
        'If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at hello.packageme@gmail.com so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.'
    },
    {
        title: 'Communications',
        terms: 'By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at hello.packageme@gmail.com.'
    },
    {
        title: 'Contests, Sweepstakes and Promotions',
        terms: 'Any contests, sweepstakes or other promotions (collectively, “Promotions”) made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.'
    },
    {
        title: 'Content',
        terms: 'Content found on or through this Service are the property of Packageme or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.'
    },
    {
        title: 'Prohibited Uses',
        terms: 'By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at hello.packageme@gmail.com.'
    },
    {
        title: 'Analytics',
        terms: 'We may use third-party Service Providers to monitor and analyze the use of our Service.'
    },
    {
        title: 'No Use By Minors',
        terms: 'Service is intended only for access and use by individuals at least eighteen (18) years old. By accessing or using Service, you warrant and represent that you are at least eighteen (18) years of age and with the full authority, right, and capacity to enter into this agreement and abide by all of the terms and conditions of Terms. If you are not at least eighteen (18) years old, you are prohibited from both the access and usage of Service.'
    },
    {
        title: 'Termination',
        terms: 'We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms. ' +
        'If you wish to terminate your account, you may simply discontinue using Service. ' +
        'All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.'
    },
    {
        title: 'Governing Law',
        terms: 'These Terms shall be governed and construed in accordance with the laws of Germany, which governing law applies to agreement without regard to its conflict of law provisions.' +
        'Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.'
    },
    {
        title: 'Changes To Service',
        terms: 'We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.'
    },
    {
        title: 'Amendments To Terms',
        terms: 'We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically. ' +
        'Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you. ' +
        'By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.'
    },
    {
        title: 'Acknowledgement',
        terms: 'BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.'
    },
    {
        title: 'Contact Us',
        terms: 'Please send your feedback, comments, requests for technical support by email: hello.packageme@gmail.com.'
    }
]

export default legalTerms;