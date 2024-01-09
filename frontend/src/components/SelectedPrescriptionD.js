import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectedPrescriptionD = () => {
  const params = new URLSearchParams(window.location.search);
  const prescriptionId = params.get('prescriptionId');
  const [prescription, setPrescription] = useState(null);
  const [selectedMedicineIndex, setSelectedMedicineIndex] = useState(0);
  const [modifiedDosage, setModifiedDosage] = useState('');
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getPrescription?Id=${prescriptionId}`, { withCredentials: true });
        const presData = response.data;
        setPrescription(presData);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPrescriptionData();

  }, [prescriptionId]);
  const fetchPrescriptionData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/getPrescription?Id=${prescriptionId}`, { withCredentials: true });
      const presData = response.data;
      setPrescription(presData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleMedicineChange = (index) => {
    setSelectedMedicineIndex(index);
  };

  const handleDosageChange = (e) => {
    setModifiedDosage(e.target.value);
  };
  const handleMedicineChange2 = (e) => {
    setMedicine(e.target.value);
  };
  
  const handleDosageChange2 = (e) => { 
    setDosage(e.target.value);
  };
  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const handleUpdate = async () => {
    try {
        console.log("thiss"  , selectedMedicineIndex);

      await axios.post(`http://localhost:8000/modifyDosage/${prescriptionId}`, {
      index: selectedMedicineIndex,
      modifiedDosage,
      }, { withCredentials: true });


      // Refresh prescription data after the update
    //  fetchPrescriptionData();
    } catch (error) {
      console.log('Error updating prescription:', error.message);
    }
  };
  

  if (!prescription) {
    return <div>Loading...</div>; // Add a loading indicator while fetching data
  }
  const handleDeleteMedicine = async () => {
    try {
        console.log("thiss"  , selectedMedicineIndex);

      await axios.post(`http://localhost:8000/deleteMedicine/${prescriptionId}`, {
      index: selectedMedicineIndex,
      }, { withCredentials: true });


      // Refresh prescription data after the update
      fetchPrescriptionData();
    } catch (error) {
      console.log('Error updating prescription:', error.message);
    }
  };
  const handleUpdateInstruction = async () => {
    try {
      await axios.post(`http://localhost:8000/modifyInstruction/${prescriptionId}`, {
        instruction,
      }, { withCredentials: true });

      // Refresh prescription data after the update
      fetchPrescriptionData();
    } catch (error) {
      console.log('Error updating prescription instruction:', error.message);
    }
  };
  const handleAddMedicine = async ()  => { 
    try {
        console.log("thiss"  , selectedMedicineIndex);

      await axios.post(`http://localhost:8000/addMedicine/${prescriptionId}`, {
      medicine,
      dosage,
      }, { withCredentials: true });


      // Refresh prescription data after the update
      fetchPrescriptionData();
    } catch (error) {
      console.log('Error updating prescription:', error.message);
    }
  };
  return (
    <div className="appointment-profile">
      <h1>Prescription</h1>
      <p>Date: {prescription.date}</p>
      <p>Doctor Name: {prescription.doctorName}</p>
      <p>Patient Name: {prescription.patientName}</p>
      
      <p>Status: {prescription.filled ? "Filled" : "Not Filled"}</p>
      <p>Instruction: {prescription.instruction }</p>
      <p>
        Medicines:
        <select
          value={selectedMedicineIndex}
          onChange={(e) => handleMedicineChange(e.target.value)}
        >
          {prescription.medicines.map((medicine, index) => (
            <option key={index} value={index}>
              {medicine}
            </option>
          ))}
        </select>
      </p>
      <p>
        Modify Dosage:
        <input
          type="text"
          value={modifiedDosage}
          onChange={handleDosageChange}
        />
      </p>
      <p>
        <button onClick={handleUpdate}>Modify Dosage</button>
      </p>
      <br />
      <button onClick={handleDeleteMedicine}>Delete Selected Medicine</button>
      <h4>Update Instruction</h4>
      <label htmlFor="instruction">Add Instruction:</label>
      <input
        type="text"
        id="instruction"
        name="instruction"
        value={instruction}
        onChange={handleInstructionChange}
        required
      />
      <br />
      <button onClick={handleUpdateInstruction}>Update Instruction</button>
      <h4>Add More Medicines</h4>
      <label htmlFor="medicine">Medicine:</label>
          <input
            type="text"
            id="medicine"
            name="medicine"
            value={medicine}
            onChange={handleMedicineChange2}
            required
          />
          <br/>
           <label htmlFor="dosage">Dosage:</label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={dosage}
            onChange={handleDosageChange2}
            required
          />
          <br />
          <button onClick={handleAddMedicine}>Add Medicine</button>
        
    </div>
  );
};

export default SelectedPrescriptionD;
