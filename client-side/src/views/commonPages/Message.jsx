import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import "../../styles/Message.css";
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Message(){
    const {id} = useParams();
    const history = useHistory();

    const token = localStorage.getItem("authTokens");
    const decoded = jwtDecode(token);

    const user_id = decoded.user_id;

    return (
      <div className="message row row-auto w-100">
        <div className="message-first-col col col-auto shadow col-4 min-vh-100">
          <form action="" className="d-flex p-2 bg-light">
            <input
              type="text"
              className="form-control rounded-0 bg-light"
              placeholder="Search..."
            />
            <button className="btn btn-secondary rounded-0">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
          <div className="message-account row row-auto ps-2 pe-1 pt-3 pb-2 w-100">
            <div className=" message-account-pic col col-auto col-lg-2 col-sm-3">
              <img
                src="../Images/landingpage/man.png"
                alt=""
                className="img-fluid"
                width={40}
                height={40}
              />
            </div>
            <div className="col col-auto col-lg-7 col-sm-6 mt-1">
              <h6 className="fs-12" style={{ fontSize: "14px" }}>
                Yeabsra Habtu
              </h6>
              <h6 className="fw-light" style={{ fontSize: "14px" }}>
                Some of the last message
              </h6>
            </div>
            <div className="col col-lg-3 col-sm-3 mt-1 text-lg-end">
              <h6 className="fw-light" style={{ fontSize: "14px" }}>
                1:00 am
              </h6>
            </div>
          </div>
          <div className="message-account row row-auto ps-2 pe-1 pt-3 pb-2 w-100">
            <div className=" message-account-pic col col-auto col-lg-2 col-sm-3">
              <img
                src="../Images/landingpage/man.png"
                alt=""
                className="img-fluid"
                width={40}
                height={40}
              />
            </div>
            <div className="col col-auto col-lg-7 col-sm-6 mt-1">
              <h6 className="fs-12" style={{ fontSize: "14px" }}>
                Yeabsra Habtu
              </h6>
              <h6 className="fw-light" style={{ fontSize: "14px" }}>
                Some of the last message
              </h6>
            </div>
            <div className="col col-lg-3 col-sm-3 mt-1 text-lg-end">
              <h6 className="fw-light" style={{ fontSize: "14px" }}>
                1:00 am
              </h6>
            </div>
          </div>
        </div>
        <div className="col d-block col-8 col-sm-0 p-0 m-0">
          <div className="min-vh-100 border p-3">
            <h6 className="fw-light position-relative text-end">
              this is the message from sender
            </h6>
            <h6 className="fw-light position-relative text-start">
              this is the message from receiver
            </h6>
          </div>
          <div className="write-message flex-grow-0 w-100">
            <form action="" className="d-flex">
              <input
                type="text"
                placeholder="write a message..."
                className="form-control rounded-0"
              />
              <button className="btn btn-secondary rounded-0">
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}
