import React, { Component } from "react";
import "../../styles/Profile.css";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="profile-page p-0 m-0">
      <div
        className="row row-auto bg-black m-0 w-100 "
        style={{ height: "9vw" }}
      >
        <input type="file" className="" />
      </div>
      <div className="row d-flex justify-content-between py-5 m-0">
        <div className="col col-auto col-3">
          <div className="card">
            <div className="card-header">
              <img
                src="../Images/home/Bean.png"
                alt=""
                className="Img-fluid"
                style={{
                  width: "50%",
                  height: "10vw",
                  objectFit: "contient",
                  border: "1px solid black",
                  borderRadius: "50%",
                }}
              />
              <h3>Yeabsra Habtu</h3>
              <h6 className="fw-light">Client</h6>
            </div>
            <div className="card-body"></div>
          </div>
        </div>
        <div
          className="col col-auto"
          style={{ width: "75%", border: "1px solid black" }}
        >
          <div className="card">
            <div className="card-header">
              <div className="col d-flex justify-content-between p-2">
                <Link
                  className="fs-5"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Account setting
                </Link>
                <Link
                  className="fs-5"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Documents
                </Link>
                <Link
                  className="fs-5"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Billing
                </Link>
                <Link
                  className="fs-5"
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  Notfication
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form action="">
                <div className="row m-0 p-0">
                  <div className="col col-auto col-lg-5">
                    <label htmlFor="firstName" style={{ width: "max-content" }}>
                      {" "}
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      id="firstName"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col col-auto col-lg-5">
                    <label htmlFor="lastName" style={{ width: "max-content" }}>
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      id="lastName"
                      style={{ width: "100%" }}
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
