import { useEffect,useState } from 'react';
import axios from 'axios';

const ViewAcceptContract = () => {

    const [contract, setContract] = useState(null);
    const doctorId = '6543e673eff0e09fab8d7124';
    const [isVisible, setIsVisible] = useState(false);
    const [t, setT] = useState('');
    let flag = true;

     
     const handleViewContract = async() =>{
     setIsVisible(true);
     };
     const handleAcceptContract = async () => {
         try {
             // Call the accept contract endpoint in the backend
             const response = await axios.post(`http://localhost:8000/acceptContract/${doctorId}`); // Replace with the actual endpoint
             console.log("returnedd222",response.data); // Log the response if needed
 
             // Optionally, you can perform additional actions after accepting the contract
 
         } catch (error) {
             console.error('Error accepting contract:', error);
             // Handle the error as needed
         }
     };
 
     const handleRejectContract = async () => {
         try {
             // Call the reject contract endpoint in the backend
             const response = await axios.post(`http://localhost:8000/rejectContract/${doctorId}`); // Replace with the actual endpoint
             console.log(response.data); // Log the response if needed
 
             // Optionally, you can perform additional actions after rejecting the contract
 
         } catch (error) {
             console.error('Error rejecting contract:', error);
             // Handle the error as needed
         }
     };
        const fetchContract = async () => {
            try {
                // Fetch the contract details from the backend
                const response = await axios.get(`http://localhost:8000/getContract/${doctorId}`); // Replace with the actual endpoint
                console.log("returnedd",response.data);
                setContract(response.data);
                setT(response.data.termsAndConditions);
                console.log(contract);
                setIsVisible(true);
            } catch (error) {
                console.error('Error fetching contract details:', error);
                // Handle the error as needed
            }
            
        };
       
    return (
        <div>
            <button onClick={fetchContract}>View Contract</button>
            {isVisible && (
                <div>
                    <p>Terms and Conditions: {t}</p>
                    <p>Markup: {contract.markup}</p>
                    
                    
                </div>
            )}
            <button onClick={handleAcceptContract}>Accept Contract</button>
            <button onClick={handleRejectContract}>Reject Contract</button>

        </div>
    );
};

export default ViewAcceptContract;