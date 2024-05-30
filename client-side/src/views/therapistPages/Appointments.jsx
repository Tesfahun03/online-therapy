import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import SideBar from "../../component/SideBar";
import moment from "moment";
import useAxios from "../../utils/useAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faVideo } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";
export default function Appointments() {
  const [t, i18n] = useTranslation("global");
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleChangeLanguage = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
    localStorage.setItem("preferredLanguage", language);
  };
  const baseURL = "http://127.0.0.1:8000/api";
  const axios = useAxios();
  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const history = useHistory();

  const [buttonVariant, setButtonVariant] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  };
  const handleShow = () => setShowModal(true);

  const user_id = decoded.user_id;

  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [showAvalability, setShowAvalability] = useState();
  const [appointments, setAppointments] = useState([]);

  const showTherapistAvalability = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/session/therapist/${user_id}/availability/`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      setShowAvalability(data);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
    }
  };
  const showTherapistAppointments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/session/therapist/${user_id}/appointments/`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      setAppointments(data);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
    }
  };

  useEffect(() => {
    showTherapistAvalability();
    showTherapistAppointments();
  }, []);

  console.log(appointments);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    const date = moment(startDate).format("YYYY-MM-DD");
    const start_time = moment(startTime).format("HH:mm:ss");
    const end_time = moment(endTime).format("HH:mm:ss");
    const therapist = user_id;

    // Combine the date, start time, and end time into a single datetime string
    const appointmentDateTime = `${date}T${start_time}`;

    // Perform validation
    const now = new Date();
    const selectedDateTime = new Date(appointmentDateTime);

    if (selectedDateTime <= now) {
      alert("Please select a date and time in the future.");
      return;
    }

    if (end_time < start_time) {
      alert("The end time must be after the start time.");
      return;
    }

    // Submit the form or perform further actions
    // ...

    const response = await axios.post(
      `http://127.0.0.1:8000/session/therapist/${user_id}/availability/`,
      {
        therapist,
        date,
        start_time,
        end_time,
      }
    );

    const data = await response.data;
    console.log(data);

    const buttonVariant = response.status === 201 ? "success" : "danger";

    setButtonVariant(buttonVariant);

    if (response.status === 201) {
      // Show success message in the modal body
      setModalTitle("Avalability");
      setModalBody("Availability successfully created!");
      handleShow();
    } else {
      // Show error message in the modal body
      setModalTitle("Avalability");
      setModalBody("Failed to create availability. Please try again.");
      handleShow();
    }
  };

  const handleDeleteAvalabilitySubmit = async (availabilityID) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/session/therapist/${user_id}/availability/${availabilityID}`
    );

    const buttonVariant = response.status === 204 ? "success" : "danger";

    setButtonVariant(buttonVariant);

    if (response.status == 204) {
      // Show success message in the modal body
      setModalTitle("Avalability");
      setModalBody("Avalability successfully deleted!");
    } else {
      // Show error message in the modal body
      setModalTitle("Avalability");
      setModalBody("Failed to delete avalability. Please try again.");
    }
  };

  const handleMessage = (patientId) => {
    history.push(`/message/${patientId}`);
  };
  const handleVideo = (patientId) => {
    history.push(`/videochat-t/${patientId}`);
  };

  return (
    <div className="therapist-home row d-flex flex-row  m-0">
      <div className="col col-lg-2 col-md-2 col-sm-3 m-0 p-0">
        <SideBar />
      </div>
      <div className="col ms-3 me-5">
        {showAvalability !== null && showAvalability !== undefined && (
          <div className="row mt-2">
            <h2>List of avalability (International Time Zone)</h2>
            {showAvalability.length > 0 ? (
              showAvalability.map((avalabilitys, index) => (
                <div
                  key={`${avalabilitys.id}-${index}`}
                  className="d-flex justify-content-between mb-2"
                >
                  <p>{moment(avalabilitys.date).format("D MMMM YYYY")}</p>
                  <p>
                    {moment(avalabilitys.start_time, "HH:mm:ss").format(
                      "hh:mm A"
                    )}
                  </p>
                  <p>
                    {moment(avalabilitys.end_time, "HH:mm:ss").format(
                      "hh:mm A"
                    )}
                  </p>
                  <button className="btn btn-success">Edit</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleShow();
                      handleDeleteAvalabilitySubmit(avalabilitys.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No available date is found.</p>
            )}
          </div>
        )}

        <div className="row">
          <h2>Set New Availability</h2>
          <form onSubmit={handleAppointmentSubmit}>
            <div
              className="row"
              style={{ marginLeft: "10px", marginRight: "10px" }}
            >
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                className="form-control mb-2"
                style={{ marginRight: "10px" }}
              />
              <DatePicker
                selected={startTime}
                onChange={(time) => setStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Start Time"
                dateFormat="h:mm aa"
                placeholderText="Select start time"
                className="form-control mb-2"
              />
              <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="End Time"
                dateFormat="h:mm aa"
                placeholderText="Select end time"
                className="form-control mb-2"
              />
              <button
                type="submit"
                className="btn btn-success"
                // onClick={handleShow}
              >
                Save Availability
              </button>
            </div>
          </form>
        </div>
        <div className="row">
          <h2>Schedule List</h2>
          {appointments !== null && appointments !== undefined && (
            <>
              {appointments.length > 0 ? (
                <div className="col col-12 border">
                  <div className="row d-flex align-items-center border">
                    <div className="col col-3 border text-center">Client Name</div>
                    <div className="col col-6 border text-center">Date and Time</div>
                    <div className="col col-3 text-center">Type</div>
                  </div>
                  {appointments.map((appointment) => (
                    <div className="row d-flex align-items-center border">
                        <div className="col col-3 border text-center">
                          {appointment.patient_first_name +
                            " " +
                            appointment.patient_last_name}
                        </div>
                        <div className="col col-6 border text-center">
                          {moment(appointment.date).format("D MMMM YYYY")} ,{" "}
                          {moment(appointment.start_time, "HH:mm:ss").format(
                            "hh:mm A"
                          )}{" "}
                          -{" "}
                          {moment(appointment.end_time, "HH:mm:ss").format(
                            "hh:mm A"
                          )}
                        </div>
                        <div className="col col-3 border">
                          <div className="d-flex justify-content-around px-3 py-2">
                            <button
                              className="btn btn-success "
                              onClick={() =>
                                handleMessage(appointment.patientID)
                              }
                            >
                              <FontAwesomeIcon icon={faMessage} />
                            </button>
                            <button
                              className="btn btn-success"
                              onClick={() => handleVideo(appointment.id)}
                            >
                              <FontAwesomeIcon icon={faVideo} />
                            </button>
                          </div>
                        </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No available date is found.</p>
              )}
            </>
          )}
        </div>
      </div>

      <>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title centered>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{modalBody}</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant={buttonVariant} onClick={handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
        {showModal && (
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: "1050" }}
            onClick={handleClose}
          ></div>
        )}
      </>
    </div>
  );
}
