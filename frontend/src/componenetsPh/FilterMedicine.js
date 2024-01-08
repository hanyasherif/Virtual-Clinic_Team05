import React, { useState } from 'react';
import { Button } from '@mui/material';
import MedicineDetailsLite from './MedicineDetailsLite';

const MedicineFilter = ({ filterMedicine }) => {
  const medicinalUses = ["Allergy Relief", "Pain Relief", "Digestive Health", "Immune Support","Supplement","Skin Care","Other"];
  const [medicines, setMedicines] = useState([]);

  const handleFilter = (medicinalUse) => {
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
          <Button key={index} onClick={() => handleFilter(medicinalUse)} variant="contained" color="primary" style={{ margin: '5px' }}>
            {medicinalUse}
          </Button>
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
