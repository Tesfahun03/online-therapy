import React, {useContext, useState, useEffect } from 'react';
import "../../styles/RegisterPatient.css";
import { useTranslation } from "react-i18next";
import AuthContext from '../../context/AuthContext';

export default function RegisterPatient(){
    const [t, i18n] = useTranslation("global");
    const [selectedLanguage, setSelectedLanguage] = useState("english"); // State to store selected language

    useEffect(() => {
        // Check if a language is saved in local storage
        const savedLanguage = localStorage.getItem("preferredLanguage");
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
            setSelectedLanguage(savedLanguage); // Set selected language from local storage
        }
    }, []);

    const handleChangeLanguage = (e) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
        setSelectedLanguage(language); // Update selected language in state
        localStorage.setItem("preferredLanguage", language); // Save selected language in local storage
    };
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
            <div className="languageForTranslate">
                <select
                    className="preferedLanguage"
                    onChange={handleChangeLanguage}
                    value={selectedLanguage} // Set value to the selected language
                >
                    <option value="english">English</option>
                    <option value="amharic">Amharic</option>
                    <option value="oromo">Oromo</option>
                    <option value="sumalic">Sumalic</option>
                    <option value="tigrigna">Tigrigna</option>
                </select>
            </div>
            <div className="register-welcome-info">
                <h2 className='welcome'>{t("register.welcomeTitle")}</h2>
                <p className="register-info">{t("register.patientRegisterInfo")}</p>
            </div>
            <div className="register-card">
                <div className="register-card-header">
                    <h4 className="register-card-title">{t("register.patientRegisterHeader")}</h4>
                </div>
                <div className="register-form">
                    <form onSubmit={handleRegisterSubmit}>
                            <div className='form-outline d-flex'>
                                <input 
                                    type="text"
                                    id='first-name'
                                    placeholder={t("register.registerFirstName")}
                                    name='firstName'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                                <input 
                                    type="text"
                                    id='last-name'
                                    placeholder={t("register.registerLastName")}
                                    name='lastName'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                            </div>
                            
                            <div className="form-outline d-flex">
                                <input 
                                    type="email"
                                    id='email-address'
                                    placeholder={t("register.registerEmailAddress")}
                                    name='emailAddress'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                                <input 
                                    type="tel" 
                                    id="phone"
                                    placeholder={t("register.registerPhoneNumber")}
                                    name='phoneNumber'
                                    className='form-control'
                                    onChange={handleRegisterData}
                                    data-mdb-input-mask="999-999-999?9" 
                                />

                            </div>
                               
                            <input 
                                type="text"
                                id='user-name'
                                placeholder={t("register.registerUserName")}
                                name='username'
                                onChange={handleRegisterData}
                                className='form-control'
                            />

                            <div className="form-outline d-flex">
                                <input 
                                    type="password"
                                    id='password'
                                    placeholder={t("register.registerPassword")}
                                    name='password'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                                <input 
                                    type="password"
                                    id='confirm-password'
                                    placeholder={t("register.registerConfirmPassword")}
                                    name='confirmPassword'
                                    onChange={handleRegisterData}
                                    className='form-control'
                                />
                            </div>

                            <div className="form-outline d-flex">
                                <select
                                    name='gender'
                                    className='formSelect'
                                    id='gender'
                                    value={registerData.gender}
                                    onChange={handleRegisterData}
                                >
                                    <option className='' value="">{t("register.registerGender")}</option>
                                    <option value="MALE">{t("register.registerGenderMale")}</option>
                                    <option value="FEMALE">{t("register.registerGenderFemale")}</option>
                                </select>
                                <input 
                                    type="number"
                                    id='age'
                                    placeholder={t("register.registerAge")}
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
                                className='formSelect'
                                id='martial-status'
                                value={registerData.martialStatus}
                                onChange={handleRegisterData}
                            >
                                <option value="">{t("register.registerMartialStatus")}</option>
                                <option value="SINGLE">{t("register.registerMartialStatus1")}</option>
                                <option value="MARRIED">{t("register.registerMartialStatus2")}</option>
                                <option value="DIVORCED">{t("register.registerMartialStatus3")}</option>
                            </select>
                            <select
                                name='languagePreference'
                                className='formSelect'
                                id='language-preference'
                                value={registerData.languagePreference}
                                onChange={handleRegisterData}
                            >
                                <option value="">{t("register.registerLanguagePreference")}</option>
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
                                placeholder={t("register.registerCity")}
                                value={registerData.city}
                                onChange={handleRegisterData}
                                className='form-control'
                            />

                            <input
                                type='text'
                                name='region'
                                placeholder={t("register.registerRegion")}
                                value={registerData.region}
                                onChange={handleRegisterData}
                                className='form-control'
                            />
                        </div>
                        <div className='form-outline d-flex'>
                            <select
                                name='occupation'
                                className='formSelect'
                                id='occupation'
                                value={registerData.occupation}
                                onChange={handleRegisterData}
                            >
                                <option value="">{t("register.registerOccupation")}</option>
                                <option value="STUDENT">Student</option>
                                <option value="EMPLOYED">Employed</option>
                                <option value="SELFEMPLOYED">Self-Employed</option>
                                <option value="UNEMPLOYED">Unemployed</option>
                            </select>
                        </div>
                        
                        <button>{t("register.registerBtn")}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}