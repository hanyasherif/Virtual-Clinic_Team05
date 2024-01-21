import React from 'react';
import RequestForm from '../componentsPh/RequestForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const RemovePharPatPage = () => {
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
    {/* <Title style={{ color: '#25A18E' , fontSize: 23, textAlign: 'center' }}>Submit Request</Title> */}
      <RequestForm/>
      
    </div>
  );
};

export default RemovePharPatPage;
