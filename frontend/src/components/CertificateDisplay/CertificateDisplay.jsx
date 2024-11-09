import React, { useEffect, useState, useRef, useContext } from 'react';
//*****************************************//
import styles from './CertificateDisplay.module.css'
//*****************************************//
import html2canvas from 'html2canvas';
//*****************************************//
import jsPDF from 'jspdf';
//*****************************************//
import PartialCompletionCertificate from '../CertificatePreview/PartialCompletionCertificate';
import FullCompletionCertificate from '../CertificatePreview/FullCompletionCertificate';
//*****************************************//

import CertificateTemplate from '../CertificateTemplates/CertificateTemplates';
//=================================================================================================================//

function CertificateDisplay() {

    const [certificateData, setCertificateData] = useState(null);
    const certificateRef = useRef(null);

    //=================================================================================================================//

    useEffect(() => {
        const storedData = localStorage.getItem('certificateData');
        if (storedData) {
            setCertificateData(JSON.parse(storedData));
        } else {
            localStorage.removeItem('certificateData');
        }
    }, []);

    console.log('Certificate Data in CertificateDisplay:', certificateData);

    if (!certificateData) {
        return <p>No certificate data found. Please generate a new certificate.</p>;
    }

    //=================================================================================================================//

    const {
        internFirstName,
        internMiddleName,
        internLastName,
        internSchool,
        internDepartment,
        internPosition,
        internshipPeriodStart,
        internshipPeriodEnd,
        hoursRendered,
        certificateType,
        issuanceDate,
        certificateId,
    } = certificateData;

    

    //=================================================================================================================//
    
    const downloadPNG = () => {
        html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.png`;
            link.click();
        });
    };

    //=================================================================================================================//

    const downloadPDF = () => {

        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'pt',
          format: 'a4',
        });

        const targetElement = document.getElementById('target');
    
        doc.html(targetElement, {
          callback: function (doc) {
            doc.save(`${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.pdf`);
          },
            width: 841.89,
            height: 595.28,
            windowWidth: targetElement.scrollWidth,
          
        });
    };

    //=================================================================================================================//

    // const CertificateComponent = certificateType === 'partial'
    //     ? PartialCompletionCertificate
    //     : FullCompletionCertificate;

    //=================================================================================================================//

    return (
        <>
            <div ref={certificateRef} className={styles.certificateDisplayContainer}>
                {/* <CertificateComponent
                    internFirstName={internFirstName}
                    internMiddleName={internMiddleName}
                    internLastName={internLastName}
                    internSchool={internSchool}
                    internDepartment={internDepartment}
                    internPosition={internPosition}
                    internshipPeriodStart={internshipPeriodStart}
                    internshipPeriodEnd={internshipPeriodEnd}
                    hoursRendered={hoursRendered}
                    issuanceDate={issuanceDate}
                    certificateId={certificateId}
                /> */}
                <CertificateTemplate id="target" certificateData={certificateData} />
            </div>

            <div className='downloadButtonsContainer'>
                <button className={styles.downloadButton} onClick={downloadPDF}>Download as PDF</button>
                <button className={styles.downloadButton} onClick={downloadPNG}>Download as PNG</button>
            </div>
        </>
    );
}

export default CertificateDisplay;


