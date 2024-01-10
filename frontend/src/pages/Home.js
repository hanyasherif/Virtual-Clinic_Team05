import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Title from './Title';
import Form from "../componentsPh/form";

const Home = () => {
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch('/registerPatient');
      const json = await response.json();

      if (response.ok) {
        setPatients(json);
      }
    };

    fetchDetails();
  }, []);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="home">
      <button onClick={goBack} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <br /><br />
      <div style={{ textAlign: 'center' }}>
         <Title style={{ color: '#25A18E', fontSize: 23, textAlign: 'center' }}>Register as a Patient</Title>
      </div>

      <div className="patients">
        {patients && patients.map(patient => (
          <Form patients={patient} key={patient._id} />
        ))}
      </div>
      <Form />
    </div>
  );
};

export default Home;
