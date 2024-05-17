import React, { useState, useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import "../../styles/ViewTherapist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faVideo } from "@fortawesome/free-solid-svg-icons";


export default function ViewTherapist(){
  const { id } = useParams();
  const history = useHistory();

  const [selectedTherapist, setSelectedTherapist] = useState(null);

  //Get Therapist data and set the use state
  const therapistData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/therapists/${id}/`);
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
   }, []);

   const handleMessageDirect=(therpaistId)=>{
    history.push(`/message/${id}`)
   }

   console.log(selectedTherapist);

  return (
    <div className="view-therapist">
      {selectedTherapist && (
        <div className="row row-auto p-0 m-0">
          <div
            className="therapist-pro-pic-info col col-auto col-lg-3 col-md-5 col-sm-4 card d-lg-flex flex-lg-column d-sm-block flex-sm-wrap shadow pe-3 mt-5 ms-4 me-4"
            key={selectedTherapist.profile.user.id}
          >
            <img
              key={selectedTherapist.profile.user.id}
              src={selectedTherapist.profile.image}
              className="licenses img-fluid ms-2"
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
              <button className="btn btn-success me-3 mb-3" onClick={()=>handleMessageDirect(id)}>
                <FontAwesomeIcon icon={faMessage} />
              </button>
              <button className='btn btn-success ms-3 mb-3'><FontAwesomeIcon icon={faVideo}/></button>
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
      )}
    </div>
  );
}
