import React, { Component } from "react";
import "../../styles/CommunitySpace.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default function CommunitySpace() {
  return (
    <div className="CommunitySpace">
      <div className="row m-0 p-0">
        <div className="col col-auto col-md-3 col-sm-2.5 col-lg-2 min-vh-50 shadow">
          <h5>Column 1</h5>
        </div>
        <div className="col">
          <form className="d-flex align-items-center mt-5">
            <input
              className="form-control ms-5 rounded-0"
              placeholder="Start post"
            />
            <button className="btn btn-secondary rounded-0">
              <FontAwesomeIcon icon={faPlusSquare}/>
            </button>
          </form>
          <div className="card mt-4 ms-5 m-0 p-0 mb-5 shadow">
            <div className="card-header bg-white m-0 p-1">
              <div className="row d-flex align-items-center justify-content-between m-0 p-0">
                <div className="col col-auto d-flex align-items-center mb-2">
                  <img src="" alt="profile pic" />
                  <div className="col col-auto d-block align-items-left ms-3">
                    <h6 className="fw-bold ms-1 d-flex justify-content-between">
                      Yeabsra Habtu<span className="ms-1 fw-light">1hr</span>
                    </h6>
                    <h6 className="fw-light ms-0">
                      Posted in community space
                    </h6>
                  </div>
                </div>
                <div className="col col-auto">This is the column</div>
              </div>
            </div>
            <div className="card-body d-flex flex-column">
              <p className="card-text d-block w-1" style={{textAlign:"left"}}>
                This is the text inside the card
              </p>
              <img
                src="../Images/home/Bean.png"
                alt=""
                className="border"
                
              />
              <div className="d-flex align-items-center mt-2">
                <img
                  src=""
                  alt="Profile pictuer of some of the person like this post"
                />
                <span className="d-block ms-4">Liked by Yeabsra Habtu</span>
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex align-items-center justify-content-between m-0 p-0">
                <div className="col col-auto p-0">
                  <span>Like</span>
                  <span className="ms-2">Comment</span>
                </div>
                <div className="col col-auto">
                  <h6 className="fw-light">0 Comment</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
