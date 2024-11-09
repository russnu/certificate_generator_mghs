import React, { useEffect, useState, useContext } from "react";
import styles from "./CertificateRecords.module.css";
import ShareModal from "../ShareModal/ShareModal";
import baseUrl from "../../config";

function CertificateRecords() {
  const [certificate, setCertificate] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const fetchCertificates = async () => {
    const certs = await fetch(baseUrl + "getCertificates.php");
    const response = await certs.json();

    const mappedCertificates = response.data.map((certificate) => ({
      certificateId: certificate.certificate_id,
      internFirstName: certificate.intern_first_name,
      internMiddleName: certificate.intern_middle_name,
      internLastName: certificate.intern_last_name,
      internSchool: certificate.intern_school,
      internDepartment: certificate.intern_department,
      internPosition: certificate.intern_position,
      internshipPeriodStart: certificate.internship_period_start,
      internshipPeriodEnd: certificate.internship_period_end,
      hoursRendered: certificate.hours_rendered,
      certificateType: certificate.certificate_type,
      issuanceDate: certificate.issuance_date,
    }));

    setCertificates(mappedCertificates);
  };

  const deleteCertificate = async (certificateId) => {
    var formData = new FormData();

    formData.append("certificate_id", certificateId);

    const delCertificate = await fetch(baseUrl + "deleteCertificate.php", {
      method: "POST",
      body: formData,
    });

    const response = await delCertificate.json();

    console.log(certificateId);

    if (response.success) {
      fetchCertificates();
      alert(response.message);
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.listContainer}>
          {certificates.map((item, index) => (
            <div key={index} className={styles.certificateItemContainer}>
              <div className={styles.dateCreatedContainer}>
                <p>
                  {new Date(item.issuanceDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className={styles.certificateItemRow}>
                <div className={styles.certificateItemColumn}>
                  <p>Certificate ID</p>
                  <p>{item.certificateId}</p>
                </div>
                <div className={styles.certificateItemColumn}>
                  <p>Intern Name</p>
                  <p className={styles.internName}>{`${item.internFirstName} ${
                    item.internMiddleName ? item.internMiddleName + " " : ""
                  }${item.internLastName}`}</p>
                </div>
                <div className={styles.certificateItemColumn}>
                  <p>Certificate Type</p>
                  <p>
                    {item.certificateType === "partial"
                      ? "Partial Completion"
                      : "Full Completion"}
                  </p>
                </div>

                <div className={styles.certificateItemColumn}>
                  <div className={styles.buttonsContainer}>
                    <button
                      className={styles.shareCertificateButton}
                      onClick={() => {
                        setSelectedCertificate(item);
                        setModalShow(true);
                      }}
                    >
                      Share
                    </button>

                    <button
                      className={styles.deleteCertificateButton}
                      onClick={() => deleteCertificate(item.certificateId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ShareModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        certificateDetails={selectedCertificate}
      />
    </>
  );
}

export default CertificateRecords;
