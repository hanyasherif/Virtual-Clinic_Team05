import { useState } from 'react'
import { useParams } from 'react-router-dom';
// /Users/hanyasherif/Downloads/aclPharmacy/Pharmacy_Team05/frontend/src/services.js

const AddFamilyMember = () => {
    const [famMemName, setfamMemName] = useState('')
    const [famMemNatID, setfamMemNatID] = useState('')
    const [famMemAge, setfamMemAge] = useState('')
   const [famMemGender, setfamMemGender] = useState('')
   const [famMemRelation, setfamMemRelation] = useState('')
   const [error, setError] = useState('');
   const {id} = useParams();
    // const checkUniqueUsername = async (username) => {
    //     try {
    //       const response = await fetch('/checkUsername', {
    //         method: 'POST',
    //         body: JSON.stringify({ username }),
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
      
    //       if (response.ok) {
    //         const data = await response.json();
    //         return data.isUnique;
    //       } else {
    //         console.error('Error checking username uniqueness');
    //         return false; // Assume not unique in case of an error
    //       }
    //     } catch (error) {
    //       console.error('Network error:', error);
    //       return false; // Assume not unique in case of a network error
    //     }
    //   };
    const handleGenderChange = (e) => {
      setfamMemGender(e.target.value);
    };
    const handleRelationChange = (e) => {
      setfamMemRelation(e.target.value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const params = new URLSearchParams(window.location.search);
      const FamilyMember = {famMemName, famMemNatID, famMemAge, famMemGender, famMemRelation };
      if (!famMemName || !famMemNatID || !famMemAge || !famMemGender || !famMemRelation) {
        alert('Please fill in all fields.');
        return;
      }
      console.log(FamilyMember)

    
  
       try {
        const response = await fetch(`http://localhost:8000/addFamilyMember/${id}`, {
          method: 'POST',
          body: JSON.stringify(FamilyMember),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();

        if(!response.ok){
            alert(json.message);
                return;
            }
            else{
              setfamMemName("");
              setfamMemNatID("");
              setfamMemAge("");
              setfamMemGender("");
              setfamMemRelation("");
              setError("");
                console.log(json.message);
                alert(json.message);
            }}
            catch (error) {
              console.error('Error:', error);
            }
    };
  
    return (
      <div>
         {error && <p>{error}</p>}
     
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={famMemName} onChange={(e) => setfamMemName(e.target.value)} />
        </label>
        <br />
        <label>
        <br/>
          National ID
          <input type="number" value={famMemNatID} onChange={(e) => setfamMemNatID(e.target.value)} />
        </label>
        <br />
        <label>Age:</label>
      <input 
        type="number" 
        onChange={(e) => setfamMemAge(e.target.value)} 
        value={famMemAge} 
      />
      <br/>
      <label>Gender:</label>
        

        <label>
          <input
            type="radio"
            value="female"
            checked={famMemGender === 'female'}
            onChange={handleGenderChange}
          />
          Female
        </label>
      <label>
          <input
            type="radio"
            value="male"
            checked={famMemGender === 'male'}
            onChange={handleGenderChange}
          />
          Male
        </label>
        <br/>
        <label>Relation:</label>
        <label>
          <input
            type="radio"
            value="wife/husband"
            checked={famMemRelation === 'wife/husband'}
            onChange={handleRelationChange}
          />
          Wife/Husband
        </label>
        
        <label>
          <input
            type="radio"
            value="child"
            checked={famMemRelation === 'child'}
            onChange={handleRelationChange}
          />
          Child
        </label>
        <br/>

        <button type="submit">Add Family Member</button>
      </form>

       
        </div>

    );
  };
  
  export default AddFamilyMember;