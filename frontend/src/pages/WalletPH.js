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
        const response = await axios.get(`http://localhost:8000/getWalletInfo`, { withCredentials: true });
        const user = response.data;
        setWalletInfo(user);
        console.log("Wallet Info:", walletInfo);
      } catch (error) {
        setError('No Wallet assigned');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <label htmlFor="amount" style={{ fontSize: '18px' }}>My Wallet Amount:</label>
      <div>
        <br />
        <input type="text" value={walletInfo} readOnly style={{ fontSize: '20px' }} />
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};
export default Wallet;
