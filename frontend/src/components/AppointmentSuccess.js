import { useEffect } from "react";
import axios from "axios";

const AppointmentSuccess = () => {
    useEffect(()=>{
        const subscribe = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const sessionID = urlParams.get('sessionID');
            try {
                const response = await axios.post(`http://localhost:8000/success/${sessionID}`, null, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
              
                console.log(response.data);
              } catch (error) {
                console.error('Error in the axios request:', error);
              }
        }

        subscribe()
    },[])
    return (
        <div>
            <h2>Payment successful.</h2>
            
        </div>
    );
};

export default AppointmentSuccess
