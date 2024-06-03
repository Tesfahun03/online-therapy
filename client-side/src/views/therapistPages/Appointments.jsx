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

  const axios = useAxios();
  const history = useHistory();
  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const [buttonVariant, setButtonVariant] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showPaymentRateModal, setShowPaymentRateModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleShowPaymentRate = () => setShowPaymentRateModal(true);
  const handlePaymentRateClose = () => {
    setShowPaymentRateModal(false);
  };

  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [showAvalability, setShowAvalability] = useState();
  const [appointments, setAppointments] = useState([]);

  const [therapists, setTherapists] = useState([]);

  const therapistsData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/core/therapists/${user_id}`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      setTherapists(data);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
    }
  };

  useEffect(() => {
    therapistsData();
  }, []);

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
          <div className="row mt-4 shadow py-3">
            <h4>List of avalability (International Time Zone)</h4>
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

        <div className="row mt-4 shadow py-3">
          <h4>Set New Availability</h4>
          <div
            className="row"
            style={{ marginLeft: "0px", marginRight: "10px" }}
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
              onClick={
                therapists.paymentRate === 0
                  ? handleShowPaymentRate
                  : handleAppointmentSubmit
              }
            >
              Save Availability
            </button>
          </div>
        </div>
        <div className="row mt-4 shadow py-3 px-2 mb-4">
          <h4>Schedule List</h4>
          {appointments !== null && appointments !== undefined && (
            <>
              {appointments.length > 0 ? (
                <table className="table  table-striped table-bordered mt-2">
                  <thead>
                    <tr>
                      <th className="text-center">Client Name</th>
                      <th className="text-center">Date and Time</th>
                      <th className="text-center">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="text-center">
                          {appointment.patient_first_name}{" "}
                          {appointment.patient_last_name}
                        </td>
                        <td className="text-center">
                          {moment(appointment.date).format("D MMMM YYYY")} ,{" "}
                          {moment(appointment.start_time, "HH:mm:ss").format(
                            "hh:mm A"
                          )}{" "}
                          -{" "}
                          {moment(appointment.end_time, "HH:mm:ss").format(
                            "hh:mm A"
                          )}
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-around">
                            <button
                              className="btn btn-success"
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

      <>
        <Modal
          show={showPaymentRateModal}
          onHide={handlePaymentRateClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title centered>Payment rate not set!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Please set your payment rate per month (ETB/month) in the setting
              inorder to post avalability for the patients!
            </p>
          </Modal.Body>
          <Modal.Footer className="d-flex">
            <Button variant="secondary" onClick={handlePaymentRateClose}>
              Cancle
            </Button>
            <Button
              variant="success"
              onClick={() => history.push("/settings-t")}
            >
              Go to setting
            </Button>
          </Modal.Footer>
        </Modal>
        {showPaymentRateModal && (
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: "1050" }}
            onClick={handlePaymentRateClose}
          ></div>
        )}
      </>
    </div>
  );
}
