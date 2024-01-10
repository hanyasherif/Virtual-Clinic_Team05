import { useState } from 'react'
import React from 'react';
import { TextField, Button, Box, Container } from '@mui/material';
const AddAdminForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const checkUniqueUsername = async (username) => {
    try {
      const response = await fetch('/checkUsername', {
        method: 'POST',
        body: JSON.stringify({ username }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.isUnique;
      } else {
        console.error('Error checking username uniqueness');
        return false; // Assume not unique in case of an error
      }
    } catch (error) {
      console.error('Network error:', error);
      return false; // Assume not unique in case of a network error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admin = { username, password };

    console.log(admin)

    const isUsernameUnique = await checkUniqueUsername(username);

    if (!isUsernameUnique) {
      alert('Username must be unique.'); // Provide feedback that the username is not unique
      return;
    }

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
      setUsername("");
      setPassword("");
      console.log(json.message);
      alert(json.message);
    }
  };

  return (
    
    <Container
    component="main"
    maxWidth="xs"
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}
  >
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 20, marginLeft: 50, width: '50%' }}
          sx={{
            color: 'white',
            backgroundColor: '#25A18E',
            '&:hover': {
              backgroundColor: '#20756c',
            },
          }}
        >
          Add
        </Button>
      </form>
    </Box>
  </Container>
);
};

export default AddAdminForm;
