import React, { Component } from "react";
import "../../styles/Profile.css";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="profile-page">
      {/* <div
        className="row row-auto bg-black p-0 m-0 w-100 no-border-radius"
        style={{ height: "9vw" }}
      >
        <input type="file" className="" />
      </div> */}
      <div
        className="row row-auto p-0 m-4 d-flex justify-content-between"
      >
        <div className="col col-auto col-lg-3 col-md-3 col-sm-4 mb-3 mt-2 me-5 ms-5">
          <div className="card">
            <div className="card-header text-center">
              <img
                src="../Images/landingPage/man.png"
                alt=""
                className="img-fluid w-100"
                style={{
                  width: "20vw",
                  height: "20vw",
                  objectFit: "contient",
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              />
              <h5 className="fs-6">Yeabsra Habtu</h5>
              <h6 className="fw-light">Client</h6>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col w-100 p-0 mt-2 shadow" >
          <div className="card">
            <div className="card-header">
              <div className="col d-flex justify-content-between p-2 text-center">
                <Link
                  className="fs-6"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Account setting
                </Link>
                <Link
                  className="fs-6"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Documents
                </Link>
                <Link
                  className="fs-6"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Billing
                </Link>
                <Link
                  className="fs-6"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Notfication
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form action="">
                <div className="row w-100 custom-row">
                  <div className="col col-auto col-lg-6 mb-3">
                    <label
                      htmlFor="firstName"
                      style={{ width: "max-content" }}
                      className="form-label m-0 p-0"
                    >
                      {"First name "}
                    </label>
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="First name"
                      id="firstName"
                      style={{ width: "auto" }}
                    />
                  </div>
                  <div className="col col-auto col-lg-6">
                    <label
                      htmlFor="lastName"
                      style={{ width: "max-content" }}
                      className="form-label m-0"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="Last name"
                      id="lastName"
                    />
                  </div>
                </div>
                <div className="row m-0 w-100">
                  <div className="col col-auto col-lg-6">
                    <label
                      htmlFor="phoneNumber"
                      style={{ width: "max-content" }}
                      className="form-label m-0 p-0"
                    >
                      Phone number
                    </label>
                    <input
                      type="tel"
                      className="form-control w-100 mb-3"
                      placeholder="Phone number"
                      id="phoneNumber"
                      style={{ width: "auto" }}
                    />
                  </div>
                  <div className="col col-auto col-lg-6">
                    <label
                      htmlFor="email"
                      style={{ width: "max-content" }}
                      className="form-label m-0"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control w-100"
                      placeholder="Email address"
                      id="email"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
