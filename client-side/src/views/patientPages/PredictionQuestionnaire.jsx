import React, { useState, useEffect } from "react";
import "../../styles/Questionnaries.css";
import jwtDecode from "jwt-decode";
import useAxios from "../../utils/useAxios";
import ProgressBar from "../../component/ProgressBar.jsx";
import Confetti from "react-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faHeartCircleCheck,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function PredictionQuestionnaire() {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const axios = useAxios();
  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;
  const [successMessage, setSuccessMessage] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = [
    {
      question: "How often do you experience feelings of nervousness?",
      name: "q1",
    },
    {
      question: "How often do you experience panic?",
      name: "q2",
    },
    {
      question: "How often do you find yourself breathing rapidly?",
      name: "q3",
    },
    {
      question: "How often do you experience excessive sweating?",
      name: "q4",
    },
    {
      question: "How often do you have trouble concentrating?",
      name: "q5",
    },
    {
      question:
        "How often do you have difficulty falling asleep or staying asleep?",
      name: "q6",
    },
    {
      question:
        "How often do you face difficulties or challenges with your work?",
      name: "q7",
    },
    {
      question: "How often do you feel hopeless?",
      name: "q8",
    },
    {
      question: "How often do you experience feelings of anger?",
      name: "q9",
    },
    {
      question: "How often do you find yourself overreacting to situations?",
      name: "q10",
    },
    {
      question: "How often do you experience changes in your eating habits?",
      name: "q11",
    },
    {
      question:
        "How often do you have thoughts of harming yourself or ending your life?",
      name: "q12",
    },
    {
      question: "How often do you feel tired or fatigued?",
      name: "q13",
    },
    {
      question: "How often do you spend time with a close friend?",
      name: "q14",
    },
    {
      question:
        "How often do you find yourself spending excessive time on social media?",
      name: "q15",
    },
    {
      question: "How often do you notice changes in your weight?",
      name: "q16",
    },
    {
      question:
        "How often do you prefer spending time alone rather than with others?",
      name: "q17",
    },
    {
      question:
        "How often do you experience intrusive thoughts or memories of stressful events?",
      name: "q18",
    },
    {
      question: "How often do you experience nightmares while sleeping?",
      name: "q19",
    },
    {
      question: "How often do you avoid social interactions or activities?",
      name: "q20",
    },
    {
      question: "How often do you experience negative emotions?",
      name: "q21",
    },
    {
      question: "How often do you have trouble staying focused on tasks?",
      name: "q22",
    },
    {
      question: "How often do you blame yourself for things that go wrong?",
      name: "q23",
    },
    {
      question: "How often do you experience hallucinations?",
      name: "q24",
    },
    {
      question: "How often do you engage in repetitive behaviors or rituals?",
      name: "q25",
    },
    {
      question:
        "How often do you experience changes in your energy or activity levels based on the seasons?",
      name: "q26",
    },
    {
      question:
        "How often do you experience periods of increased energy or activity?",
      name: "q27",
    },
  ];

  const options = ["Never", "Occasionally", "Sometimes", "Frequently"];
  const optionValues = [0, 0, 1, 1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuestionnaireSubmit = async (e) => {
    e.preventDefault();

    const ageData = {
      age: decoded.age, // Assuming decoded.age contains the age value
    };

    // Merge ageData with formData
    const formDataToSend = { ...ageData, ...formData };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/prediction/predict/${user_id}/`,
        formDataToSend
      );
      console.log("Response from backend:", response.data);
      // Handle the response as needed
      setSuccessMessage("Questionnaire submitted successfully!");
      setShowConfetti(true);
    } catch (error) {
      console.error("Error sending POST request:", error);
      // Handle errors
    }
  };

  const nextStep = () => {
    const currentQuestion = questions[currentStep];
    if (!formData[currentQuestion.name]) {
      alert("Please select an option before proceeding to the next question.");
      return;
    }
    setCurrentStep((prevStep) => Math.min(prevStep + 1, questions.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const renderQuestion = () => {
    const question = questions[currentStep];
    return (
      <div className="mb-4 text-center">
        <h5>{question.question}</h5>
        <div
          className="d-flex flex-column align-items-start mx-auto"
          style={{ maxWidth: "300px" }}
        >
          {options.map((option, index) => (
            <div key={option} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={question.name}
                value={optionValues[index]} // Use the corresponding value from optionValues
                checked={formData[question.name] === optionValues[index]} // Check against integer value
                onChange={handleChange}
              />
              <label className="form-check-label">{option}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  console.log(formData);
  const redirectToHome = () => {
    // Redirect to "/home-p" route
    window.location.href = "/home-p";
  };

  return (
    <div className="questionnaries mt-5 d-flex justify-content-center align-items-center">
      <div className="container">
        {showConfetti && <Confetti />}
        {successMessage ? (
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-9 col-12 card shadow p-4 my-4 mx-3 rounded bg-light border">
              <FontAwesomeIcon icon={faCircleCheck} size="4x" color="green" />
              <div className="card-body text-center">
                <h2 className="card-title">{successMessage}</h2>
                <p className="card-text fs-sm-5 fs-5">
                  Thank you for completing the questionnaire! Your responses
                  have been submitted successfully.
                </p>
                <button className="btn btn-secondary" onClick={redirectToHome}>
                  <FontAwesomeIcon icon={faHome} /> Go to Home
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-center">Questionnaire</h2>
            <ProgressBar
              currentStep={currentStep}
              totalSteps={questions.length}
            />
            <form onSubmit={handleQuestionnaireSubmit}>
              {renderQuestion()}
              <div className="d-flex justify-content-around mx-5">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </button>
                {currentStep < questions.length - 1 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
