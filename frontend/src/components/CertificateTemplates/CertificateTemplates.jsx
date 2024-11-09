// CertificateTemplate.jsx
import React from "react";
import PartialCompletionCertificate from "../CertificatePreview/PartialCompletionCertificate";
import FullCompletionCertificate from "../CertificatePreview/FullCompletionCertificate";

const CertificateTemplate = ({ certificateData }) => {
  const CertificateComponent =
    certificateData.certificate_type === "partial"
      ? PartialCompletionCertificate
      : FullCompletionCertificate;

  return (
    <div id="target">
      <CertificateComponent
        internFirstName={certificateData.internFirstName}
        internMiddleName={certificateData.internMiddleName}
        internLastName={certificateData.internLastName}
        internSchool={certificateData.internSchool}
        internDepartment={certificateData.internDepartment}
        internPosition={certificateData.internPosition}
        internshipPeriodStart={certificateData.internshipPeriodStart}
        internshipPeriodEnd={certificateData.internshipPeriodEnd}
        hoursRendered={certificateData.hoursRendered}
        issuanceDate={certificateData.issuanceDate}
        certificateId={certificateData.certificateId}

        // internFirstName={certificateData.intern_first_name}
        // internMiddleName={certificateData.intern_middle_name}
        // internLastName={certificateData.intern_last_name}
        // internSchool={certificateData.intern_school}
        // internDepartment={certificateData.intern_department}
        // internPosition={certificateData.intern_position}
        // internshipPeriodStart={certificateData.internship_period_start}
        // internshipPeriodEnd={certificateData.internship_period_end}
        // hoursRendered={certificateData.hours_rendered}
        // issuanceDate={certificateData.issuance_date}
        // certificateId={certificateData.certificate_id}
      />
    </div>
  );
};

export default CertificateTemplate;
