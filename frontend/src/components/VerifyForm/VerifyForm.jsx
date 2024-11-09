import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import SettingsContext from "../GeneralSettings/SettingsContext";
import styles from "./VerifyForm.module.css";
import GeneralSettings from "../GeneralSettings/GeneralSettings";
import baseUrl from "../../config";

function VerifyForm() {
  const [certificateId, setCertificateId] = useState("");
  const [response, setResponse] = useState(null);

  const { companyName } = useContext(SettingsContext);

  //****************************************************************************************//

  const verifyCertificate = async () => {
    const formData = new FormData();
    formData.append("certificate_id", certificateId);

    try {
      const certificate = await fetch(baseUrl + "verifyCertificate.php", {
        method: "POST",
        body: formData,
      });

      const data = await certificate.json();

      if (data.success) {
        setResponse(data);
        console.log("Response: ", data);
      } else {
        setResponse(data);
      }
    } catch (error) {
      setResponse({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };

  //****************************************************************************************//

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyCertificate();
  };

  //****************************************************************************************//

  return (
    <>
      <div className={styles.parentContainer}>
        <p>
          <b>
            Please enter the Certificate ID below to verify the authenticity of
            your certificate. Our system will check the details and confirm the
            validity of the certificate.
          </b>
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.verifyInputContainer}>
            <div>
              <h2>Enter Certificate ID: </h2>
            </div>

            <div>
              <input
                type="text"
                name="certificateId"
                id="certificateId"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.verifyButtonContainer}>
            <button type="submit">Verify</button>
          </div>
        </form>
      </div>

      {response && response.success ? (
        <div className={styles.verificationResultContainer}>
          <hr className={styles.border}></hr>
          <div className={styles.verificationSuccessContainer}>
            <h3 className={styles.verificationResultText}>
              Certificate Verified!
            </h3>
            <div className={styles.verificationBodyContainer}>
              <div className={styles.verificationDetailsContainer}>
                <p>
                  <b>Certificate ID:</b> {response.data.certificate_id}
                </p>
                <p>
                  <b>Intern Name:</b> {response.data.intern_name}
                </p>
                <p>
                  <b>Date of Issuance:</b>{" "}
                  {new Date(response.data.date_of_issuance).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <p>
                <b>
                  This certificate is valid and was issued by {companyName}.
                </b>
              </p>
            </div>
          </div>
        </div>
      ) : response && !response.success ? (
        <div className={styles.verificationResultContainer}>
          <hr className={styles.border}></hr>
          <div className={styles.verificationFailedContainer}>
            <h3 className={styles.verificationResultText}>
              Invalid Certificate!
            </h3>
            <div className={styles.verificationBodyContainer}>
              <p>
                <b>
                  Unfortunately, the certificate ID provided does not match any
                  records in our system.
                </b>
              </p>
              <p>
                <b>
                  Please double-check the ID or contact support for further
                  assistance.
                </b>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default VerifyForm;
