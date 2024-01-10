import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const GuestPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-block', textAlign: 'left' }}>
        <button onClick={goBack} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <br />
      <br />
      <div>
        <h1>Welcome! Please select your role:</h1>
        <Link to="/PatRegPH">Register as Patient</Link>
        <br />
        <br />
        <Link to="/PharRegPH">Register as Pharmacist</Link>
        <br />
        <br />
        <Link to="/addRequest">Register as a doctor?</Link>
      </div>
    </div>
  );
};

export default GuestPage;
