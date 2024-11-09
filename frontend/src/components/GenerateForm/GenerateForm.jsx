import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GenerateForm.module.css";
import GenerateButtons from "./GenerateButtons";
import baseUrl from "../../config";

function GenerateForm({
  internFirstName,
  setInternFirstName,
  internMiddleName,
  setInternMiddleName,
  internLastName,
  setInternLastName,
  internSchool,
  setInternSchool,
  internDepartment,
  setInternDepartment,
  internPosition,
  setInternPosition,
  internshipPeriodStart,
  setInternshipPeriodStart,
  internshipPeriodEnd,
  setInternshipPeriodEnd,
  hoursRendered,
  setHoursRendered,
  certificateType,
  setCertificateType,
  issuanceDate,
  setIssuanceDate,
  certificateId,
  setCertificateId,
}) {
  //=========================================================================================//

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCertificateId = await addCertificate();

    if (updatedCertificateId) {
      // Only proceed if the insertion was successful
      const certificateData = {
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
        certificateId: updatedCertificateId,
      };

      localStorage.setItem("certificateData", JSON.stringify(certificateData));
      console.log("cert: ", updatedCertificateId);

      // Open a new tab only if the certificate is successfully added
      setTimeout(() => {
        const newTab = window.open("/certificate-display", "_blank");
        if (newTab) {
          newTab.document.title = "Finished Certificate";
        }
      }, 200); // Small delay to ensure data is written
    } else {
      console.log("Failed to add certificate.");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    setInternFirstName("");
    setInternMiddleName("");
    setInternLastName("");
    setInternSchool("");
    setInternDepartment("");
    setInternPosition("");
    setInternshipPeriodStart("");
    setInternshipPeriodEnd("");
    setHoursRendered("");
    setCertificateType("");
    setIssuanceDate("");
  };
  //=========================================================================================//

  const addCertificate = async () => {
    const formData = new FormData();

    formData.append("internFirstName", internFirstName);
    formData.append("internMiddleName", internMiddleName);
    formData.append("internLastName", internLastName);
    formData.append("internSchool", internSchool);
    formData.append("internDepartment", internDepartment);
    formData.append("internPosition", internPosition);
    formData.append("internshipPeriodStart", internshipPeriodStart);
    formData.append("internshipPeriodEnd", internshipPeriodEnd);
    formData.append("hoursRendered", hoursRendered);
    formData.append("certificateType", certificateType);
    formData.append("issuanceDate", issuanceDate);

    const certificates = await fetch(baseUrl + "addCertificate.php", {
      method: "POST",
      body: formData,
    });

    const response = await certificates.json();

    if (response.success) {
      alert("Certificate added successfully!");

      const updatedCertificateId = response.data.certificate_id;
      setCertificateId(updatedCertificateId);

      console.log("Response: ", updatedCertificateId);

      return updatedCertificateId;
    } else {
      alert("Error: " + response.message);
      return null;
    }
  };

  //=========================================================================================//

  return (
    <>
      <div className={styles.parentContainer}>
        <form action="" onSubmit={handleSubmit} onReset={handleReset}>
          <h2 className={styles.formSectionTitle}>Enter Intern Details</h2>
          <div className={styles.formSectionContainer}>
            <div>
              <div>
                <label htmlFor="internFirstName">First Name</label>
                <input
                  type="text"
                  name="internFirstName"
                  id="internFirstName"
                  value={internFirstName}
                  onChange={(e) => setInternFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="internLastName">Middle Name/Initial</label>
                <input
                  type="text"
                  name="internMiddleName"
                  id="internMiddleName"
                  value={internMiddleName}
                  onChange={(e) => setInternMiddleName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="internMiddleName">Last Name</label>
                <input
                  type="text"
                  name="internLastName"
                  id="internLastName"
                  value={internLastName}
                  onChange={(e) => setInternLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="internSchool">School/University</label>
                <input
                  type="text"
                  name="internSchool"
                  id="internSchool"
                  value={internSchool}
                  onChange={(e) => setInternSchool(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="internDepartment">Department</label>
                <input
                  type="text"
                  name="internFirstName"
                  id="interFirstName"
                  value={internDepartment}
                  onChange={(e) => setInternDepartment(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="internPosition">Position</label>
                <input
                  type="text"
                  name="internLastName"
                  id="internLastName"
                  value={internPosition}
                  onChange={(e) => setInternPosition(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="internshipPeriod">Internship Period</label>
                <div className={styles.internshipPeriodContainer}>
                  <input
                    type="date"
                    name="internshipPeriodStart"
                    id="internshipPeriodStart"
                    value={internshipPeriodStart}
                    onChange={(e) => setInternshipPeriodStart(e.target.value)}
                  />
                  <h3>to</h3>
                  <input
                    type="date"
                    name="internshipPeriodEnd"
                    id="internshipPeriodEnd"
                    value={internshipPeriodEnd}
                    onChange={(e) => setInternshipPeriodEnd(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hoursRendered">Hours Rendered</label>
                <input
                  type="text"
                  name="hoursRendered"
                  id="hoursRendered"
                  value={hoursRendered}
                  onChange={(e) => setHoursRendered(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* **************************************************************************************** */}

          <h2 className={styles.formSectionTitle}>Certificate Details:</h2>
          <div className={styles.formSectionContainer}>
            <div className={styles.certificateTypeItem}>
              <div>
                <label htmlFor="certificateType">Certificate Type</label>
                <select
                  type="dropdown"
                  name="certificateType"
                  id="certificateType"
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                >
                  <option value="" disabled>
                    Select a certificate type
                  </option>
                  <option value="completion">Certificate of Completion</option>
                  <option value="partial">
                    Certificate of Partial Completion
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="issuanceDate">Issuance Date</label>
                <input
                  className={styles.issuanceDate}
                  type="date"
                  name="issuanceDate"
                  id="issuanceDate"
                  value={issuanceDate}
                  onChange={(e) => setIssuanceDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <GenerateButtons />
            </div>
          </div>
        </form>
      </div>

      <center>
        <div className={styles.border}></div>
      </center>
    </>
  );
}

export default GenerateForm;
