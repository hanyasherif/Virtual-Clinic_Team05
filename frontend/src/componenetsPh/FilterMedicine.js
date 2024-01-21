import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import MedicineDetailsLite from './MedicineDetailsLite';
import Typography from '@mui/material/Typography';

const MedicineFilter = ({ filterMedicine }) => {
  const medicinalUses = ["Pain and Fever", "Reflux", "Relief", "Anxiety"];
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
        <Typography variant="h4" style={{ color: '#25A18E', fontSize: 27, textAlign: 'center' }}>
          Filter by medicinal use
        </Typography>
      <div>
        {medicinalUses.map((medicinalUse, index) => (
     <Button
     key={index}
     onClick={() => handleFilter(medicinalUse)}
     variant="contained"
     color="primary"
     style={{
      marginLeft: '15px',
       marginTop: '5px',
       marginBottom: '20px', // Add top margin to match the spacing
       width: '20%', // Match the width of the second button
       padding: '10px', // Add padding here
       backgroundColor: '#25A18E',
       color: 'white',
       '&:hover': {
         backgroundColor: '#20756c',
       },
     }}
   >
     {medicinalUse}
   </Button>
   
      
        ))}
      </div>

      {medicines && (
        <Grid container spacing={2} className="medicines">
          {medicines.map((medicine) => (
            <Grid item key={medicine._id} xs={12} sm={6} md={4} lg={3}>
              <MedicineDetailsLite key={medicine._id} medicine={medicine} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default MedicineFilter;
