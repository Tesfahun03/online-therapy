import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import SideBar from "../../component/SideBar";
import { Button, Modal } from "react-bootstrap";

export default function Appointments() {
  const baseURL = "http://127.0.0.1:8000/api";

  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);

  const [buttonVariant, setButtonVariant] = useState();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const user_id = decoded.user_id;

  const [avalability, setAvalability] = useState({
    therapist: `${user_id}`,
    date: "",
    start_time: "",
    end_time: "",
  });

  function handleAppointmentSet(event) {
    const { name, value } = event.target;
    setAvalability((prevAppointmentSet) => {
      return {
        ...prevAppointmentSet,
        [name]: value,
      };
    });
  }

  const [showAvalability, setShowAvalability] = useState();

  const showTherapistAvalability = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/session/therapist/${user_id}/availability/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setShowAvalability(data);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
    }
  };

  useEffect(() => {
    showTherapistAvalability();
  }, []);

  console.log(showAvalability);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    const { therapist, date, start_time, end_time } = avalability;

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

    const response = await fetch(
      `http://127.0.0.1:8000/session/therapist/${user_id}/availability/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          therapist,
          date,
          start_time,
          end_time,
        }),
      }
    );
    const data = await response.json();
    console.log(data);

    const buttonVariant = response.status === 201 ? "success" : "danger";

    setButtonVariant(buttonVariant);

    if (response.status === 201) {
      // Show success message in the modal body
      const modalBody = document.getElementById("modal-body");
      modalBody.innerText = "Avalability successfully created!";
    } else {
      // Show error message in the modal body
      const modalBody = document.getElementById("modal-body");
      modalBody.innerText = "Failed to create avalability. Please try again.";
    }
  };

  const handleDeleteAvalabilitySubmit = async (e) => {};

  console.log(avalability);

  return (
    <div className="therapist-home row d-flex flex-row  m-0">
      <SideBar />
      <div className="col">
        {showAvalability !== null  && (
          <div className="row mt-2">
            <h2>List of avalability</h2>
            {showAvalability &&
              showAvalability.map((avalabilitys) => (
                <div
                  key={avalabilitys.id}
                  className="d-flex justify-content-between mb-2"
                >
                  <p>{avalabilitys.date}</p>
                  <p>{avalabilitys.start_time}</p>
                  <p>{avalabilitys.end_time}</p>
                  <button className="btn btn-success">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </div>
              ))}
          </div>
        )}

        <div className="row">
          <h2>Set new Avalability</h2>
          <form onSubmit={handleAppointmentSubmit}>
            <input
              type="date"
              id="date"
              placeholder="Date"
              name="date"
              className="form-control mb-2"
              onChange={handleAppointmentSet}
            />
            <input
              type="time"
              id="start_time"
              placeholder="Start time"
              name="start_time"
              className="form-control mb-2"
              onChange={handleAppointmentSet}
            />
            <input
              type="time"
              id="end_time"
              placeholder="End time"
              name="end_time"
              className="form-control mb-2"
              onChange={handleAppointmentSet}
            />
            <button className="btn btn-success" onClick={handleShow}>
              Save Avalability
            </button>
          </form>
        </div>
      </div>

      <>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title centered>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body id="modal-body">
            <p>Modal content goes here.</p>
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
