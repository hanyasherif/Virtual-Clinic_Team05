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


const RemoveDoctorPatientAdmin = () => { 

    const [users,setUsers] = useState([]);
    
    const getUsers =  async () => {
         await axios.get('http://localhost:8000/getAllUsers').then((res) => { 
            const usersList = res.data
            console.log(users)
            setUsers(usersList)
        }
         ).catch(err=>{
          console.log(err.message)
         });
    }

    const removeUser = async (userId) => {
        try {
          // Make a DELETE request to your backend API to remove the user
          const response = await fetch(`/removeUser?userID=${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            // If the request is successful, update the user list by filtering out the removed user
            setUsers(users.filter(user => user._id !== userId));
          } else {
            console.error('Failed to remove user');
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      };

    return(
        // visualize authors in a table map over authors
        <div className="UsersList">
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={getUsers} margin="normal" padding="normal">
          Load Users
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell> {/* Add Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                  },
                }}
                key={user._id}
              >
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.type}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeUser(user._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// export default UsersList;
export default RemoveDoctorPatientAdmin;