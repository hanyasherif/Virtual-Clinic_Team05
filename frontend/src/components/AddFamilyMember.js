import { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const AddFamilyMember = () => {
    const [famMemName, setfamMemName] = useState('')
    const [famMemNatID, setfamMemNatID] = useState('')
    const [famMemAge, setfamMemAge] = useState('')
   const [famMemGender, setfamMemGender] = useState('')
   const [famMemRelation, setfamMemRelation] = useState('')
   const [error, setError] = useState('');

   const [newFamMem, setNewFamMem] = useState(false);
   const [linkFamMem, setLinkFamMem] = useState(false);

   //linking
   const [email, setEmail] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')

  
   const [username, setUsername] = useState('')
   
   //wife/husband
   const [username2, setUsername2] = useState('')
   const [famMemNatID2, setfamMemNatID2] = useState('') //my nationalId to be linked to other family member as a family member
   const [famMemName2, setfamMemName2] = useState('')
   const [famMemGender2, setfamMemGender2] = useState('')
   const [famMemAge2, setfamMemAge2] = useState('')
   const [idGenerated, setIdGenerated] = useState('')

   const id = '65735cebad66db980718a14d';
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

       try {
        const response = await fetch(`http://localhost:8000/addFamilyMember`, {
          method: 'POST',
          body: JSON.stringify(FamilyMember),
          headers: {
            'Content-Type': 'application/json',
          },credentials:'include'
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
    const handleAddFamilyMemberClick = () => {
      setNewFamMem(true);
      setLinkFamMem(false); // Close the link to existing user form
    };
  
    const handleLinkToExistingUserClick = () => {
      setLinkFamMem(true);
      setNewFamMem(false); // Close the family member form
    };

    const getUserName = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8000/getUserById/${userId}`,{withCredentials:true});
        if (response.data && response.data.username) {
          return response.data.username;
        } else {
          return 'Unknown User';
        }
      } catch (error) {
        console.error('Error fetching doctor name:', error);
        return 'Unknown USer';
      }
    };

    const handleSubmit2 = async (e) => {
     

      e.preventDefault();
      const params = new URLSearchParams(window.location.search);
      if (!email && !phoneNumber) {
        alert('Please fill in at least one of the email or phone number fields');
        return;
      }
      if(!famMemNatID|| !famMemRelation)
      {
        alert('Please fill in national ID and Relation fields');
        return;
      }
      fetchUser(email,phoneNumber);
      
      // if(email){
      // const response = await fetch(`/getUserByEmail/${email}`);
     
      //   if (!response.ok) {
      //     alert("email not found")
      //     console.error('Failed to fetch user information');
      //     return;
      //   }
         
      // assignFamilyMemberValuesEmail(email);
      
     

      // }
      // else{
      //   const response = await fetch(`/getUserByPhoneNumber/${phoneNumber}`);
     
      //   if (!response.ok) {
      //     alert("Phone number not found")
      //     console.error('Failed to fetch user information');
      //     return;
      //   }
          
      // assignFamilyMemberValuesPhoneNumber(phoneNumber);
      
      //      }
  
       
            if (famMemRelation === "wife/husband"){
             // idGenerated = getId(username);
              const idUsername =getUserName(id)  //bta3ty ana elly wa5daha mn el session
              assignFamilyMemberValues(idUsername) 
              
              if(!famMemNatID2){
                alert('Please Provide your National ID');
              }

              
            }
    };
    // const getId = async(username)  =>{
    //   try {
    //     const x = {};
    //     const appointments = await axios.get('http://localhost:8000/viewAppointments');
    //     if (appointments.data) {
    //       for (const appointment of appointments.data) {
    //         const doctorId = appointment.doctor;
    //         if (!doctorNames[doctorId]) {
    //           const doctorName = await getName(doctorId);
    //           doctorNames[doctorId] = doctorName;
    //         }
    //       }
    //     }
    //     setIdGenerated(doctorNames);
    //   } catch (error) {
    //     console.error('Error fetching doctor names:', error);
    //   }
    // };
    const assignFamilyMemberValues = async (username) => {
      try {
        const response = await fetch(`/getUserByUsername/${username}`,{credentials:'include'});
        
        if (!response.ok) {
          
          console.error('Failed to fetch user information');
          return;
        }
    
        const user = await response.json();
    
        // Extract user information and assign it to state variables
        setUsername2(username);
        setfamMemName2(user.name); // Assuming 'name' is a property of the user object
        setfamMemGender2(user.gender); // Assuming 'gender' is a property of the user object
    
        // Calculate age based on date of birth
        if (user.dateOfBirth) {
          const birthDate = new Date(user.dateOfBirth);
          const currentDate = new Date();
          const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
          setfamMemAge2(age );
        } else {
          setfamMemAge2('');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    const assignFamilyMemberValuesEmail = async (email) => {
      try {
        const response = await fetch(`/getUserByEmail/${email}`);
        
        if (!response.ok) {
          
          console.error('Failed to fetch user information');
          return;
        }
    
        const user = await response.json();
    
        // Extract user information and assign it to state variables
         
        setUsername(user.username);
        setfamMemName(user.name); // Assuming 'name' is a property of the user object
        setfamMemGender(user.gender); // Assuming 'gender' is a property of the user object
    
        // Calculate age based on date of birth
        if (user.dateOfBirth) {
          const birthDate = new Date(user.dateOfBirth);
          const currentDate = new Date();
          const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
          setfamMemAge(age );
           
        } else {
          setfamMemAge('');
          
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    const assignFamilyMemberValuesPhoneNumber = async (phoneNumber) => {
      try {
        const response = await fetch(`/getUserByPhoneNumber/${phoneNumber}`);
        
        if (!response.ok) {
          
          console.error('Failed to fetch user information');
          return;
        }
    
        const user = await response.json();
    
        // Extract user information and assign it to state variables
        setUsername(user.username);
        setfamMemName(user.name); // Assuming 'name' is a property of the user object
        setfamMemGender(user.gender); // Assuming 'gender' is a property of the user object
    
        // Calculate age based on date of birth
        if (user.dateOfBirth) {
          const birthDate = new Date(user.dateOfBirth);
          const currentDate = new Date();
          const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
          setfamMemAge(age );
        } else {
          setfamMemAge('');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    const addFamilyMember = async () => {
      if(username){
      const FamilyMember = {username, famMemName,famMemNatID,famMemAge, famMemGender, famMemRelation};
      console.log("1st Family Member",FamilyMember);
  
      try {
        const response = await fetch(`http://localhost:8000/addFamilyMember`, {
          method: 'POST',
          body: JSON.stringify(FamilyMember),
          headers: {
            'Content-Type': 'application/json',
          },credentials:'include'
        });
        const json = await response.json();
        alert("FamilyMember created Successfully");
        setfamMemName("");
              setfamMemNatID("");
              setfamMemAge("");
              setfamMemGender("");
              setfamMemRelation("");
              setEmail("");
              setError("");
      } catch (error) {
        console.error('Error:', error);
      }
      // if(username2){
      //   const FamilyMember2 = {username2, famMemName2,famMemNatID2,famMemAge2, famMemGender2, famMemRelation};
      // console.log("2nd Family Member",FamilyMember2);
  
      // try {
      //   const response = await fetch(`http://localhost:8000/addFamilyMember/${idGenerated}`, {
      //     method: 'POST',
      //     body: JSON.stringify(FamilyMember2),
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   });
      //   const json = await response.json();
  
      //   if (!response.ok) {
      //     alert(json.message);
      //     return;
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      // }
      // }
    }
    };
   
   
   
    const fetchUser = async (email, phoneNumber) => {
      if(email){
      try {
        const response = await axios.get(`http://localhost:8000/getUserByEmail/${email}`,{withCredentials:true});
        
          const user = response.data;
          setUsername(user.username);
          setfamMemGender(user.gender);
          setfamMemName(user.name);
          if (user.dateOfBirth) {
            const birthDate = new Date(user.dateOfBirth);
            const currentDate = new Date();
            const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
            setfamMemAge(age );
             
          } else {
            setfamMemAge('');
            
          }
          const FamilyMember = {username, famMemName,famMemNatID,famMemAge, famMemGender, famMemRelation};
          console.log("beforee", FamilyMember);
        
      } catch (error) {
        alert('Email Not Found')
      }
    }
    else{
      try {
        const response = await axios.get(`http://localhost:8000/getUserByPhoneNumber/${phoneNumber}`,{withCredentials:true});
        
          const user = response.data;
          setUsername(user.username);
          setfamMemGender(user.gender);
          setfamMemName(user.name);
          if (user.dateOfBirth) {
            const birthDate = new Date(user.dateOfBirth);
            const currentDate = new Date();
            const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
            setfamMemAge(age );
             
          } else {
            setfamMemAge('');
            
          }
          const FamilyMember = {username, famMemName,famMemNatID,famMemAge, famMemGender, famMemRelation};
          console.log("bbbefore", FamilyMember);
        
      } catch (error) {
        alert('Phone Number Not Found')
      }

    }
    };
    useEffect(() => {
      
      
      addFamilyMember(); // Call the function
    }, [username]); 
    return (
      <div>
        {error && <p>{error}</p>}
        
        <button onClick={handleAddFamilyMemberClick}>Add New Family Member</button>
        <button onClick={handleLinkToExistingUserClick}>Link to an Existing User</button>

     {  linkFamMem && (
             <form onSubmit={handleSubmit2}>
              

             <label>
                 Email:
             <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

             </label>
             <br />
             <label>
                 Phone Number:
             <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

             </label>
             <br />
            <label>
              National ID:
              <input type="number" value={famMemNatID} onChange={(e) => setfamMemNatID(e.target.value)} />
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
            {famMemRelation === 'wife/husband' && (
      <div>
        <label>Please provide your National ID:</label>
        <input
          type="number"
          value={famMemNatID2}
          onChange={(e) => setfamMemNatID2(e.target.value)}
        />
      </div>
    )}
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
)}  
        {newFamMem && (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={famMemName} onChange={(e) => setfamMemName(e.target.value)} />
            </label>
            <br />
            <label>
              National ID:
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
        )}
        
        {error && <p>{error}</p>}
      </div>
    );
    
  };
  
  export default AddFamilyMember;