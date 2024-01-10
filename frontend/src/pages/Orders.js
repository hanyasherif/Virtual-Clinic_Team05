import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';


export default function Orders() {
  const [salesData, setSalesData] = useState({ totalSales: 0, medicineSales: [] });

  const getSales = async () => {
    try {
      const response = await fetch('/getSales');
      const data = await response.json();
      console.log(data);
      setSalesData(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <React.Fragment>
        <Typography variant="h4" style={{ color: '#25A18E', fontSize: 27, textAlign: 'center' }}>
          Sales Report
        </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Medicine</TableCell>
            <TableCell align="right">Total Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesData.medicineSales.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{`$${row.sales}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p>Total Sales: ${salesData.totalSales}</p>
    </React.Fragment>
  );
}
