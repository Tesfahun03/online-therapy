import React, {useContext, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import AuthContext from '../../context/AuthContext';
import "../../styles/LoginPatient.css";

export default function LoginPatient(){
    const [t, i18n] = useTranslation("global");
    const [selectedLanguage, setSelectedLanguage] = useState("english"); // State to store selected language

    useEffect(() => {
        // Check if a language is saved in local storage
        const savedLanguage = localStorage.getItem("preferredLanguage");
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
            setSelectedLanguage(savedLanguage); // Set selected language from local storage
        }
    }, [i18n]);

    const handleChangeLanguage = (e) => {
        const language = e.target.value;
        i18n.changeLanguage(language);
        setSelectedLanguage(language); // Update selected language in state
        localStorage.setItem("preferredLanguage", language); // Save selected language in local storage
    };
    const {loginUser} = useContext(AuthContext)


    const handleLoginSubmit= e =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        email.length > 0 && loginUser(email, password)

        console.log(email)
        console.log(password)
    }

    return(
        <div className='login'>
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
            <div className="loginImage">
                <img src="../Images/login/LoginImage.png" alt="" />
            </div>
            <div className="loginForm">
                <div className="loginFormLogo">
                    <img src="../Images/login/LoginLogo.png" alt="" />
                    <h2>{t("login.patientLoginTitle")}</h2>
                </div>
                <div className='loginCard'>
                    <form onSubmit={handleLoginSubmit}>
                        <input 
                            type="email"
                            placeholder={t("login.patientloginEmailAddress")}
                            name='email'
                        />
                        <input 
                            type="password"
                            placeholder={t("login.patientLoginPassword")}
                            name='password'
                        />
                        <button className='loginButton'>{t("login.therapistLoginbtn")}</button>
                    </form>
                </div>
                
            </div>
        </div>
    );
}