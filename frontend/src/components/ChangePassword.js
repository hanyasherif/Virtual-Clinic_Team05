import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      // Validate inputs
      if (!oldPassword || !newPassword || !confirmPassword) {
        setErrorMessage('All fields are required');
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage('New password and confirm password do not match');
        return;
      }

      // Make API request to change password
      const response = await axios.post('/api/changePassword', {
        username: 'user_username', // replace with the actual username
        oldPassword,
        newPassword,
      });

      // Handle success
      console.log(response.data.message);
      setErrorMessage('');
    } catch (error) {
      // Handle error
      console.error('Error changing password:', error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <div>
        <label>Old Password:</label>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      </div>
      <div>
        <label>New Password:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
