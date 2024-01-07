import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem"; // Import Select and MenuItem

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSpeciality, setSearchSpeciality] = useState("");
  const [specs, setSpecs] = useState([]);
  const [filterSpec, setFilterSpec] = useState(""); // New state variable for selected speciality
  const [selectedDateTime, setSelectedDateTime] = useState('');
  

  useEffect(() => {
    getDoctors();
    phgetDoctors();
    getSpec();
  }, []);

  const getSpec = async () => {
    axios.get(`http://localhost:8000/getSpecs`, { withCredentials: true})
      .then((res) => {
        const spec = res.data;
        setSpecs(spec);
      });
  }

  const getDoctors = async () => {
    // Make a request to your backend API to fetch doctors based on search criteria
    axios.get(`http://localhost:8000/viewDoctors`, {
      withCredentials: true
      } )
      .then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
  };

  const phgetDoctors = async () => {
    // Make a request to your backend API to fetch doctors based on search criteria
    axios.get(`http://localhost:8000/pharmacistviewDoctors`, {
      withCredentials: true
      } )
      .then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
  };

  const searchDoctors = async () => {
    // Make a request to your backend API to fetch doctors based on search criteria
    if (searchName !== "" && searchSpeciality === "") {
        axios
          .get(`http://localhost:8000/searchByName`, {
            params: {
              name: searchName,
            },withCredentials: true
          })
          .then((res) => {
            const doctors = res.data;
            setDoctors(doctors);
          });
      }
    else if(searchName ==="" && searchSpeciality !== ""){
        axios.get(`http://localhost:8000/searchBySpec`, {
        params: {
            speciality: searchSpeciality,
        },withCredentials: true
      }).then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
    }
    else
        if(searchName !=="" && searchSpeciality !== ""){
            axios.get(`http://localhost:8000/searchByNameSpec`, {
        params: {
          name: searchName,
          speciality: searchSpeciality,
        },withCredentials: true
      }).then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
      });
        }
    };

  const filterDocs  = async () => {
    if(filterSpec !== "" && selectedDateTime ===""){
        filterSpecs(filterSpec); // Call the new function for searching by name and speciality
    }
    else if(filterSpec === "" && selectedDateTime !== ""){
        filterDate(selectedDateTime);
    }
    else if(filterSpec !== "" && selectedDateTime !== ""){
        axios.get(`http://localhost:8000/filterDateSpecs`, {
        params: {
          date: selectedDateTime+':00.000+00:00',
          spec: filterSpec,
        },withCredentials: true
      }).then((res) => {
        const doctors = res.data;
        setDoctors(doctors);
        console.log(doctors);
      });
    }
  };

  const filterDate = async (date) => {
    console.log("DAATTEEE");
    console.log(date);
    await axios.get(`http://localhost:8000/filterDate/${date+':00.000+00:00'}`,{withCredentials: true})
    .then((res) => {
      const s = res.data;
      setDoctors(s);
    //   console.log(doctors);
    });
  };

  const filterSpecs = async (spec) => {
    await axios.get(`http://localhost:8000/filterSpecs/${spec}`,{withCredentials: true})
      .then((res) => {
        const s = res.data;
        setDoctors(s);
      });
  };
  
  return (
    <div className="DoctorsList">
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          margin="normal"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <TextField
          label="Search by Speciality"
          variant="outlined"
          margin="normal"
          value={searchSpeciality}
          onChange={(e) => setSearchSpeciality(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={searchDoctors}
          margin="normal"
          padding="normal"
        >
          Search Doctors
        </Button>

        <TextField
        //   label="Select Date and Time"
          type="datetime-local"
          variant="outlined"
          margin="normal"
          value={selectedDateTime}
          onChange={(e) => setSelectedDateTime(e.target.value)}
        />

        <Select
          label="Filter by Speciality"
          variant="outlined"
          margin="normal"
          value={filterSpec}
          onChange={(e) => setFilterSpec(e.target.value)}
        >
          <MenuItem value="">All Specialities</MenuItem>
          {specs.map((spec) => (
            <MenuItem key={spec} value={spec}>
              {spec}
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          onClick={filterDocs}
          margin="normal"
          padding="normal"
        >
          Filter Doctors
        </Button>


      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Speciality</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    width: "100%",
                  },
                }}
                onClick={() => window.location.href = `/docProfile?doctorId=${doctor._id}`}
                key={doctor._id}
              >
                <TableCell align="center">{doctor.name}</TableCell>
                <TableCell align="center">{doctor.email}</TableCell>
                <TableCell align="center">{doctor.docSpeciality}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

}
export default DoctorsList;
