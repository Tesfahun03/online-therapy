import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter as Router,
  Link,
  matchPath,
  useLocation,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCalendar,
  faDashboard,
  faNoteSticky,
  faPeopleCarry,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/SideBar.css";
import { Offcanvas, Button, Dropdown, DropdownButton } from "react-bootstrap";

export default function SideBar( { isOffcanvasOpen } ) {
  const [activeButton, setActiveButton] = useState("Dashboard");
  const location = useLocation();
  const [t, i18n] = useTranslation("global");
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }
  }, [i18n]);

  // const handleChangeLanguage = (e) => {
  //   const language = e.target.value;
  //   i18n.changeLanguage(language);
  //   setSelectedLanguage(language);
  //   localStorage.setItem("preferredLanguage", language);
  // };
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

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(!isOffcanvasOpen);

  const isActive =
    matchPath(location.pathname, { path: "/records-t", exact: true }) ||
    matchPath(location.pathname, { path: "/records-t/:id", exact: true });

  return (
    <div className="therapist-sidebar col col-lg-2 col-md-2 col-sm-2 min-vh-100 shadow">
        <div className="side-container w-100">
          <Link to="/dashboard-t" style={style}>
            <div
              className="row mt-2 p-1 ms-1 me-1 rounded"
              style={{
                background:
                  location.pathname === "/dashboard-t" ? `${color}` : "",
                cursor: "pointer",
              }}
            >
              <h6
                className="fw-light"
                onClick={() => handleButtonId("Dashboard")}
              >
                <FontAwesomeIcon icon={faDashboard} /> {t("sidebar.sidebarDasboard")}
              </h6>
            </div>
          </Link>

          <Link to="/appointments-t" style={style}>
            <div
              className="row mt-4 p-1 ms-1 me-1 rounded"
              style={{
                textDecoration: "none",
                background:
                  location.pathname === "/appointments-t" ? `${color}` : "",
                cursor: "pointer",
              }}
            >
              <h6
                className="fw-light"
                onClick={() => handleButtonId("Appointments")}
              >
                <FontAwesomeIcon icon={faCalendar} /> {t("sidebar.sidebarAppointment")}
              </h6>
            </div>
          </Link>

      <Link to="/notification-t" style={style}>
        <div
          className="row mt-4 p-1 ms-1 me-1 rounded"
          style={{
            textDecoration: "none",
            background:
              location.pathname === "/notification-t" ? `${color}` : "",
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

      <Link to="/records-t" style={style}>
        <div
          className="row mt-4 p-1 ms-1 me-1 rounded"
          style={{
            textDecoration: "none",
            background: isActive ? color : "",
            cursor: "pointer",
          }}
        >
          <h6 className="fw-light" onClick={() => handleButtonId("Reports")}>
            <FontAwesomeIcon icon={faNoteSticky} /> Records
          </h6>
        </div>
      </Link>

      <Link to="/settings-t" style={style}>
        <div
          className="row mt-4 p-1 ms-1 me-1 rounded"
          style={{
            textDecoration: "none",
            background: location.pathname === "/settings-t" ? `${color}` : "",
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
