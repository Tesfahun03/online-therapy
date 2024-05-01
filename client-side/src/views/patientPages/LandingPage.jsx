import React, { Component, useState } from 'react';
import useAxios from '../../utils/useAxios';
import jwtDecode from 'jwt-decode';
import "../../styles/LandingPage.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function LandingPage(){

    const baseURL = "http://127.0.0.1:8000/core"

    const [searchTherapist, setSearchTherapist] = useState({search:""})
    
    const axios = useAxios()

    //Getting the token and decode using jwtDecode
    const token = localStorage.getItem("authTokens")
    const decoded = jwtDecode(token)
    const history = useHistory

    //Get user data
    const first_name = decoded.first_name
    console.log(decoded)

    function handelSearch(event){
        const{name, value} = event.target

        setSearchTherapist(prevSetSearchTherapist=>{
            return{
                ...prevSetSearchTherapist, 
                [name]:value
            }
        })
    }

    return(
        <div className='landingPage'>
            <h2 className='hi'>Hi, {first_name}!</h2>
            <div className='search'>
                <form>
                    <input
                        type='text'
                        placeholder='Search Therapist'
                        name='username'
                        className='searchBar'
                        onChange={handelSearch}
                    />
                    <button className='searchButton'><img src='../Images/landingpage/search.png'/></button>
                </form>
            </div>

            <div className="feeling">
                <h2>How You feel Today?</h2>
                <div className="how-you-feel">
                            <div className="emoji">
                                <h3>😊</h3>
                                <h4>Happy</h4>
                            </div>
                            <div className="emoji">
                                <h3>🙂</h3>
                                <h4>Normal</h4>
                            </div>
                            <div className="emoji">
                                <h3>😐</h3>
                                <h4>Sad</h4>
                            </div>
                        </div>
            </div>

            <div className="ourTherapist">
                <h2>Our Therapist</h2>
                <div className="therapistList">
                    
                </div>
            </div>
            

        </div>
    )
}