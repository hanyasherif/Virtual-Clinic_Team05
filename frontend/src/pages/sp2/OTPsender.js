import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const OTPSender = () => {
  const [userEmail, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = async() => {
    // Perform logic to send OTP using the entered email (e.g., make an API call)
    try {
     const res = await axios.get("/CheckEmail?email=${userEmail}");
     window.location.href='/ChangePassword';
     alert('email Sent');

    } catch (error) {
       alert('invalid email:', error.message);
 }
    // Reset the email field after sending OTP
    setEmail('');
  };

  return (
    <div>
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