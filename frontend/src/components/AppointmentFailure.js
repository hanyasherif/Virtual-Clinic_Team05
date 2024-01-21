import React from 'react';

const AppointmentFailure = () => {
  const failureContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8d7da', // Light red background color for failure
  };

  const failureHeadingStyle = {
    color: '#721c24', // Dark red text color
  };

  return (
    <div style={failureContainerStyle}>
      <h2 style={failureHeadingStyle}>Payment was canceled</h2>
    </div>
  );
};

export default AppointmentFailure;
