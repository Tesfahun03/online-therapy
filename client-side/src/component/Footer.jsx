import React, { Component } from "react";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import "../styles/Footer.css";

export default function Footer() {
  const videoMatchTherapist = useRouteMatch("/videochat-t/:id");
  const videoMatchPatient = useRouteMatch("/videochat-p/:id");
  const messageMatch = useRouteMatch("/message/:id");
  const messageBox = useRouteMatch("/message-box")
  const match = videoMatchPatient|| videoMatchTherapist || messageMatch || messageBox;
  return (
    <>
      {!match && (
        <div
          className="footer d-flex justify-content-between align-items-center text-white fw-bold p-3 bottom-0"
          style={{ position: "bottom" }}
        >
          <h6>@ BunnaMind 2024</h6>
          <div className="d-flex">
            <h6 className="mr-5">Privacy and Policy</h6>
            <h6 className="ms-5">Term and condition</h6>
          </div>
          <div className="icon d-flex flex-column justify-content-between">
            <h6>FaceBook</h6>
            <h6>LinkedIn</h6>
            <h6>Instagram</h6>
            <h6>X</h6>
          </div>
        </div>
      )}
    </>
  );
}
