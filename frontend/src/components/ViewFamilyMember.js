import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center', // Centering the text in header cells
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center', // Centering the text in header cells
  },
}));


const ViewFamilyMember = () => { 
    const params = new URLSearchParams(window.location.search);
    const [famMem,setFamMem] = useState([]);

    const getFamilyMember=  async () => {   
        await axios.get(`http://localhost:8000/viewRegFamilyMembers`, {withCredentials:true}).then(
            (res) => { 
                const famMems = res.data
                console.log(famMem)
                setFamMem(famMems)
            }
             );
    }

    useEffect(() => {
      getFamilyMember();
    }, []);

    return(          
    <React.Fragment>
      <Title style={{ color: '#25A18E', fontSize: 23 }}>My Family Members</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Name</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>National ID</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Age</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Gender</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Relation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {famMem.map((familyMember) => (
            <TableRow 
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            // onClick={() =>window.location.href=`http://localhost:3000/ViewAppFamilyMember?famMemUsername=${familyMember.username}`}
            key={familyMember._famMemNatID}>
              <TableCell style={{ textAlign: 'center' }}>{familyMember.famMemName}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{familyMember.famMemNatID}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{familyMember.famMemAge}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{familyMember.famMemGender}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>{familyMember.famMemRelation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link style={{ color: '#25A18E' }} href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more family members
      </Link> */}
    </React.Fragment>
    )
}
export default ViewFamilyMember;