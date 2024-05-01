import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';
import AuthContext from '../context/AuthContext';

export default function NavBar(){

    const {user, logoutUser} = useContext(AuthContext)

    const token = localStorage.getItem("authTokens")
    const isLoggedIn = token !== null;

    const navbarRef = useRef(null);
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        const navbarHeight = navbarRef.current.offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight;

        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth',
        });
      };

    return(
        <nav ref={navbarRef} className="navBar">
            {isLoggedIn ? (
                <>
                    <Link to = '/home-p' style={{textDecoration:'none'}}>
                        <div className="navImgName">
                            <img src="../Images/logo/BunnaLogo.png" alt="" className='bunnaLogo' />
                            <h3 className='bunnaName'><a>BunnaMind</a></h3>
                        </div>
                    </Link>

                    <div className="navButton">
                        <div className="navButtonFlex">
                            <div className="notfication">
                                <img src="../Images/landingpage/notification.png" alt="" />
                                <h5>Notification</h5>
                            </div>
                            <div className="profile">
                                <img src="../Images/landingpage/man.png" alt="" />
                                <h5>Profile</h5>
                            </div>
                            <h3 className='logoutButton' onClick={logoutUser}>Logout</h3>
                        </div>
                    </div>
                    
                </>
            ):(
                <>
                    <Link to = '/' style={{textDecoration:'none'}}>
                        <div className="navImgName">
                            <img src="../Images/logo/BunnaLogo.png" alt="" className='bunnaLogo' />
                            <h3 className='bunnaName'><a>BunnaMind</a></h3>
                        </div>
                    </Link>
                    <div className="navLink">
                        {
                            location.pathname === '/' && (
                                <div className='navLinkFlex'>
                                    <Link to="/register-d"  style={{textDecoration:"none"}}><h3>For Therapist</h3></Link>
                                    <h3 onClick={() => scrollToSection('Faq')}>FAQ</h3>
                                    <h3 onClick={() => scrollToSection('AboutUs')}>About Us</h3>
                                    <h3 onClick={() => scrollToSection('ContactUs')}>Contact Us</h3>
                                </div>
                            )
                        }
                    </div>

                    <div className="navButton">
                        {
                            location.pathname === '/login-p' ? (
                                <div className='navButtonFlex'>
                                    <Link to="/register-p" style={{textDecoration:'none'}}><h3 className='registerButton' >Register</h3></Link>
                                </div> 
                            ):(
                                <div className='navButtonFlex'>
                                    <Link to="/login-p" style={{textDecoration:'none'}}><h3 className='loginButton'>Login</h3> </Link>
                                    {location.pathname==='/' && <Link to="/register-p" style={{textDecoration:'none'}}> <h3 className='registerButton'>Register</h3> </Link>}
                                </div>
                                
                            )
                        }
                    </div>
                </>
            )}
           
        </nav>
    )
}