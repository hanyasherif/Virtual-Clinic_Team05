import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

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
<TextField
  label="Medicine Name"
  type="text"
  placeholder="Enter Medicine Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  fullWidth
  sx={{
    marginBottom: '20px',
    '& .MuiInputLabel-shrink': {
      color: '#25A18E',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#25A18E',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#25A18E',
      },
    }
  }}
/>

      {/* Updated input for file */}
      <label>Picture</label>
      <input type="file" onChange={handleImageChange} />

      <TextField
             label="Price"
              type="number"
              value={price} onChange={(e) => setPrice(e.target.value)}
              fullWidth
              sx={{
                marginBottom: '20px', // Adjust the margin as needed
                // '& .MuiInputLabel-root': {
                //   color: '#25A18E', // Change label color if necessary
                // },
                '& .MuiInputLabel-shrink': {
                  color: '#25A18E', // Change label color while shrinking (on input)
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#25A18E', // Change border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#25A18E', // Change border color on focus
                  },
                }
              }}      
            />
     <TextField
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{
          marginBottom: '20px',
          '& .MuiInputLabel-shrink': {
            color: '#25A18E',
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#25A18E',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#25A18E',
            },
          }
        }}
      />
<TextField
  label="Available Quantity"
  type="number"
  value={availableQuantity}
  onChange={(e) => setAvailableQuantity(e.target.value)}
  fullWidth
  sx={{
    marginBottom: '20px',
    '& .MuiInputLabel-shrink': {
      color: '#25A18E',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#25A18E',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#25A18E',
      },
    }
  }}
/>
<TextField
  label="Sales"
  type="number"
  value={sales}
  onChange={(e) => setSales(e.target.value)}
  fullWidth
  sx={{
    marginBottom: '20px',
    '& .MuiInputLabel-shrink': {
      color: '#25A18E',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#25A18E',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#25A18E',
      },
    }
  }}
/>
<TextField
  label="Active Ingredients"
  type="text"
  value={activeIngredients}
  onChange={(e) => setActiveIngredients(e.target.value)}
  fullWidth
  sx={{
    marginBottom: '20px',
    '& .MuiInputLabel-shrink': {
      color: '#25A18E',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#25A18E',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#25A18E',
      },
    }
  }}
/>
<TextField
  label="Medicinal Use"
  type="text"
  value={medicinalUse}
  onChange={(e) => setMedicinalUse(e.target.value)}
  fullWidth
  sx={{
    marginBottom: '20px',
    '& .MuiInputLabel-shrink': {
      color: '#25A18E',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#25A18E',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#25A18E',
      },
    }
  }}
/>
      <button type="submit">Add Medicine</button>
    </form>
  );
};

export default MedicineForm;
