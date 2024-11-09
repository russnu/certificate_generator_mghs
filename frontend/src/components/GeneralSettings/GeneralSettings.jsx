import React, { useContext, useEffect, useState } from "react";
import styles from "./GeneralSettings.module.css";
import { SettingsContext } from "./SettingsContext.jsx";
import { BsBoxArrowUp } from "react-icons/bs";
import baseUrl from "../../config";

function GeneralSettings() {
  const {
    logo,
    setLogo,
    signature1,
    setSignature1,
    signature2,
    setSignature2,
    companyName,
    setCompanyName,
    uploadComplete,
    setUploadComplete,
    signatoryName1,
    signatoryName2,
    signatoryTitle1,
    signatoryTitle2,
    setSignatoryName1,
    setSignatoryName2,
    setSignatoryTitle1,
    setSignatoryTitle2,
    companyEmail,
    setCompanyEmail,
    defaultSubject,
    setDefaultSubject,
    salutation,
    setSalutation,
    defaultMessage,
    setDefaultMessage,
  } = useContext(SettingsContext);

  const [companyNameisEdit, setCompanyNameisEdit] = useState(false);
  const [signatoryName1isEdit, setSignatoryName1isEdit] = useState(false);
  const [signatoryName2isEdit, setSignatoryName2isEdit] = useState(false);
  const [signatoryTitle1isEdit, setSignatoryTitle1isEdit] = useState(false);
  const [signatoryTitle2isEdit, setSignatoryTitle2isEdit] = useState(false);

  const [companyEmailisEdit, setCompanyEmailisEdit] = useState(false);
  const [defaultSubjectisEdit, setDefaultSubjectisEdit] = useState(false);
  const [salutationisEdit, setSalutationisEdit] = useState(false);
  const [defaultMessageisEdit, setDefaultMessageisEdit] = useState(false);

  //****************************************************************************//

  function handleChange(e) {
    const id = e.target.id;
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      if (id === "logoUpload") {
        setLogo(file);
        handleUpload(file, "logo");
      } else if (id === "signature1Upload") {
        setSignature1(file);
        handleUpload(file, "signature1");
      } else if (id === "signature2Upload") {
        setSignature2(file);
        handleUpload(file, "signature2");
      }
    } else {
      const { value } = e.target;
      if (id === "companyName") {
        setCompanyName(value);
      } else if (id === "signatoryName1") {
        setSignatoryName1(value);
      } else if (id === "signatoryName2") {
        setSignatoryName2(value);
      } else if (id === "signatoryTitle1") {
        setSignatoryTitle1(value);
      } else if (id === "signatoryTitle2") {
        setSignatoryTitle2(value);
      } else if (id === "companyEmail") {
        setCompanyEmail(value);
      } else if (id === "emailSalutation") {
        setSalutation(value);
      } else if (id === "defaultSubject") {
        setDefaultSubject(value);
      } else if (id === "defaultMessage") {
        setDefaultMessage(value);
      }
    }
  }

  //****************************************************************************//

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append(type, file);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(baseUrl + "editSettings.php", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log(`${type} uploaded successfully:`, data[type + "Url"]);

        setUploadComplete((prev) => !prev);
      } else {
        console.error("Upload error:", data.message);
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  //****************************************************************************//

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("company_name", companyName);
    formData.append("signatory_name1", signatoryName1);
    formData.append("signatory_name2", signatoryName2);
    formData.append("signatory_title1", signatoryTitle1);
    formData.append("signatory_title2", signatoryTitle2);
    formData.append("company_email", companyEmail);
    formData.append("default_subject", defaultSubject);
    formData.append("email_salutation", salutation);
    formData.append("default_message", defaultMessage);

    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(baseUrl + "editSettings.php", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error saving company name:", error);
    }

    setCompanyNameisEdit(false);
    setSignatoryName1isEdit(false);
    setSignatoryName2isEdit(false);
    setSignatoryTitle1isEdit(false);
    setSignatoryTitle2isEdit(false);
    setCompanyEmailisEdit(false);
    setSalutationisEdit(false);
    setDefaultMessageisEdit(false);
    setDefaultSubjectisEdit(false);
  };

  //================================================================================================================//

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.generalSettingsContainer}>
          <h2 className={styles.settingsPartTitle}>
            <b>Company Details</b>
          </h2>

          <div className={styles.companyDetailsContainer}>
            <div className={styles.companyNameSettingsContainer}>
              <h3>
                <b>Company Name</b>
              </h3>
              <input
                type="text"
                id="companyName"
                value={companyName}
                placeholder="Company Name"
                onChange={handleChange}
                disabled={!companyNameisEdit}
                className={companyNameisEdit ? "" : styles.itemSaved}
              />

              {companyNameisEdit ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => setCompanyNameisEdit(true)}>Edit</button>
              )}
            </div>

            {/*************************************************/}
            <div className={styles.border}></div>

            <div className={styles.logoSettingsContainer}>
              <h3>
                <b>Company Logo</b>
              </h3>
              <div className={styles.logoItemContainer}>
                <div className={styles.imagePreviewContainer}>
                  <img
                    className={styles.logoImagePreview}
                    src={logo}
                    alt="Logo Preview"
                  />
                </div>

                <input
                  type="file"
                  id="logoUpload"
                  name="logo"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <button
                  onClick={() => document.getElementById("logoUpload").click()}
                >
                  <BsBoxArrowUp style={{ fontSize: "20px" }} /> Choose Logo
                </button>
              </div>
            </div>
          </div>

          {/*=================================================================================================*/}

          <h2 className={styles.settingsPartTitle}>
            <b>Signature Settings</b>
          </h2>

          <div className={styles.signatureDetailsContainer}>
            <div className={styles.signatureSettingsContainer}>
              <div className={styles.signatureInfoContainer}>
                <h3>Signature 1</h3>
                <div className={styles.signatureItemContainer}>
                  <div className={styles.imagePreviewContainer}>
                    <img
                      className={styles.signatureImagePreview}
                      src={signature1}
                      alt="Signature 1 Preview"
                    />
                    <input
                      type="file"
                      id="signature1Upload"
                      name="signature1"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <button
                      onClick={() =>
                        document.getElementById("signature1Upload").click()
                      }
                    >
                      <BsBoxArrowUp style={{ fontSize: "20px" }} /> Choose
                      Signature
                    </button>
                  </div>
                  <div className={styles.signatoryInfoContainer}>
                    <div className={styles.signatoryItemContainer}>
                      <h4>Authorized Signatory</h4>
                      <div className={styles.signatoryFormItem}>
                        <input
                          type="text"
                          className={
                            signatoryName1isEdit ? "" : styles.itemSaved
                          }
                          disabled={!signatoryName1isEdit}
                          value={signatoryName1}
                          placeholder="Signatory Name"
                          onChange={handleChange}
                          id="signatoryName1"
                        />
                        {signatoryName1isEdit ? (
                          <button onClick={handleSave}>Save</button>
                        ) : (
                          <button onClick={() => setSignatoryName1isEdit(true)}>
                            Edit
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={styles.signatoryItemContainer}>
                      <h4>Title</h4>
                      <div className={styles.signatoryFormItem}>
                        <input
                          type="text"
                          className={
                            signatoryTitle1isEdit ? "" : styles.itemSaved
                          }
                          disabled={!signatoryTitle1isEdit}
                          value={signatoryTitle1}
                          placeholder="Signatory Name"
                          onChange={handleChange}
                          id="signatoryTitle1"
                        />
                        {signatoryTitle1isEdit ? (
                          <button onClick={handleSave}>Save</button>
                        ) : (
                          <button
                            onClick={() => setSignatoryTitle1isEdit(true)}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.border}></div>

                <h3>Signature 2</h3>
                <div className={styles.signatureItemContainer}>
                  <div className={styles.imagePreviewContainer}>
                    <img
                      className={styles.signatureImagePreview}
                      src={signature2}
                      alt="Signature 2 Preview"
                    />
                    <input
                      type="file"
                      id="signature2Upload"
                      name="signature2"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    <button
                      onClick={() =>
                        document.getElementById("signature2Upload").click()
                      }
                    >
                      <BsBoxArrowUp style={{ fontSize: "20px" }} /> Choose
                      Signature
                    </button>
                  </div>
                  <div className={styles.signatoryInfoContainer}>
                    <div className={styles.signatoryItemContainer}>
                      <h4>Authorized Signatory</h4>
                      <div className={styles.signatoryFormItem}>
                        <input
                          type="text"
                          className={
                            signatoryName2isEdit ? "" : styles.itemSaved
                          }
                          disabled={!signatoryName2isEdit}
                          value={signatoryName2}
                          placeholder="Signatory Name"
                          onChange={handleChange}
                          id="signatoryName2"
                        />
                        {signatoryName2isEdit ? (
                          <button onClick={handleSave}>Save</button>
                        ) : (
                          <button onClick={() => setSignatoryName2isEdit(true)}>
                            Edit
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={styles.signatoryItemContainer}>
                      <h4>Title</h4>
                      <div className={styles.signatoryFormItem}>
                        <input
                          type="text"
                          className={
                            signatoryTitle2isEdit ? "" : styles.itemSaved
                          }
                          disabled={!signatoryTitle2isEdit}
                          value={signatoryTitle2}
                          placeholder="Signatory Name"
                          onChange={handleChange}
                          id="signatoryTitle2"
                        />
                        {signatoryTitle2isEdit ? (
                          <button onClick={handleSave}>Save</button>
                        ) : (
                          <button
                            onClick={() => setSignatoryTitle2isEdit(true)}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className={styles.settingsPartTitle}>
            <b>Email Settings</b>
          </h2>
          <div className={styles.emailDetailsContainer}>
            <div className={styles.companyEmailSettingsContainer}>
              <h3>
                <b>Company Email</b>
              </h3>
              <input
                type="text"
                id="companyEmail"
                value={companyEmail}
                placeholder="Company Email"
                onChange={handleChange}
                disabled={!companyEmailisEdit}
                className={companyEmailisEdit ? "" : styles.itemSaved}
              />

              {companyEmailisEdit ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => setCompanyEmailisEdit(true)}>
                  Edit
                </button>
              )}
            </div>

            {/*************************************************/}
            <div className={styles.border}></div>

            <div className={styles.companyEmailSettingsContainer}>
              <h3>
                <b>Subject</b>
              </h3>
              <input
                type="text"
                id="defaultSubject"
                value={defaultSubject}
                placeholder="Subject"
                onChange={handleChange}
                disabled={!defaultSubjectisEdit}
                className={defaultSubjectisEdit ? "" : styles.itemSaved}
              />

              {defaultSubjectisEdit ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => setDefaultSubjectisEdit(true)}>
                  Edit
                </button>
              )}
            </div>

            {/*************************************************/}
            <div className={styles.border}></div>

            <div className={styles.emailSalutationSettingsContainer}>
              <div>
                <h3>
                  <b>Default Salutation</b>
                </h3>
                {salutationisEdit ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => setSalutationisEdit(true)}>
                    Edit
                  </button>
                )}
              </div>

              <div>
                <p>
                  <i>
                    <b>Note: </b>Use <b>[Intern First Name]</b>,{" "}
                    <b>[Intern Middle Name]</b>, and <b>[Intern Last Name]</b>{" "}
                    as placeholders.{" "}
                  </i>
                </p>
              </div>

              <textarea
                type="text"
                id="emailSalutation"
                value={salutation}
                placeholder="Email Salutation"
                onChange={handleChange}
                disabled={!salutationisEdit}
                className={salutationisEdit ? "" : styles.itemSaved}
              />
            </div>

            {/*************************************************/}
            <div className={styles.border}></div>

            <div className={styles.defaultMessageSettingsContainer}>
              <div>
                <h3>
                  <b>Default Message</b>
                </h3>
                {defaultMessageisEdit ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => setDefaultMessageisEdit(true)}>
                    Edit
                  </button>
                )}
              </div>

              <textarea
                type="text"
                id="defaultMessage"
                value={defaultMessage}
                placeholder="Default Message"
                onChange={handleChange}
                disabled={!defaultMessageisEdit}
                className={defaultMessageisEdit ? "" : styles.itemSaved}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralSettings;
