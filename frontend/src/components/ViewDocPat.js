import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

const ViewDocPat = () => {
  const [doctors, setDoctors] = useState([]);
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    getDoctors();
    getSpec();
  }, []);

  const getSpec = async () => {
    axios.get(`http://localhost:8000/getSpecs`, { withCredentials: true })
      .then((res) => {
        const spec = res.data;
        setSpecs(spec);
      });
  }

  const getDoctors = async () => {
    axios.get(`http://localhost:8000/viewDoctors`, { withCredentials: true })
      .then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
  };
  
  return (
    <React.Fragment>
    <Title style={{ color: '#25A18E' , fontSize: 23}}>View Doctors</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Name</TableCell>
            <TableCell style={{ color: '#25A18E', textAlign: 'center' }}>Email</TableCell>
            <TableCell style={{ color: '#25A18E' , textAlign: 'center'}}>Speciality</TableCell>
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
            key={doctor.id}>
              <TableCell style={{ textAlign: 'center'}}>{doctor.name}</TableCell>
              <TableCell style={{ textAlign: 'center'}}>{doctor.email}</TableCell>
              <TableCell style={{ textAlign: 'center'}}>{doctor.docSpeciality}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link style={{ color: '#25A18E' }} href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more doctors
      </Link> */}
    </React.Fragment>
  );
}

export default ViewDocPat;
