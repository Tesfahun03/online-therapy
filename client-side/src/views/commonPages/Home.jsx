import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import "../../styles/Home.css"
import { Link } from 'react-router-dom';


export default function Home(){
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

    const[sendMessage, setSendMessage]= useState({
        firstName:"",
        lastName:"",
        emailAddress:"",
        message:""
    })

    function handleSendMessage(event){

        const{name, value} = event.target;
        setSendMessage(prevSendMessage=>{
            return{
                ...prevSendMessage,
                [name]:value
            }
        })
    }

    function handelSendMessageSubmit(event){
        event.preventDefault()
        console.log(sendMessage)
    }


    return(
        <>
            <div className="languageForTranslate">
                <select
                    className="preferedLanguage"
                    onChange={handleChangeLanguage}
                    value={selectedLanguage} // Set value to the selected language
                >
                    <option value="english">Eng</option>
                    <option value="amharic">Amh</option>
                    <option value="oromo">Oro</option>
                    <option value="sumalic">Sum</option>
                    <option value="tigrigna">Tig</option>
                </select>
            </div>
            <div className='Home' id='Home'>
                <div className="Home-img">
                    <img src="../Images/home/EllipseTalk.png" alt="" className='ellipsetalk' />
                </div>
                <div className='Home-Intro-Title'>
                    <h3>{t('home.homeIntroTitleH3')}</h3>
                    <h4>"{t('home.homeIntroTitleH4')}"</h4>
                    <Link to="/login-p"><button>{t('home.homeGetStartedButton')}</button></Link>
                </div>
            </div>
            <div className="Faq" id='Faq'>
                <h1 className='text-center'>{t('home.homeFaqTitle')}</h1>
                <div className='faq-even'>
                    <div className="faq-number">1</div>
                    <div className="faq-q-and-a">
                        <div className="faq-question">{t('home.homeFaqQuestion1')}</div>
                        <div className="faq-answer">{t('home.homeFaqAnswer1')}</div>
                    </div>
                </div>

                <div className='faq-odd'>
                    <div className="faq-number">2</div>
                    <div className="faq-q-and-a">
                        <div className="faq-question">{t('home.homeFaqQuestion2')}</div>
                        <div className="faq-answer">{t('home.homeFaqAnswer2')}</div>
                    </div>
                </div>

                <div className='faq-even'>
                    <div className="faq-number">3</div>
                    <div className="faq-q-and-a">
                        <div className="faq-question">{t('home.homeFaqQuestion3')}</div>
                        <div className="faq-answer">{t('home.homeFaqAnswer3')}</div>
                    </div>
                </div>

                <div className='faq-odd'>
                    <div className="faq-number">4</div>
                    <div className="faq-q-and-a">
                        <div className="faq-question">{t('home.homeFaqQuestion4')}</div>
                        <div className="faq-answer">{t('home.homeFaqAnswer4')}</div>
                    </div>
                </div>
            </div>

            <div className="AboutUs" id='AboutUs'>
                <div className="AboutUs-info">
                    <div className="AboutUs-title">
                        <h2>{t('home.homeAboutUsTitle1')}</h2>
                        <h3>{t('home.homeAboutUsTitle2')}</h3>
                    </div>
                    <div className="About-why">
                        <h2>{t('home.homeAboutWhy')}</h2>
                        <div className='why-even'>
                            <img src="../Images/home/Tickbox.png" alt="" className='tickbox' />
                            <div className='why-reason-desc'>
                                <h4 className='reason'>{t('home.homeAboutUsReason1')}</h4>
                                <h4 className='description'>{t('home.homeAboutUsDescription1')}</h4>
                            </div>
                        </div>
                        <div className='why-odd'>
                            <img src="../Images/home/Tickbox.png" alt="" className='tickbox' />
                            <div className='why-reason-desc'>
                                <h4 className='reason'>{t('home.homeAboutUsReason2')}</h4>
                                <h4 className='description'>{t('home.homeAboutUsDescription2')}</h4>
                            </div>
                        </div>
                        <div className='why-even'>
                            <img src="../Images/home/Tickbox.png" alt="" className='tickbox' />
                            <div className='why-reason-desc'>
                                <h4 className='reason'>{t('home.homeAboutUsReason3')}</h4>
                                <h4 className='description'>{t('home.homeAboutUsDescription3')}</h4>
                            </div>
                        </div>
                        <div className='why-odd'>
                            <img src="../Images/home/Tickbox.png" alt="" className='tickbox' />
                            <div className='why-reason-desc'>
                                <h4 className='reason'>{t('home.homeAboutUsReason4')}</h4>
                                <h4 className='description'>{t('home.homeAboutUsDescription4')}</h4>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="AboutUs-img">
                    <img src="../Images/home/PeopleBean.png" alt="" className='peopleBean'/>
                    
                </div>
            </div>
            <div className='ContactUs'>
                    <img src="../Images/home/ContactUs.png" alt="" className='contactus' />
                    <div className='ContactUs-form'  id='ContactUs'>
                        <h2>{t('home.homeContactUsTitle1')}</h2>
                        <h3>{t('home.homeContactUsTitle2')}</h3>
                        <form onSubmit={handelSendMessageSubmit}>
                            <input
                                type="text"
                                placeholder={t('home.homeContactUsFirstName')}
                                name='firstName'
                                className='firstName-input'
                                onChange={handleSendMessage}
                                value={sendMessage.firstName}
                            />
                            <input
                                type="text"
                                placeholder={t('home.homeContactUsLastName')}
                                name='lastName'
                                className='lastName-input'
                                onChange={handleSendMessage}
                                value={sendMessage.lastName}
                            />
                            <input
                                type="email"
                                placeholder={t('home.homeContactUsEmail')}
                                name='emailAddress'
                                className='emailAddress-input'
                                onChange={handleSendMessage}
                                value={sendMessage.emailAddress}
                            />
                            <textarea
                                placeholder={t('home.homeContactUsMessage')}
                                name='message'
                                className='message'
                                onChange={handleSendMessage}
                                value={sendMessage.message}
                            ></textarea>
                            <button className='sendButton'>{t('home.homeSendButton')}</button>
                        </form>
                    </div>
                    
            </div>
        </>
    )
}