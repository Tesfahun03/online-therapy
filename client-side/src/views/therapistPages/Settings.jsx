import React, { useState, useEffect } from "react";
import ParentComponent from "../../component/ParentBar";
import { Alert } from "react-bootstrap";
import { faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import useAxios from "../../utils/useAxios";
import { useTranslation } from "react-i18next";
import jwtDecode from "jwt-decode";

export default function Settings() {
  const axios = useAxios();

  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const [paymentChange, setPaymentChange] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("")
  const [therapists, setTherapists] = useState([]);
  const [paymentRate, setPaymentRate] = useState({});

  const therapistsData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/core/therapists/${user_id}`
      );
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
  }, [paymentChange]);

  const handlePaymentRateChange = (e) => {
    setPaymentRate(parseFloat(e.target.value)); // Convert to number
  };

  const handlePaymentRateSubmit = async (e) => {
    e.preventDefault();

    setPaymentChange(true)

    if(therapists.paymentRate === paymentRate){
      setAlertVariant("danger")
      setAlertMessage("You don't make an update on your payment rate value, nothing to change!!!")
      return
    }
  
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/core/therapists/${user_id}/`,
        { paymentRate: paymentRate }, // Ensure paymentRate is sent as a number
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Payment rate updated successfully:", response.data);
      setAlertVariant("success")
      setAlertMessage("Payment rate updated successfully");
      setPaymentChange(false)
      
    } catch (error) {
      console.error("Error updating payment rate:", error.response ? error.response.data : error.message);
      setAlertVariant("danger")
      setAlertMessage("Error updating payment rate");
    }
  };

  useEffect(() => {
    const fetchPaymentRate = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/core/therapists/${user_id}`);
        setPaymentRate(response.data.paymentRate);
      } catch (error) {
        console.error("Error fetching payment rate:", error);
      }
    };

    fetchPaymentRate();
  }, []);


  const handleAlertDismiss = () => {
    setAlertMessage(null);
  };


  return (
    <div className="therapist-home d-flex flex-column m-0">
      <ParentComponent/>
      <div className="main-content col-lg-10 col-md-10 col-sm-8 offset-lg-2 offset-md-2 offset-sm-4 min-vh-100">
        <h5 className="mt-4">Settings</h5>
        <div className="row">
          <h6>Payment Rate</h6>
          {therapists.paymentRate === 0 && (
            <Alert variant="danger" className="w-50 ms-3" dismissible>
              <h6>Your Payment rate per month (ETB/month) is 0 ETB</h6>
            </Alert>
          )}
          {
            alertMessage && 
            <Alert variant={alertVariant} className="w-50 ms-3" dismissible onClose={handleAlertDismiss}>
              {alertMessage}
            </Alert>
          }
          <form
            onSubmit={handlePaymentRateSubmit}
            className="d-flex align-items-center"
          >
            <div className="input-group" style={{ width: "50%" }}>
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Enter a number"
                  value={paymentRate}
                  onChange={handlePaymentRateChange}
                />
                <label htmlFor="floatingInput"  style={{ width: "100%" }}>
                  Your payment rate per month
                </label>
              </div>
              <span className="input-group-text">ETH Birr</span>
            </div>
            <button className="btn btn-success ms-2">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
