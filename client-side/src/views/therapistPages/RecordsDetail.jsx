import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import SideBar from "../../component/SideBar";
import jwtDecode from "jwt-decode";
import useAxios from "../../utils/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faComment,
  faPen,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../styles/Records.css";
import { Button, Modal } from "react-bootstrap";

export default function RecordsDetail() {
  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const history = useHistory();

  const { id } = useParams();
  const axios = useAxios();
  const [patient, setPatient] = useState(null);
  const [patientRecords, setPatientRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState("");
  const [appointments, setAppointments] = useState([]);
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
      const appointmentResponse = await axios.get(
        `http://127.0.0.1:8000/session/patient/${response.data.profile.user_id}/appointments/`
      );
      setAppointments(appointmentResponse.data);
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

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.therapistID === user_id
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRecordSubmit = async (e) => {
    e.preventDefault();
    console.log(id);
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

  const handleVideo = (patientId) => {
    history.push(`/videochat-t/${patientId}`);
  };

  return (
    <div className="therapist-home d-flex flex-column m-0">
      <div className="main-content col-lg-10 col-md-10 col-sm-8 offset-lg-2 offset-md-2 offset-sm-4 min-vh-100" >
        {patient && (
          <div>
            <div className="container-fluid">
              <div className="row shadow mt-4" >
                <div className="col-12 d-lg-flex d-sm-block">
                  <div className="content m-0 p-0">
                    <div className="row">
                      <div className="col-12 ms-lg-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="mt-1">
                            <strong>Patient</strong> {">"}{" "}
                            <span
                              style={{
                                color: "rgb(70, 30, 30)",
                                fontWeight: "bold",
                              }}
                            >
                              {patient.profile.first_name}{" "}
                              {patient.profile.last_name}
                            </span>
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4"style={{zIndex:500}}>
                      <div className="col-12">
                        <div className="card card-custom p-4">
                          <div className="d-flex align-items-start justify-content-between">
                            <div className="d-flex align-items-start mb-3 ">
                              <img
                                src={patient.profile.image}
                                className="rounded-circle me-1"
                                alt="Esther Flores"
                                width={60}
                              />
                              <div className="ms-3">
                                <h5>
                                  {patient.profile.first_name +
                                    " " +
                                    patient.profile.last_name}
                                </h5>
                                <p className="mt-1">{patient.occupation}</p>
                              </div>
                            </div>
                            <button className="btn border">
                              <FontAwesomeIcon
                                icon={faComment}
                                onClick={() => {
                                  window.location.href = `/message/${patient.profile.user_id}`;
                                }}
                              />
                            </button>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <p>
                                <strong>Age: </strong> {patient.profile.age}
                              </p>
                              <p>
                                <strong>Gender:</strong>{" "}
                                {patient.profile.gender}
                              </p>
                              <p>
                                <strong>Martial Status:</strong>{" "}
                                {patient.profile.martial_status}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Phone:</strong> {patient.profile.phone}
                              </p>
                              <p>
                                <strong>City: </strong> {patient.profile.city}
                              </p>
                              <p>
                                <strong>Region:</strong>{" "}
                                {patient.profile.region}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Prefered Language: </strong>{" "}
                                {patient.profile.prefered_language}
                              </p>
                              <p>
                                <strong>
                                  Recent ilnness prediction result:{" "}
                                </strong>{" "}
                                {patient.prediction_result === "null"
                                  ? "Not found"
                                  : patient.prediction_result}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <div className="card card-custom p-4 mb-4">
                          <h5>Upcoming Appointments</h5>
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Condition</th>
                                <th>Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                  <td>
                                    {new Date(
                                      appointment.startDate
                                    ).toLocaleDateString()}
                                  </td>
                                  <td>
                                    {new Date(
                                      appointment.startDate
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </td>
                                  <td>{appointment.reason}</td>
                                  <td>
                                    {" "}
                                    <button
                                      className="btn btn-success"
                                      onClick={() =>
                                        handleVideo(appointment.id)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faVideo} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <a href="#" className="btn btn-primary">
                            Add Appointment
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 ms-sm-0 ms-lg-3 mt-4 border shadow">
                    <h6 className="p-2">
                      Your list of records related to{" "}
                      {patient.profile.first_name}
                    </h6>
                    <button
                      className="ms-2 mb-3 btn btn-secondary"
                      onClick={handleShow}
                    >
                      Add new record <FontAwesomeIcon icon={faAdd} />
                    </button>
                    {patientRecords &&
                      patientRecords.map((patientRecord) => (
                        <div
                          className="note-card row d-block align-items-start m-3 shadow p-2 rounded"
                          key={patientRecord.id}
                        >
                          <div className="row d-flex justify-content-between">
                            <div className="col">
                              <p className="m-0 p-0">
                                Record {patientRecord.id}
                              </p>
                              <p
                                className="m-0 p-0"
                                style={{
                                  color: "lightgray",
                                  fontWeight: "600",
                                }}
                              >
                                at{" "}
                                {moment(patientRecord.date).format(
                                  "D MMMM YYYY"
                                )}
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
                                onClick={() =>
                                  handleRecordDelete(patientRecord.id)
                                }
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
              </div>
            </div>
          </div>
        )}

        <>
          <Modal
            show={showModal}
            backdrop="static"
            onHide={handleClose}
            centered
          >
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
    </div>
  );
}
