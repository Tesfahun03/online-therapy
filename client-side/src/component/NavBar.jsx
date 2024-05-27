import React, { useRef, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell, faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";
import { use } from "i18next";

export default function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  const axios = useAxios();

  const token = localStorage.getItem("authTokens");
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));
  const [relationIds, setRelationId] = useState(null);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [currentMessageCount, setCurrentMessageCount] = useState(0); // Define currentMessageCount state
  const [currentNotificationCount, setCurrentNotificationCount] = useState(0); // Define currentMessageCount state
  const location = useLocation();
  const decodedToken = token ? jwtDecode(token) : null;

  const user_type = decodedToken && decodedToken.user_type;
  const user_id = decodedToken && decodedToken.user_id;

  useEffect(() => {
    const handleTokenChange = () => {
      const updatedToken = localStorage.getItem("authTokens");
      const updatedIsLoggedIn = Boolean(updatedToken);
      setIsLoggedIn(updatedIsLoggedIn);
    };

    // Listen for changes to the "authTokens" item in local storage
    window.addEventListener("storage", handleTokenChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []);

  useEffect(() => {
    const fetchRelationId = async () => {
      try {
        const endpoint = user_type === "patient" ? "patient" : "therapist";
        const transactionType = user_type === "patient" ? "debited" : "credited";
        
        const response = await axios.get(`http://127.0.0.1:8000/payment/${endpoint}/${user_id}/${transactionType}`);
        
        // Assuming the response contains an array of relations
        const relationData = response.data;
        // Extract the correct ID based on user type
        const fetchedIds = user_type === "patient"
        ? relationData.map(data => data.therapist)
        : relationData.map(data => data.patient);
        
        setRelationId(fetchedIds);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchRelationId();
  }, [user_id, user_type]);

  useEffect(() => {
    const updatedToken = localStorage.getItem("authTokens");
    const updatedIsLoggedIn = Boolean(updatedToken);
    setIsLoggedIn(updatedIsLoggedIn);
  }, [window.location.pathname]);

  useEffect(() => {
    const handlePopstate = () => {
      const currentPath = window.location.pathname;
      const isLoginPage = currentPath === "/login-p";

      if (isLoggedIn && isLoginPage) {
        logoutUser();
        window.location.reload();
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isLoggedIn, logoutUser]);

  const navbarRef = useRef(null);

  useEffect(() => {
    const handlePopstate = () => {
      const currentPath = window.location.pathname;
      const isLoginPage = currentPath === "/login-p";
      const updatedToken = localStorage.getItem("authTokens");
      const updatedIsLoggedIn = Boolean(updatedToken);

      if (isLoggedIn && isLoginPage && !updatedIsLoggedIn) {
        logoutUser();
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isLoggedIn, logoutUser]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const navbarHeight = navbarRef.current.offsetHeight;
    const sectionTop = section.offsetTop - navbarHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  };

  const fetchMessageCount = async () => {
    try {
      const counterResponse = await axios.get(`http://127.0.0.1:8000/session/counter/${user_id}/`);
      const messageCount = counterResponse.data.messageCount;
      const messageResponse = await axios.get(`http://127.0.0.1:8000/session/all-my-messages/${user_id}/`);
      const messages = messageResponse.data;
      const currentMessageCount = messages.length;
      setCurrentMessageCount(currentMessageCount);
      if (currentMessageCount > messageCount) {
        setNewMessageCount(currentMessageCount - messageCount);
      } else {
        setNewMessageCount(0);
      }

      const notificationCount = counterResponse.data.notificationCount;
      const endpoint = user_type === "patient" ? "patient" : "therapist";
      const notificationResponse = await axios.get(`http://127.0.0.1:8000/session/${endpoint}/${user_id}/notification/`);
      const notifications = notificationResponse.data;
      const currentNotificationCount = notifications.length;
      setCurrentNotificationCount(currentNotificationCount);
      if (currentNotificationCount > notificationCount) {
        setNewNotificationCount(currentNotificationCount - notificationCount);
      } else {
        setNewNotificationCount(0);
      }
  
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    let interval;
    if (isLoggedIn) {
      fetchMessageCount();
      interval = setInterval(fetchMessageCount, 1000); // Fetch message count every 1 second
    }

    return () => clearInterval(interval);
  }, [isLoggedIn, user_id, user_type]);

  const handleNotificationClick = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/session/message-count/${user_id}/`, {
        notificationCount: currentNotificationCount,
        user: user_id
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageClick = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/session/message-count/${user_id}/`, {
        messageCount: currentMessageCount,
        user: user_id
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav ref={navbarRef} className="navBar">
      {isLoggedIn ? (
        <>
          <Link
            to={user_type === "therapist" ? "/dashboard-t" : "/home-p"}
            style={{ textDecoration: "none" }}
          >
            <div className="navImgName">
              <img
                src="../Images/logo/BunnaLogo.png"
                alt=""
                className="bunnaLogo"
              />
              <h3 className="bunnaName">
                BunnaMind
              </h3>
            </div>
          </Link>

          <div className="navButton">
            <div className="navButtonFlex">
              {user_type === "patient" && (
                <Link to="/notification-p" style={{ textDecoration: "none" }} onClick={handleNotificationClick}>
                  <div className="notification">
                    <FontAwesomeIcon icon={faBell} color="beige" style={{ width: '2.5vw', height: '2.5vw' }}/>
                    {newNotificationCount > 0 && <span className="badge">{newNotificationCount}</span>}
                    <h5>Notification</h5>
                  </div>
                </Link>
              )}
              {user_type === "therapist" && (
                <Link to="/notification-t" style={{ textDecoration: "none" }} onClick={handleNotificationClick}>
                  <div className="notification">
                    <FontAwesomeIcon icon={faBell} color="beige" style={{ width: '2.5vw', height: '2.5vw' }}/>
                    {newNotificationCount > 0 && <span className="badge">{newNotificationCount}</span>}
                    <h5>Notification</h5>
                  </div>
                </Link>
              )}
              {relationIds && relationIds.length > 0 ? (
              <Link to="/message-box" style={{ textDecoration: "none" }} onClick={handleMessageClick}>
                <div className="message-box">
                <FontAwesomeIcon icon={faEnvelope} color="beige" style={{ width: '2.5vw', height: '2.5vw' }}/>
                {newMessageCount > 0 && <span className="badge">{newMessageCount}</span>}
                  <h5>Message</h5>
                </div>
              </Link>
              ) : ("")}
              <Link to="/community-space" style={{ textDecoration: "none" }}>
                <div className="community-space">
                  <FontAwesomeIcon icon={faGlobe} color="beige" style={{ width: '2.5vw', height: '2.5vw' }}/>
                  <h5>Community</h5>
                </div>
              </Link>

              <Link to="/profile-p" style={{ textDecoration: "none" }}>
                <div className="profile-button">
                <FontAwesomeIcon icon={faUser} color="beige" style={{ width: '2.5vw', height: '2.5vw' }}/>
                  <h5>Profile</h5>
                </div>
              </Link>
              <h3
                className="logoutButton"
                onClick={() => logoutUser(user_type)}
              >
                Logout
              </h3>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="navImgName">
              <img
                src="../Images/logo/BunnaLogo.png"
                alt=""
                className="bunnaLogo"
              />
              <h3 className="bunnaName">
                BunnaMind
              </h3>
            </div>
          </Link>
          <div className="navLink">
            {location.pathname === "/" && (
              <div className="navLinkFlex">
                <Link to="/register-t" style={{ textDecoration: "none" }}>
                  <h3>For Therapist</h3>
                </Link>
                <h3 onClick={() => scrollToSection("Faq")}>FAQ</h3>
                <h3 onClick={() => scrollToSection("AboutUs")}>About Us</h3>
                <h3 onClick={() => scrollToSection("ContactUs")}>Contact Us</h3>
              </div>
            )}
          </div>

          <div className="navButton">
            {location.pathname === "/login-p" ? (
              <div className="navButtonFlex">
                <Link to="/register-p" style={{ textDecoration: "none" }}>
                  <h3 className="registerButton">Register</h3>
                </Link>
              </div>
            ) : (
              <div className="navButtonFlex">
                <Link to="/login-p" style={{ textDecoration: "none" }}>
                  <h3 className="loginButton">Login</h3>{" "}
                </Link>
                {location.pathname === "/" && (
                  <Link to="/register-p" style={{ textDecoration: "none" }}>
                    {" "}
                    <h3 className="registerButton">Register</h3>{" "}
                  </Link>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
