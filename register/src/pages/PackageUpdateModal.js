// PackageUpdateModal.js
import React from 'react';

function PackageUpdateModal({ packageToUpdate, onUpdatePackage, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Package</h2>
        <p>Package Name: {packageToUpdate.name}</p>
        <p>Package Price: {packageToUpdate.price}</p>
        <p>Doctor Discount: {packageToUpdate.doctorDiscount}</p>
        <p>Pharmacy Discount: {packageToUpdate.pharmacyDiscount}</p>
        <p>Family Member Discount: {packageToUpdate.famMemDiscount}</p>

        {/* Add input fields for updating package details here */}
        
        <button onClick={onUpdatePackage}>Update</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PackageUpdateModal;
