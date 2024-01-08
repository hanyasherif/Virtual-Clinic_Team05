import React, { useState } from 'react';

const MedicineForm = () => {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null); // Updated to handle file
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [sales, setSales] = useState("");
  const [activeIngredients, setActiveIngredients] = useState("");
  const [medicinalUse, setMedicinalUse] = useState("");

  const handleImageChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('picture', picture); // Append the file
    formData.append('price', price);
    formData.append('description', description);
    formData.append('availableQuantity', availableQuantity);
    formData.append('sales', sales);
    formData.append('activeIngredients', activeIngredients);
    formData.append('medicinalUse', medicinalUse);

    try {
      const response = await fetch("/addMedicine", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        alert(json.message);
        return;
      } else {
        setName("");
        setPicture(null);
        setPrice("");
        setDescription("");
        setAvailableQuantity("");
        setSales("");
        setActiveIngredients("");
        setMedicinalUse("");
        console.log(json.message);
        alert(json.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
      <label>Medicine Name</label>
      <input type="text" placeholder="Enter Medicine Name" value={name} onChange={(e) => setName(e.target.value)} />
      
      {/* Updated input for file */}
      <label>Picture</label>
      <input type="file" onChange={handleImageChange} />

      <label>Price</label>
      <input type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <label>Description</label>
      <input type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Available Quantity</label>
      <input type="number" placeholder="Enter Available Quantity" value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)} />
      <label>Sales</label>
      <input type="number" placeholder="Enter Sales" value={sales} onChange={(e) => setSales(e.target.value)} />
      <label>Active Ingredients</label>
      <input type="text" placeholder="Enter Active Ingredients" value={activeIngredients} onChange={(e) => setActiveIngredients(e.target.value)} />
      <label>Medicinal Use</label>
      <input type="text" placeholder="Enter Medicinal Use" value={medicinalUse} onChange={(e) => setMedicinalUse(e.target.value)} />
      <button type="submit">Add Medicine</button>
    </form>
  );
};

export default MedicineForm;
