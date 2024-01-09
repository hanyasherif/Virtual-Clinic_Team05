import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';

//components
import MedicineDetailsLite from '../componenetsPh/MedicineDetailsLite';
import CreateMedicine from '../componenetsPh/CreateMedicine';
import Requests from '../componentsPh/Requests';

const AdminPage = () => {
  const [medicines, setMedicines] = useState(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      const response = await fetch('/medicines');
      const json = await response.json();

      if (response.ok) {
        setMedicines(json);
      }
    };

    fetchMedicine();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4">Current requests</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        
      </Box>
      <Box sx={{ mt: 4 }}>
        <Requests />
      </Box>
    </Container>
  );
};

export default AdminPage;