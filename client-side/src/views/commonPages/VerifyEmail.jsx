import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Container, Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const [redirectUrl, setRedirectUrl] = useState("/");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/core/verify-email/${uid}/${token}/`)
      .then((response) => {
        setMessage("Email verified successfully!");
        setRedirectUrl(response.data.redirect_url || "/");
      })
      .catch((error) => {
        setMessage("Email verification failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uid, token]);

  const handleRedirect = () => {
    window.location.href = redirectUrl;
  };

  return (
    <Container className="text-center min-vh-100" style={{ paddingTop: "7vw", marginTop:"10%" }}>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Verifying...</span>
        </Spinner>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-9 col-12 card shadow p-4 mx-3 rounded bg-light border">
            <FontAwesomeIcon icon={faCircleCheck} size="4x" color="green" />
            <div className="card-body text-center">
              <h2 className="card-title">Verification</h2>
              <p className="card-text fs-sm-5 fs-5">
                Your email address verified successfully please click the button below to redirect to the login page!!!
              </p>
              <button className="btn btn-outline-secondary" onClick={handleRedirect}>
                <FontAwesomeIcon icon={faHome} /> Go to home page
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default VerifyEmail;
