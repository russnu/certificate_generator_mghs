import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import styles from "./ShareModal.module.css";
import { SettingsContext } from "../GeneralSettings/SettingsContext";

import CertificateTemplate from "../CertificateTemplates/CertificateTemplates";

import jsPDF from "jspdf";

import baseUrl from "../../config";

function ShareModal({ modalShow, setModalShow, certificateDetails }) {
  const { companyEmail, defaultSubject, defaultMessage, salutation } =
    useContext(SettingsContext);

  const [certificateData, setCertificateData] = useState(null);

  const [email, setEmail] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [salutationValue, setSalutationValue] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  Modal.setAppElement("#root");

  //=============================================================//
  function closeModal() {
    setModalShow(false);
  }

  //=============================================================//
  const generatePDF = () => {
    console.log(certificateData);
    return new Promise((resolve, reject) => {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
      });

      const targetElement = document.getElementById("target");

      if (!targetElement) {
        console.error("Target element not found");
        reject("Target element not found");
        return;
      }

      doc.html(targetElement, {
        callback: function (doc) {
          const pdfBlob = doc.output("blob"); // Get the PDF as a blob
          resolve(pdfBlob); // Return the blob for sending via email
        },
        x: 0,
        y: 0,
        width: 841.89,
        windowWidth: targetElement.scrollWidth,
      });
    });
  };

  //=============================================================//
  const handleSend = async () => {
    if (!certificateData) {
      alert("Certificate data is missing.");
      return;
    }

    const emailIsValid = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Check if the email field is empty or invalid
    if (!email || !emailIsValid(email)) {
      alert("Please enter a valid email address.");
      return; // Stop further execution if email is not valid
    }
    try {
      setLoading(true);
      const pdfBlob = await generatePDF(); // Generate the PDF

      if (!pdfBlob) {
        console.error("Failed to generate PDF blob");
        return;
      }

      // Create a FormData object to send the data to the backend
      const formData = new FormData();
      formData.append("email", email);
      formData.append("subject", subjectValue);
      formData.append("salutation", salutationValue);
      formData.append("message", message);
      formData.append("pdf", pdfBlob, "certificate.pdf"); // Attach the PDF

      const response = await fetch(baseUrl + "sendEmail.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send the email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending the email.");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  useEffect(() => {
    if (modalShow) {
      setCertificateData(certificateDetails);
      setEmail("");
      setSubjectValue(defaultSubject || "");
      setSalutationValue(
        salutation
          ? salutation
              .replace(
                "[Intern First Name]",
                certificateDetails?.internFirstName || ""
              )
              .replace(
                "[Intern Middle Name]",
                certificateDetails?.internMiddleName || ""
              )
              .replace(
                "[Intern Last Name]",
                certificateDetails?.internLastName || ""
              )
          : `Dear ${certificateDetails?.intern_first_name || ""},`
      );
      setMessage(defaultMessage || "");
    }
  }, [
    modalShow,
    defaultSubject,
    defaultMessage,
    salutation,
    certificateDetails,
  ]);

  //=========================================================================================================//
  return (
    <>
      <div>
        <Modal
          isOpen={modalShow}
          onRequestClose={closeModal}
          className={styles.modalContainer}
          overlayClassName={styles.modalOverlay}
          contentLabel="Share Certificate Modal"
        >
          <h2 className={styles.modalTitle}>Share Certificate</h2>

          <div className={styles.formGroup}>
            <div className={styles.recipientEmail}>
              <label htmlFor="email">
                <b>Recipient's Email</b>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter recipient's email"
                required
              />
            </div>

            <div className={styles.recipientEmail}>
              <label htmlFor="subject">
                <b>Subject</b>
              </label>
              <input
                type="text"
                id="subject"
                value={subjectValue}
                onChange={(e) => setSubjectValue(e.target.value)}
                placeholder="Add a subject"
                required
              />
            </div>

            <div className={styles.salutation}>
              <label htmlFor="salutation">
                <b>Salutation</b>
              </label>
              <textarea
                id="salutation"
                value={salutationValue}
                onChange={(e) => setSalutationValue(e.target.value)}
                placeholder="Add a salutation"
              />
            </div>

            <div className={styles.emailMessage}>
              <label htmlFor="message">
                <b>Message</b>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a message"
              />
            </div>
          </div>

          <div className={styles.senderEmailContainer}>
            <div>
              <p>
                <b>From:</b> {companyEmail}
              </p>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={styles.sendButton}
              disabled={loading}
              onClick={handleSend}
            >
              {loading ? "Sending..." : "Send"}
            </button>
            <button className={styles.cancelButton} onClick={closeModal}>
              Cancel
            </button>
          </div>

          {/* Hidden Certificate Template for PDF Generation */}
          {certificateData && (
            <div
              style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
            >
              <CertificateTemplate
                certificateData={certificateData}
                id="target"
              />
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default ShareModal;
