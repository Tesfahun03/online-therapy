import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/core/verify-email/${uid}/${token}/`)
      .then(response => {
        setMessage('Email verified successfully!');
        // Redirect to respective dashboard based on user type
        const redirectUrl = response.data.redirect_url || '/';
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 5000); // Redirect after 2 seconds
      })
      .catch(error => {
        setMessage('Email verification failed.');
      });
  }, [uid, token]);

  return (
    <div  style={{ marginTop: '100px' }}>
      <h1>{message}</h1>
    </div>
  );
};

export default VerifyEmail;
