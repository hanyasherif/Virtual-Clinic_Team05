import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PackageUpdateModal  from './PackageUpdateModal';
function AdminAddPackage() {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({ name: '', price: ''  , doctorDiscount : '' , pharmacyDiscount: '' , famMemDiscount:'' });
  const [deletePackageName, setDeletePackageName] = useState('');

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
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

  const createPackage = () => {
    axios.post('/admin/addPackage', newPackage) // Replace with your API endpoint
      .then(() => {
        setNewPackage({ name: '', price: '' });
        fetchPackages(); // Refresh the list of packages
      })
      .catch((error) => {
        console.error('Error creating package:', error);
      });
  };
  const params = new URLSearchParams(window.location.search);
  const Id = params.get('id');
  const updatePackage = (id, updatedPackage) => {
    axios.put(`/admin/updatePackage/?:id=${Id}`, updatedPackage) // Replace with your API endpoint
      .then(() => {
        fetchPackages(); // Refresh the list of packages
      })
      .catch((error) => {
        console.error('Error updating package:', error);
      });
  };
  const deletePackage = () => {
    axios.delete(`/admin/deletePackage?name=${deletePackageName}`) // Replace with your API endpoint
      .then(() => {
        fetchPackages(); // Refresh the list of packages
      })
      .catch((error) => {
        console.error('Error deleting package:', error);
      });
  };

  
  const openUpdateModal = (packagea) => {
    setSelectedPackage(packagea);
    setShowUpdateModal(true);
  };
  return (
    <div>
      <h1>Package Management</h1>

      <div>
        <h2>Create Package</h2>
        <input
          type="text"
          placeholder="Package Name"
          value={newPackage.name}
          onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Package Price"
          value={newPackage.price}
          onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Package DoctorDiscount"
          value={newPackage.doctorDiscount}
          onChange={(e) => setNewPackage({ ...newPackage, doctorDiscount: e.target.value })}
        />
          <input
          type="text"
          placeholder="Package PharmacyDiscount"
          value={newPackage.pharmacyDiscount}
          onChange={(e) => setNewPackage({ ...newPackage, pharmacyDiscount: e.target.value })}
        />
          <input
          type="text"
          placeholder="Package famMemDiscount"
          value={newPackage.famMemDiscount}
          onChange={(e) => setNewPackage({ ...newPackage, famMemDiscount: e.target.value })}
        />
        <button onClick={createPackage}>Create Package</button>
      </div>
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
      
      <h2>Delete Package</h2>
      <ul>
      <input
        type="text"
        placeholder="Package Name to Delete"
        value={deletePackageName}
        onChange={(e) => setDeletePackageName(e.target.value)}
      />
      <button onClick={deletePackage}>Delete Package</button>
      </ul>
      {showUpdateModal && (
        <PackageUpdateModal
          packageToUpdate={selectedPackage}
          onUpdatePackage={updatePackage}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
}

export default AdminAddPackage;
