import React, { useState, useEffect } from 'react';
import axios from 'axios';
function AdminUpdatePackage() {
  const [packages, setPackages] = useState([]);
  const [updatePackageName, setUpdatePackageName] = useState('');
  const [updatedPackage, setUpdatedPackage] = useState('');
  useEffect(() => {
    // Fetch existing packages when the component mounts
    fetchPackages();
  }, []);

  const fetchPackages = () => {
    axios.get('/packs') // Replace with your API endpoint
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
      });
  };



  const updatePackage = () => {
    console.log(updatePackageName)
    axios.put(`/admin/updatePackage?name=${updatePackageName}`, updatedPackage) // Replace with your API endpoint
      .then(() => {
        fetchPackages(); // Refresh the list of packages
      })
      .catch((error) => {
        console.error('Error updating package:', error);
      });
  };
 
  

  return (
    <div>
      <h1>Package Management</h1>

      <div>
        <h2>Update Package</h2>
        <input
          type="text"
          placeholder="Old Package Name"
          value={updatePackageName}
          onChange={(e) => setUpdatePackageName(e.target.value)}
        />
        <input
          type="text"
          placeholder="NEW NAME"
          value={updatedPackage.name}
          onChange={(e) => setUpdatedPackage({ ...updatedPackage, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Package Price"
          value={updatedPackage.price}
          onChange={(e) => setUpdatedPackage({ ...updatedPackage, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Package DoctorDiscount"
          value={updatedPackage.doctorDiscount}
          onChange={(e) => setUpdatedPackage({ ...updatedPackage, doctorDiscount: e.target.value })}
        />
          <input
          type="text"
          placeholder="Package PharmacyDiscount"
          value={updatedPackage.pharmacyDiscount}
          onChange={(e) => setUpdatedPackage({ ...updatedPackage, pharmacyDiscount: e.target.value })}
        />
          <input
          type="text"
          placeholder="Package famMemDiscount"
          value={updatedPackage.famMemDiscount}
          onChange={(e) => setUpdatedPackage({ ...updatedPackage, famMemDiscount: e.target.value })}
        />
        <button onClick={updatePackage}>Update Package</button>
      </div>
      <div>
      <h2>Existing Packages</h2>
      <ul>
        {packages.map((packagew) => (
          <li key={packagew.id}>
             {packagew.name} - Price: ${packagew.price} - DoctorDiscount: ${packagew.doctorDiscount} - PharmacyDiscount: ${packagew.pharmacyDiscount}
            - famMemDiscount: ${packagew.famMemDiscount}
          </li>
        ))}
      </ul>
      </div>
      
    
    </div>
  );
}

export default AdminUpdatePackage;
