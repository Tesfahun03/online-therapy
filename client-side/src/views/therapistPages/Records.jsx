import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ParentComponent from "../../component/ParentBar";
import jwtDecode from "jwt-decode";
import useAxios from "../../utils/useAxios";

export default function Records() {
  const history = useHistory();
  const axios = useAxios();

  const [patients, setPatients] = useState([]);
  const [creditedPayments, setCreditedPayments] = useState([]);
  const [relatedPatients, setRelatedPatients] = useState([]);

  //Getting the token and decode using jwtDecode
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/core/patients/"
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    const fetchCreditedPayments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/payment/therapist/${user_id}/credited/`
        );
        setCreditedPayments(response.data);
      } catch (error) {
        console.error("Error fetching credited payments:", error);
      }
    };

    fetchPatients();
    fetchCreditedPayments();
  }, [user_id]);

  useEffect(() => {
    const findRelatedPatients = () => {
      const related = patients.map(patient => {
        const payment = creditedPayments.find(payment => payment.patient === patient.profile.user_id && payment.status === 'success');
        if (payment) {
          return {
            ...patient,
            paymentAmount: payment.amount,
            paymentDate: payment.created_at,
          };
        }
        return null;
      }).filter(patient => patient !== null);
      setRelatedPatients(related);
    };

    findRelatedPatients();
  }, [patients, creditedPayments]);

  console.log(patients);
  console.log(creditedPayments);
  console.log(relatedPatients);

  return (
    <div className="therapist-home d-flex flex-column m-0">
      <ParentComponent/>
      <div className="main-content col-lg-10 col-md-10 col-sm-8 offset-lg-2 offset-md-2 offset-sm-4 min-vh-100" style={{width:"75%"}}>
        <h2>Related Patients with Successful Payments</h2>
        <table className="table table-striped table-bordered table-hover shadow">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Payment Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {relatedPatients.map(patient => (
              <tr key={patient.profile.id} onClick={()=>history.push(`records-t/${patient.profile.user_id}`)}>
                <td>{patient.profile.user_id}</td>
                <td>{patient.profile.first_name}</td>
                <td>{patient.profile.last_name}</td>
                <td>{patient.paymentAmount} ETB</td>
                <td>{new Date(patient.paymentDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
