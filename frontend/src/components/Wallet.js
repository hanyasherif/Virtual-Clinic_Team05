import { useState } from 'react'
import { useParams } from 'react-router-dom';

const Wallet = () => {
   const [walletInfo,setWalletInfo] = useState('');
   const [error, setError] = useState('');
   const {id} = useParams();
    
    
   const handleView = async () => {
    try {
      const response = await fetch(`http://localhost:8000/wallet/${id}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setWalletInfo(data.walletInfo); // Assuming the server returns the walletInfo field
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching wallet information.');
    }
  }; 
    return (
        <div>
      <label htmlFor="amount">Amount:</label>
      <br />
      <input type="text" id="amount" value="543" readOnly />
      <br />

      <button onClick={handleView}>View</button>

      {walletInfo && (
        <div>
          <label>Wallet Info:</label>
          <br />
          <input type="text" value={walletInfo} readOnly />
        </div>
      )}

      {error && <p>{error}</p>}
    </div>

    );
  };
  
  export default Wallet;