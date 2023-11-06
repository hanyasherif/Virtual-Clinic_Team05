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


const Prescriptions = () => { 
    const [prescriptions,setPrescriptions] = useState([]);
    const [filter,setFilter] = useState({name:'', date:'' , doctorId:''});
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    console.log(userId);
 

    const getPrescriptions =  async (filterName) => {
        filter.name=filterName
        console.log(filter.name)
         await axios.get('http://localhost:3000/filterPrescription?username=KingMohab&name='+filterName +"&date="+filter.date + "&doctorId="+filter.doctorId).then(
        (res) => { 
            const prescriptions = res.data
            console.log(prescriptions)
            setPrescriptions(prescriptions)
            
        }
         );
       
    }
    return(

        // visualize prescriptions in a table map over prescriptions
        <div className="PrescriptionsList">
            <Box sx={{marginBottom: 2}}>
             <Button variant="contained"
            onClick={() => getPrescriptions("date")}
            margin="normal"
            padding="normal"
            >Date</Button>
             <input
                type="text"
                placeholder="Date "
                required
                 value={filter.date}
                onChange={(e) => setFilter({ ...filter, date: e.target.value })}
             />
             <Button variant="contained"
            onClick={() => getPrescriptions("not filled")}
            margin="normal"
            padding="normal"
            >Not filled</Button>
            <Button variant="contained"
            onClick={() => getPrescriptions("filled")}
            margin="normal"
            padding="normal"
            >filled</Button> 
            <Button variant="contained"
            onClick={() => getPrescriptions("normal")}
            margin="normal"
            padding="normal"
            >No filter</Button>
            </Box>
            <Box>
            <Button variant="contained"
            onClick={() => getPrescriptions("doctor")}
            margin="normal"
            padding="normal"
            >Doctor</Button> 

             <input
            type="text"
            placeholder="doctor"
             value={filter.doctorId}
            onChange={(e) => setFilter({ ...filter, doctorId: e.target.value })}
             />
            
            </Box>
           
        
        
            
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Doctor</StyledTableCell>
            <StyledTableCell align="center">Patient</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Medicine</StyledTableCell>
            <StyledTableCell align="center">Dosage</StyledTableCell>
     
          </TableRow>
        </TableHead>
        <TableBody>
          {prescriptions.map((prescription) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
            

              >
                {/* <PateintProfile/> */}
              <TableCell align="center">{prescription.date}</TableCell>
              <TableCell align="center">{prescription.doctor}</TableCell>
              <TableCell align="center">{prescription.patientName}</TableCell>
              <TableCell align="center">{prescription.filled? "Filled" : "Not Filled"}</TableCell>
              <TableCell align="center">{prescription.medicine.join(', ')}</TableCell>
              <TableCell align="center">{prescription.dosage.join(', ')}</TableCell>
 

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         
        </div>
                

    )
}
export default Prescriptions;
