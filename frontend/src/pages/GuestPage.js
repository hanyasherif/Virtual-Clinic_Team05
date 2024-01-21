import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Title from './Title';


const GuestPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left', width: '100%', maxWidth: '400px' }}>
        <button onClick={goBack} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <br />
        <br />
        <div>
        <Title style={{ color: '#25A18E', fontSize: 23, textAlign: 'center' }}>Welcome! Please select your Role:</Title>
          <Link to="/PatRegPH">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: '100%' }}
              sx={{
                color: 'white',
                backgroundColor: '#25A18E',
                '&:hover': {
                  backgroundColor: '#20756c',
                },
              }}
            >
              Register as Patient
            </Button>
          </Link>
          <br />
          <br />
          <Link to="/PharRegPH">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: '100%' }}
              sx={{
                color: 'white',
                backgroundColor: '#25A18E',
                '&:hover': {
                  backgroundColor: '#20756c',
                },
              }}
            >
              Register as Pharmacist
            </Button>
          </Link>
          <br />
          <br />
          <Link to="/addRequest">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: '100%' }}
              sx={{
                color: 'white',
                backgroundColor: '#25A18E',
                '&:hover': {
                  backgroundColor: '#20756c',
                },
              }}
            >
              Register as a doctor?
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;
