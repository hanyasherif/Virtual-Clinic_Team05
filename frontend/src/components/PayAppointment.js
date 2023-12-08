import { useState } from 'react'
import { useParams } from 'react-router-dom';

const PayAppointment = () => {
  //  const [famMemName, setfamMemName] = useState('')
  //  const [famMemNatID, setfamMemNatID] = useState('')
   const [PayWith,setPayWith] = useState('');// true if credit card false if wallet
   const [cardNumber,setcardNumber] = useState('');
   const [expiryDate,setexpiryDate] = useState('');
   const [CVV,setCVV] = useState('');
   const [error, setError] = useState('');
   const [showTextBox, setShowTextBox] = useState(false);
   const [showCreditCardTextBox, setShowCreditCardTextBox] = useState(false);
   const [showWalletTextBox, setShowWalletTextBox] = useState(false);
   const [walletInfo, setWalletInfo] = useState('');
   const {id} = useParams();
   
   /* const handleGenderChange = (e) => {
      setfamMemGender(e.target.value);
    };*/
    
    
    
    
      const handleCardNumber = (e) => {
        setcardNumber(e.target.value);
      };
      const handleExpiryDate = (e) => {
        setexpiryDate(e.target.value);
      };
      const handleCVV = (e) => {
        setCVV(e.target.value);
      };
      const handleCreditCardButtonClick = () => {
        setPayWith(true);
        setShowCreditCardTextBox(true);
        setShowWalletTextBox(false); // Hide Wallet text box if it's currently shown
      };
    
      const handleWalletButtonClick = () => {
        setPayWith(false);
        setShowWalletTextBox(true);
        setShowCreditCardTextBox(false); // Hide Credit Card text box if it's currently shown
      };
      const handleWalletInfoChange = (e) => {
        setWalletInfo(e.target.value);
      };
      const handlePaymentSubmit = (e) => {
        e.preventDefault();
        if(PayWith)
        if (showCreditCardTextBox && (!cardNumber || !expiryDate || !CVV)) {
          alert('Please fill in all the credit card fields.');
          return;
        }
      /*  else 
        if (walletInfo < appointmentInfo){
        alert('The amount in the wallet does not cover the appointment');
    return;}*/
        }
    return (
        <div>
        <label>Pay With:</label>
        <br />
        <button id="creditCard" onClick={handleCreditCardButtonClick}>
          Credit Card
        </button>
        <button id="wallet" onClick={handleWalletButtonClick}>
          Wallet
        </button>
  
        {showCreditCardTextBox && (
          <form onSubmit={handlePaymentSubmit}>
            <label>
              Card number
              <input type="text" value={cardNumber} onChange={handleCardNumber} />
            </label>
            <br />
            <label>
              Expiry date
              <input type="text" value={expiryDate} onChange={handleExpiryDate} />
            </label>
            <br />
            <label>
              Security code(CVV)
              <input type="text" value={CVV} onChange={handleCVV} />
            </label>
            <br />
  
            <button type="submit">Pay</button>
          </form>
        )}
  
        {showWalletTextBox && (
          <form onSubmit={handlePaymentSubmit}>
            <label>
              Wallet Info
              <input type="text" value={walletInfo} onChange={handleWalletInfoChange} />
            </label>
            <br />
  
            <button type="submit">Pay</button>
          </form>
        )}
      </div>

    );
  };
  
  export default PayAppointment;