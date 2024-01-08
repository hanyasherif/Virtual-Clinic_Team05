import React, { useState } from 'react';
import MedicineDetailsLite from './MedicineDetailsLite';

const MedicineFilter = ({ filterMedicine }) => {
  const medicinalUses = ["Allergy Relief", "Pain Relief", "Digestive Health", "Immune Support","Supplement","Skin Care","Other"];  const [medicines, setMedicines] = useState([]); // State to store filter results  const [medicines, setMedicines] = useState([]); // State to store filter results

  const handleFilter = (medicinalUse) => {
    // Send a Get request to the backend with the selected medicinal use as a query parameter
    fetch(`/filterMedicine?medicinalUse=${medicinalUse}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Store filter results in state
        setMedicines(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="medicine-filter">
      <p>Filter by Medicinal Use:</p>
      <div>
        {medicinalUses.map((medicinalUse, index) => (
          <button key={index} onClick={() => handleFilter(medicinalUse)}>
            {medicinalUse}
          </button>
        ))}
      </div>

      {medicines && (
        <div>
          {medicines.map((medicine) => (
            <MedicineDetailsLite key={medicine._id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicineFilter;
