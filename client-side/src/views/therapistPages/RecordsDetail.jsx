import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import SideBar from "../../component/SideBar";
import jwtDecode from "jwt-decode";
import useAxios from "../../utils/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../styles/Records.css";
import { Button, Modal } from "react-bootstrap";

export default function RecordsDetail() {
  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const { id } = useParams();
  const axios = useAxios();
  const [patient, setPatient] = useState(null);
  const [patientRecords, setPatientRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRecord = (e) => {
    setRecord(e.target.value); // Convert to number
  };

  const patientData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/core/patients/${id}`
      );
      setPatient(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    patientData();
  }, [id]);

  const patientRecordData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/session/patient/${id}/record`
      );
      setPatientRecords(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching patient records:", error);
    }
  };
  useEffect(() => {
    patientRecordData();
  }, []);

  const handleRecordDelete = async (recordId) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/session/patient/${id}/record/${recordId}`
    );
    console.log(response.data);
    window.location.reload();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRecordSubmit = async (e) => {
    e.preventDefault(); 
    console.log(id)
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/session/patient/${id}/record/`,
        { note: record, therapist_name: user_id, patient: id }
      );

      console.log("Record posted successfully:", response.data);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error(
        "Error on posting record:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="therapist-home row d-flex flex-row  m-0">
      <div className="col col-lg-2 col-md-2 col-sm-4 m-0 p-0">
        <SideBar />
      </div>
      {patient && (
        <div className="col d-flex">
          <div className="col col-8 me-2 border shadow">
            <h2>Id</h2>
          </div>
          <div className="col col-4 border shadow">
            <h6 className="p-2">
              Your list of records related to {patient.profile.first_name}
            </h6>
            <button
              className="ms-2  mb-3 btn btn-secondary"
              onClick={handleShow}
            >
              Add new record <FontAwesomeIcon icon={faAdd} />
            </button>
            {patientRecords &&
              patientRecords.map((patientRecord) => (
                <div className="note-card row d-block align-items-start m-3 shadow p-2 rounded">
                  <div className="row d-flex justify-content-between">
                    <div className="col">
                      <p className="m-0 p-0">Record {patientRecord.id}</p>
                      <p
                        className="m-0 p-0"
                        style={{ color: "lightgray", fontWeight: "600" }}
                      >
                        at {moment(patientRecord.date).format("D MMMM YYYY")}
                      </p>
                    </div>
                    <div className="col d-flex justify-content-around">
                      <FontAwesomeIcon
                        icon={faPen}
                        className="me-1"
                        style={{ cursor: "pointer" }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="ms-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRecordDelete(patientRecord.id)}
                      />
                    </div>
                  </div>
                  <div className="row d-block align-items-start">
                    {patientRecord.note}
                  </div>
                  <div className="row">
                    <h6
                      className="m-0 p-0"
                      style={{ color: "lightblue", fontWeight: "600" }}
                    >
                      Click to read
                    </h6>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <>
        <Modal show={showModal} backdrop="static" onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title centered>Add a new record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="input-group" style={{ width: "100%" }}>
              <textarea
                placeholder="Start writing..."
                name="note"
                className="form-control"
                onChange={handleRecord}
                value={record}
                rows="12" // Increase the number of rows to make it higher
                cols="8"
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex">
            <Button variant="success" onClick={handleRecordSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        {showModal && (
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: "1050" }}
          ></div>
        )}
      </>
    </div>
  );
}
