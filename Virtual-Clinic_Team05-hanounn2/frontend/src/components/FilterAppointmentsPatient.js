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

const { useState, useEffect } = require("react");

const FilterAppointmentsPatient = () => { 
  const [date, setDate] = useState('')
  const [status, setStatus] = useState('')
  const [doctorNames, setDoctorNames] = useState({});
  const [appointment,setAppointment] = useState([]);
  
  const handleStatusChange = (e) => {
      setStatus(e.target.value);
    };
  //  console.log(userId);
  const getDoctorName = async (doctorId) => {
    try {
      const response = await axios.get(`http://localhost:8000/getDoctorName/${doctorId}`, {
        credentials:'include'
      });
      if (response.data && response.data.name) {
        return response.data.name;
      } else {
        return 'Unknown Doctor';
      }
    } catch (error) {
      console.error('Error fetching doctor name:', error);
      return 'Unknown Doctor';
    }
  };
  const fetchDoctorNames = async () => {
    try {
      const doctorNames = {};
      const appointments = await axios.get('http://localhost:8000/viewAppointments',{credentials: 'include'});
      if (appointments.data) {
        for (const appointment of appointments.data) {
          const doctorId = appointment.doctor;
          if (!doctorNames[doctorId]) {
            const doctorName = await getDoctorName(doctorId);
            doctorNames[doctorId] = doctorName;
          }
        }
      }
      setDoctorNames(doctorNames);
    } catch (error) {
      console.error('Error fetching doctor names:', error);
    }
  };

  useEffect(() => {
    fetchDoctorNames();
  }, []); 

    const getAppointment=  async () => {
        /*
        get the blogs from the backend  
        */     
        

        await axios.get('http://localhost:8000/viewAppointments', {credentials: 'include'}).then(
            (res) => { 
                const appointments = res.data
                console.log(appointment)
                setAppointment(appointments)
                
            }
             );
    }
    const getAppointmentDate=  async (date) => {
      /*
      get the blogs from the backend  
      */     
      if (!date) {
        alert('Please enter a valid Date');
        return;
      }

      await axios.get(`http://localhost:8000/filterAppointmentsDate/${date}`, {credentials: 'include'}).then(
          (res) => { 
              const appointments = res.data
              
              console.log(appointments)
              setAppointment(appointments)
              
          }
           );
  }

  const getAppointmentStatus=  async (status) => {
    /*
    get the blogs from the backend  
    */     
    if (!status) {
      alert('Please enter a valid status');
      return;
    }

    await axios.get(`http://localhost:8000/filterAppointmentsStatus/${status}`, {credentials: 'include'}).then(
        (res) => { 
            const appointments = res.data
            
            console.log(appointments)
            setAppointment(appointments)
            
        }
         );
}
    return(      
        <div className="FilterAppointment">
             <Box sx={{marginBottom: 2}}>
             
            <Button variant="contained"
            onClick={getAppointment}
            margin="normal"
            padding="normal"
            
            >Load Appointments </Button>
             <input
             type="text"
             onChange={(e) => setDate(e.target.value)}
              value={date}/>
            <Button variant="contained"
            onClick={() => getAppointmentDate(date)}
            margin="normal"
            padding="normal"
            
            >Filter by Date</Button>
            <Button variant="contained"
            onClick={() => getAppointmentStatus(status)}
            margin="normal"
            padding="normal"
            >Filter by Status</Button>
            <label>
          <input
            type="radio"
            value="upcoming"
            checked={status === 'upcoming'}
            onChange={handleStatusChange}
          />
          Upcoming
        </label>
      <label>
          <input
            type="radio"
            value="completed"
            checked={status === 'completed'}
            onChange={handleStatusChange}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            value="cancelled"
            checked={status === 'cancelled'}
            onChange={handleStatusChange}
          />
          Cancelled
        </label>
        <label>
          <input
            type="radio"
            value="rescheduled"
            checked={status === 'rescheduled'}
            onChange={handleStatusChange}
          />
          Rescheduled
        </label>
            {/* margin */}
            </Box>
            
        
        
            
            <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Date</StyledTableCell>
        <StyledTableCell align="center">Doctor</StyledTableCell>
        <StyledTableCell align="center">Status</StyledTableCell>
        <StyledTableCell align="center"></StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {appointment.map((Appointment) => (
        <TableRow
          hover
          sx={{
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
              width: "100%"
            }
          }}
          onClick={() => window.location.href = `/selectedAppointment?appointmentId=${Appointment._id}`}
          key={Appointment._id}
        >
          <TableCell align="center">{Appointment.date}</TableCell>
          <TableCell align="center">{doctorNames[Appointment.doctor]}</TableCell>
          <TableCell align="center">{Appointment.status}</TableCell>
          <TableCell align="center">
            <Button style={{ color: 'red' }}>Cancel</Button>
            <Button onClick={() => window.location.href = `/reschedulePage?appointmentId=${Appointment._id}`}style={{ color: 'blue' }}>Reschedule</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

          
        </div>
   

    )
}
export default FilterAppointmentsPatient;