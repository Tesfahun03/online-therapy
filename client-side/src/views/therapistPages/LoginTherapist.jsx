import "../../styles/therapistlogin.css"
import React, { useContext, useEffect} from "react"
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import AuthContext from "../../context/AuthContext"
export default function LoginTherapist() {
    const [t, i18n] = useTranslation("global"); 
    useEffect(() => {
        // Check if a language is saved in local storage
        const savedLanguage = localStorage.getItem("preferredLanguage");
        if (savedLanguage) {
          i18n.changeLanguage(savedLanguage);
        }
      }, []);
      const handleChangeLanguage = (e) => { 
        const selectedLanguage = e.target.value;
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem("preferredLanguage", selectedLanguage); 
    };

    const {loginUser} =useContext(AuthContext)

    const handleLoginSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        email.length >0 && loginUser(email, password)

        console.log(email)
        console.log(password)
    };

  return (
    <div className='loginTherapist'>
        <div className="languageForTranslate">
            <select
                className="preferedLanguage"
                onChange={handleChangeLanguage}
            >
                <option value="english">English</option>
                <option value="amharic">Amharic</option>
                <option value="oromo">Oromo</option>
                <option value="sumalic">Sumalic</option>
                <option value="tigrigna">Tigrigna</option>                            
            </select>     
        </div>        
        <div className="container">
            <div className="therapistLogin">
                <div className="loginTop">
                    <span className="colomnTitle">{t("login.colomnTitle")}</span>
                </div>                    
                <div className="loginRow">
                    <div className="loginLeft">
                        <div className='loginImg'>
                            <img src="../../Images/home/PeopleBean.png" alt="no photo" />
                        </div>
                    </div>
                    <div className="loginRight">
                        <form onSubmit={handleLoginSubmit} >
                            <input 
                                type="email" 
                                className="therapistLoginInput"
                                placeholder={t("login.therapistLoginEmail")}
                                name="email"
                                required
                            />
                            <input 
                                type="Password" 
                                className="therapistLoginInput"
                                placeholder={t("login.therapistLoginPassword")}
                                name="password"
                                required
                            />
                            <button 
                                className="loginbtn"
                                type="submit"
                                >
                                {t("login.therapistLoginbtn")}
                            </button> 
                        </form>
                        <span className="therapistForgot">{t("login.therapistForgot")}</span>                          
                    </div>                                         
                </div>
            </div>              
        </div>
    </div>
  )
}
