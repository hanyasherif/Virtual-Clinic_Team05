import React, { useState } from 'react';
import pillsImage from '../assets/pills.jpg';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const MedicineGridItem = ({ children }) => (
  <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '20px', borderRadius: '5px' }}>
    {children}
  </div>
);

const MedicineDetailsLite = ({ medicine, addToCart }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleAddToCart = (medicineId) => {
    // Assuming quantity is set to 1 for simplicity, you can adjust as needed
    addToCart(medicineId, 1);
    setFeedbackOpen(true);
  };

  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };

  const handleRedirectToAlternatives = () => {
    window.location.href = '/AlternativesMedicines';
  };

  return (
    <MedicineGridItem>
      <div className="medicine-description" style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ color: '#25A18E', fontSize: 27, textAlign: 'center' }}>
          {medicine.name}
        </Typography>
        <img id="imageDisplay" src={pillsImage} alt="Medicine Image" />
        <Typography><strong>Price: </strong>{medicine.price}</Typography>
        <Typography><strong>Description: </strong>{medicine.description}</Typography>
        <Typography><strong>Active Ingredients: </strong>{medicine.activeIngredients}</Typography>
        <Typography><strong>Medicinal Use: </strong>{medicine.medicinalUse}</Typography>
        {/* Button to add the medicine to the cart */}
        {medicine.availableQuantity !== 0 ? (
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            sx={{
              color: 'white',
              backgroundColor: '#25A18E',
              '&:hover': {
                backgroundColor: '#20756c', // Change color on hover if desired
              },
            }}
            onClick={() => handleAddToCart(medicine._id)}
            disableRipple
          >
            Add to Cart
          </Button>
        ) : (
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{
              color: 'white',
              backgroundColor: '#A81D24',
              '&:hover': {
                backgroundColor: '#911A20', // Change color on hover if desired
              },
            }}
            onClick={handleRedirectToAlternatives}
            disableRipple
          >
            View Alternatives
          </Button>
        )}
        {/* Feedback Snackbar */}
        <Snackbar open={feedbackOpen} autoHideDuration={3000} onClose={handleFeedbackClose}>
          <MuiAlert onClose={handleFeedbackClose} severity="success" sx={{ width: '100%' }}>
            Item added to cart!
          </MuiAlert>
        </Snackbar>
      </div>
    </MedicineGridItem>
  );
};

export default MedicineDetailsLite;
