import React from 'react';
import { TextField, FormControlLabel, Radio } from '@mui/material';


// import pillsImage from '../assets/pills.jpg';

import { useState } from 'react';

const MedicineDetails = ({medicine}) => {

    const [medicineImage, setMedicineImage] = useState(medicine.picture);

     const [name, setName] = useState("");
    //  const [picture, setPicture] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState("");
    const [sales, setSales] = useState("");
    const [activeIngredients, setActiveIngredients] = useState("");
    const [medicinalUse, setMedicinalUse] = useState("");
    const [isArchived, setIsArchived] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMedicine = {price, description, availableQuantity, activeIngredients, medicinalUse, isArchived};
        console.log(medicine);
        const response = await fetch(`/updateMedicine/${medicine._id}`, {
            method: "PUT",
            body: JSON.stringify(updatedMedicine),
            headers: {
                "Content-Type": "application/json"
            }
          
        })
        const json = await response.json();
        if(!response.ok){
        alert(json.message);
            return;
        }
        else{
            setName(medicine.name);
            // setPicture(medicine.picture);
            setMedicineImage(medicine.picture);
            setPrice(medicine.price);
            setDescription(medicine.description);
            setAvailableQuantity(medicine.availableQuantity);
            setSales(medicine.sales);
            setActiveIngredients(medicine.activeIngredients);
            setMedicinalUse(medicine.medicinalUse);
            console.log(json.message);
            alert(json.message);
        }
    }

    return(
        <div className="medicine-description">
            <h4> {medicine.name}</h4>
       < img id="imageDisplay" src={medicineImage} alt="Medicine Image" />

            <p><strong>Available Quantity: </strong> {medicine.availableQuantity}</p>
            <p><strong>Sales: </strong> {medicine.sales}</p>

            <div className="edit-medicine">
                
            {/* edit medicine details and price */}
            <form className= "create" onSubmit={handleSubmit}>
                <label>Price</label>
                <input type="number" placeholder="Enter Price" value={price || medicine.price} onChange={(e) => setPrice(e.target.value)}/>
                <label>Description</label>
                <input type="text" placeholder="Enter Description" value={description || medicine.description} onChange={(e) => setDescription(e.target.value)}/>
                <label>Active Ingredients</label>
                <input type="text" placeholder="Enter Active Ingredients" value={activeIngredients || medicine.activeIngredients} onChange={(e) => setActiveIngredients(e.target.value)}/>
                <label>Medicinal Use</label>
                <input type="text" placeholder="Enter Medicinal Use" value={medicinalUse || medicine.medicinalUse} onChange={(e) => setMedicinalUse(e.target.value)}/>
                
                {/* Add a radio button for isArchived */}
      <div>
      <label>
          Archive Medicine:
          <Radio
                //   value="female"
                //   checked={famMemGender === 'female'}
                  onChange={() => setIsArchived(false)}
                  sx={{
                     color: '#25A18E', // Adjust color as needed
                     '&.Mui-checked': {
                      color: '#25A18E', // Adjust color for checked state
                      },
                  }}
                />
        </label>
      </div>
      <button type="submit">Edit</button>
            </form>



            </div>

            </div>
       
    )
}

export default MedicineDetails;