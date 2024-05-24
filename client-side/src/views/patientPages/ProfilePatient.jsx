import React, { useState, useEffect} from "react";
import "../../styles/Profile.css";
import { useTranslation } from "react-i18next";
import jwtDecode from "jwt-decode";

export default function ProfilePatient() {
  const [t, i18n] = useTranslation("global");
    const [selectedLanguage, setSelectedLanguage] = useState("english"); 

    useEffect(() => {
        const savedLanguage = localStorage.getItem("preferredLanguage");
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
            setSelectedLanguage(savedLanguage); 
        }
    }, [i18n]);

    const handleChangeLanguage = (e) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
        setSelectedLanguage(language); 
        localStorage.setItem("preferredLanguage", language); 
    };

  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);

  const [activeButton, setActiveButton] = useState("AccountSetting");

  function handleButtonId(buttonId) {
    if (buttonId != activeButton) {
      setActiveButton(buttonId);
    }
  };


  return (
    <div className="profile-page">
      <div className="languageForTranslate">
          <select
              className="preferedLanguage"
              onChange={handleChangeLanguage}
              value={selectedLanguage} // Set value to the selected language
          >
              <option value="english">English</option>
              <option value="amharic">Amharic</option>
              <option value="oromo">Oromo</option>
              <option value="sumalic">Sumalic</option>
              <option value="tigrigna">Tigrigna</option>
          </select>
      </div>
      <div className="row row-auto p-0 m-4 d-flex justify-content-between profile-contianer">
        <div className="col col-auto col-lg-3 col-md-3 col-sm-4 mb-3 mt-2 me-5 ms-5 profile-pic-container">
          <div className="card profile-pic-info">
            <div className="card-header text-center profile-pic-info-header">
              <img
                src="../Images/landingPage/man.png"
                alt=""
                className="img-fluid w-100"
              />
              <h5 className="fs-6">Yeabsra Habtu</h5>
              <h6 className="fw-light">Client</h6>
            </div>
            <div className="card-body profile-pic-info-body"></div>
          </div>
        </div>
        <div className="col w-100 p-0 mt-2 shadow profile-data-info">
          <div className="card profile-data-card">
            <div className="card-header d-flex justify-content-between p-2 m-2 text-center profile-data-header">
              <h6
                style={{
                  color: `${
                    activeButton === "AccountSetting" ? "black" : "gray"
                  }`,
                }}
                onClick={() => handleButtonId("AccountSetting")}
              >
                {t("profile.accountSetting")}
              </h6>
              <>
                <h6
                  style={{
                    color: `${
                      activeButton === "ChangePassword" ? "black" : "gray"
                    }`,
                  }}
                  onClick={() => handleButtonId("ChangePassword")}
                >
                  {t("profile.changePassword")}
                </h6>
              </>
              <h6
                style={{
                  color: `${
                    activeButton === "AdditionalInformation" ? "black" : "gray"
                  }`,
                }}
                onClick={() => handleButtonId("AdditionalInformation")}
              >
                {t("profile.additionalInformation")}
              </h6>
              <h6
                style={{
                  color: `${
                    activeButton === "Notification" ? "black" : "gray"
                  }`,
                }}
                onClick={() => handleButtonId("Notification")}
              >
                {t("profile.notification")}
              </h6>
            </div>
            <div className="card-body profile-data-body">
              {activeButton === "AccountSetting" && (
                <form action="">
                  <div className="row profile-input-row w-100">
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="firstName"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.firstName")}
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 profile-input"
                        placeholder={t("profile.firstName")}
                        id="firstName"
                        style={{ width: "auto" }}
                      />
                    </div>
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="lastName"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.lastName")}
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 profile-input"
                        placeholder={t("profile.lastName")}
                        id="lastName"
                      />
                    </div>
                  </div>
                  <div className="row profile-input-row w-100">
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="phoneNumber"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.phoneNumber")}
                      </label>
                      <input
                        type="tel"
                        className="form-control w-100 profile-input"
                        placeholder={t("profile.phoneNumber")}
                        id="phoneNumber"
                        style={{ width: "auto" }}
                      />
                    </div>
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="email"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.emailAddress")}
                      </label>
                      <input
                        type="email"
                        className="form-control w-100 profile-input"
                        placeholder={t("profile.emailAddress")}
                        id="email"
                      />
                    </div>
                  </div>
                  <div className="row profile-input-row w-100">
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="gender"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.gender")}
                      </label>
                      <select
                        name="gender"
                        className="form-control w-100 profile-input"
                        id="gender"
                      >
                        <option value="MALE">{t("profile.male")}</option>
                        <option value="FEMALE">{t("profile.female")}</option>
                      </select>
                    </div>
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="age"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.age")}
                      </label>
                      <input
                        type="number"
                        id="age"
                        placeholder={t("profile.age")}
                        name="age"
                        min={21}
                        max={105}
                        step={1}
                        className="form-control w-100 profile-input"
                      />
                    </div>
                  </div>
                  <div className="row profile-input-row w-100">
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="city"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.city")}
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 profile-input"
                        placeholder={t("profile.city")}
                        id="city"
                      />
                    </div>
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="region"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.region")}
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 profile-input"
                        placeholder={t("profile.region")}
                        id="region"
                      />
                    </div>
                  </div>
                  <div className="row profile-input-row w-100">
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="martial-status"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1 profile-input"
                      >
                        {t("profile.maritalStatus")}
                      </label>
                      <select
                        name="martialStatus"
                        className="form-select w-100 profile-input"
                        id="martial-status"
                      >
                        <option value="SINGLE">{t("profile.single")}</option>
                        <option value="MARRIED">{t("profile.married")}</option>
                        <option value="DIVORCED">{t("profile.divorced")}</option>
                      </select>
                    </div>
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="language-preference"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        {t("profile.languagePreference")}
                      </label>
                      <select
                        name="languagePreference"
                        className="form-select w-100 profile-input"
                        id="language-preference"
                      >
                        <option value="AMHARIC">Amharic</option>
                        <option value="OROMIFA">Oromifa</option>
                        <option value="SOMALLI">Somalli</option>
                        <option value="TIGRIGNA">Tigrigna</option>
                        <option value="ENGLISH">English</option>
                      </select>
                    </div>
                  </div>
                  <label
                    htmlFor="occupation"
                    style={{ width: "max-content" }}
                    className="form-label m-0 p-0 ms-2 mb-1 "
                  >
                    {t("profile.occupation")}
                  </label>
                  <select
                    name="occupation"
                    className="form-select w-100 mb-4 profile-input"
                    id="occupation"
                  >
                    <option value="">{t("profile.occupation")}</option>
                    <option value="STUDENT">Student</option>
                    <option value="EMPLOYED">Employed</option>
                    <option value="SELFEMPLOYED">Self-Employed</option>
                    <option value="UNEMPLOYED">Unemployed</option>
                  </select>

                  <button
                    className="btn btn-primary ms-2 profile-button"
                    style={{ width: "25%" }}
                  >
                    {t("profile.update")}
                  </button>
                </form>
              )}
              {activeButton === "ChangePassword" && (
                <div>
                  <form action="">
                    <label
                      htmlFor="current-password"
                      style={{ width: "max-content" }}
                      className="form-label m-0 p-0 ms-2 mb-1"
                    >
                      {t("profile.currentPassword")}
                    </label>
                    <input
                      type="text"
                      className="form-control w-100 profile-input mb-3"
                      placeholder={t("profile.currentPassword")}
                      id="current-password"
                    />
                    <label
                      htmlFor="new-password"
                      style={{ width: "max-content" }}
                      className="form-label m-0 p-0 ms-2 mb-1"
                    >
                      {t("profile.newPassword")}
                    </label>
                    <input
                      type="text"
                      className="form-control w-100 profile-input mb-3"
                      placeholder={t("profile.newPassword")}
                      id="new-password"
                    />
                    <label
                      htmlFor="confirm-password"
                      style={{ width: "max-content" }}
                      className="form-label m-0 p-0 ms-2 mb-1"
                    >
                      {t("profile.confirmPassword")}
                    </label>
                    <input
                      type="text"
                      className="form-control w-100 profile-input mb-4"
                      placeholder={t("profile.confirmPassword")}
                      id="confirm-password"
                    />

                    <button className="btn btn-primary ms-1">{t("profile.updatePassword")}</button>
                  </form>
                </div>
              )}
              {activeButton === "AdditionalInformation" && (
                <div>This is Additional Information section</div>
              )}
              {activeButton === "Notification" && (
                <div>This is Notification section</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
