import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [salesData, setSalesData] = useState({ totalSales: 0, medicineSales: [] });
  const [selectedMonth, setSelectedMonth] = useState('January'); // Hardcoded initial selected month

  const monthlySales = {
    January: 150,
    February: 100,
    March: 50,
    // Add more months and sales here
  };

  const getSales = async () => {
    try {
      const response = await fetch(`/getSales?month=${selectedMonth}`); // Pass selected month as query parameter
      const data = await response.json();
      console.log(data);
      setSalesData(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getSales();
  }, [selectedMonth]); // Trigger getSales() whenever selectedMonth changes

  return (
    <React.Fragment>
     <Typography variant="h4" style={{ color: '#25A18E', fontSize: 27, textAlign: 'center' }}>
        Monthly Sales Report
        </Typography>
      <Box sx={{ mt: 2 }}>
        <label htmlFor="month-select">Select Month: </label>
        <Select
          id="month-select"
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
        >
          <MenuItem value="January">January</MenuItem>
          <MenuItem value="February">February</MenuItem>
          <MenuItem value="March">March</MenuItem>
          {/* Add more months here */}
        </Select>
      </Box>
     
      <Typography variant="body1" component="div">
        Total Monthly Sales: ${monthlySales[selectedMonth]}
      </Typography>
    </React.Fragment>
  );
}