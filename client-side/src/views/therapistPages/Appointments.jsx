import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import SideBar from "../../component/SideBar";

export default function Appointments() {
  const baseURL = "http://127.0.0.1:8000/api";

  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const history = useHistory();

  const user_id = decoded.user_id;

  const [appointment, setAppointment] = useState({
    therapist: `${user_id}`,
    date: "",
    start_time: "",
    end_time: "",
  });

  function handleAppointmentSet(event) {
    const { name, value } = event.target;
    setAppointment((prevAppointmentSet) => {
      return {
        ...prevAppointmentSet,
        [name]: value,
      };
    });
  }

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();

    const { date, start_time, end_time } = appointment;

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
  };

  console.log(appointment);

  return (
    <div className="therapist-home row d-flex flex-row  m-0">
      <SideBar />
      <div className="col">
        <form onSubmit={handleAppointmentSubmit}>
          <input
            type="date"
            id="date"
            placeholder="Date"
            name="date"
            className="form-control"
            onChange={handleAppointmentSet}
          />
          <input
            type="time"
            id="start_time"
            placeholder="Start time"
            name="start_time"
            className="form-control"
            onChange={handleAppointmentSet}
          />
          <input
            type="time"
            id="end_time"
            placeholder="End time"
            name="end_time"
            className="form-control"
            onChange={handleAppointmentSet}
          />
          <button className="btn btn-success">Save Avalability</button>
        </form>
      </div>
    </div>
  );
}
