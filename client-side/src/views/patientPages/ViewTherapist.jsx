import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../../styles/ViewTherapist.css";
import useAxios from "../../utils/useAxios";
import { Button, Modal } from "react-bootstrap";
const swal = require("sweetalert2");

export default function ViewTherapist() {
  const { id } = useParams();
  const axios = useAxios();
  const history = useHistory();

  const [selectedTherapist, setSelectedTherapist] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [relationChecker, setRelation] = useState();
  

  // const [showModal, setShowModal] = useState(false);
  // const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);

  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

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

  //Get Therapist data and set the use state
  const therapistData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/core/therapists/${id}/`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSelectedTherapist(data);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
    }
  };

  useEffect(() => {
    therapistData();
    paymentChecker();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePayment = async (user_id, therapist_id) => {
    console.log(user_id, therapist_id);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/payment/initialize-chapa-transaction/",
        { user_id, therapist_id }
      );

      if (response.data.status === "success") {
        const checkoutUrl = response.data.data.checkout_url;
        window.location.href = checkoutUrl; // Redirect to checkout
      } else {
        const data = await response.json();
        console.log(response.status);
        console.log("there was a server issue");
        swal.fire({
          title: "An Error Occured " + data.error,
          icon: "error",
          toast: true,
          timer: 6000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
          showCancelButton: true,
        });
      }
    } catch (error) {
      console.error("Error sending payment request:", error);
      // You can display a generic error message to the user here (e.g., using swal)
    }
  };

  const handleBookAppointment=(therapistid)=>{
    history.push(`/book-appointment/${therapistid}`);
  }

  const hasPaid = relationChecker.some(
    (relation) => relation.patient === user_id && relation.status === "success"
  );

  return (
    <div className="view-therapist">
      {selectedTherapist ? (
        <div className="row row-auto p-0 m-0">
          <div
            className="therapist-pro-pic-info col col-auto col-lg-3 col-md-5 col-sm-4 card d-lg-flex flex-lg-column d-sm-block flex-sm-wrap shadow pe-3 mt-5 ms-4 me-4"
            key={selectedTherapist.profile.user.id}
          >
            <img
              key={selectedTherapist.profile.user.id}
              src={selectedTherapist.profile.image}
              className="licenses img-fluid ms-4"
            />
            <h5
              key={selectedTherapist.profile.user.id}
              className="ms-2 fs-4 mb-2 mt-2 text-center"
            >
              {selectedTherapist.profile.first_name}{" "}
              {selectedTherapist.profile.last_name}
            </h5>
            <h5
              key={selectedTherapist.profile.user.id}
              className="ms-2 text-center"
              style={{ color: "gray", marginTop: "-10" }}
            >
              {selectedTherapist.specialization}
            </h5>
            <div className="col col-auto text-center">
              {hasPaid ? (
                <button className="btn btn-primary" onClick={()=>handleBookAppointment(id)}>
                  Book Appointment
                </button>
              ) : (
                <button
                  className="btn btn-success mb-2"
                  onClick={() =>
                    handlePayment(user_id, selectedTherapist.profile.user.id)
                  }
                >
                  Pay for appointment
                </button>
              )}
            </div>
          </div>

          <div className="therapist-detail-info col col-auto col-lg-8 col-md-6 col-sm-6 card d-lg-flex flex-lg-column d-sm-block flex-sm-wrap shadow pe-3 mt-5">
            <div className="row">
              <div className="col mt-3 ms-3">
                <div className="row">
                  <h5>Email Address</h5>
                  <h6 className="fw-light">
                    {selectedTherapist.profile.user.email}
                  </h6>
                </div>
                <div className="row">
                  <h5>Phone Number</h5>
                  <h6 className="fw-light">
                    {selectedTherapist.profile.phone}
                  </h6>
                </div>
                <div className="row">
                  <h5>City</h5>
                  <h6 className="fw-light">{selectedTherapist.profile.city}</h6>
                </div>
                <div className="row">
                  <h5>Region</h5>
                  <h6 className="fw-light">
                    {selectedTherapist.profile.region}
                  </h6>
                </div>
              </div>

              <div className="col mt-3 ms-3">
                <div className="row">
                  <h5>Bio</h5>
                  <h6 className="fw-light">{selectedTherapist.profile.bio}</h6>
                </div>
                <div className="row">
                  <h5>Gender</h5>
                  <h6 className="fw-light">
                    {selectedTherapist.profile.gender}
                  </h6>
                </div>
                <div className="row">
                  <h5>Prefered Language</h5>
                  <h6 className="fw-light">
                    {selectedTherapist.profile.prefered_language}
                  </h6>
                </div>
                <div className="row">
                  <h5>Religion</h5>
                  <h6 className="fw-light">{selectedTherapist.religion}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) :
      (<h1>FORBIDDEN</h1>)}
    </div>
  );
}
