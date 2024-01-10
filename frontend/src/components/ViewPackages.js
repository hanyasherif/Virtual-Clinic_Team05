import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Title from './Title';
import { Box } from '@mui/material';


function ViewPackages() {
  const [packages, setPackages] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  function preventDefault(event) {
    event.preventDefault();
  }

  useEffect(() => {
    // Fetch existing packages when the component mounts
    fetchPackages();
  }, []);

  const fetchPackages = () => {
    axios.get('/viewPackages') // Replace with your API endpoint
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        alert('An error occurred: '+ error.response.data.error);
      });
  };

  const subscribePackage = (packageName) => {
    // Add your logic to subscribe to the package (e.g., make a POST request)
    console.log(`Subscribing to package: ${packageName}`);
     axios.post('/subPackage?packageName='+packageName)
       .then((response) => {
        alert("Package Added Successfully");
       })
       .catch((error) => {
         alert('An error occurred:', error.message);
       });
  };

  const handlePaymentOption = (packageName) => {
    // Handle the selected payment option (e.g., "Wallet" or "Credit Card")
    window.location.href = '/SubPackage?name='+packageName;
    // Add your logic to handle the payment option (e.g., redirect to a payment page)
  };

  return (
    <div>
      <div>

      <Title style={{ color: '#25A18E', fontSize: 23 }}>View Packages</Title>
<ul>
  {packages.map((packagew) => (
    <li key={packagew.id}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <Button
            variant="contained"
            sx={{
              color: 'white',
              backgroundColor: '#25A18E',
              padding: '4px 12px', // Adjust padding to change the button's size
              fontSize: '0.875rem', // Adjust font size as needed
              lineHeight: 1.1, // Adjust line height as needed
              width: '100px', // Define the fixed width for the button
              '&:hover': {
                backgroundColor: '#20756c', // Change color on hover if desired
              },
            }}
      
          >
            {packagew.name}
          </Button>
        </div>
        <div style={{ marginLeft: '20px' }}>
          {' - Price: $'}
          {packagew.price}
          {' - Doctor Discount: $'}
          {packagew.doctorDiscount}
          {' - Pharmacy Discount: $'}
          {packagew.pharmacyDiscount}
          {' - FamMem Discount: $'}
          {packagew.famMemDiscount}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          <Button
            variant="contained"
            sx={{
              color: 'white',
              backgroundColor: '#25A18E',
              padding: '4px 10px', // Adjust padding to change the button's size
              fontSize: '0.875rem', // Adjust font size as needed
              lineHeight: 1.1, // Adjust line height as needed
              marginRight: '10px', // Add right margin for spacing
              '&:hover': {
                backgroundColor: '#20756c', // Change color on hover if desired
              },
            }}
            onClick={() => handlePaymentOption(packagew.name, 'Wallet')}
          >
           Subscribe
          </Button>
          
        </div>
      </div>
    </li>
  ))}
</ul>


      </div>
    </div>

  );
}

export default ViewPackages;
