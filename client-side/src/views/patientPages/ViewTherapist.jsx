import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../../styles/ViewTherapist.css";
import { useTranslation } from "react-i18next";
import useAxios from "../../utils/useAxios";
import { Alert, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faVideo, faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Appointments from "../therapistPages/Appointments";
const swal = require("sweetalert2");

export default function ViewTherapist() {
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

  const [showRateCard, setShowRateCard] = useState(false);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [cancelAppointment, setCancleAppointment] = useState(null)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/session/therapist/${id}/availability/`)
      .then((response) => setAvailability(response.data))
      .catch((error) => console.error("Error fetching availability:", error));
  }, [id]);

  const appointmentData = async () => {
    try {
      const appointmentResponse = await axios.get(
        `http://127.0.0.1:8000/session/patient/${user_id}/appointments/`
      );
      setAppointments(appointmentResponse.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    appointmentData();
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      const filtered = appointments.filter(
        (appointment) => appointment.therapistID.toString() === id.toString()
      );
      setFilteredAppointments(filtered);
    }
  }, [appointments, id]);
  // const filteredAppointments = appointments.filter(
  //   (appointment) => appointment.therapistID === id
  // );

  console.log(filteredAppointments);

  const paymentChecker = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/payment/therapist/${id}/credited/`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
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
      const response = await axios.get(
        `http://127.0.0.1:8000/core/therapists/${id}/`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.data;
      setSelectedTherapist(data);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
    }
  };

  useEffect(() => {
    therapistData();
    paymentChecker();
  }, []);

  const handleToggleRateCard = () => {
    setShowRateCard(!showRateCard);
  };

  const handleRateSubmit = async (event) => {
    event.preventDefault();
    const feedback = {
      name: decoded.first_name + " " + decoded.last_name,
      description: description,
      rating: rating,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/session/therapist/14/reviews/",
        feedback
      );
      console.log("Feedback submitted successfully:", response.data);
      setShowSuccessAlert(true);
      setShowRateCard(false);
      setDescription("");
      setRating(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

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

  // const handleBookAppointment = (therapistid) => {
  //   history.push(`/bookappointment/${therapistid}`);
  // };

  const handleBookAppointment = async (patientId, dateAvailable) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/session/book-appointment/",
        {
          patient: patientId,
          date_available: dateAvailable,
        }
      );
      console.log(response.data);
      setModalTitle("Appointment Booked");
      setModalBody("Your appointment has been successfully booked!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Handle error if needed
      setModalTitle("Appointment Booked");
      setModalBody("Faild to book appointment!");
    }
  };
  const handleModalClose = () => {
    setShowSuccessModal(false);
    window.location.reload(); // Refresh the page
  };

  const handleDeleteAppointmentModal = (appointmentID) => {
    setCancleAppointment(appointmentID)
    setModalTitle("Cancle Appointment");
    setModalBody("Are you sure you want to cancle the appointment!");
    setShowSuccessModal(true);
  };
  const handleDeleteAppointmentSubmit = async (appointmentID) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/session/patient/${user_id}/appointments/${appointmentID}`
    );

    if(response.status === 204){
      setShowSuccessModal(false)
      window.location.reload()
    }
  };

  const hasPaid =
    relationChecker?.some(
      (relation) =>
        relation.patient === user_id && relation.status === "success"
    ) ?? null;

  console.log(hasPaid);

  const thirtyDaysCheck = relationChecker.some((relation) => {
    if (relation.patient === user_id && relation.status === "success") {
      const relationDate = new Date(relation.created_at);
      const today = new Date();
      const differenceInTime = today.getTime() - relationDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays <= 30;
    }
    return false;
  });

  const handleMessage = (therapistid) => {
    history.push(`/message/${therapistid}`);
  };
  const handleVideo = (appointmentID) => {
    history.push(`/videochat-p/${appointmentID}`);
  };

  return (
    <div className="view-therapist min-vh-100">
      <div className="languageForTranslate">
        <select
          className="preferedLanguage"
          onChange={handleChangeLanguage}
          value={selectedLanguage} // Set value to the selected language
        >
          <option value="english">English</option>
          <option value="amharic">Amharic</option>
          <option value="oromo">Oromo</option>
          <option value="sumalic">Sumalic</option>
          <option value="tigrigna">Tigrigna</option>
        </select>
      </div>
      {selectedTherapist ? (
        <div className="row row-auto p-0 m-0">
          <div
            className="therapist-pro-pic-info col col-auto col-lg-3 col-md-5 col-sm-4 d-lg-flex flex-lg-column d-sm-block flex-sm-wrap pe-3 ms-4 me-4 mb-5"
            key={selectedTherapist.profile.user.id}
            style={{ height: "max-content" }}
          >
            <div class="container mt-5">
              <div class="card card-custom-profile shadow">
                <div class="star-rating">
                  <span>
                    <FontAwesomeIcon icon={faStar} color="#f59505a4" />{" "}
                    {selectedTherapist.rating.toFixed(1)}
                  </span>
                </div>
                <img
                  src={selectedTherapist.profile.image}
                  class="profile-img img-fluid"
                  alt="Doctor Image"
                  width="150"
                  height="150"
                />
                <h5 class="card-title-view">
                  {selectedTherapist.profile.first_name +
                    " " +
                    selectedTherapist.profile.last_name}
                </h5>
                <div class="speciality">{selectedTherapist.specialization}</div>
                <div class="footer-buttons">
                  <div
                    className="col d-flex flex-column align-items-center"
                    key={`buttons-${selectedTherapist.profile.user.id}`}
                  >
                    {thirtyDaysCheck ? (
                      <>
                        {/* <button
                    className="btn btn-success mb-1"
                    onClick={() => handleBookAppointment(id)}
                    key={`book-appointment-${selectedTherapist.profile.user.id}`}
                  >
                    Book Appointment
                  </button> */}
                      </>
                    ) : (
                      <>
                        <h6>
                          {selectedTherapist.paymentRate} ETH Birr / Month
                        </h6>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handlePayment(
                              user_id,
                              selectedTherapist.profile.user.id
                            )
                          }
                          key={`pay-appointment-${selectedTherapist.profile.user.id}`}
                        >
                          Pay for appointment
                        </button>
                      </>
                    )}
                    {hasPaid ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="btn btn-outline-secondary p-2 d-flex align-items-center gap-2"
                          onClick={() => handleMessage(id)}
                        >
                          <FontAwesomeIcon
                            className="faMessageIcon fs-4"
                            icon={faEnvelope}
                            key={`message-${selectedTherapist.profile.user.id}`}
                          />
                          Message
                        </button>

                        <button
                          className="btn btn-outline-secondary p-2 d-flex align-items-center gap-2"
                          onClick={handleToggleRateCard}
                        >
                          <FontAwesomeIcon
                            className="faMessageIcon fs-4"
                            icon={faStar}
                            key={`ratting-${selectedTherapist.profile.user.id}`}
                          />{" "}
                          Rate
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            {showSuccessAlert && (
              <Alert
                variant="success"
                onClose={() => setShowSuccessAlert(false)}
                dismissible
                className="mt-3 fw-bold"
                style={{ width: "90%", left: "5%" }}
              >
                Rating submitted successfully!
              </Alert>
            )}

            {showRateCard && (
              <div className="card card-custom-rating shadow mt-3">
                <div className="card-body">
                  <h5 className="card-title">Rate the Therapist</h5>
                  <form onSubmit={handleRateSubmit}>
                    <div className="form-group text-start d-block rate-group">
                      <label htmlFor="description ">Description</label>
                      <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Write a brief description..."
                      ></textarea>
                    </div>
                    <div className="form-group text-start d-block rate-group mt-2">
                      <label>Rating</label>
                      <div className="rating-options">
                        {[0, 1, 2, 3, 4, 5].map((rate) => (
                          <label key={rate} className="rating-label">
                            <input
                              type="radio"
                              name="rating"
                              value={rate}
                              checked={rating === rate}
                              onChange={() => setRating(rate)}
                              required
                            />{" "}
                            {rate}
                          </label>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn-success-rating btn btn-success"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="therapist-detail-info col col-auto col-lg-8 col-md-6 col-sm-6 card d-lg-flex flex-lg-column d-sm-block flex-sm-wrap border-0 pe-3 mt-5">
            <div className="row shadow rounded mt-3">
              <div className="col mt-3 ms-3">
                <div className="row">
                  <p>
                    <strong>{t("viewTherapist.emailAddress")}: </strong>{" "}
                    {selectedTherapist.profile.user.email}
                  </p>
                </div>
                <div className="row">
                  <p>
                    <strong>{t("viewTherapist.phoneNumber")}: </strong>{" "}
                    {selectedTherapist.profile.phone}
                  </p>
                </div>
                <div className="row">
                  <p>
                    <strong>{t("viewTherapist.therapistCity")}: </strong>{" "}
                    {selectedTherapist.profile.city}
                  </p>
                </div>
              </div>

              <div className="col mt-3 ms-3">
                <div className="row">
                  <p>
                    <strong>{t("viewTherapist.therapistregion")}: </strong>{" "}
                    {selectedTherapist.profile.region}
                  </p>
                </div>
                <div className="row">
                  <p>
                    <strong>{t("viewTherapist.therapistGender")}: </strong>{" "}
                    {selectedTherapist.profile.gender}
                  </p>
                </div>
                <div className="row">
                  <p>
                    <strong>{t("viewTherapist.preferedLanguage")}: </strong>{" "}
                    {selectedTherapist.profile.prefered_language}
                  </p>
                </div>
              </div>
              <div className=" col mt-3 ms-3">
                <div className="row">
                  <p>
                    <strong>{t("viewTherapist.therapistReligion")}: </strong>{" "}
                    {selectedTherapist.religion}
                  </p>
                </div>
              </div>
            </div>
            <div className="row shadow mt-4 ">
              <h4 className="mt-3 ms-3">{t("viewTherapist.therapistBio")} </h4>
              <p className="mt-3 ms-3">
                {" "}
                {selectedTherapist.profile.bio
                  ? selectedTherapist.profile.bio
                  : "This therapist doesn't have a bio "}
              </p>
            </div>
            <div className="container row mt-4 p-3 shadow">
              <h4>
                Upcoming appointments with therapist{" "}
                {selectedTherapist.profile.first_name +
                  " " +
                  selectedTherapist.profile.last_name}
              </h4>
              {filteredAppointments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date and Time</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>
                            {moment(appointment.date).format("D MMMM YYYY")} ,{" "}
                            {moment(appointment.start_time, "HH:mm:ss").format(
                              "hh:mm A"
                            )}{" "}
                            -{" "}
                            {moment(appointment.end_time, "HH:mm:ss").format(
                              "hh:mm A"
                            )}
                          </td>
                          <td>
                            {" "}
                            <button
                              className="btn btn-outline-success"
                              onClick={() => handleVideo(appointment.id)}
                            >
                              <FontAwesomeIcon icon={faVideo} />
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={
                                ()=>handleDeleteAppointmentModal(appointment.id)
                              }
                            >
                              Cancle
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No appointments found.</p>
              )}
            </div>
            <div className="container row mt-4 mb-4 p-3 shadow">
              <h4 className=" mt-3">Therapist Availability</h4>
              {availability.length > 0 ? (
                <div className="table-responsive ms-3 mt-3">
                  <table className="table table-striped table-bordered table-hover shadow">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availability.map((slot) => (
                        <tr key={`${slot.date}-${slot.start_time}`}>
                          <td>{moment(slot.date).format("DD MMM YYYY")}</td>
                          <td>
                            {moment(slot.start_time, "HH:mm").format("h:mm A")}
                          </td>
                          <td>
                            {moment(slot.end_time, "HH:mm").format("h:mm A")}
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-primary-book "
                              onClick={() =>
                                handleBookAppointment(user_id, slot.id)
                              }
                            >
                              Book Appointment
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Avalability not found.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>FORBIDDEN</h1>
      )}
      <Modal show={showSuccessModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          {cancelAppointment ? 
          (<Button variant="outline-danger" onClick={()=>handleDeleteAppointmentSubmit(cancelAppointment)}>
            Delete
          </Button>)
          :
          (<Button variant="primary" onClick={handleModalClose}>
            Close
          </Button>)
          }
          
        </Modal.Footer>
      </Modal>
    </div>
  );
}
