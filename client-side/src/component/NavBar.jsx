import React, { useRef, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";

export default function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);

  const token = localStorage.getItem("authTokens");
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));
  const location = useLocation();
  const decodedToken = token ? jwtDecode(token) : null;

  const user_type = decodedToken && decodedToken.user_type;

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

  return (
    <nav ref={navbarRef} className="navBar">
      {isLoggedIn ? (
        <>
          <Link
            to={user_type === "therapist" ? "/therapist-dashboard" : "/home-p"}
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
              {user_type !== "therapist" && (
                <Link to="/notification-p" style={{ textDecoration: "none" }}>
                  <div className="notification">
                    <img src="../Images/landingpage/notification.png" alt="" />
                    <h5>Notification</h5>
                  </div>
                </Link>
              )}

              <Link to="/community-space" style={{ textDecoration: "none" }}>
                <div className="community-space">
                  <img
                    src="../Images/landingpage/search.png"
                    alt="Community Space"
                  />
                  <h5>Community Space</h5>
                </div>
              </Link>

              <Link to="/profile-p" style={{ textDecoration: "none" }}>
                <div className="profile-button">
                  <img src="../Images/landingpage/man.png" alt="" />
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
                <Link to="/register-d" style={{ textDecoration: "none" }}>
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
