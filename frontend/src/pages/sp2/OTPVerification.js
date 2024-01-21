import React, { useState } from 'react';
import axios from 'axios';
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
      const res = await axios.post("/otpChecker?numO=${otp}");
      email=res.data.Useremail;
      if (email != null) {
        setVerified(true);
      } else {  
        alert('Invalid OTP');
      }
    } catch (error) {
        alert('invalid email', error.message);
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
        const res = await axios.post("/ChangeEmailPassword", {
        Useremail: email,
        password: newPassword});
        alert("Password Changed");
        window.location.href='/';
      } catch (error) {
          alert('TryAgain Later:', error.message);
        }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div>
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