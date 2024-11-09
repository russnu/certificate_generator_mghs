import React, { createContext, useState, useEffect } from "react";
import pica from "pica";
import baseUrl from "../../config";

// Function to convert image to base64
const imageToBase64 = (imageUrl, callback) => {
  const img = new Image();
  img.crossOrigin = "Anonymous"; // This is important to avoid CORS issues
  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    callback(dataURL);
  };
  img.src = imageUrl;
};

// Function to compress base64 image
const compressImage = (base64Image, callback) => {
  const img = new Image();
  img.src = base64Image;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Create a smaller canvas size
    const targetWidth = 500; // Adjust as necessary
    const targetHeight = (img.height / img.width) * targetWidth;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Use Pica to resize and compress the image
    pica()
      .resize(img, canvas, {
        quality: 2,
        alpha: true,
      })
      .then((resizedCanvas) => {
        return pica().toBlob(resizedCanvas, "image/png", 0.7); // Adjust quality as needed
      })
      .then((blob) => {
        const compressedLogoURL = URL.createObjectURL(blob);
        callback(compressedLogoURL);
      })
      .catch(console.error);
  };
};

//==============================================================================//

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // ================== Logo ================== //
  const [logo, setLogo] = useState(null);

  // ================== Signatures ================== //
  const [signature1, setSignature1] = useState(null);
  const [signature2, setSignature2] = useState(null);

  // ================== Company Name ================== //
  const [companyName, setCompanyName] = useState("");

  // ================== Signatories ================== //
  const [signatoryName1, setSignatoryName1] = useState("");
  const [signatoryName2, setSignatoryName2] = useState("");
  const [signatoryTitle1, setSignatoryTitle1] = useState("");
  const [signatoryTitle2, setSignatoryTitle2] = useState("");

  // ================== Boolean ================== //
  const [uploadComplete, setUploadComplete] = useState(false);

  // ================== Email ================== //
  const [companyEmail, setCompanyEmail] = useState("");
  const [defaultSubject, setDefaultSubject] = useState("");
  const [salutation, setSalutation] = useState("");
  const [defaultMessage, setDefaultMessage] = useState("");

  const fetchSettings = async () => {
    try {
      const response = await fetch(baseUrl + "getSettings.php");
      const data = await response.json();

      if (data.success) {
        data.settingsData.forEach((setting) => {
          switch (setting.setting_name) {
            case "company_name":
              setCompanyName(setting.setting_value);
              break;
            case "logo":
              const logoUrl = baseUrl + setting.setting_value;
              imageToBase64(logoUrl, (base64Image) => {
                compressImage(base64Image, (compressedLogoURL) => {
                  setLogo(compressedLogoURL);
                });
              });
              break;
            case "signature1":
              const signature1Url = baseUrl + setting.setting_value;
              imageToBase64(signature1Url, (base64Image) => {
                compressImage(base64Image, (compressedsignature1URL) => {
                  setSignature1(compressedsignature1URL);
                });
              });
              break;
            case "signature2":
              const signature2Url = baseUrl + setting.setting_value;
              imageToBase64(signature2Url, (base64Image) => {
                compressImage(base64Image, (compressedsignature2URL) => {
                  setSignature2(compressedsignature2URL);
                });
              });
              break;
            case "signatory_name1":
              setSignatoryName1(setting.setting_value);
              break;
            case "signatory_name2":
              setSignatoryName2(setting.setting_value);
              break;
            case "signatory_title1":
              setSignatoryTitle1(setting.setting_value);
              break;
            case "signatory_title2":
              setSignatoryTitle2(setting.setting_value);
              break;
            case "company_email":
              setCompanyEmail(setting.setting_value);
              break;
            case "default_subject":
              setDefaultSubject(setting.setting_value);
              break;
            case "email_salutation":
              setSalutation(setting.setting_value);
              break;
            case "default_message":
              setDefaultMessage(setting.setting_value);
              break;
            default:
              break;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [uploadComplete]);

  return (
    <SettingsContext.Provider
      value={{
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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
