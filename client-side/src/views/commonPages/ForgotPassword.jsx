import React, { useState } from "react";
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/core/forgot-password/",
        { email }
      );
      setMessage(response.data.message);
      setVariant("success");
    } catch (error) {
      setMessage(error.response.data.error);
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
              <h1 className="text-center mb-4">Forgot Password</h1>
              {message && (
                <Alert variant={variant} className="mt-3" dismissible>
                  {message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
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

export default ForgotPassword;
