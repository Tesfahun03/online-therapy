import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import jwtDecode from "jwt-decode";
import useAxios from "../../utils/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faComment,
  faAngleUp,
  faAngleDown,
  faPen,
  faTrash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../styles/Records.css";
import {
  Tooltip,
  OverlayTrigger,
  Button,
  Modal,
  Collapse,
} from "react-bootstrap";
import { decode } from "punycode";

export default function RecordsDetail() {
  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const history = useHistory();
  const first_name = decoded.first_name;
  const last_name = decoded.last_name;
  const therapist_name = first_name + " " + last_name;

  const { id } = useParams();
  const axios = useAxios();
  const [patient, setPatient] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [patientRecords, setPatientRecords] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [record, setRecord] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(null);
  const [photo, setPhoto] = useState(null);
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };

  //edit the note
  const [editMode, setEditMode] = useState(false);
  const [editRecordId, setEditRecordId] = useState(null);

  const handleEditClick = (recordId, note) => {
    setRecord(note);
    setEditRecordId(recordId);
    setEditMode(true);
    setShowModal(true);
  };

  const truncateNote = (note, length) => {
    if (note.length <= length) return note;
    return note.substring(0, length) + "...";
  };

  const [expandedNotes, setExpandedNotes] = useState({});

  const handleToggleReadMore = (id) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleRecord = (e) => {
    setRecord(e.target.value); // Convert to number
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handlePhotoPreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const patientData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/core/patients/${id}`
      );

      let fetchedPatient = response.data;
      // Ensure prediction_result is an array
      if (typeof fetchedPatient.prediction_result === "string") {
        try {
          // Replace single quotes with double quotes to make it valid JSON
          const correctedString = fetchedPatient.prediction_result.replace(
            /'/g,
            '"'
          );
          fetchedPatient.prediction_result = JSON.parse(correctedString);
        } catch (error) {
          console.error("Error parsing prediction result:", error);
          fetchedPatient.prediction_result = [];
        }
      }
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
  }, []);

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

  const filterPatientRecords = patientRecords.filter(
    (patientRecord)=> (patientRecord.therapist_name === `${user_id}`)
  )

  console.log(filterPatientRecords)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/prediction/predicted_result/${id}/`
        );
        // Parse the predicted_result strings to arrays
        const parsedPredictions = response.data.map((prediction) => {
          return {
            ...prediction,
            predicted_result: JSON.parse(
              prediction.predicted_result.replace(/'/g, '"')
            ),
          };
        });
        setPredictions(parsedPredictions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching prediction data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(predictions);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRecordSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("note", record);
    formData.append("therapist_name", user_id);
    formData.append("patient", id);
    if (photo) {
      formData.append("prescription", photo);
    }
    console.log(id);

    try {
      if (editMode) {
        const response = await axios.put(
          `http://127.0.0.1:8000/session/patient/${id}/record/${editRecordId}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Record updated successfully:", response.data);
      } else {
        const response = await axios.post(
          `http://127.0.0.1:8000/session/patient/${id}/record/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Record posted successfully:", response.data);
      }
      setShowModal(false);
      setRecord("");
      setEditMode(false);
      setEditRecordId(null);
      window.location.reload();
    } catch (error) {
      console.error(
        "Error on submitting record:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleVideo = (appointmentID) => {
    history.push(`/videochat-t/${appointmentID}`);
  };

  const isVideoButtonEnabled = (appointmentDate, startTime) => {
    const appointmentDateTime = moment(appointmentDate).set({
      hour: moment(startTime, "HH:mm:ss").hour(),
      minute: moment(startTime, "HH:mm:ss").minute(),
      second: moment(startTime, "HH:mm:ss").second(),
    });
    // Subtract 5 minutes from the appointment time
    const videoAvailableTime = moment(appointmentDateTime).subtract(
      5,
      "minutes"
    );
    return moment().isSameOrAfter(videoAvailableTime);
  };

  const handleToggle = (index) => {
    setOpenCollapse(openCollapse === index ? null : index);
  };

  return (
    <div className="therapist-home d-flex flex-column m-0">
      <div className="main-content col-lg-12 col-md-12 col-sm-8 px-4 min-vh-100">
        {patient && (
          <div>
            <div className="container-fluid">
              <div className="row shadow mt-4">
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
                    <div className="row mt-4" style={{ zIndex: 500 }}>
                      <div className="col-12">
                        <div className="card card-custom p-4">
                          <div className="d-flex align-items-start justify-content-between">
                            <div className="d-flex align-items-start mb-3 ">
                              <img
                                src={patient.profile.image}
                                className="rounded-circle me-1"
                                alt="Profile image"
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
                              <p className="mb-1">
                                <strong>
                                  Recent illness prediction result:
                                </strong>
                                {patient &&
                                patient.prediction_result &&
                                patient.prediction_result.length > 0 ? (
                                  <ul>
                                    {patient.prediction_result.map(
                                      (prediction, index) => {
                                        if (!prediction) return null;
                                        const [disorder, percentage] =
                                          prediction.split("->");
                                        if (!disorder || !percentage)
                                          return null;
                                        return (
                                          <li key={index}>
                                            <strong>{disorder.trim()}</strong>{" "}
                                            {"-> "} {percentage.trim()}
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                ) : (
                                  <p>No prediction results available.</p>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mt-4">
                      <div className="card card-custom p-4 mb-4">
                        <h3>Predictions</h3>
                        {isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          <div>
                            {predictions.map((prediction, index) => (
                              <div key={index}>
                                <h6 className="d-flex align-items-center">
                                  Predicted Result -{" "}
                                  {moment(prediction.predicted_at).format(
                                    "DD MMMM YYYY, hh:mm"
                                  )}
                                  <Button
                                    className="btn btn-link"
                                    variant="link"
                                    onClick={() => handleToggle(index)}
                                    aria-expanded={openCollapse === index}
                                    aria-controls={`collapse-${index}`}
                                  >
                                    {openCollapse === index ? (
                                      <FontAwesomeIcon icon={faAngleUp} />
                                    ) : (
                                      <FontAwesomeIcon icon={faAngleDown} />
                                    )}
                                  </Button>
                                </h6>

                                <Collapse
                                  in={openCollapse === index}
                                  id={`collapse-${index}`}
                                >
                                  <ul>
                                    {prediction.predicted_result.map(
                                      (result, idx) => (
                                        <li key={idx}>{result}</li>
                                      )
                                    )}
                                  </ul>
                                </Collapse>
                              </div>
                            ))}
                          </div>
                        )}
                        </div>
                      </div>

                      <div className="col-12 mt-4">
                        <div className="card card-custom p-4 mb-4">
                          <h5>Upcoming Appointments</h5>
                          {filteredAppointments.length > 0 ? (
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Time</th>
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
                                    <td>
                                      {" "}
                                      <OverlayTrigger
                                        overlay={
                                          <Tooltip>
                                            {isVideoButtonEnabled(
                                              appointment.date,
                                              appointment.start_time
                                            )
                                              ? "Start Video"
                                              : "Video will be available at the appointment time"}
                                          </Tooltip>
                                        }
                                      >
                                        <span className="d-inline-block">
                                          <button
                                            className="btn btn-success"
                                            onClick={() =>
                                              handleVideo(appointment.id)
                                            }
                                            disabled={
                                              !isVideoButtonEnabled(
                                                appointment.date,
                                                appointment.start_time
                                              )
                                            }
                                            style={{
                                              pointerEvents:
                                                isVideoButtonEnabled(
                                                  appointment.date,
                                                  appointment.start_time
                                                )
                                                  ? "auto"
                                                  : "none",
                                            }}
                                          >
                                            <FontAwesomeIcon icon={faVideo} />
                                          </button>
                                        </span>
                                      </OverlayTrigger>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p>No upcoming appointments with this patient.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12 col-sm-12 ms-sm-0 ms-lg-3 mt-4 border shadow min-vh-100">
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
                    {filterPatientRecords &&
                      filterPatientRecords.map((patientRecord) => (
                        <div
                          className="note-card row d-block align-items-start mb-4 mx-3 shadow p-2 rounded"
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
                                onClick={() =>
                                  handleEditClick(
                                    patientRecord.id,
                                    patientRecord.note
                                  )
                                }
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
                          <div className="row d-block align-items-start note-text">
                            {expandedNotes[patientRecord.id]
                              ? patientRecord.note
                              : truncateNote(patientRecord.note, 100)}
                          </div>
                          <div className="row">
                            <span
                              className=""
                              style={{ cursor: "pointer", color: "brown" }}
                              onClick={() =>
                                handleToggleReadMore(patientRecord.id)
                              }
                            >
                              {expandedNotes[patientRecord.id]
                                ? " Show less"
                                : " Read more"}
                            </span>
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
              <Modal.Title centered>
                {editMode ? "Edit Record" : "Add a new record"}
              </Modal.Title>
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
                  required
                ></textarea>
              </div>
              <div className="row input-group mt-3" style={{ width: "100%" }}>
                <p>Upload a photo of prescription if there is one.</p>
                <input
                  type="file"
                  name="photo"
                  className="form-control ms-3"
                  onChange={(event) => {
                    handlePhotoChange(event);
                    handlePhotoPreview(event); // Call handlePhotoPreview to update the image preview
                  }}
                />
              </div>
              {previewUrl && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="d-flex">
              <Button variant="outline-success" onClick={handleRecordSubmit}>
                {editMode ? "Update" : "Save"}
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
