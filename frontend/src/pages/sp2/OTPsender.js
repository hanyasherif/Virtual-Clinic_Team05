import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Title from '../Title';

const OTPSender = () => {
  const [userEmail, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = async() => {
    // Perform logic to send OTP using the entered email (e.g., make an API call)
    try {
      console.log("come on"+userEmail);
     const res = await axios.get(`http://localhost:8000/CheckEmail?email=${userEmail}`);
     window.location.href='/ChangePassword';
     alert('email Sent');

    } catch (error) {
       alert('invalid email:', error.message);
 }
    // Reset the email field after sending OTP
    setEmail('');
  };

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
          <button onClick={goBack} className="back-button">
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
    {/* <Title style={{ color: '#25A18E' , fontSize: 23, textAlign: 'center' }}>Send OTP</Title> */}
<br /><br />
      <h1>Send OTP</h1>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={userEmail}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>
        <button type="button" onClick={handleSendOTP}>
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default OTPSender;