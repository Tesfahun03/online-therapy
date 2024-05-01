import React, { createContext, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";
import '../styles/AuthContext.css';
const swal =require('sweetalert2');

const AuthContext= createContext()

export default AuthContext

export const AuthProvider=({children})=>{

    const [authTokens, setAuthTokens] = useState(()=>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(()=> 
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    const[loading, setLoading] = useState(true);

    const history = useHistory();

    const loginUser = async (email, password, userType) =>{

        const response = await fetch("http://127.0.0.1:8000/core/token/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json();
        console.log(data)

        if(response.status === 200){
            console.log("Logged In");
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            console.log(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))

            if (userType === "therapist") {
                history.push("/therapist-landing-page");
              } else if (userType === "patient") {
                history.push("/home-p");
              }
              
            swal.fire({
                title: "Login Successful",
                icon: "success",
                toast: true,
                timer: 2000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
            })

        } else {    
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "Username or password does not exists",
                icon: "error",
                toast: true,
                timer: 4000,
                position: 'center-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,
                customClass:{
                    popup:"custom-popup",
                    container:'custom-container'
                },
                backdrop:'rgba(0,0,0,0.4)'

            })
        }
    }

     const registerPatient = async (patientData) => {
        const {profile, user, occupation} = patientData
        const response = await fetch("http://127.0.0.1:8000/core/register-patient/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({profile, user, occupation})
        })

        const data = await response.json();
        console.log(data)

        if(response.status === 201){
            history.push("/login-p")
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 2000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,

            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 4000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,

            })
        }
    }

    const registerTherapist = async (therapistData) => {
        const {profile, specialization, experience, licenses, religion} = therapistData

        const formDataToSend = new FormData();

        Object.entries(therapistData).forEach(([key, value]) => {
            if (key === 'profile') {
              // Append user fields within profile object
              Object.entries(value.user).forEach(([userKey, userValue]) => {
                formDataToSend.append(`profile.user.${userKey}`, userValue);
              });
            } else {
              formDataToSend.append(key, value);
            }
          });
        
          // Append nested fields
          Object.entries(therapistData.profile).forEach(([key, value]) => {
            if (typeof value !== 'object' || value === null) {
              formDataToSend.append(`profile.${key}`, value);
            }
          });

        formDataToSend.append('specialization', specialization);
        formDataToSend.append('experience', experience);
        formDataToSend.append('licenses', licenses);
        formDataToSend.append('religion', religion);


        const response = await fetch("http://127.0.0.1:8000/core/register-therapist/", {
            method: "POST",
            body: formDataToSend
        })

        const data = await response.json();
        console.log(data)

        if(response.status === 201){
            history.push("/login-d")
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 2000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,

            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 4000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,

            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        history.push("/login-p")
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 2000,
            position: 'top',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,

        })
    }


    const contextData = {
        authTokens,
        setAuthTokens,
        user,
        setUser,
        loginUser,
        registerPatient,
        registerTherapist,
        logoutUser
    }

    useEffect(()=>{
        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null: children}
        </AuthContext.Provider>
    )
}