import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage("Passwords do not match");
      setVariant("danger");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/core/reset-password/${uidb64}/${token}/`,
        {
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        }
      );
      setMessage(response.data.message);
      setVariant("success");
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
      setVariant("danger");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h1 className="text-center mb-4">Reset Password</h1>
              {message && (
                <Alert variant={variant} className="mt-3" dismissible>
                  {message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmNewPassword" className="mt-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
