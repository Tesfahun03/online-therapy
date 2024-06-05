import React, { useState } from "react";
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <FontAwesomeIcon icon={faDashboard} /> Dashboard
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
                <FontAwesomeIcon icon={faCalendar} /> Appointments
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
              <h6
                className="fw-light"
                onClick={() => handleButtonId("Reports")}
              >
                <FontAwesomeIcon icon={faNoteSticky} /> Records
              </h6>
            </div>
          </Link>

          <Link to="/settings-t" style={style}>
            <div
              className="row mt-4 p-1 ms-1 me-1 rounded"
              style={{
                textDecoration: "none",
                background:
                  location.pathname === "/settings-t" ? `${color}` : "",
                cursor: "pointer",
              }}
            >
              <h6
                className="fw-light"
                onClick={() => handleButtonId("Settings")}
              >
                <FontAwesomeIcon icon={faToolbox} /> Settings
              </h6>
            </div>
          </Link>
        </div>
      <>
        <Offcanvas
          show={isOffcanvasOpen}
          onHide={handleClose}
          placement="start"
          id="offcanvasExample"
          style={{ width: "250px" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasExampleLabel">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Link to="/dashboard-t" style={style}>
              <div
                className="row mt-4 p-1 ms-1 me-1 rounded"
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
                  <FontAwesomeIcon icon={faDashboard} /> Dashboard
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
                  <FontAwesomeIcon icon={faCalendar} /> Appointments
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
                <h6
                  className="fw-light"
                  onClick={() => handleButtonId("Reports")}
                >
                  <FontAwesomeIcon icon={faNoteSticky} /> Records
                </h6>
              </div>
            </Link>

            <Link to="/settings-t" style={style}>
              <div
                className="row mt-4 p-1 ms-1 me-1 rounded"
                style={{
                  textDecoration: "none",
                  background:
                    location.pathname === "/settings-t" ? `${color}` : "",
                  cursor: "pointer",
                }}
              >
                <h6
                  className="fw-light"
                  onClick={() => handleButtonId("Settings")}
                >
                  <FontAwesomeIcon icon={faToolbox} /> Settings
                </h6>
              </div>
            </Link>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </div>
  );
}
