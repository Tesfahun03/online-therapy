import React, {useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import "../../styles/LoginPatient.css";

export default function LoginPatient(){

    const {loginUser} = useContext(AuthContext)


    const handleLoginSubmit= e =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const userType = "patient"

        email.length > 0 && loginUser(email, password, userType)

        console.log(email)
        console.log(password)
    }

    return(
        <div className='login'>
            <div className="loginImage">
                <img src="../Images/login/LoginImage.png" alt="" />
            </div>
            <div className="loginForm">
                <div className="loginFormLogo">
                    <img src="../Images/login/LoginLogo.png" alt="" />
                    <h2>Login into your account</h2>
                </div>
                <div className='loginCard'>
                    <form onSubmit={handleLoginSubmit}>
                        <input 
                            type="email"
                            placeholder='Email Address'
                            name='email'
                        />
                        <input 
                            type="password"
                            placeholder='Password'
                            name='password'
                        />
                        <button className='loginButton'>Login</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}