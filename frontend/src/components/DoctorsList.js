import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const { useState } = require("react");


const DoctorsList = () => { 
    const [doctors,setDoctors] = useState([]);
    
    const getDoctors =  async () => {
         await axios.get('http://localhost:4000/viewDoctors').then(
        (res) => { 
            const doctors = res.data
            console.log(doctors)
            setDoctors(doctors)
            
        }
         );
       
    }
    return(

        // visualize doctors in a table map over doctors
        <div className="DoctorsList">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getDoctors}
            margin="normal"
            padding="normal"
            >Load Doctors</Button>
            {/* margin */}
            </Box>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Speciality</StyledTableCell>
            <StyledTableCell align="center">Session Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            onClick={() => window.location.href=`/selectDoctor?docId=${doctor._id}`}
              key={doctor._id}

              >
                {/* <DoctorProfile/> */}
              <TableCell align="center">{doctor.username}</TableCell>
              <TableCell align="center">{doctor.email}</TableCell>
              <TableCell align="center">{doctor.docSpeciality}</TableCell>
              <TableCell align="center">{doctor.sessionPrice}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         
        </div>
                

    )
}
export default DoctorsList;

//------------------------------------------------------------------------------//
// import React, {useState} from "react";

// const DoctorsList = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [speciality, setSpeciality] = useState("");
//     const [sessionPrice, setSessionPrice] = useState("");
//     // const [availableQuantity, setAvailableQuantity] = useState("");
//     // const [sales, setSales] = useState("");
//     // const [activeIngredients, setActiveIngredients] = useState("");
//     // const [medicinalUse, setMedicinalUse] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const doctor = {name, email, speciality, sessionPrice};
//         console.log(doctor);
//         const response = await fetch("/viewDoctors", {
//             method: "GET",
//             body: JSON.stringify(doctor),
//             headers: {
//                 "Content-Type": "application/json"
//             }
          
//         })
//         const json = await response.json();
//         if(!response.ok){
//         alert(json.message);
//             return;
//         }
//         else{
//             setName("");
//             setEmail("");
//             setSpeciality("");
//             setSessionPrice("");
//             //setAvailableQuantity("");
//             //setSales("");
//             //setActiveIngredients("");
//             //setMedicinalUse("");
//             console.log(json.message);
//             alert(json.message);
//         }
//     }

//     return(
//     <form className= "create" onSubmit={handleSubmit}>

//         <label>Medicine Name</label>
//         <input type="text" placeholder="Enter Medicine Name" value={name} onChange={(e) => setName(e.target.value)}/>
//         <label>Picture</label>
//         <input type="text" placeholder="Enter Picture" value={picture} onChange={(e) => setPicture(e.target.value)}/>
//         <label>Price</label>
//         <input type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
//         <label>Description</label>
//         <input type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
//         <label>Available Quantity</label>
//         <input type="number" placeholder="Enter Available Quantity" value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)}/>
//         <label>Sales</label>
//         <input type="number" placeholder="Enter Sales" value={sales} onChange={(e) => setSales(e.target.value)}/>
//         <label>Active Ingredients</label>
//         <input type="text" placeholder="Enter Active Ingredients" value={activeIngredients} onChange={(e) => setActiveIngredients(e.target.value)}/>
//         <label>Medicinal Use</label>
//         <input type="text" placeholder="Enter Medicinal Use" value={medicinalUse} onChange={(e) => setMedicinalUse(e.target.value)}/>
//         <button type="submit">Add Medicine</button>
//     </form>    
//     )
// }

// export default MedicineForm;