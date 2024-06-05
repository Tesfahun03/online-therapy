import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../../styles/ViewTherapist.css";
import { useTranslation } from "react-i18next";
import useAxios from "../../utils/useAxios";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
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

  const handleBookAppointment = (therapistid) => {
    history.push(`/bookappointment/${therapistid}`);
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
            className="therapist-pro-pic-info col col-auto col-lg-3 col-md-5 col-sm-4 card d-lg-flex flex-lg-column d-sm-block flex-sm-wrap shadow pe-3 mt-5 ms-4 me-4"
            key={selectedTherapist.profile.user.id}
          >
            <img
              src={selectedTherapist.profile.image}
              className="licenses img-fluid ms-4"
              key={`img-${selectedTherapist.profile.user.id}`}
            />
            <h5
              className="ms-2 fs-4 mb-2 mt-2 text-center"
              key={`name-${selectedTherapist.profile.user.id}`}
            >
              {selectedTherapist.profile.first_name}{" "}
              {selectedTherapist.profile.last_name}
            </h5>
            <h5
              className="ms-2 text-center"
              style={{ color: "gray", marginTop: "-10" }}
              key={`specialization-${selectedTherapist.profile.user.id}`}
            >
              {selectedTherapist.specialization}
            </h5>
            <div
              className="col d-flex flex-column align-items-center"
              key={`buttons-${selectedTherapist.profile.user.id}`}
            >
              {thirtyDaysCheck ? (
                <button
                  className="btn btn-success mb-1"
                  onClick={() => handleBookAppointment(id)}
                  key={`book-appointment-${selectedTherapist.profile.user.id}`}
                >
                  Book Appointment
                </button>
              ) : (
                <>
                  <h6>{selectedTherapist.paymentRate} ETH Birr / Month</h6>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handlePayment(user_id, selectedTherapist.profile.user.id)
                    }
                    key={`pay-appointment-${selectedTherapist.profile.user.id}`}
                  >
                    Pay for appointment
                  </button>
                </>
              )}
              {hasPaid ? (
                <FontAwesomeIcon
                  className="faMessageIcon fs-2 mb-2"
                  color="gray"
                  icon={faMessage}
                  onClick={() => handleMessage(id)}
                  key={`message-${selectedTherapist.profile.user.id}`}
                />
              ) : (
                ""
              )}
            </div>
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
              <p className="mt-3 ms-3"> {selectedTherapist.profile.bio}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1>FORBIDDEN</h1>
      )}
    </div>
  );
}
