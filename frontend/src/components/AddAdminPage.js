import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Title from './Title';

export default function AddAdminPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
   
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const admin = { username, password };
  
      console.log(admin)
  
      
  
  
      //   try {
      const response = await fetch('/addAdministrator', {
        method: 'POST',
        body: JSON.stringify(admin),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
  
      if (!response.ok) {
        alert(json.message);
        return;
      } else {
       
        alert(json.message);
      }
    };
  
  return (
    <div>
      <Title style={{ color: 'black' , fontSize: 25}}>Add New Admin</Title>
{/* <h1>Add Admin</h1> */}
<form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        type="text"
        value={username}
        sx={{
          // marginBottom: '20px', // Adjust the margin as needed
          // marginLeft: 61.5,
          minWidth: 205,
          // marginTop: 4,
          // height: 20,
          '& .MuiInputLabel-shrink': {
            color: '#25A18E', // Change label color while shrinking (on input)
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#25A18E', // Change border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#25A18E', // Change border color on focus
            },
          },
        }} 
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <TextField
        label="Password"
        type="password"
        value={password}
        sx={{
          // marginBottom: '20px', // Adjust the margin as needed
          // marginLeft: 61.5,
          minWidth: 205,
          marginTop: 1,
          // height: 20,
          '& .MuiInputLabel-shrink': {
            color: '#25A18E', // Change label color while shrinking (on input)
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#25A18E', // Change border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#25A18E', // Change border color on focus
            },
          },
        }} 
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />

      <Button variant="contained" type="submit"
      sx={{
        marginTop: 0,
        // marginLeft: 61.5,
        minWidth: 205,
        color: 'white',
        backgroundColor: '#25A18E',
        '&:hover': {
            backgroundColor: '#20756c', // Change color on hover if desired
        },
        height: 55
        }} >
        Add Administrator
      </Button>
    </form>
    </div>
  );
}