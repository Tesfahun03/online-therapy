import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/therapistregister.css";
import { useTranslation } from "react-i18next";
import AuthContext from "../../context/AuthContext";
import CryptoJS from "crypto-js";

export default function RegisterTherapist() {
  const [t, i18n] = useTranslation("global");
  const [selectedLanguage, setSelectedLanguage] = useState("english"); // State to store selected language

  useEffect(() => {
    // Check if a language is saved in local storage
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage); // Set selected language from local storage
    }
  }, []);

  const handleChangeLanguage = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    setSelectedLanguage(language); // Update selected language in state
    localStorage.setItem("preferredLanguage", language); // Save selected language in local storage
  };

  const [registerTherapistData, setRegisterTherapistData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    username: "",
    password: "",
    confirmPassword: "",
    //image:null,
    bio: "",
    gender: "",
    age: "",
    martialStatus: "",
    languagePreference: "",
    city: "",
    region: "",
    phoneNumber: "",
    specialization: "",
    experience: "",
    religion: "",
    licenses: "",
  });

  const { registerTherapist } = useContext(AuthContext);

  function handleRegisterTherapistData(event) {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setRegisterTherapistData((prevRegisterData) => ({
        ...prevRegisterData,
        [name]: files[0],
      }));
    } else {
      setRegisterTherapistData((prevRegisterData) => ({
        ...prevRegisterData,
        [name]: value,
      }));
    }
  }

  // Function to generate public and private keys
  const generateKeys = () => {
    const publicKey = CryptoJS.lib.WordArray.random(16); // Generate random key for public key
    return {
      publicKey: CryptoJS.enc.Base64.stringify(publicKey),
    };
  };

  const handleRegisterTherapistSubmit = async (e) => {
    e.preventDefault();

    const first_name = registerTherapistData.firstName;
    const last_name = registerTherapistData.lastName;
    const email = registerTherapistData.emailAddress;
    const username = registerTherapistData.username;
    const password = registerTherapistData.password;
    const password2 = registerTherapistData.confirmPassword;
    const user_type = "therapist";
    //const image = registerTherapistData.image
    const bio = registerTherapistData.bio;
    const prefered_language = registerTherapistData.languagePreference;
    const age = registerTherapistData.age;
    const gender = registerTherapistData.gender;
    const martial_status = registerTherapistData.martialStatus;
    const phone = registerTherapistData.phoneNumber;
    const city = registerTherapistData.city;
    const region = registerTherapistData.region;
    const specialization = registerTherapistData.specialization;
    const experience = registerTherapistData.experience;
    const licenses = registerTherapistData.licenses;
    const religion = registerTherapistData.religion;

    // Generate keys
    const { publicKey } = generateKeys();
    console.log("Public Key:", publicKey);

    const therapistData = {
      profile: {
        user: {
          email,
          username,
          password,
          password2,
        },
        user_type,
        first_name,
        last_name,
        //image,
        bio,
        prefered_language,
        age,
        gender,
        martial_status,
        phone,
        city,
        region,
        publicKey,
      },
      specialization,
      experience,
      licenses,
      religion,
    };

    registerTherapist(therapistData);
  };

  return (
    <div className="registerTherapist">
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
      <div className="container">
        <div className="welcome-title">
          <h3>{t("register.welcomeTitle")}</h3>
          <p>{t("register.therapistRegisterInfo")}</p>
        </div>
        <div className="reg-thera-form">
          <div className="reg-thera-card-header">
            <h4>{t("register.therapistRegisterHeader")}</h4>
            <h6 className="fw-light mt-2 mb-0">Therapist Registration Page</h6>
          </div>
          <form
            onSubmit={handleRegisterTherapistSubmit}
            encType="multipart/form-data"
          >
            <div className="form-outline d-flex">
              <input
                type="text"
                id="first-name"
                placeholder={t("register.registerFirstName")}
                name="firstName"
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
              <input
                type="text"
                id="last-name"
                placeholder={t("register.registerLastName")}
                name="lastName"
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
            </div>
            <div className="form-outline d-flex">
              <input
                type="email"
                id="email-address"
                placeholder={t("register.registerEmailAddress")}
                name="emailAddress"
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
              <input
                type="text"
                id="user-name"
                placeholder={t("register.registerUserName")}
                name="username"
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
            </div>
            <div className="form-outline d-flex">
              <input
                type="password"
                id="password"
                placeholder={t("register.registerPassword")}
                name="password"
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
              <input
                type="password"
                id="confirm-password"
                placeholder={t("register.registerConfirmPassword")}
                name="confirmPassword"
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
            </div>
            <div className="form-outline d-flex">
              <select
                name="gender"
                className="formSelect"
                required
                id="gender"
                onChange={handleRegisterTherapistData}
              >
                <option value="" className="SelectOptionDefault">
                  {t("register.registerGender")}
                </option>
                <option value="MALE">{t("register.registerGenderMale")}</option>
                <option value="FEMALE">
                  {t("register.registerGenderFemale")}
                </option>
              </select>
              <input
                type="number"
                id="age"
                placeholder={t("register.registerAge")}
                name="age"
                min={21}
                max={105}
                step={1}
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
            </div>

            <div className="form-outline d-flex">
              <select
                name="martialStatus"
                className="formSelect"
                id="martial-status"
                onChange={handleRegisterTherapistData}
              >
                <option value="" className="SelectOptionDefault">
                  {t("register.registerMartialStatus")}
                </option>
                <option value="SINGLE">
                  {t("register.registerMartialStatus1")}
                </option>
                <option value="MARRIED">
                  {t("register.registerMartialStatus2")}
                </option>
                <option value="DIVORCED">
                  {t("register.registerMartialStatus3")}
                </option>
              </select>
              <select
                name="languagePreference"
                className="formSelect"
                id="language-preference"
                onChange={handleRegisterTherapistData}
              >
                <option value="" className="SelectOptionDefault">
                  {t("register.registerLanguagePreference")}
                </option>
                <option value="AMHARIC">Amharic</option>
                <option value="OROMIFA">Oromifa</option>
                <option value="SOMALLI">Somalli</option>
                <option value="TIGRIGNA">Tigrigna</option>
                <option value="ENGLISH">English</option>
              </select>
            </div>

            <div className="form-outline d-flex">
              <input
                type="text"
                id="city"
                name="city"
                placeholder={t("register.registerCity")}
                className="form-control"
                onChange={handleRegisterTherapistData}
              />

              <input
                type="text"
                name="region"
                placeholder={t("register.registerRegion")}
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
            </div>

            <div className="form-outline d-flex">
              <input
                type="tel"
                id="phonenumber"
                name="phoneNumber"
                placeholder={t("register.registerPhoneNumber")}
                className="form-control"
                onChange={handleRegisterTherapistData}
                data-mdb-input-mask="999-999-999?9"
              />
              <input
                type="text"
                name="specialization"
                placeholder={t("register.registerSpecialization")}
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
            </div>

            <div className="form-outline d-flex">
              <input
                type="text"
                id="experience"
                placeholder={t("register.registerExperience")}
                name="experience"
                className="form-control"
                onChange={handleRegisterTherapistData}
              />
              <select
                name="religion"
                className="formSelect select-arrow"
                id="religion"
                onChange={handleRegisterTherapistData}
              >
                <option value="" className="SelectOptionDefault">
                  {t("register.registerReligion")}
                </option>
                <option value="ORTHODOX">Orthodox</option>
                <option value="PROTESTANT">Protestant</option>
                <option value="MUSLIM">Muslim</option>
                <option value="CHATHOLIC">Chatholic</option>
              </select>
            </div>

            <div className="form-outline text-start d-block align-items-start">
              <label htmlFor="fileInput">
                {t("register.registerLabelLiscence")}
              </label>
              <input
                type="file"
                id="fileInput"
                className="form-control"
                name="licenses"
                onChange={handleRegisterTherapistData}
              />
            </div>
            <button>{t("register.registerBtn")}</button>
            <Link
              to=""
              style={{
                textDecoration: "none",
                color: "brown",
                fontWeight: "500",
              }}
            >
              <p className="p-0 mt-1 mb-1">
                {t("register.registerForgetPassword")}
              </p>
            </Link>
            <p className="mb-1">
              {t("register.registerHaveAccount")}{" "}
              <Link
                to="/login-t"
                style={{
                  textDecoration: "none",
                  color: "brown",
                  fontWeight: "500",
                }}
              >
                Sign in
              </Link>
            </p>
            <p className="m-0 p-0">
              <Link
                to="/register-p"
                style={{
                  textDecoration: "none",
                  color: "brown",
                  fontWeight: "500",
                }}
              >
                Register as a client
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
