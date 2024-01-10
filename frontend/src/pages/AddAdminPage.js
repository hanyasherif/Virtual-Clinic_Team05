
import React from 'react';
import AddAdminForm from '../componentsPh/AddAdminForm';
import Typography from '@mui/material/Typography';

const AddAdminPage = () => {
  return (
    <div>
       <Typography variant="h4" style={{ color: '#25A18E', fontSize: 27, textAlign: 'center' }}>
      Add Administrator
    </Typography>
      <AddAdminForm />
    </div>
  );
};

export default AddAdminPage;
