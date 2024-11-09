// import './index.css'

// import Header from './components/Header/Header.jsx'
// import Footer from './components/Footer/Footer.jsx'
// import SideMenu from './components/SideMenu/SideMenu.jsx';
// import Student from './components/Students/Students.jsx'
// import ToDo from './components/ToDo/ToDo.jsx'

// function App() {

//   const students = [{name: "Lebron James", age: 30, isStudent: true},
//                     {name: "Michael Jordan", age: 40, isStudent: true},
//                     {name: "Anthony Edwards", age: 20, isStudent: true},
//                     {name: "Luka Doncic", age: 20, isStudent: true}];

//   return(
//     <>
//       <Header />
//       <SideMenu />
//       <div className="main-content">
//         <ToDo />
//         <Student items={students} />
//         <Footer />
//       </div>
//     </>
//   );
// }

// export default App

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//const downloadPdf = () => {
    //     const input = ref.current;
    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF('p', 'mm', 'a4', true);
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();
    //         const imgWidth = canvas.width;
    //         const imgHeight = canvas.height;
    //         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    //         const imgX = (pdfWidth - imgWidth * ratio) / 2;
    //         const imgY = 30;
    
    
    //         pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    //         pdf.save(`${internFirstName}_${internLastName}_Certificate.pdf`);
    //     });
    // };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     import React, { useEffect, useState, useRef } from 'react';
// //=========================================//
// import styles from './CertificateDisplay.module.css'
// //=========================================//
// import html2canvas from 'html2canvas';
// //=========================================//
// import jsPDF from 'jspdf';
// import html2pdf from 'html2pdf.js';
// //=========================================//
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import { PDFDownloadLink } from '@react-pdf/renderer';

// //=========================================//

// import PartialCompletionCertificate from '../CertificatePreview/PartialCompletionCertificate';
// import FullCompletionCertificate from '../CertificatePreview/FullCompletionCertificate';

// function CertificateDisplay() {

//     const [certificateData, setCertificateData] = useState(null);
//     const certificateRef = useRef(null);

//     //=================================================================================================================//

//     useEffect(() => {
//         const storedData = localStorage.getItem('certificateData');
//         if (storedData) {
//             setCertificateData(JSON.parse(storedData));
//         } else {
//             localStorage.removeItem('certificateData');
//         }
//     }, []);

//     if (!certificateData) {
//         return <p>No certificate data found. Please generate a new certificate.</p>;
//     }

//     //=================================================================================================================//

//     const {
//         internFirstName,
//         internMiddleName,
//         internLastName,
//         internSchool,
//         internDepartment,
//         internPosition,
//         internshipPeriodStart,
//         internshipPeriodEnd,
//         hoursRendered,
//         certificateType,
//         issuanceDate,
//         certificateId,
//     } = certificateData;

//     //=================================================================================================================//
//     // const generatePDF = () => {
        
//     //     html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
//     //         const imgData = canvas.toDataURL('image/png');
//     //         const pdf = new jsPDF('landscape', 'mm', 'a4');
//     //         const pdfWidth = pdf.internal.pageSize.getWidth();
//     //         const pdfHeight = pdf.internal.pageSize.getHeight();

//     //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     //         pdf.save(internLastName + '_' + internFirstName + '_' + (certificateType === 'partial' ? 'Partial' : '') + '_Certificate.pdf');
//     //     });
//     // };

//     const generatePDF = () => {
//         const options = {
//             filename: `${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.pdf`,
//             image: { type: 'jpeg', quality: 1 },
//             html2canvas: { scale: 2 },
//             jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
//         };
    
//         // Generate the PDF
//         html2pdf().set(options).from(certificateRef.current).save();
//     };

//     const CertificateComponent = certificateType === 'partial'
//         ? PartialCompletionCertificate
//         : FullCompletionCertificate;

//     //=================================================================================================================//

//     return (
//         <>
//             <div ref={certificateRef} className={styles.certificateDisplayContainer}>
//                 <CertificateComponent
//                     internFirstName={internFirstName}
//                     internMiddleName={internMiddleName}
//                     internLastName={internLastName}
//                     internSchool={internSchool}
//                     internDepartment={internDepartment}
//                     internPosition={internPosition}
//                     internshipPeriodStart={internshipPeriodStart}
//                     internshipPeriodEnd={internshipPeriodEnd}
//                     hoursRendered={hoursRendered}
//                     issuanceDate={issuanceDate}
//                     certificateId={certificateId}
//                 />
//             </div>

//             <div>
//                 <button className={styles.downloadButton} onClick={generatePDF}>Download</button>
//             </div>
//         </>
//     );
// }

// export default CertificateDisplay;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react';
// import styles from './CertificatePreview.module.css';

// import logo from '../../assets/samplelogo.png'
// import certificateBorder from '../../assets/certificate-border.svg'

// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';



// function PartialCompletionCertificate ({
//   internFirstName,
//   internMiddleName,
//   internLastName,
//   internSchool,
//   internDepartment,
//   internPosition,
//   internshipPeriodStart,
//   internshipPeriodEnd,
//   hoursRendered,
//   issuanceDate,
//   certificateId
// })  {

//   const formattedDate = issuanceDate
//   ? new Date(issuanceDate).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     })
//   : null;


//   return (

//     <>
    
//     <div className={styles.certificatePreviewContainer}>
//         <div className = {styles.LogoContainer}>
//             <img src={logo} alt="sample logo"></img>
//         </div>
//       <div className={styles.header}>
//         <h1 className={styles.certificateTitle}>Certificate of Partial Completion</h1>
//         <div className={styles.border}></div>
//       </div>
//       <div className={styles.certificateBody}>
//         <p className={styles.introText}>This is to certify that</p>
//         <h2 className={styles.internName}>
//           {(internFirstName || internMiddleName || internLastName)
//             ? `${internFirstName ? internFirstName + ' ' : ''}${internMiddleName ? internMiddleName + ' ' : ''}${internLastName || ''}`.trim()
//             : '[Intern Name]'
//           }

//         </h2>
//         <p className={styles.introText}>a student of</p>
//         <h3 className={styles.internSchool}>{internSchool ? internSchool : '[School / University]'}</h3>
//         <p className={styles.detailText}>has successfully completed an internship with <b> Company Name</b>. 
//                                          The internship took place from&nbsp; 
//                                          <b>{internshipPeriodStart
//                                               ? new Date(internshipPeriodStart).toLocaleDateString('en-US', {year: 'numeric',
//                                                                                                               month: 'long',
//                                                                                                               day: 'numeric'  
//                                                                                                             })
//                                               : '[Internship Start Date]'}</b>  

//                                          &nbsp;to&nbsp;  

//                                          <b>{internshipPeriodEnd
//                                               ? new Date(internshipPeriodEnd).toLocaleDateString('en-US', {year: 'numeric',
//                                                                                                               month: 'long',
//                                                                                                               day: 'numeric'  
//                                                                                                             })
//                                               : '[Internship End Date]'}</b>
//   , totaling <b>{hoursRendered}</b> hours. 
//             During this period, <b>{internFirstName ? internFirstName : (internLastName ?  internLastName : (internMiddleName ? internMiddleName : '[Intern First Name]'))}&nbsp;</b>
//             demonstrated exceptional skills and commitment to the role of <b>{internPosition ? internPosition : '[Position]'}&nbsp;</b> 
//             within the <b>{internDepartment ? internDepartment : '[Department]'}</b> department. This certificate is awarded 
//             in recognition of their valuable contributions and dedication.</p>

//         <p className={styles.detailText}>
//             Certificate ID: {certificateId}
//         </p>

//         <p className={styles.issuanceDate}>Issued on: {formattedDate ? formattedDate : '[Issuance Date]'}</p>
//       </div>
//       <div className={styles.footer}>
//         <div className={styles.signature}>
//           <p>Authorized Signature</p>
//         </div>

//         <div className={styles.signature}>
//           <p>Authorized Signature</p>
//         </div>
//       </div>
//     </div>
//     </>
    
//   );
// };

// export default PartialCompletionCertificate;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, useRef } from 'react';
// //=========================================//
// import styles from './CertificateDisplay.module.css'
// //=========================================//
// import html2canvas from 'html2canvas';
// //=========================================//
// import jsPDF from 'jspdf';
// //=========================================//
// import PartialCompletionCertificate from '../CertificatePreview/PartialCompletionCertificate';
// import FullCompletionCertificate from '../CertificatePreview/FullCompletionCertificate';

// //=================================================================================================================//

// function CertificateDisplay() {

//     const [certificateData, setCertificateData] = useState(null);
//     const certificateRef = useRef(null);

//     //=================================================================================================================//

//     useEffect(() => {
//         const storedData = localStorage.getItem('certificateData');
//         if (storedData) {
//             setCertificateData(JSON.parse(storedData));
//         } else {
//             localStorage.removeItem('certificateData');
//         }
//     }, []);

//     if (!certificateData) {
//         return <p>No certificate data found. Please generate a new certificate.</p>;
//     }

//     //=================================================================================================================//

//     const {
//         internFirstName,
//         internMiddleName,
//         internLastName,
//         internSchool,
//         internDepartment,
//         internPosition,
//         internshipPeriodStart,
//         internshipPeriodEnd,
//         hoursRendered,
//         certificateType,
//         issuanceDate,
//         certificateId,
//     } = certificateData;

//     //=================================================================================================================//
//     // const generatePDF = () => {
        
//     //     html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
//     //         const imgData = canvas.toDataURL('image/png');
//     //         const pdf = new jsPDF('landscape', 'mm', 'a4');
//     //         const pdfWidth = pdf.internal.pageSize.getWidth();
//     //         const pdfHeight = pdf.internal.pageSize.getHeight();

//     //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     //         pdf.save(internLastName + '_' + internFirstName + '_' + (certificateType === 'partial' ? 'Partial' : '') + '_Certificate.pdf');
//     //     });
//     // };

//     // const downloadPNG = () => {
//     //     const options = {
//     //         filename: `${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.pdf`,
//     //         image: { type: 'jpeg', quality: 1 },
//     //         html2canvas: { scale: 2 },
//     //         jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
//     //     };
    
//     //     // Generate the PDF
//     //     html2pdf().set(options).from(certificateRef.current).save();
//     // };

//     const downloadPNG = () => {
//         html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const link = document.createElement('a');
//             link.href = imgData;
//             link.download = `${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.png`;
//             link.click();
//         });
//     };

//     //=================================================================================================================//

//     const downloadPDF = () => {

//         const doc = new jsPDF({
//           orientation: 'landscape',
//           unit: 'pt',
//           format: 'a4',
//           compress: true,
//         });

//         const targetElement = document.getElementById('target');
    
//         doc.html(targetElement, {
//           callback: function (doc) {
//             doc.save('Partial_Completion_Certificate.pdf');
//           },
//           width: doc.internal.pageSize.getWidth(),
//           windowWidth: targetElement.scrollWidth,
//           compression: 'SLOW',
//         });
//         };

//     //=================================================================================================================//

//     const CertificateComponent = certificateType === 'partial'
//         ? PartialCompletionCertificate
//         : FullCompletionCertificate;

//     //=================================================================================================================//

//     return (
//         <>
//             <div ref={certificateRef} className={styles.certificateDisplayContainer}>
//                 <CertificateComponent id = "target"
//                     internFirstName={internFirstName}
//                     internMiddleName={internMiddleName}
//                     internLastName={internLastName}
//                     internSchool={internSchool}
//                     internDepartment={internDepartment}
//                     internPosition={internPosition}
//                     internshipPeriodStart={internshipPeriodStart}
//                     internshipPeriodEnd={internshipPeriodEnd}
//                     hoursRendered={hoursRendered}
//                     issuanceDate={issuanceDate}
//                     certificateId={certificateId}
//                 />
//             </div>

//             <div>
//                 <button className={styles.downloadButton} onClick={downloadPDF}>Download as PDF</button>
//             </div>
//             <div>
//                 <button className={styles.downloadButton} onClick={downloadPNG}>Download as PNG</button>
//             </div>
//         </>
//     );
// }

// export default CertificateDisplay;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { Link } from "react-router-dom";
// import React, { useEffect, useState, useContext } from 'react';
// import styles from './GeneralSettings.module.css'
// import { SettingsProvider } from './SettingsContext';


// const baseUrl = 'http://localhost/dashboard/ToDo%20App/';

// function GeneralSettings() {

//     const { logo, signature, companyName, setLogo, setSignature, setCompanyName, setUploadComplete } = useContext(SettingsContext);

//     const [logo, setLogo] = useState(null);
//     const [signature, setSignature] = useState(null);
//     const [companyName, setCompanyName] = useState('');
//     const [uploadComplete, setUploadComplete] = useState(false);

//     //****************************************************************************//

//     const fetchSettings = async() => {

//         try {
//             const response = await fetch(baseUrl+'getSettings.php')
//             const data = await response.json()

//             if (data.success) {
//                 data.settingsData.forEach(setting => {
//                     switch (setting.setting_name) {
//                         case 'company_name':
//                             setCompanyName(setting.setting_value);
//                             break;
//                         case 'logo':
//                             setLogo(baseUrl + setting.setting_value);
//                             break;
//                         case 'signature':
//                             setSignature(baseUrl + setting.setting_value);
//                             break;
//                         default:
//                             break;
//                     }
//                 });
//             }
//         }
//         catch (error) {
//             console.error('Error fetching settings:', error);
//         }

  
        
//     }

//     //****************************************************************************//
    
//     function handleChange(e) {
//         const id = e.target.id;
//         const file = e.target.files ? e.target.files[0] : null;
        
//         if (file) {
//             if (id === 'logoUpload'){
//                 setLogo(file);
//                 handleUpload(file, 'logo');
//             } else if (id === 'signatureUpload') {
//                 setSignature(file);
//                 handleUpload(file, 'signature');
//             }
//         } else if (id === 'companyName') {
//             setCompanyName(e.target.value);
//         }
//     }

//     //****************************************************************************//

//     const handleUpload = async (file, type) => {
        
//         const formData = new FormData();
//         formData.append(type, file);
//         try {

//             const response = await fetch(baseUrl + 'editSettings.php', {
//                 method: 'POST',
//                 body: formData,
//             });
            
//             const data = await response.json();

//             if (data.success) {
                
//                 console.log(`${type} uploaded successfully:`, data[type + 'Url']);
                
//                 setUploadComplete(prev => !prev);
//             } else {
//                 console.error('Upload error:', data.message);
//             }

//         } catch (error) {
//             console.error('Error uploading logo:', error);
//         }
//     };

//     //****************************************************************************//
    
//     const handleCompanyNameSave = async () => {
//         const formData = new FormData();
//         formData.append('company_name', companyName);

//         try {
//             const response = await fetch(baseUrl + 'editSettings.php', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const data = await response.json();
//             if (data.success) {
//                 console.log('Company name saved successfully');
//             } else {
//                 console.error('Error saving company name:', data.message);
//             }
//         } catch (error) {
//             console.error('Error saving company name:', error);
//         }
//     };

//     //****************************************************************************//

//     useEffect(() => {
//         fetchSettings();
//     }, [uploadComplete]);

//    //================================================================================================================// 

//     return (
//         <>
//             <div className= {styles.parentContainer}>
//                 <div className = {styles.generalSettingsContainer}>
//                     <div className = {styles.companyNameSettingsContainer}>
//                         <h3><b>Company Name</b></h3>
//                         <input type="text" 
//                                name="company_name"
//                                id="companyName"
//                                value={companyName} 
//                                placeholder="Company Name"
//                                onChange={handleChange}/>

//                         <button onClick={handleCompanyNameSave}>
//                                     Change
//                                 </button>
//                     </div>
//                     <div className = {styles.imagesSettingsContainer}>
//                         <div className = {styles.logoSettingsContainer}>
//                             <h3><b>Company Logo</b></h3>
//                             <div className={styles.imagePreviewContainer}>
//                                 <img className={styles.imagePreview} src={logo} alt="Logo Preview" />
//                             </div>
                            
//                                 <input 
//                                     type="file" 
//                                     id="logoUpload" 
//                                     name="logo" 
//                                     accept=".jpg,.jpeg,.png" 
//                                     onChange={handleChange} 
//                                     style={{ display: 'none' }}
//                                 />
//                                 <button onClick={() => document.getElementById('logoUpload').click()}>
//                                     Choose Logo
//                                 </button>
//                         </div>
//                         <div className = {styles.signatureSettingsContainer}>
//                             <h3><b>Signature</b></h3>
//                             <div className={styles.imagePreviewContainer}>
//                                 <img className={styles.imagePreview} src={signature} alt="Signature Preview" />
//                             </div>
//                             <input 
//                                     type="file" 
//                                     id = "signatureUpload" 
//                                     name = "signature" 
//                                     accept=".jpg,.jpeg,.png" 
//                                     onChange={handleChange} 
//                                     style={{ display: 'none' }}
//                                 />
//                             <button onClick={() => document.getElementById('signatureUpload').click()}>
//                                     Choose Signature
//                             </button>
//                         </div>


//                     </div>
//                 </div>
//             </div>
            
//         </>
//     )

// }

// export default GeneralSettings

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, useRef, useContext } from 'react';
// //*****************************************//
// import styles from './CertificateDisplay.module.css'
// //*****************************************//
// import html2canvas from 'html2canvas';
// //*****************************************//
// import jsPDF from 'jspdf';
// //*****************************************//
// import PartialCompletionCertificate from '../CertificatePreview/PartialCompletionCertificate';
// import FullCompletionCertificate from '../CertificatePreview/FullCompletionCertificate';
// //*****************************************//

// //=================================================================================================================//

// function CertificateDisplay() {

//     const [certificateData, setCertificateData] = useState(null);
//     const certificateRef = useRef(null);

//     //=================================================================================================================//

//     useEffect(() => {
//         const storedData = localStorage.getItem('certificateData');
//         if (storedData) {
//             setCertificateData(JSON.parse(storedData));
//         } else {
//             localStorage.removeItem('certificateData');
//         }
//     }, []);

//     if (!certificateData) {
//         return <p>No certificate data found. Please generate a new certificate.</p>;
//     }

//     //=================================================================================================================//

//     const {
//         internFirstName,
//         internMiddleName,
//         internLastName,
//         internSchool,
//         internDepartment,
//         internPosition,
//         internshipPeriodStart,
//         internshipPeriodEnd,
//         hoursRendered,
//         certificateType,
//         issuanceDate,
//         certificateId,
//     } = certificateData;

    

//     //=================================================================================================================//
    
//     const downloadPNG = () => {
//         html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const link = document.createElement('a');
//             link.href = imgData;
//             link.download = `${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.png`;
//             link.click();
//         });
//     };

//     //=================================================================================================================//

//     const downloadPDF = () => {

//         const doc = new jsPDF({
//           orientation: 'landscape',
//           unit: 'pt',
//           format: 'a4',
//         });

//         const targetElement = document.getElementById('target');
    
//         doc.html(targetElement, {
//           callback: function (doc) {
//             doc.save(`${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.pdf`);
//           },
//             width: 841.89,
//             height: 595.28,
//             windowWidth: targetElement.scrollWidth,
          
//         });
//         };

//     //=================================================================================================================//

//     const CertificateComponent = certificateType === 'partial'
//         ? PartialCompletionCertificate
//         : FullCompletionCertificate;

//     //=================================================================================================================//

//     return (
//         <>
//             <div ref={certificateRef} className={styles.certificateDisplayContainer}>
//                 <CertificateComponent
//                     internFirstName={internFirstName}
//                     internMiddleName={internMiddleName}
//                     internLastName={internLastName}
//                     internSchool={internSchool}
//                     internDepartment={internDepartment}
//                     internPosition={internPosition}
//                     internshipPeriodStart={internshipPeriodStart}
//                     internshipPeriodEnd={internshipPeriodEnd}
//                     hoursRendered={hoursRendered}
//                     issuanceDate={issuanceDate}
//                     certificateId={certificateId}
//                 />
//             </div>

//             <div className='downloadButtonsContainer'>
//                 <button className={styles.downloadButton} onClick={downloadPDF}>Download as PDF</button>
//                 <button className={styles.downloadButton} onClick={downloadPNG}>Download as PNG</button>
//             </div>
//         </>
//     );
// }

// export default CertificateDisplay;


////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, useRef, useContext } from 'react';
// //*****************************************//
// import styles from './CertificateDisplay.module.css'
// //*****************************************//
// import html2canvas from 'html2canvas';
// //*****************************************//
// import jsPDF from 'jspdf';
// //*****************************************//
// import PartialCompletionCertificate from '../CertificatePreview/PartialCompletionCertificate';
// import FullCompletionCertificate from '../CertificatePreview/FullCompletionCertificate';
// //*****************************************//

// //=================================================================================================================//

// function CertificateDisplay() {

//     const [certificateData, setCertificateData] = useState(null);
//     const certificateRef = useRef(null);

//     //=================================================================================================================//

//     useEffect(() => {
//         const storedData = localStorage.getItem('certificateData');
//         if (storedData) {
//             setCertificateData(JSON.parse(storedData));
//         } else {
//             localStorage.removeItem('certificateData');
//         }
//     }, []);

//     if (!certificateData) {
//         return <p>No certificate data found. Please generate a new certificate.</p>;
//     }

//     //=================================================================================================================//

//     const {
//         internFirstName,
//         internMiddleName,
//         internLastName,
//         internSchool,
//         internDepartment,
//         internPosition,
//         internshipPeriodStart,
//         internshipPeriodEnd,
//         hoursRendered,
//         certificateType,
//         issuanceDate,
//         certificateId,
//     } = certificateData;

    

//     //=================================================================================================================//
    
//     const downloadPNG = () => {
//         html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const link = document.createElement('a');
//             link.href = imgData;
//             link.download = `${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.png`;
//             link.click();
//         });
//     };

//     //=================================================================================================================//

//     const downloadPDF = () => {

//         const doc = new jsPDF({
//           orientation: 'landscape',
//           unit: 'pt',
//           format: 'a4',
//         });

//         const targetElement = document.getElementById('target');
    
//         doc.html(targetElement, {
//           callback: function (doc) {
//             doc.save(`${internLastName}_${internFirstName}_${certificateType === 'partial' ? 'Partial' : ''}_Certificate.pdf`);
//           },
//             width: 841.89,
//             height: 595.28,
//             windowWidth: targetElement.scrollWidth,
          
//         });
//     };

//     //=================================================================================================================//

//     const CertificateComponent = certificateType === 'partial'
//         ? PartialCompletionCertificate
//         : FullCompletionCertificate;

//     //=================================================================================================================//

//     return (
//         <>
//             <div ref={certificateRef} id="target" className={styles.certificateDisplayContainer}>
//                 <CertificateComponent
//                     internFirstName={internFirstName}
//                     internMiddleName={internMiddleName}
//                     internLastName={internLastName}
//                     internSchool={internSchool}
//                     internDepartment={internDepartment}
//                     internPosition={internPosition}
//                     internshipPeriodStart={internshipPeriodStart}
//                     internshipPeriodEnd={internshipPeriodEnd}
//                     hoursRendered={hoursRendered}
//                     issuanceDate={issuanceDate}
//                     certificateId={certificateId}
//                 />
//             </div>

//             <div className='downloadButtonsContainer'>
//                 <button className={styles.downloadButton} onClick={downloadPDF}>Download as PDF</button>
//                 <button className={styles.downloadButton} onClick={downloadPNG}>Download as PNG</button>
//             </div>
//         </>
//     );
// }

// export default CertificateDisplay;












/////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, useContext } from 'react';
// import Modal from 'react-modal';
// import styles from './ShareModal.module.css';
// import {SettingsContext} from '../GeneralSettings/SettingsContext';

// import CertificateTemplate from '../CertificateTemplates/CertificateTemplates';

// import jsPDF from 'jspdf';




// function ShareModal({modalShow, setModalShow, certificateDetails}){

//     const { companyEmail,
//             defaultMessage,
//             salutation, } = useContext(SettingsContext);

//     const [certificateData, setCertificateData] = useState(null);

//     const [email, setEmail] = useState('');
//     const [salutationValue, setSalutationValue] = useState('');
//     const [message, setMessage] = useState('');
    

//     const [loading, setLoading] = useState(false);

//     const baseUrl = 'http://localhost/dashboard/certificate_generator/';

//     Modal.setAppElement('#root');


//     useEffect(() => {
//         const storedData = localStorage.getItem('certificateData');
//         if (storedData) {
//             setCertificateData(JSON.parse(storedData));
//         }
//     }, []);

    
//     function closeModal() {
//     setModalShow(false);
//     }

//     const generatePDF = () => {
//         return new Promise((resolve, reject) => {
//             const doc = new jsPDF({
//                 orientation: 'landscape',
//                 unit: 'pt',
//                 format: 'a4',
//             });
    
//             const targetElement = document.getElementById('target');

//             console.log(targetElement); // Check if this logs the correct element

//             if (!targetElement) {
//                 reject('Target element not found');
//                 return;
//             }
    
//             doc.html(targetElement, {
//                 callback: function (doc) {
//                     const pdfBlob = doc.output('blob'); // Get the PDF as a blob
//                     resolve(pdfBlob); // Return the blob for sending via email
//                 },
//                 width: 841.89,
//                 height: 595.28,
//                 windowWidth: targetElement.scrollWidth,
//             });
//         });
//         };

//     // Function to handle sending the email with the PDF
//     const handleSend = async () => {
//         try {
//             setLoading(true);
//             const pdfBlob = await generatePDF(); // Generate the PDF
            
//             // Create a FormData object to send the data to the backend
//             const formData = new FormData();
//             formData.append('email', email);
//             formData.append('message', message);
//             formData.append('pdf', pdfBlob, 'certificate.pdf'); // Attach the PDF

//             const response = await fetch(baseUrl+'sendEmail.php', {
//                 method: 'POST',
//                 body: formData
//             });

//             if (response.success) {
//                 alert('Email sent successfully!');
//             } else {
//                 alert('Failed to send the email.');
//             }
//         } catch (error) {
//             console.error('Error sending email:', error);
//             alert('There was an error sending the email.');
//         } finally {
//             setLoading(false);
//             closeModal();
//         }
//     };

//     useEffect(() => {

//         if (certificateDetails) {
//             setCertificateData(certificateDetails);

//             setSalutationValue(salutation ? salutation.replace('[Intern First Name]', certificateDetails.intern_first_name)
//                                                          .replace('[Intern Middle Name]', certificateDetails.intern_middle_name || '')
//                                                          .replace('[Intern Last Name]', certificateDetails.intern_last_name || '') 
            
//                                             : `Dear ${certificateDetails.intern_first_name},`);
//         }
//     }, [certificateDetails, salutation]);

//     useEffect(() => {
//         if (defaultMessage) {
//             setMessage(defaultMessage);
//         }
//     }, [defaultMessage]);

//     return(
//         <>
//             <div>
//                 <Modal
//                     isOpen={modalShow}
//                     onRequestClose={closeModal}
//                     className={styles.modalContainer}
//                     overlayClassName={styles.modalOverlay}
//                     contentLabel="Share Certificate Modal"
//                 >
//                     <h2 className={styles.modalTitle}>Share Certificate</h2>

//                     <div className={styles.formGroup}>
//                         <div className={styles.recipientEmail}>
//                             <label htmlFor="email"><b>Recipient's Email</b></label>
//                             <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="Enter recipient's email"
//                             required
//                             />
//                         </div>

//                         <div className={styles.salutation}>
//                             <label htmlFor="salutation"><b>Message</b></label>
//                             <textarea
//                                 id="salutation"
//                                 value={salutationValue}
//                                 onChange={(e) => setSalutationValue(e.target.value)}
//                                 placeholder="Add a personal message"
//                             />
//                         </div>

//                         <div className={styles.emailMessage}>
//                             <label htmlFor="message"><b>Message</b></label>
//                             <textarea
//                                 id="message"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 placeholder="Add a personal message"
//                             />
//                         </div>
//                     </div>

//                     <div className={styles.senderEmailContainer}>
//                         <div>
//                             <p><b>From:</b> {companyEmail}</p>
//                         </div>
//                     </div>
                    
//                     <div className={styles.buttonGroup}>
//                         <button className={styles.sendButton} onClick={handleSend} disabled={loading} >
//                             {loading ? 'Sending...' : 'Send'}
//                         </button>
//                         <button className={styles.cancelButton} onClick={closeModal}>
//                             Cancel
//                         </button>
//                     </div>
//                     {/* Hidden Certificate Template for PDF Generation */}
//                     {certificateData && (
//                         <div style={{ display: 'none' }}>
//                             <CertificateTemplate certificateData={certificateData} />
//                         </div>
//                     )}
//                 </Modal>
//             </div>
            
//         </>
    
//     );
// }

// export default ShareModal






///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// const baseUrl = 'http://localhost/dashboard/certificate_generator/';

// export const AuthProvider = ({ children }) => {

//   //========================================================================================//
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return sessionStorage.getItem('isAuthenticated') === 'true';
//   });

//   const [authError, setAuthError] = useState(null);
//   const [email, setEmail] = useState(() => sessionStorage.getItem('email'));
//   const [fullname, setFullname] = useState(() => sessionStorage.getItem('fullname'));
//   const [role, setRole] = useState(() => sessionStorage.getItem('role'));

   
//   //========================================================================================//
//   const login = async (userEmail, userPassword) => {
//     const formData = new FormData();
//     formData.append('user_email', userEmail);
//     formData.append('user_password', userPassword);

//     try {
//       const loginResponse = await fetch(baseUrl + 'auth/login.php', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await loginResponse.json();

//       if (data.success) {
//         setIsAuthenticated(true);

//         // Persist authentication state in sessionStorage
//         sessionStorage.setItem('isAuthenticated', 'true');
//         sessionStorage.setItem('email', data.data.user_email);
//         sessionStorage.setItem('fullname', data.data.user_fullname);
//         sessionStorage.setItem('role', data.data.role);

//         setAuthError(null);

//         return { success: true, message: 'Login successful' };
//       } else {
//         // setIsAuthenticated(false);
//         setAuthError(data.message);
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       // setIsAuthenticated(false);
//       setAuthError('Login failed');

//       return { success: false, message: 'Login failed: ' + error.message };
//     }
//   };

//   //========================================================================================//
//   const logout = () => {
//     setIsAuthenticated(false)
//     setEmail(null);
//     setFullname(null);
      
//       sessionStorage.clear();
//       setUser(null);
//   };
//  //========================================================================================//
 
//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, authError, email, fullname, role }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// <?php
// use \Firebase\JWT\JWT;

// $authHeader = getallheaders()['Authorization'];
// $token = str_replace('Bearer ', '', $authHeader);

// try {
//     // Decode the JWT token
//     $decoded = JWT::decode($token, $key, array('HS256'));

//     // Check if the role is admin before proceeding
//     if ($decoded->role !== 'admin') {
//         http_response_code(403); // Forbidden
//         echo json_encode(['message' => 'Access Denied']);
//         exit();
//     }

//     // Proceed to fetch and return user records
//     $users = getAllUsersFromDatabase();
//     echo json_encode($users);

// } catch (Exception $e) {
//     http_response_code(401); // Unauthorized
//     echo json_encode(['message' => 'Invalid token']);
// }
// ?>