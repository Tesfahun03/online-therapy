import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../../styles/BookAppointment.css";
import moment from "moment";
// import useAxios from "../../utils/useAxios";
// import { Button, Modal } from "react-bootstrap";
const swal = require("sweetalert2");

export default function BookAppointment() {
  const { id } = useParams();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const first_name = decoded.first_name;
  const last_name = decoded.last_name;

  const [availableDates, setAvailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [relationChecker, setRelation] = useState();

  const [registerAppointment, setRegisterAppointment] = useState({
    patient: user_id,
    date_available: "",
  });

  function handleRegisterAppointment(event) {
    const { name, value } = event.target;
    setRegisterAppointment((prevRegisterData) => {
      return {
        ...prevRegisterData,
        [name]: value,
      };
    });
  }

  const paymentChecker = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/payment/therapist/${id}/credited/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRelation(data);
      setIsLoading(false);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
      setIsLoading(false);
    }
  };

  const handleRegisterAppointmentSubmit = async (e) => {
    e.preventDefault();
    const { patient, date_available } = registerAppointment;

    // Create the overlay element and add the 'overlay' class
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    // Append the overlay element to the body
    document.body.appendChild(overlay);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/session/book-appointment/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patient,
            date_available,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        swal.fire({
          title: "Booked Successfully",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top",
          timerProgressBar: true,
          showConfirmButton: false,
          showCancelButton: true,
          didClose: () => {
            // Remove the overlay element and reset the faded background effect
            overlay.remove();
            window.location.reload();
          },
        });
      } else {
        swal.fire({
          title: "An Error Occurred " + response.status,
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top",
          timerProgressBar: true,
          showConfirmButton: false,
          showCancelButton: true,
          didClose: () => {
            // Remove the overlay element and reset the faded background effect
            overlay.remove();
            window.location.reload();
          },
        });
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const availabilityData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/session/therapist/${id}/availability`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAvailableDates(data);
      setIsLoading(false);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    availabilityData();
    paymentChecker();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const hasPaid = relationChecker.some(
    (relation) => relation.patient === user_id && relation.status === "success"
  );

  console.log(availableDates);
  console.log(registerAppointment);

  return (
    <div className="book-appointment container">
      {hasPaid ? (
      <div className="row mt-5">
        <div className="col-lg-6 offset-lg-3">
          <h5>Book Appointment</h5>
          <form
            onSubmit={handleRegisterAppointmentSubmit}
            className="d-flex flex-column justify-content-center"
          >
            <div className="row mb-4">
              <label htmlFor="booked_by">Booked By</label>
              <input
                type="text"
                className="form-control"
                value={first_name + " " + last_name}
                id="booked_by"
                readOnly
              />
            </div>
            <div className="row mb-4">
              <label htmlFor="date_available">
                Select date for appointment
              </label>
              <select
                name="date_available"
                className="form-select"
                id="date_available"
                value={registerAppointment.date_available}
                onChange={handleRegisterAppointment}
              >
                <option value="">Date Available</option>
                {availableDates.map((availableDate) => (
                  <option value={availableDate.id} key={availableDate.id}>
                    {moment(availableDate.date).format("D MMMM YYYY")} From{" "}
                    {moment(availableDate.start_time, "HH:mm:ss").format(
                      "h:mm A"
                    )}{" "}
                    Upto{" "}
                    {moment(availableDate.end_time, "HH:mm:ss").format(
                      "h:mm A"
                    )}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-success">Book Appointment</button>
          </form>
        </div>
      </div>
      ) :
      (<Redirect to={`/viewtherapist/${id}`} />)}
    </div>
  );
}
