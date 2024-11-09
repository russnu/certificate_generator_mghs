import React, { useEffect, useState } from 'react';
import styles from './CertificatePreview.module.css'

import PartialCompletionCertificate from './PartialCompletionCertificate';
import FullCompletionCertificate from './FullCompletionCertificate';

function CertificatePreview({
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
}) {
  
  const isPartial = certificateType.trim() === 'partial';

  return (
    <>
      <h2 className = {styles.previewSectionTitle}>Preview: </h2>
      <div className={styles.certificatePreviewParentContainer}>
                {isPartial ? (
                    <PartialCompletionCertificate
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
                    />
                ) : (
                    <FullCompletionCertificate
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
                    />
                )}
            </div>
    </>
  );
}

export default CertificatePreview

