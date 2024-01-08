import React, { useState } from 'react';
import axios from 'axios';
let email='';

const ChangePassword = () => {
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleConfirmedPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
  };

  const handleSetNewPassword = async() => {
    if (newPassword.trim() !== '' &&  newPassword === confirmedPassword ) {
      try {
        const res = await axios.post("/ChangePassword", {
        currentPassword:currentPassword,
        password: newPassword},{withCredentials:true});
        alert("Password Changed");
        window.location.href='/';
      } catch (error) {
          alert('TryAgain Later:', error.response.data.error);
        }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div>
         
        <div>
        <h2>Old Password</h2>
          <input
            type="password"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
            placeholder="Enter Current Password"
          />
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
      
    </div>
  );
};

export default ChangePassword;