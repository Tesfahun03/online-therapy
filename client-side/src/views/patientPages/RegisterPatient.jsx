import React, {useContext, useState } from 'react';
import "../../styles/RegisterPatient.css";
import AuthContext from '../../context/AuthContext';

export default function RegisterPatient(){
    const [registerData, setRegisterData] = useState({
        firstName:"",
        lastName:"",
        emailAddress:"",
        username:"",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        gender:"",
        age:"",
        martialStatus:"",
        languagePreference:"",
        city:"",
        region:"",
        occupation:"",
        has_paid:false
    })

    const {registerPatient} = useContext(AuthContext)

    function handleRegisterData(event){
        const {name, value} = event.target
        setRegisterData(prevRegisterData=>{
            return{
                ...prevRegisterData, 
                [name]:value
            }
        })
    }
    const handleRegisterSubmit= async e => {
        e.preventDefault()
        const first_name = registerData.firstName
        const last_name = registerData.lastName
        const email = registerData.emailAddress
        const username = registerData.username
        const password = registerData.password
        const password2 = registerData.confirmPassword
        const prefered_language = registerData.languagePreference
        const age = registerData.age
        const gender = registerData.gender
        const martial_status = registerData.martialStatus
        const phone = registerData.phoneNumber
        const city = registerData.city
        const region = registerData.region
        const occupation = registerData.occupation
        const has_paid = registerData.has_paid

        const patientData = {
                profile: {
                    user: {
                        email,
                        username,
                        password,
                        password2,
                    },
                    first_name,
                    last_name,
                    prefered_language,
                    age, 
                    gender,
                    martial_status,
                    phone,
                    city,
                    region,
                },
                occupation,
                has_paid
            };

        console.log(registerData)

        registerPatient(patientData)
    }
    return(
        <div className='register'>
            <div className="register-welcome-info">
                <h2 className='welcome'>Welcome to BunnaMind</h2>
                <p className="register-info">Please fill out the form below for a quick background briefing. It will help us match you with the most suitable online provider.</p>
            </div>
            <div className="register-card">
                <div className="register-card-header">
                    <h4 className="register-card-title">Account Information</h4>
                </div>
                <div className="register-form">
                    <form onSubmit={handleRegisterSubmit}>
                            <div className='form-outline d-flex'>
                                <input 
                                    type="text"
                                    id='first-name'
                                    placeholder='First name'
                                    name='firstName'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                                <input 
                                    type="text"
                                    id='last-name'
                                    placeholder='Last name'
                                    name='lastName'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                            </div>
                            
                            <div className="form-outline d-flex">
                                <input 
                                    type="email"
                                    id='email-address'
                                    placeholder='Email address'
                                    name='emailAddress'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                                <input 
                                    type="tel" 
                                    id="phone"
                                    placeholder='Phone number'
                                    name='phoneNumber'
                                    className='form-control'
                                    onChange={handleRegisterData}
                                    data-mdb-input-mask="999-999-999?9" 
                                />

                            </div>
                               
                            <input 
                                type="text"
                                id='user-name'
                                placeholder='Username'
                                name='username'
                                onChange={handleRegisterData}
                                className='form-control'
                            />

                            <div className="form-outline d-flex">
                                <input 
                                    type="password"
                                    id='password'
                                    placeholder='Password'
                                    name='password'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                                <input 
                                    type="password"
                                    id='confirm-password'
                                    placeholder='Confirm password'
                                    name='confirmPassword'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                            </div>

                            <div className="form-outline d-flex">
                                <select
                                    name='gender'
                                    className='form-select'
                                    id='gender'
                                    value={registerData.gender}
                                    onChange={handleRegisterData}
                                >
                                    <option value="">Choose Your Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                                <input 
                                    type="number"
                                    id='age'
                                    placeholder='Age'
                                    name='age'
                                    min={21}
                                    max={105}
                                    step={1}
                                    onChange={handleRegisterData}
                                    className='form-control'
                                    value={registerData.age}
                                />

                            </div>
                            
                           
                        <div className="form-outline d-flex">
                            <select
                                name='martialStatus'
                                className='form-select'
                                id='martial-status'
                                value={registerData.martialStatus}
                                onChange={handleRegisterData}
                            >
                                <option value="">Martial status</option>
                                <option value="SINGLE">Single</option>
                                <option value="MARRIED">Married</option>
                                <option value="DIVORCED">Divorced</option>
                            </select>
                            <select
                                name='languagePreference'
                                className='form-select'
                                id='language-preference'
                                value={registerData.languagePreference}
                                onChange={handleRegisterData}
                            >
                                <option value="">Language preference</option>
                                <option value="AMHARIC">Amharic</option>
                                <option value="OROMIFA">Oromifa</option>
                                <option value="SOMALLI">Somalli</option>
                                <option value="TIGRIGNA">Tigrigna</option>
                                <option value="ENGLISH">English</option>
                            </select>
                        </div>

                        <div className='form-outline d-flex'>
                            <input
                                type='text'
                                id="city"
                                name='city'
                                placeholder='City'
                                value={registerData.city}
                                onChange={handleRegisterData}
                                className='form-control'
                            />

                            <input
                                type='text'
                                name='region'
                                placeholder='Region'
                                value={registerData.region}
                                onChange={handleRegisterData}
                                className='form-control'
                            />
                        </div>
                        <select
                                name='occupation'
                                className='form-select'
                                id='occupation'
                                value={registerData.occupation}
                                onChange={handleRegisterData}
                            >
                                <option value="">Occupation</option>
                                <option value="STUDENT">Student</option>
                                <option value="EMPLOYED">Employed</option>
                                <option value="SELFEMPLOYED">Self-Employed</option>
                                <option value="UNEMPLOYED">Unemployed</option>
                            </select>
                        
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}