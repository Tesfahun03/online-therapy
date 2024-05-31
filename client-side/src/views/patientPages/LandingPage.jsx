import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import jwtDecode from "jwt-decode";
import "../../styles/LandingPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function LandingPage() {
  const baseURL = "http://127.0.0.1:8000/core";

  const axios = useAxios();
  const [searchTherapist, setSearchTherapist] = useState({ search: "" });
  const [therapists, setTherapists] = useState(null);

  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const history = useHistory();

  //Get user data
  const first_name = decoded.first_name;
  const user_type = decoded.user_type;
  const user_id = decoded.user_id

  useEffect(() => {
    const patientData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/core/patients/${user_id}`);
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        if (data.prediction_result === "null") {
          window.location.href = 'http://localhost:3000/questionnaire';
        }
      } catch (error) {
        console.error("There was a problem fetching the data", error);
      }
    };

    patientData(); // Call the function inside useEffect

  }, []);
  

  console.log(decoded);

  //Get Therapists data and set the use state
  const therapistsData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/core/therapists");
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

  const handleTherapistSelect = (therapistid) => {
    history.push(`/viewtherapist/${therapistid}`);
  };

  function handelSearch(event) {
    const { name, value } = event.target;

    setSearchTherapist((prevSetSearchTherapist) => {
      return {
        ...prevSetSearchTherapist,
        [name]: value,
      };
    });
  }

  console.log(therapists);

  return (
    <div className="landingPage">
      <h2 className="hi text-center fw-bold fs-1 mt-3 mb-3">
        Hi, {first_name}!
      </h2>
      <div className="search d-flex justify-content-around">
        <form className="d-flex w-50">
          <input
            type="text"
            placeholder="Search Therapist"
            name="username"
            className="searchBar form-control rounded-0 w-100"
            onChange={handelSearch}
          />
          <button className="searchButton btn btn-secondary rounded-0">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>

      <div className="feeling text-center">
        <h2 className="mb-3 mt-5">How You feel Today?</h2>
        <div className="how-you-feel row row-auto d-flex m-0 p-0">
          <div className="emoji col col-4 col-auto">
            <h3>😊</h3>
            <h4>Happy</h4>
          </div>
          <div className="emoji col col-4 col-auto">
            <h3>🙂</h3>
            <h4>Normal</h4>
          </div>
          <div className="emoji col col-4 col-auto">
            <h3>😐</h3>
            <h4>Sad</h4>
          </div>
        </div>
      </div>

      <div className="ourTherapist ms-5 me-5 mt-3">
        <h2 className="text-center mt-5 fs-1">Our Therapist</h2>
        <div className="therapistList row row-auto">
          {therapists &&
            therapists.map((therapist) => (
              <div
                className="col col-auto card d-lg-flex flex-lg-column d-sm-block flex-sm-wrap shadow pe-3 me-5 mb-3 mt-4"
                key={therapist.profile.user.id}
                onClick={() => handleTherapistSelect(therapist.profile.user.id)}
              >
                <img
                  src={therapist.profile.image}
                  className="licenses img-fluid ms-2"
                  alt={`${therapist.profile.first_name} ${therapist.profile.last_name}`}
                />
                <h5 className="ms-2 fs-4 mb-2 mt-2">
                  {therapist.profile.first_name} {therapist.profile.last_name}
                </h5>
                <h5
                  className="ms-2"
                  style={{ color: "gray", marginTop: "-10px" }}
                >
                  {therapist.specialization}
                </h5>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
