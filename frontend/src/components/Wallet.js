import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

const Wallet = () => {
  const [walletInfo, setWalletInfo] = useState('');
  const [error, setError] = useState('');

  function preventDefault(event) {
    event.preventDefault();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getWalletInfo`,{withCredentials:true});
        const user = response.data;
        console.log("Wallet"+user);
        setWalletInfo(user);
        console.log("Wallet Info:", walletInfo);
      } catch (error) {
        setError('No Wallet assigned');
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs only once, equivalent to componentDidMount

  return (

  <React.Fragment>
      <Title style={{ color: '#25A18E' , fontSize: 23}}>My Wallet amount</Title>
      <Typography component="p" variant="h4" fontSize={18}>
        {walletInfo}
      </Typography>
       {/* <input type="text" value={walletInfo} readOnly /> */}

    </React.Fragment>
  );
};

export default Wallet;
