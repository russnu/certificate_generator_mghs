import React, { createContext, useState } from 'react';

export const CertificateContext = createContext();

export const CertificateProvider = ({ children }) => {
    const [certificateData, setCertificateData] = useState(null);

    return (
        <CertificateContext.Provider value={{ certificateData, setCertificateData }}>
            {children}
        </CertificateContext.Provider>
    );
};