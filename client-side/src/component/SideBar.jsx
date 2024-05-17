import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendar,
  faDashboard,
  faNoteSticky,
  faPeopleCarry,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const [activeButton, setActiveButton] = useState("Dashboard");
  const location = useLocation();

  function handleButtonId(buttonId) {
    if (buttonId != activeButton) {
      setActiveButton(buttonId);
    }
  }
  const color = "burlywood";
  const style = {
    textDecoration: "none",
    color: "black",
  };

  return (
    <div className="therapist-sidebar col col-auto col-lg-2 col-md-2 col-sm-3 min-vh-100 shadow">
      <Link to="/therapist-dashboard" style={style}>
        <div
          className="row mt-4 p-1 ms-1 me-1 rounded"
          style={{
            background:
              location.pathname === "/therapist-dashboard" ? `${color}` : "",
            cursor: "pointer",
          }}
        >
          <h6 className="fw-light" onClick={() => handleButtonId("Dashboard")}>
            <FontAwesomeIcon icon={faDashboard} /> Dashboard
          </h6>
        </div>
      </Link>

      <Link to="/therapist-appointments" style={style}>
        <div
          className="row mt-4 p-1 ms-1 me-1 rounded"
          style={{
            textDecoration: "none",
            background:
              location.pathname === "/therapist-appointments" ? `${color}` : "",
            cursor: "pointer",
          }}
        >
          <h6
            className="fw-light"
            onClick={() => handleButtonId("Appointments")}
          >
            <FontAwesomeIcon icon={faCalendar} /> Appointments
          </h6>
        </div>
      </Link>

      {/* <div
        className="row mt-4 p-1 ms-1 me-1 rounded"
        style={{
          textDecoration: "none",
          background:
            location.pathname === "/therapist-patients" ? `${color}` : "",
          cursor: "pointer",
        }}
      >
        <h6 className="fw-light" onClick={() => handleButtonId("Patients")}>
          <FontAwesomeIcon icon={faPeopleCarry} /> Patients
        </h6>
      </div> */}

      <Link to="/therapist-notification" style={style}>
        <div
          className="row mt-4 p-1 ms-1 me-1 rounded"
          style={{
            textDecoration: "none",
            background:
              location.pathname === "/therapist-notification" ? `${color}` : "",
            cursor: "pointer",
          }}
        >
          <h6
            className="fw-light"
            onClick={() => handleButtonId("Notification")}
          >
            <FontAwesomeIcon icon={faBell} /> Notification
          </h6>
        </div>
      </Link>

      <Link to="/therapist-reports" style={style}>
        <div
          className="row mt-4 p-1 ms-1 me-1 rounded"
          style={{
            textDecoration: "none",
            background:
              location.pathname === "/therapist-reports" ? `${color}` : "",
            cursor: "pointer",
          }}
        >
          <h6 className="fw-light" onClick={() => handleButtonId("Reports")}>
            <FontAwesomeIcon icon={faNoteSticky} /> Reports
          </h6>
        </div>
      </Link>

      <Link to="/therapist-settings" style={style}>
        <div
          className="row mt-4 p-1 ms-1 me-1 rounded"
          style={{
            textDecoration: "none",
            background: location.pathname === "/therapist-settings" ? `${color}` : "",
            cursor: "pointer",
          }}
        >
          <h6 className="fw-light" onClick={() => handleButtonId("Settings")}>
            <FontAwesomeIcon icon={faToolbox} /> Settings
          </h6>
        </div>
      </Link>
    </div>
  );
}
