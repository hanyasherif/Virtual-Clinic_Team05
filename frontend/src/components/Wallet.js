import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Wallet = () => {
  const [walletInfo, setWalletInfo] = useState('');
  const [error, setError] = useState('');
  const id = '65735cebad66db980718a14d'; // session

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getUserById/${id}`);
        const user = response.data;
        setWalletInfo(user.walletInfo);
        console.log("Wallet Info:", walletInfo);
      } catch (error) {
        setError('No Wallet assigned');
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs only once, equivalent to componentDidMount

  return (
    <div>
      <label htmlFor="amount">Amount:</label>

      
      <div>
        <br />
        <input type="text" value={walletInfo} readOnly />
      </div>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Wallet;
