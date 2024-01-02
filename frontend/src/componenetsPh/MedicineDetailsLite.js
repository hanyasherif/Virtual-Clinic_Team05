import React from 'react';
import pillsImage from '../assets/pills.jpg';

const MedicineDetailsLite = ({ medicine, addToCart }) => {
  const handleAddToCart = (medicineId) => {
    // Assuming quantity is set to 1 for simplicity, you can adjust as needed
    addToCart(medicineId, 1);
  };

  return (
    <div className="medicine-description">
      <h4>{medicine.name}</h4>
      <img id="imageDisplay" src={pillsImage} alt="Medicine Image" />
      <p><strong>Price: </strong>{medicine.price}</p>
      <p><strong>Description: </strong>{medicine.description}</p>
      <p><strong>Active Ingredients: </strong>{medicine.activeIngredients}</p>
      <p><strong>Medicinal Use: </strong>{medicine.medicinalUse}</p>
      {/* Button to add the medicine to the cart */}
      <button key={medicine._id} onClick={() => handleAddToCart(medicine._id)}>Add to Cart</button>
    </div>
  );
};

export default MedicineDetailsLite;
