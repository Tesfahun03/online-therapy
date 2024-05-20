import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import SideBar from "../../component/SideBar";
import moment from "moment";
import useAxios from "../../utils/useAxios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Modal } from "react-bootstrap";

export default function Appointments() {
  const baseURL = "http://127.0.0.1:8000/api";
  const axios = useAxios()
  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);

  const [buttonVariant, setButtonVariant] = useState();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    window.location.reload();
  }
  const handleShow = () => setShowModal(true);

  const user_id = decoded.user_id;

  const [avalability, setAvalability] = useState({
    therapist: `${user_id}`,
    date: "",
    start_time: "",
    end_time: "",
  });

  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  
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

  useEffect(() => {
    showTherapistAvalability();
  }, []);

  console.log(showAvalability);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    const date = moment(startDate).format('YYYY-MM-DD');
    const start_time = moment(startTime).format('HH:mm:ss');
    const end_time = moment(endTime).format('HH:mm:ss');
    const therapist = user_id
    //const { therapist, date, start_time, end_time } = avalability;

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
      `http://127.0.0.1:8000/session/therapist/${user_id}/availability/`,{
        therapist,
        date,
        start_time,
        end_time,
      },
        
    );
      
    const data = await response.data;
    console.log(data);

    const buttonVariant = response.status === 201 ? "success" : "danger";

    setButtonVariant(buttonVariant);

    if (response.status == 201) {
      // Show success message in the modal body
      const modalBody = document.getElementById("modal-body");
      modalBody.innerText = "Avalability successfully created!";
    } else {
      // Show error message in the modal body
      const modalBody = document.getElementById("modal-body");
      modalBody.innerText = "Failed to create avalability. Please try again.";
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
        const modalBody = document.getElementById("modal-body");
        modalBody.innerText = "Avalability successfully deleted!";
      } else {
        // Show error message in the modal body
        const modalBody = document.getElementById("modal-body");
        modalBody.innerText = "Failed to delete avalability. Please try again.";
      }
  };


  console.log(avalability);

  return (
    <div className="therapist-home row d-flex flex-row  m-0">
      <SideBar />
      <div className="col">
        {showAvalability !== null  && showAvalability !== undefined && (
          <div className="row mt-2">
            <h2>List of avalability (International Time Zone)</h2>
            {showAvalability.length > 0 ? (
              showAvalability.map((avalabilitys, index) => (
                <div
                  key={`${avalabilitys.id}-${index}`}
                  className="d-flex justify-content-between mb-2"
                >
                  <p>{moment(avalabilitys.date).format("D MMMM YYYY")}</p>
                  <p>{moment(avalabilitys.start_time, "HH:mm:ss").format("hh:mm A")}</p>
                  <p>{moment(avalabilitys.end_time, "HH:mm:ss").format("hh:mm A")}</p>
                  <button className="btn btn-success">Edit</button>
                  <button className="btn btn-danger" onClick={() => {handleShow(); handleDeleteAvalabilitySubmit(avalabilitys.id);}}>Delete</button>
                </div>
              ))
              ) : 
              (<p>No available date is found.</p>)
            }
          </div>
        )}

        <div className="row">
        <h2>Set New Availability</h2>
        <form onSubmit={handleAppointmentSubmit}>
          <div className="row" style={{ marginLeft: '10px', marginRight: '10px'}}>
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            className="form-control mb-2"
            style={{ marginRight: '10px' }}
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
          <button type="submit" className="btn btn-success" onClick={handleShow}>
            Save Availability
          </button>
          </div>
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
