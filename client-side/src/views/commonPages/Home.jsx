import React, { useState } from 'react'
import Faq from '../../utils/json-files/Faq';
import Why from '../../utils/json-files/Why';
import "../../styles/Home.css"
import { Link } from 'react-router-dom';


export default function Home(){

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
            <div className='Home' id='Home'>
                <div className="Home-img">
                    <img src="../Images/home/EllipseTalk.png" alt="" className='ellipsetalk' />
                </div>
                <div className='Home-Intro-Title'>
                    <h3>"Nurturing Minds, Empowering Lives."</h3>
                    <h4>"Your mental well-being is just a click away.<br></br>Find solace and support anytime, anywhere with our online <br></br>therapy app."</h4>
                    <Link to="/login-p"><button>Get started</button></Link>
                </div>
            </div>
            <div className="Faq" id='Faq'>
                <h1>Frequently Asked Questions</h1>
                {Faq.map((faqs)=>(
                    < div key={faqs.id} >
                    {faqs.id %2 === 0 ?
                    <div className='faq-even'>
                        <div className="faq-number">{faqs.id}</div>
                        <div className="faq-q-and-a">
                            <div className="faq-question">{faqs.question}</div>
                            <div className="faq-answer">{faqs.answer}</div>
                        </div>
                        
                    </div>:
                    <div className='faq-odd'>
                        <div className="faq-number">{faqs.id}</div>
                        <div className="faq-q-and-a">
                            <div className="faq-question">{faqs.question}</div>
                            <div className="faq-answer">{faqs.answer}</div>
                        </div>
                    </div>
                    
                    }
                        
                        
                    </div>
                    
                       
                ))}
            </div>

            <div className="AboutUs" id='AboutUs'>
                <div className="AboutUs-info">
                    <div className="AboutUs-title">
                        <h2>About Us</h2>
                        <h3>Bunna Mind is a comprehensive online therapy platform designed to help you achieve mental and emotional well-being from the comfort and convenience of your own space.</h3>
                    </div>
                    <div className="About-why">
                        <h2>Why to choose BunnaMind?</h2>
                        {Why.map((whys)=>(
                            <div key={whys.id}>
                                {whys.id % 2 === 0 ?
                                <div className='why-even'>
                                    <img src="../Images/home/Tickbox.png" alt="" className='tickbox'/>
                                    <div className='why-reason-desc'>
                                        <h4 className='reason'>{whys.reason}</h4>
                                        <h4 className='description'>{whys.description}</h4>
                                    </div>
                                </div> 
                                :
                                <div className='why-odd'>
                                    <img src="../Images/home/Tickbox.png" alt="" className='tickbox' />
                                    <div className='why-reason-desc'>
                                        <h4 className='reason'>{whys.reason}</h4>
                                        <h4 className='description'>{whys.description}</h4>
                                    </div>
                                </div>
                                } 
                            </div>
                        ))}
                    </div>

                </div>
                <div className="AboutUs-img">
                    <img src="../Images/home/PeopleBean.png" alt="" className='peopleBean'/>
                    
                </div>
            </div>
            <div className='ContactUs'>
                    <img src="../Images/home/ContactUs.png" alt="" className='contactus' />
                    <div className='ContactUs-form'  id='ContactUs'>
                        <h2>Contact Us</h2>
                        <h3>If you have any inquiry, concern, or commentary, please reach out by filling the form below. </h3>
                        <form onSubmit={handelSendMessageSubmit}>
                            <input 
                                type="text"
                                placeholder='First name'
                                name='firstName'
                                className='firstName-input'
                                onChange={handleSendMessage}
                                value={sendMessage.firstName}
                            />
                             <input 
                                type="text"
                                placeholder='Last name'
                                name='lastName'
                                className='lastName-input'
                                onChange={handleSendMessage}
                                value={sendMessage.lastName}
                            />
                             <input 
                                type="email"
                                placeholder='Email address'
                                name='emailAddress'
                                className='emailAddress-input'
                                onChange={handleSendMessage}
                                value={sendMessage.emailAddress}
                            />
                             <textarea
                                placeholder='Message'
                                name='message'
                                className='message'
                                onChange={handleSendMessage}
                                value={sendMessage.message}
                            ></textarea>

                            <button className='sendButton'>Send</button>
                        </form>
                    </div>
                    
            </div>
        </>
    )
}