import React, { useEffect, useState } from "react";
import axios from "axios";

const DocProfile = () => {

    const params = new URLSearchParams(window.location.search);
    const doctorId = params.get('doctorId');

  const [doctor, setDoctor] = useState({});
  console.log("eshtaghalyyyyyyyyyy");
  console.log(doctorId);

//   useEffect(() => {
    const fetchDoctorData = async () => {
          await axios.get(`http://localhost:8000/getDoctorInfo?doctorId=${doctorId}`).then((res) => {
            const docData = res.data
            setDoctor(docData)
            // console.log(doctor)
          }).catch(err=>{
            console.log(err.message)
           });
    };
  
    fetchDoctorData();

  return (
    <div className="doctor-profile">
      <h2>{doctor.name}</h2>
      {/* <img src={doctor.profilePicture} alt="Doctor" /> */}
      <p>Email: {doctor.email}</p>
      <p>Speciality: {doctor.docSpeciality}</p>
      <p>Education: {doctor.educationalBackground}</p>
      <p>Date of Birth: {doctor.dateOfBirth}</p>
      <p>Hourly Rate: ${doctor.hourlyRate}</p>
      <p>Affiliation: {doctor.affiliation}</p>
    </div>
  );
};

export default DocProfile;
