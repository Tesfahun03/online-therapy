import React from 'react'
import '../../styles/Message.css'
import { useState, useEffect } from 'react'
import useAxios from '../../utils/useAxios'
import {decryptMessage}from '../../utils/cryptoUtils';
import jwtDecode from 'jwt-decode'
import { Link, useHistory } from 'react-router-dom/'
import moment from 'moment';

function Message() {
  const senderPrivateKey = localStorage.getItem('privateKey');
  const baseURL = 'http://127.0.0.1:8000/session'
  // Create New State
  const [messages, setMessages] = useState([])
  let [newSearch, setnewSearch] = useState({search: "",});
  const [relationIds, setRelationId] = useState(null);
  const [relationUsers, setRelationUsers] = useState([]); // State to store user information
  
  // Initialize the useAxios Function to post and get data from protected routes
  const axios = useAxios()

  // Get and Decode Token
  const token = localStorage.getItem('authTokens');
  const decoded = jwtDecode(token)
  // Get Userdata from decoded token
  const user_id = decoded.user_id
  const user_type = decoded.user_type;

  const history = useHistory()
  console.log(user_id)
  useEffect(() => {
    const fetchRelationId = async () => {
      try {
        const endpoint = user_type === "patient" ? "patient" : "therapist";
        const transactionType = user_type === "patient" ? "debited" : "credited";
        
        const response = await axios.get(`http://127.0.0.1:8000/payment/${endpoint}/${user_id}/${transactionType}`);
        
        // Assuming the response contains an array of relations
        const relationData = response.data;
        // Extract the correct ID based on user type
        const fetchedIds = user_type === "patient"
        ? relationData.map(data => data.therapist)
        : relationData.map(data => data.patient);
        
        setRelationId(fetchedIds);

        // Fetch user information for each fetched ID based on user type
        const userResponses = await Promise.all(
            fetchedIds.map(id => 
            axios.get(`http://127.0.0.1:8000/core/${user_type === "patient" ? "therapists" : "patients"}/${id}`)
            )
        );

        // Store user information
        const usersData = userResponses.map(response => response.data);
        setRelationUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchRelationId();
  }, [user_id, user_type]);

  useEffect(() => {
    try {
      // Send a get request to the api endpoint to get the message of the logged in user
      axios.get(baseURL + '/my-messages/' + user_id + '/').then((res) => {
        // Set the data that was gotten back from the database via the api to the setMessage state
        const decryptedMessages = res.data.map(message => ({
          ...message,
          message: decryptMessage(message.message, senderPrivateKey)
        }));
        setMessages(decryptedMessages);
        console.log(decryptedMessages);
      });
    } catch (error) {
      console.log(error);
    }
  }, [])
 
  const handleSearchChange = (event) => {
    setnewSearch({
      ...newSearch,
      [event.target.name]: event.target.value,
    });

  };

  const SearchUser = () => {
    axios.get('http://127.0.0.1:8000/core/search/' + newSearch.username + '/')
        .then((res) => {
            if (res.status === 404) {
                console.log(res.data.detail);
                alert("User does not exist");
            } else {
                history.push('/search/'+newSearch.username+'/');
            }
        })
        .catch((error) => {
            alert("User Does Not Exist")
        });
};
  return (
    <div>
      <main className="content" style={{ marginTop: "150px" }}>
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>
          <div className="card">
            <div className="row g-0">
              <div className="col-12 col-lg-5 col-xl-3 border-right">
              <div className="px-4 ">
                  <div className="d-flfex align-itemfs-center">

                  </div>
                </div>
                 {messages.map((message) =>
                  <Link 
                    to={"/message/" + (message.sender.id === user_id ? message.reciever.id : message.sender.id) + "/"}
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <small><div className="badge bg-success float-right text-white">{moment.utc(message.date).local().startOf('seconds').fromNow()}</div></small>
                    <div className="d-flex align-items-start">
                    {message.sender.id !== user_id && 
                      <img src={message.sender_profile.image} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                    }
                    {message.sender.id === user_id && 
                      <img src={message.reciever_profile.image} className="rounded-circle mr-1" alt="2" width={40} height={40}/>
                    }
                      <div className="flex-grow-1 ml-3">
                          {message.sender.id === user_id && 
                            (message.reciever_profile.full_name !== null ? message.reciever_profile.full_name : message.reciever.username)
                          }

                          {message.sender.id !== user_id && 
                            (message.sender.username) 
                          }
                        <div className="small">
                           <small>{message.message}</small>
                        </div>
                      </div>
                    </div>
                    </Link>
                )}  
                {relationIds && relationIds.map(id => {
                const user = relationUsers.find(user => user.profile.user_id === id);
                if (user && !messages.some(message => message.sender.id === id || message.reciever.id === id)) {
                    return (
                        <Link 
                            to={"/message/" + user.profile.user_id + "/"}
                            href="#"
                            className="list-group-item list-group-item-action border-0"
                            key={user.profile.user_id}
                        >
                            <div className="d-flex align-items-start">
                                <img src={user.profile.image} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                                <div className="flex-grow-1 ml-3">
                                    {user.profile.first_name} {user.profile.last_name}    
                                    <div className="small">
                                        <small>@{user.profile.user.username}</small>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        );
                    } else {
                        return null;
                    }
                })}

                <hr className="d-block d-lg-none mt-1 mb-0" />
              </div>
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      
                    </div>
                    
                    
                  </div>
                </div>
                <div className="position-relative">
                  <div className="chat-messages p-4">
                    <div className="chat-message-right pb-4">
                      
                      
                    </div>
                    <div className="chat-message-left pb-4">
                      
                      
                    </div>
                    <div className="chat-message-right mb-4">
                      
                      
                    </div>
                    <div className="chat-message-left pb-4">
                      
                      
                    </div>
                    <div className="chat-message-left pb-4">
                     
                      
                    </div>
                    <div className="chat-message-right mb-4">
                      
                    
                    </div>
                    <div className="chat-message-left pb-4">
                    <h5>Select a chat to start messaging.</h5>
                      
                    </div>
                    <div className="chat-message-right mb-4">
                      
                      
                    </div>
                    <div className="chat-message-right mb-4">
                      
                      
                    </div>
                    <div className="chat-message-left pb-4">
                      
                      
                    </div>
                    <div className="chat-message-right mb-4">
                      
                      
                    </div>
                    <div className="chat-message-left pb-4">
                      
                    </div>
                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Message