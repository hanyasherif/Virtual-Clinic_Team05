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
import { useParams } from 'react-router-dom';

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

const ViewFamilyMember = () => { 

    
   const params = new URLSearchParams(window.location.search);
    const id = '65735cebad66db980718a14d'; // session
    const [famMem,setFamMem] = useState([]);

    const getFamilyMember=  async () => {
        /*
        get the blogs from the backend  
        */     
        

        await axios.get(`http://localhost:8000/viewRegFamilyMembers/${id}`).then(
            (res) => { 
                const famMems = res.data
                console.log(famMem)
                setFamMem(famMems)
                
            }
             );
    }
    return(
        /* 
        1. create a button to load the blogs
        2. map over the blogs and display them
        */
        
       
        <div className="ViewFamilyMember">
             <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getFamilyMember}
            margin="normal"
            padding="normal"
            >Load Family Members</Button>
            {/* margin */}
            </Box>
            
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">National ID</StyledTableCell>
            <StyledTableCell align="center">Age</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">Relation</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {famMem.map((FamilyMember) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            
            key={FamilyMember._famMemNatID}
              >
              <TableCell align="center">{FamilyMember.famMemName}</TableCell>
              <TableCell align="center">{FamilyMember.famMemNatID}</TableCell>
              <TableCell align="center">{FamilyMember.famMemAge}</TableCell>
              <TableCell align="center">{FamilyMember.famMemGender}</TableCell>
              <TableCell align="center">{FamilyMember.famMemRelation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </div>
   

    )
}
export default ViewFamilyMember;