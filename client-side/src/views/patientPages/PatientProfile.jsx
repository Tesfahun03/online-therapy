import React, { useState } from "react";
import "../../styles/Profile.css";
import jwtDecode from "jwt-decode";

export default function Profile() {

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
                Account Setting
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
                  Change Password
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
                Additional Infromation
              </h6>
              <h6
                style={{
                  color: `${
                    activeButton === "Notification" ? "black" : "gray"
                  }`,
                }}
                onClick={() => handleButtonId("Notification")}
              >
                Notification
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
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 profile-input"
                        placeholder="First name"
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
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 profile-input"
                        placeholder="Last name"
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
                        Phone number
                      </label>
                      <input
                        type="tel"
                        className="form-control w-100 profile-input"
                        placeholder="Phone number"
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
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control w-100 profile-input"
                        placeholder="Email address"
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
                        Gender
                      </label>
                      <select
                        name="gender"
                        className="form-control w-100 profile-input"
                        id="gender"
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="age"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        placeholder="Age"
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
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 profile-input"
                        placeholder="City"
                        id="city"
                      />
                    </div>
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="region"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        Region
                      </label>
                      <input
                        type="text"
                        className="form-control w-100 profile-input"
                        placeholder="Region"
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
                        Martial Status
                      </label>
                      <select
                        name="martialStatus"
                        className="form-select w-100 profile-input"
                        id="martial-status"
                      >
                        <option value="SINGLE">Single</option>
                        <option value="MARRIED">Married</option>
                        <option value="DIVORCED">Divorced</option>
                      </select>
                    </div>
                    <div className="col col-auto col-lg-6 mb-3 profile-input-column">
                      <label
                        htmlFor="language-preference"
                        style={{ width: "max-content" }}
                        className="form-label m-0 p-0 ms-2 mb-1"
                      >
                        Language preference
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
                    Occupation
                  </label>
                  <select
                    name="occupation"
                    className="form-select w-100 mb-4 profile-input"
                    id="occupation"
                  >
                    <option value="">Occupation</option>
                    <option value="STUDENT">Student</option>
                    <option value="EMPLOYED">Employed</option>
                    <option value="SELFEMPLOYED">Self-Employed</option>
                    <option value="UNEMPLOYED">Unemployed</option>
                  </select>

                  <button
                    className="btn btn-primary ms-2 profile-button"
                    style={{ width: "25%" }}
                  >
                    Update
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
                      Current Password
                    </label>
                    <input
                      type="text"
                      className="form-control w-100 profile-input mb-3"
                      placeholder="Current password"
                      id="current-password"
                    />
                    <label
                      htmlFor="new-password"
                      style={{ width: "max-content" }}
                      className="form-label m-0 p-0 ms-2 mb-1"
                    >
                      New password
                    </label>
                    <input
                      type="text"
                      className="form-control w-100 profile-input mb-3"
                      placeholder="New password"
                      id="new-password"
                    />
                    <label
                      htmlFor="confirm-password"
                      style={{ width: "max-content" }}
                      className="form-label m-0 p-0 ms-2 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="text"
                      className="form-control w-100 profile-input mb-4"
                      placeholder="Confirm password"
                      id="confirm-password"
                    />

                    <button className="btn btn-primary ms-1">Update Password</button>
                  </form>
                </div>
              )}
              {activeButton === "AdditionalInformation" && (
                <div>This is AdditionalInformation section</div>
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
