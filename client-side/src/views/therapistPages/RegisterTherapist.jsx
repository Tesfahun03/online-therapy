import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import "../../styles/therapistregister.css";
import AuthContext from '../../context/AuthContext';


export default function RegisterTherapist() {

        const [registerTherapistData, setRegisterTherapistData] = useState({
            firstName:"",
            lastName:"",
            emailAddress:"",
            username:"",
            password:"",
            confirmPassword:"",
            user_type:"therapist",
            //image:null,
            bio:"",
            gender:"",
            age:"",
            martialStatus:"",
            languagePreference:"",
            city:"",
            region:"",
            phoneNumber:"",
            specialization:"",
            experience:"",
            religion:"",
            licenses:""

            })

        const {registerTherapist} = useContext(AuthContext)

        function handleRegisterTherapistData(event) {
            const { name, value, type, files } = event.target;
          
            if (type === 'file') {
              setRegisterTherapistData(prevRegisterData => ({
                ...prevRegisterData,
                [name]: files[0]
              }));
            } else {
              setRegisterTherapistData(prevRegisterData => ({
                ...prevRegisterData,
                [name]: value
              }));
            }
          }
          

        const handleRegisterTherapistSubmit= async e => {
            e.preventDefault()


            const first_name = registerTherapistData.firstName
            const last_name = registerTherapistData.lastName
            const email = registerTherapistData.emailAddress
            const username = registerTherapistData.username
            const password = registerTherapistData.password
            const password2 = registerTherapistData.confirmPassword
            const user_type = registerTherapistData.user_type
            //const image = registerTherapistData.image
            const bio = registerTherapistData.bio
            const prefered_language = registerTherapistData.languagePreference
            const age = registerTherapistData.age
            const gender = registerTherapistData.gender
            const martial_status = registerTherapistData.martialStatus
            const phone = registerTherapistData.phoneNumber
            const city = registerTherapistData.city
            const region = registerTherapistData.region
            const specialization = registerTherapistData.specialization
            const experience = registerTherapistData.experience
            const licenses = registerTherapistData.licenses
            const religion = registerTherapistData.religion

           
    
            const therapistData = {
                    profile: {
                        user: {
                            email,
                            username,
                            password,
                            password2,
                        },
                        user_type,
                        first_name,
                        last_name,
                        //image,
                        bio,
                        prefered_language,
                        age, 
                        gender,
                        martial_status,
                        phone,
                        city,
                        region,
                    },
                    specialization,
                    experience,
                    licenses,
                    religion   
                };

                registerTherapist(therapistData)
            }


  return (
    <div className='registerTherapist'>
        <div className="container">
            <div className="welcome-title">
                <h3>Welcome to BunnaMind</h3>
                <h4>We are happy to have you. Please fill in the form below to register.</h4>
            </div>
            <div className="reg-thera-form">
                <div className="reg-thera-card-header">
                    <h3>Fill in your personal information.</h3>
                </div>
                <form onSubmit={handleRegisterTherapistSubmit} encType="multipart/form-data" >
                    <div className='form-outline d-flex'>
                        <input 
                            type="text"
                            id='first-name'
                            placeholder='First name'
                            name='firstName'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                        <input 
                            type="text"
                            id='last-name'
                            placeholder='Last name'
                            name='lastName'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                    </div>
                    <div className="form-outline d-flex">
                        <input 
                            type="email"
                            id='email-address'
                            placeholder='Email address'
                            name='emailAddress'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                        <input 
                            type="text"
                            id='user-name'
                            placeholder='Username'
                            name='username'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                    </div>
                    <div className="form-outline d-flex">
                        <input 
                            type="password"
                            id='password'
                            placeholder='Password'
                            name='password'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                        <input 
                            type="password"
                            id='confirm-password'
                            placeholder='Confirm password'
                            name='confirmPassword'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                    </div>
                    <div className="form-outline d-flex">
                        <select
                            name='gender'
                            className='form-select'
                            id='gender'
                            onChange={handleRegisterTherapistData}
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
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />

                    </div>

                    <div className="form-outline d-flex">
                        <select
                            name='martialStatus'
                            className='form-select'
                            id='martial-status'
                            onChange={handleRegisterTherapistData}
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
                            onChange={handleRegisterTherapistData}
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
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                            />

                        <input
                            type='text'
                            name='region'
                            placeholder='Region'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                    </div>

                    <div className='form-outline d-flex'>
                        <input
                            type='tel'
                            id="phonenumber"
                            name='phoneNumber'
                            placeholder='Phone number'
                            className='form-control'
                            onChange={handleRegisterTherapistData} 
                            data-mdb-input-mask="999-999-999?9" 
                            />
                        <input
                            type='text'
                            name='specialization'
                            placeholder='Specialization'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                    </div>

                    <div className="form-outline d-flex">
                        
                        <input 
                            type="text"
                            id='experience'
                            placeholder='Experience'
                            name='experience'
                            className='form-control'
                            onChange={handleRegisterTherapistData}
                        />
                        <select
                            name='religion'
                            className='form-select'
                            id='religion'
                            onChange={handleRegisterTherapistData}
                        >
                            <option value="">Religion</option>
                            <option value="ORTHODOX">Orthodox</option>
                            <option value="PROTESTANT">Protestant</option>
                            <option value="MUSLIM">Muslim</option>
                            <option value="CHATHOLIC">Chatholic</option>    
                        </select>
                    </div>

                    <div className="form-outline">
                            <label htmlFor="fileInput">Select Liscence File:</label>
                            <input
                                type="file"
                                id="fileInput"
                                className="form-control"
                                name="licenses"
                                onChange={handleRegisterTherapistData}
                            />
                    </div>
                    <button> Register</button>
                    <Link to="" style={{textDecoration:"none"}}><p>Forget password?</p></Link>
                    <p>Already have an account <Link to="/login-d" style={{textDecoration:'none'}}>Sign in</Link></p>
                </form>
            </div>
        </div>
        </div>
  )
        }