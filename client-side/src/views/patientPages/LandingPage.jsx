import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import jwtDecode from "jwt-decode";
import "../../styles/LandingPage.css";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Card, Button } from "react-bootstrap";

export default function LandingPage() {
  const baseURL = "http://127.0.0.1:8000/core";

  const axios = useAxios();
  let [searchTherapist, setSearchTherapist] = useState({ search: "" });
  const [searchResults, setSearchResults] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [recommendedTherapists, setRecommendedTherapists] = useState(null);

  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const history = useHistory();

  //Get user data
  const first_name = decoded.first_name;
  const user_type = decoded.user_type;
  const user_id = decoded.user_id;

  useEffect(() => {
    const patientData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/core/patients/${user_id}`
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        if (data.prediction_result === "null") {
          window.location.href = "http://localhost:3000/questionnaire";
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

  const SearchTherapist = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/core/search/' + searchTherapist.username + '/'
      );
      if (response.status === 200) {
        setSearchResults(response.data);
      } else if (response.status === 404) {
        console.log(response.data.detail);
        alert("User does not exist");
      }
    } catch (error) {
      console.error("Error searching therapist:", error);
      alert("Error searching therapist");
    }    
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

  useEffect(() => {
    const fetchRecommendedTherapist = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/recommendation/recommend/${user_id}`
        );
        if (response.status === 200) {
          setRecommendedTherapists(response.data);
        } else {
          throw new Error("Failed to fetch recommended therapist");
        }
      } catch (error) {
        console.error("Error fetching recommended therapist:", error);
      }
    };

    fetchRecommendedTherapist();
  }, [user_id]);

  const filteredTherapists = therapists.filter(
    (therapist) => therapist.paymentRate > 0
  );
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="landingPage">
      <h2 className="hi text-center fw-bold fs-1 mt-3 mb-3">
        Hi, {first_name}!
      </h2>
      <div className="row search d-flex justify-content-around">
        <form className="d-flex w-50" onSubmit={(e) => { e.preventDefault(); }}>
          <input
            type="text"
            placeholder="Search Therapist"
            name="username"
            className="searchBar form-control rounded-0 w-100"
            onChange={handelSearch}
          />
          <button onClick = {SearchTherapist} className="searchButton btn btn-secondary rounded-0">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="searchResults mt-4 justify-content-center d-flex">
        {searchResults.length > 0 && (
          <div>
            <h2 className="text-center">Search Results</h2>
            {searchResults.map((user) => {
              if (user.user_type === 'therapist') {
                return (
                  <Link
                    to={`/viewtherapist/${user.user_id}`}
                    className="list-group-item list-group-item-action border-0"
                    key={user.user_id}
                  >
                    <div className="d-flex align-items-start">
                      <img
                        src={user.image}
                        className="rounded-circle mr-1"
                        alt="Profile"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1 ml-3">
                        {capitalizeFirstLetter(user.first_name)} {" "} {capitalizeFirstLetter(user.last_name)}
                        <div className="small">
                          <small>
                            <i className="fas fa-envelope"> View Profile</i>
                          </small>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              } else {
                return null; // Skip rendering if user is not a therapist
              }
            })}
          </div>
        )}
      </div>
      

      <div className="recommendedTherapists mt-4">
        <h2 className="text-center">Recommended Therapists</h2>
        <div className="row m-0 p-0 d-flex align-items-center">
          {recommendedTherapists &&
            recommendedTherapists.map((therapist) => (
              <div className="col-md-3 mb-4 mt-4" key={therapist.id}>
                <Card className="h-100 py-2 px-3 shadow border-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <Card.Img
                      variant="top"
                      src={therapist.profile.image}
                      alt={`${therapist.profile.first_name} ${therapist.profile.last_name}`}
                      className="therapistImage"
                    />
                    <div>
                      <Card.Title className="therapistName">
                        {capitalizeFirstLetter(therapist.profile.first_name)}{" "}
                        {capitalizeFirstLetter(therapist.profile.last_name)}
                      </Card.Title>
                      <Card.Text className="therapistDetails">
                        Counceling Therapist{therapist.specialization} <br />
                        with {therapist.experience}{" "}
                        years experience
                      </Card.Text>
                    </div>
                  </div>
                  <Card.Body className="">
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleTherapistSelect(therapist.profile.user.id)
                      }
                    >
                      View Profile
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>

      {/* <div className="feeling text-center">
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
      </div> */}

      <div className="ourTherapist ms-5 me-5 mt-3">
        <h2 className="text-center mt-5 fs-1">Our Therapist</h2>
        <div className="therapistList row row-auto">
          {filteredTherapists.length > 0 ? (
            filteredTherapists.map((therapist) => (
              <div
                className="col col-auto border-0 card d-lg-flex flex-lg-column d-sm-block flex-sm-wrap shadow pe-3 me-5 mb-3 mt-4"
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
            ))
          ) : (
            <div className="alert alert-info text-center mt-1">
              Sorry, no therapists available for now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
