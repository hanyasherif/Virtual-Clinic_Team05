import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

let email='';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async() => {
    // Replace this logic with your actual OTP verification logic
    try {
      const res = await axios.post(`http://localhost:8000/otpChecker?numO=${otp}`);
      email=res.data.Useremail;
      if (email != null) {
        setVerified(true);
      } else {  
        alert('Invalid OTP');
      }
    } catch (error) {
      alert("TryAgain Later:"+error.response.data.error);
      }
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmedPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const handleSetNewPassword = async() => {
    if (newPassword.trim() !== '' &&  newPassword === confirmedPassword ) {
      try {
        const res = await axios.post(`http://localhost:8000/ChangeEmailPassword`, {
        Useremail: email,
        password: newPassword});
        alert("Password Changed");
        window.location.href='/';
      } catch (error) {
        alert("TryAgain Later:"+error.response.data.error);
        }
    } else {
      alert('Passwords do not match');
    }
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
    <br /><br />
      {!verified ? (
        <div>
    
    
          <h2>OTP Verification</h2>
          <input type="text" value={otp} onChange={handleOtpChange} placeholder="Enter OTP" />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      ) : (
        <div>
          
          <h2>Set New Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter New Password"
          />
          <input
            type="password"
            value={confirmedPassword}
            onChange={handleConfirmedPasswordChange}
            placeholder="Confirm New Password"
          />
          <button onClick={handleSetNewPassword}>Set New Password</button>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;