import React, { useEffect, useState, useRef } from "react";
import GenerateForm from "../components/GenerateForm/GenerateForm";
import CertificatePreview from "../components/CertificatePreview/CertificatePreview";

function Generate() {
  const [certificateId, setCertificateId] = useState("");

  const [internFirstName, setInternFirstName] = useState("");
  const [internMiddleName, setInternMiddleName] = useState("");
  const [internLastName, setInternLastName] = useState("");
  const [internSchool, setInternSchool] = useState("");
  const [internDepartment, setInternDepartment] = useState("");
  const [internPosition, setInternPosition] = useState("");
  const [internshipPeriodStart, setInternshipPeriodStart] = useState("");
  const [internshipPeriodEnd, setInternshipPeriodEnd] = useState("");
  const [hoursRendered, setHoursRendered] = useState("");
  const [certificateType, setCertificateType] = useState("");
  const [issuanceDate, setIssuanceDate] = useState("");

  return (
    <>
      <h1 className="sectionTitle">Generate</h1>

      <GenerateForm
        internFirstName={internFirstName}
        setInternFirstName={setInternFirstName}
        internMiddleName={internMiddleName}
        setInternMiddleName={setInternMiddleName}
        internLastName={internLastName}
        setInternLastName={setInternLastName}
        internSchool={internSchool}
        setInternSchool={setInternSchool}
        internDepartment={internDepartment}
        setInternDepartment={setInternDepartment}
        internPosition={internPosition}
        setInternPosition={setInternPosition}
        internshipPeriodStart={internshipPeriodStart}
        setInternshipPeriodStart={setInternshipPeriodStart}
        internshipPeriodEnd={internshipPeriodEnd}
        setInternshipPeriodEnd={setInternshipPeriodEnd}
        hoursRendered={hoursRendered}
        setHoursRendered={setHoursRendered}
        certificateType={certificateType}
        setCertificateType={setCertificateType}
        issuanceDate={issuanceDate}
        setIssuanceDate={setIssuanceDate}
        certificateId={certificateId}
        setCertificateId={setCertificateId}
      />

      <CertificatePreview
        internFirstName={internFirstName}
        internMiddleName={internMiddleName}
        internLastName={internLastName}
        internSchool={internSchool}
        internDepartment={internDepartment}
        internPosition={internPosition}
        internshipPeriodStart={internshipPeriodStart}
        internshipPeriodEnd={internshipPeriodEnd}
        hoursRendered={hoursRendered}
        certificateType={certificateType}
        issuanceDate={issuanceDate}
        setCertificateId={setCertificateId}
      />
    </>
  );
}
export default Generate;
