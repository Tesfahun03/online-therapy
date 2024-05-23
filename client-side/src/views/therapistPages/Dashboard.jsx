import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart,
  LinearScale,
  BarController,
  CategoryScale,
  BarElement,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCalendarMinus,
  faCalendarPlus,
  faEye,
  faTimeline,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../component/SideBar";
import "../../styles/therapisthome.css";

export default function Dashboard() {
  const [t, i18n] = useTranslation("global");
  const [selectedLanguage, setSelectedLanguage] = useState("english"); 

  useEffect(() => {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
          setSelectedLanguage(savedLanguage); 
      }
  }, [i18n]);

  const handleChangeLanguage = (e) => {
      const language = e.target.value;
      i18n.changeLanguage(language);
      setSelectedLanguage(language); 
      localStorage.setItem("preferredLanguage", language); 
  };
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    Chart.register(LinearScale, BarController, CategoryScale, BarElement);

    let myChart = null;

    function createChart() {
      const data = {
        labels: ["20-30", "30-50", "50 and above"], // X-axis labels
        datasets: [
          {
            label: "Data",
            data: [10, 30, 40], // Corresponding data values
            backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
            borderColor: "rgba(75, 192, 192, 1)", // Border color
            borderWidth: 1, // Border width
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: "linear",
            beginAtZero: true,
            ticks: {
              stepSize: 10, // Define the step size for the y-axis ticks
            },
            title: {
              display: true,
              text: "Total Patients",
            },
          },
        },
      };

      // Destroy the existing chart if it exists
      if (myChart) {
        myChart.destroy();
      }

      // Create a new chart
      myChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    }

    createChart();

    // Clean up function to destroy the chart when the component unmounts
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);
  return (
    <div className="therapist-home row d-flex flex-row  m-0">
<<<<<<< Updated upstream
      <div className="col col-lg-2 col-md-2 col-sm-3 m-0 p-0">
        <SideBar />
      </div>
=======
      <div className="languageForTranslate">
        <select
            className="preferedLanguage"
            onChange={handleChangeLanguage}
            value={selectedLanguage} 
        >
            <option value="english">English</option>
            <option value="amharic">Amharic</option>
            <option value="oromo">Oromo</option>
            <option value="sumalic">Sumalic</option>
            <option value="tigrigna">Tigrigna</option>
        </select>
      </div>
      <SideBar />
>>>>>>> Stashed changes
      <div className="dashboard col">
        <div className="main-info row">
          <div className="col col-auto col-2.5 me-5">
            <div className="dashboard-card card row d-flex flex-row align-items-center shadow rounded p-1 mb-5 mt-4 ms-3">
              <div className="col col-auto shadow rounded p-2 ms-2">
                <FontAwesomeIcon icon={faUserGroup} />
              </div>
              <div className="col col-auto text-start mt-2">
                <h5 className="fs-6">{t("dashboard.totalCounceling")}</h5>
                <h5>29K</h5>
              </div>
            </div>
            <div className="dashboard-card card row d-flex flex-row align-items-center shadow rounded p-1 mb-5 mt-4 ms-3">
              <div className="col col-auto shadow rounded p-2 ms-2">
                <FontAwesomeIcon icon={faTimeline} />
              </div>
              <div className="col col-auto text-start mt-2">
                <h5 className="fs-6">{t("dashboard.newAppointments")}</h5>
                <h5>10</h5>
              </div>
            </div>
            <div className="dashboard-card card row d-flex flex-row align-items-center shadow rounded p-1 mb-5 mt-4 ms-3">
              <div className="col col-auto shadow rounded p-2 ms-2">
                <FontAwesomeIcon icon={faEye} />
              </div>
              <div className="col col-auto text-start mt-2">
                <h5 className="fs-6">{t("dashboard.totalVisitor")}</h5>
                <h5>10</h5>
              </div>
            </div>
          </div>
          <div className="col col-auto col-2.5 me-5">
            <div className="dashboard-card card row d-flex flex-row align-items-center shadow rounded p-1 mb-5 mt-4 ms-3">
              <div className="col col-auto shadow rounded p-2 ms-2">
                <FontAwesomeIcon icon={faCalendarCheck} color="green" />
              </div>
              <div className="col col-auto text-start mt-2">
                <h5 className="fs-6">{t("dashboard.overallBooking")}</h5>
                <h5>1K</h5>
              </div>
            </div>
            <div className="dashboard-card card row d-flex flex-row align-items-center shadow rounded p-1 mb-5 mt-4 ms-3">
              <div className="col col-auto shadow rounded p-2 ms-2">
                <FontAwesomeIcon icon={faCalendarMinus} color="brown" />
              </div>
              <div className="col col-auto text-start mt-2">
                <h5 className="fs-6">{t("dashboard.cancelledAppointments")}</h5>
                <h5>10</h5>
              </div>
            </div>
            <div className="dashboard-card card row d-flex flex-row align-items-center shadow rounded p-1 mb-5 mt-4 ms-3">
              <div className="col col-auto shadow rounded p-2 ms-2">
                <FontAwesomeIcon icon={faCalendarPlus} color="purple" />
              </div>
              <div className="col col-auto text-start mt-2">
                <h5 className="fs-6">{t("dashboard.appointmentsToday")}</h5>
                <h5>3</h5>
              </div>
            </div>
          </div>

          <div className="col col-lg-5 col-md-5 col-sm-6 ms-1 mt-3">
            <canvas ref={chartRef} />
          </div>
        </div>
        <hr />

        <div className="additional-info row"></div>
      </div>
    </div>
  );
}
