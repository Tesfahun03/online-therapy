import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios";
import jwtDecode from "jwt-decode";
import "../../styles/LandingPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function LandingPage() {
  const baseURL = "http://127.0.0.1:8000/core";

  const [searchTherapist, setSearchTherapist] = useState({ search: "" });
  const [therapists, setTherapists] = useState(null);

  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const history = useHistory;

  //Get user data
  const first_name = decoded.first_name;

  //Get Therapists data and set the use state
  const therapistData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/core/therapists/3");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTherapists(data);
    } catch (error) {
      console.error("There was a problem fetching the data", error);
    }
  };

  useEffect(() => {
    therapistData();
  }, []);

  function handelSearch(event) {
    const { name, value } = event.target;

    setSearchTherapist((prevSetSearchTherapist) => {
      return {
        ...prevSetSearchTherapist,
        [name]: value,
      };
    });
  }

  console.log(therapists)


  return (
    <div className="landingPage">
      <h2 className="hi">Hi, {first_name}!</h2>
      <div className="search">
        <form>
          <input
            type="text"
            placeholder="Search Therapist"
            name="username"
            className="searchBar"
            onChange={handelSearch}
          />
          <button className="searchButton">
            <img src="../Images/landingpage/search.png" />
          </button>
        </form>
      </div>

      <div className="feeling">
        <h2>How You feel Today?</h2>
        <div className="how-you-feel">
          <div className="emoji">
            <h3>😊</h3>
            <h4>Happy</h4>
          </div>
          <div className="emoji">
            <h3>🙂</h3>
            <h4>Normal</h4>
          </div>
          <div className="emoji">
            <h3>😐</h3>
            <h4>Sad</h4>
          </div>
        </div>
      </div>

      <div className="ourTherapist">
        <h2>Our Therapist</h2>
        <div className="therapistList">
          {therapists && (
            <>
              <img src={therapists.profile.image} className="licenses" />
              <h5>{therapists.profile.first_name}</h5>
              <h5>{therapists.specialization}</h5>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
