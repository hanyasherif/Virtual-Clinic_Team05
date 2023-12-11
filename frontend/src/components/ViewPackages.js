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
            alert('An error occurred:', error.message);
      });
  };

  
    
  const openUpdateModal = (packagea) => {
    setSelectedPackage(packagea);
    setShowUpdateModal(true);
  };
  
  
  return (
    <div>
      
      
      <div>
      <h2>Existing Packages</h2>
      <ul>
        {packages.map((packagew) => (
          <li key={packagew.id}>
             <button onClick={() => openUpdateModal(packagew)}>{packagew.name}</button> - Price: ${packagew.price} - DoctorDiscount: ${packagew.doctorDiscount} - PharmacyDiscount: ${packagew.pharmacyDiscount}
            - famMemDiscount: ${packagew.famMemDiscount}
          </li>
        ))}
      </ul>
      </div>
      
      
    </div>
  );
}

export default ViewPackages;
