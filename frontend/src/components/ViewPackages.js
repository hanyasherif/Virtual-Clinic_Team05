import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewPackages() {
  const [packages, setPackages] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

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

  const handlePaymentOption = (packageId, option) => {
    // Handle the selected payment option (e.g., "Wallet" or "Credit Card")
    console.log(`Package ID: ${packageId}, Payment Option: ${option}`);
    // Add your logic to handle the payment option (e.g., redirect to a payment page)
  };

  return (
    <div>
      <div>
        <h2>Existing Packages</h2>
        <ul>
          {packages.map((packagew) => (
            <li key={packagew.id}>
              <button onClick={() => subscribePackage(packagew.name)}>
                {packagew.name}
              </button>
              {' - Price: $'}
              {packagew.price}
              {' - Doctor Discount: $'}
              {packagew.doctorDiscount}
              {' - Pharmacy Discount: $'}
              {packagew.pharmacyDiscount}
              {' - FamMem Discount: $'}
              {packagew.famMemDiscount}
              {' '}
              <button onClick={() => handlePaymentOption(packagew.id, 'Wallet')}>
                Pay with Wallet
              </button>
              {' '}
              <button onClick={() => handlePaymentOption(packagew.id, 'Credit Card')}>
                Pay with Credit Card
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewPackages;
