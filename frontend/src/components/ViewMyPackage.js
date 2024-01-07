import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Button from '@mui/material/Button';

const ViewMyPackage = () => {
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patId = searchParams.get('patId');

  function preventDefault(event) {
    event.preventDefault();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/viewMyPackage",{withCredentials:true});
        setPackageData(response.data);
      } catch (error) {
        alert('An error occurred: '+ error.response.data.error);
        console.error('Error fetching package data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancel = async () => {
    try {
      await axios.put("/cancelPackage" ,{withCredentials:true}); // Adjust the URL as needed
      console.log('Package cancelled successfully');
      const response = await axios.get('/viewMyPackage?patId='+patId);
        setPackageData(response.data);
      // You might want to refresh the package data or handle UI changes here
    } catch (error) {
      console.error('Error cancelling package:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!packageData) {
    return <div>No package subscribed.</div>;
  }

  const { status, details, familyMembers , startDate, endDate } = packageData;

  return (
<React.Fragment>
  <Title style={{ color: '#25A18E', fontSize: 23 }}>My Package Details</Title>
  <Typography component="p" variant="h6" fontSize={17}>
    Status: {status}
  </Typography>
  
  {status === 'subscribed' && (
    <>
      <Typography component="p" variant="subtitle1">
        Package Name: {details.name}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Start Date: {startDate}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Renewal Date: {endDate}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Package Doctor Discount: {details.doctorDiscount}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Package Pharmacy Discount: {details.pharmacyDiscount}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Package FamMem Discount: {details.famMemDiscount}
      </Typography>
      <Button variant="contained" style={{ backgroundColor: '#25A18E', color: 'white' }} onClick={handleCancel}>
        Cancel Package
      </Button>
    </>
  )}

  {status === 'cancelled' && (
    <>
      <Typography component="p" variant="subtitle1">
        Package Name: {details.name}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Start Date: {startDate}
      </Typography>
      <Typography component="p" variant="subtitle1">
        End Date: {endDate}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Package Doctor Discount: {details.doctorDiscount}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Package Pharmacy Discount: {details.pharmacyDiscount}
      </Typography>
      <Typography component="p" variant="subtitle1">
        Package FamMem Discount: {details.famMemDiscount}
      </Typography>
    </>
  )}

  {(status === 'subscribed' || status === 'cancelled') && (
    <>
      <Typography component="h3" variant="subtitle1">
        Family Members Subscribed
      </Typography>
      <ul>
        {familyMembers.map((member, index) => (
          <Typography key={index} component="li" variant="subtitle1">
            {member.name} - Username: {member.username}
          </Typography>
        ))}
      </ul>
    </>
  )}
</React.Fragment>

  );
};

export default ViewMyPackage;
