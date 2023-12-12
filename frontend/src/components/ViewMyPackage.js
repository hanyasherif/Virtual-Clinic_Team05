import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const ViewMyPackage = () => {
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patId = searchParams.get('patId');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/viewMyPackage?patId='+patId);
        setPackageData(response.data);
      } catch (error) {
        console.error('Error fetching package data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancel = async () => {
    try {
      await axios.put('/cancelPackage?patId='+patId); // Adjust the URL as needed
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
    <div>
      <h2>My Package Details</h2>
      <p>Status: {status}</p>
      
      {status === 'subscribed' && (
        <>
          <p>Package Name : {details.name}</p>
          <p>Start Date: {startDate}</p>
          <p>Renewal Date: {endDate}</p>
          <p>Package DoctorDiscount : {details.doctorDiscount}</p>
          <p>Package PharmacyDiscount : {details.pharmacyDiscount}</p>
          <p>Package FamMemDiscount : {details.famMemDiscount}</p>
          <button onClick={handleCancel}>Cancel Package</button>
        </>
      )}

      {status === 'cancelled' && (
        <>
          <p>Package Name : {details.name}</p>
          <p>Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
          <p>Package DoctorDiscount : {details.doctorDiscount}</p>
          <p>Package PharmacyDiscount : {details.pharmacyDiscount}</p>
          <p>Package FamMemDiscount : {details.famMemDiscount}</p>
        </>
      )}

      {(status === 'subscribed' || status === 'cancelled') && (
        <>
          <h3>Family Members Subscribed</h3>
          <ul>
            {familyMembers.map((member, index) => (
              <li key={index}>{member.name} - Username: {member.username}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ViewMyPackage;
