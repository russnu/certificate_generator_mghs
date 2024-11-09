import React, { useContext } from 'react';
import styles from './CertificatePreview.module.css';
import SettingsContext from '../GeneralSettings/SettingsContext';


function PartialCompletionCertificate ({
  internFirstName,
  internMiddleName,
  internLastName,
  internSchool,
  internDepartment,
  internPosition,
  internshipPeriodStart,
  internshipPeriodEnd,
  hoursRendered,
  issuanceDate,
  certificateId
})  {

  const formattedDate = issuanceDate
  ? new Date(issuanceDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  : null;

  const { logo, 
          companyName, 
          signature1, 
          signature2, 
          signatoryName1,
          signatoryName2,
          signatoryTitle1,
          signatoryTitle2,} = useContext(SettingsContext);

  //*****************************************************************************************************************//

  return (

  <>
    
    <div className={styles.certificatePreviewContainer} id = "target">
      <div className = {styles.LogoContainer}>
          <img src={logo} alt="Company Logo"></img>
      </div>
      <div className={styles.header}>
        <h1 className={styles.certificateTitle}>Certificate of Partial Completion</h1>
        <div className={styles.border}></div>
      </div>
      <div className={styles.certificateBody}>
        <p className={styles.introText}>This is to certify that</p>
        <h2 className={styles.internName}>
          {(internFirstName || internMiddleName || internLastName)
            ? `${internFirstName ? internFirstName + ' ' : ''}${internMiddleName ? internMiddleName + ' ' : ''}${internLastName || ''}`.trim()
            : '[Intern Name]'
          }

        </h2>
        <p className={styles.introText}>a student of</p>
        <h3 className={styles.internSchool}>{internSchool ? internSchool : '[School / University]'}</h3>
        <p className={styles.detailText}>has successfully completed an internship with <b> {companyName}</b>. 
                                         The internship took place from&nbsp; 
                                         <b>{internshipPeriodStart
                                              ? new Date(internshipPeriodStart).toLocaleDateString('en-US', {year: 'numeric',
                                                                                                              month: 'long',
                                                                                                              day: 'numeric'  
                                                                                                            })
                                              : '[Internship Start Date]'}</b>  

                                         &nbsp;to&nbsp;  

                                         <b>{internshipPeriodEnd
                                              ? new Date(internshipPeriodEnd).toLocaleDateString('en-US', {year: 'numeric',
                                                                                                              month: 'long',
                                                                                                              day: 'numeric'  
                                                                                                            })
                                              : '[Internship End Date]'}</b>
  , totaling <b>{hoursRendered}</b> hours. 
            During this period, <b>{internFirstName ? internFirstName : (internLastName ?  internLastName : (internMiddleName ? internMiddleName : '[Intern First Name]'))}&nbsp;</b>
            demonstrated exceptional skills and commitment to the role of <b>{internPosition ? internPosition : '[Position]'}&nbsp;</b> 
            within the <b>{internDepartment ? internDepartment : '[Department]'}</b> department. This certificate is awarded 
            in recognition of their valuable contributions and dedication.</p>

        <p className={styles.detailText}>
            Certificate ID: {certificateId}
        </p>

        <p className={styles.issuanceDate}>Issued on: {formattedDate ? formattedDate : '[Issuance Date]'}</p>
      </div>
      <div className={styles.footer}>
      <div className = {styles.signatureItemContainer}>
        <div className = {styles.signatureContainer}>
            <img src={signature1} alt="Signature 1"></img>
        </div>
        <div className={styles.signature}>
          <p>{signatoryName1}</p>
          <p>{signatoryTitle1}</p>
        </div>
      </div>
      <div className = {styles.signatureItemContainer}>
        <div className = {styles.signatureContainer}>
            <img src={signature2} alt="Signature 2"></img>
        </div>
        <div className={styles.signature}>
          <p>{signatoryName2}</p>
          <p>{signatoryTitle2}</p>
        </div>
      </div>
      </div>
    </div>
    </>
    
  );
};

export default PartialCompletionCertificate;
