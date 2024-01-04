import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import * as FileSaver from 'file-saver'; // Import FileSaver
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
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
import Box from "@mui/material/Box";
import Header from "./Header";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function UploadMedicalHistory() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const id = '657478ea7e2da3704afb8789';

  useEffect(() => {
    getUploadedFiles(); // Fetch uploaded files when the component mounts
  }, []);

  const getUploadedFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getUploaded`,{
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch uploaded files');
      }
      const data = await response.json();
      if (data && data.fileNames) {
        setUploadedFiles(data.fileNames);
      }
    } catch (error) {
      console.error('Error fetching uploaded files:', error);
      toast.error('Failed to fetch uploaded files. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadDocument = async (file) => {
    try {
      const formData = new FormData();
      formData.append('document', selectedFile);
  
      await fetch(`http://localhost:8000/upload-document`, {
        method: "POST",
        body: formData,credentials: 'include'
      });

      await getUploadedFiles();
  
      // Handle success, e.g., show a success toast
      toast.success('Document uploaded successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error({ message: error.message });
      // Handle error, e.g., show an error toast
      toast.error('Failed to upload document. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const removeDocument = async (documentId) => {
    try {
      await fetch(`http://localhost:8000/remove-document/${documentId}`, {
        method: "delete",
        credentials:'include'
      });

      await getUploadedFiles();
  
      // Handle success, e.g., show a success toast
      toast.success('Document removed successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error removing document:', error);
      // Handle error, e.g., show an error toast
      toast.error('Failed to remove document. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const viewDocument = (filePath, fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
  
    if (['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      // For images: Open in a new tab
      window.open(filePath, '_blank');
    } else if (fileExtension === 'pdf') {
      fetchAndDownloadPDF(filePath, fileName);
    } else {
      // Handle other file types or display a message for unsupported formats
      console.log('File format not supported for preview/download.');
      // Display a message or handle differently for unsupported file types
    }
  };
  
  const fetchAndDownloadPDF = async (filePath, fileName) => {
    try {
      const encodedFilePath = encodeURIComponent(filePath);
      const encodedFileName = encodeURIComponent(fileName);
      const response = await fetch(`http://localhost:8000/serveFiles/${id}/${encodedFilePath}/${encodedFileName}`);
      const fileBlob = await response.blob();
      // Use FileSaver or any other method to save the blob as a file
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };
  
  return (
    <div className="UploadMedicalHistory">
    <Header/>
      <h2>My Medical History</h2>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={uploadDocument}>Upload</Button>
      <br/><br/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">File Name</StyledTableCell>
              <StyledTableCell align="center">File Path</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file, index) => (
                <TableRow
                  hover
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#f5f5f5",
                      width: "100%",
                    },
                  }}
                  key={file._id}
                >
                  <TableCell align="center">{file.name}</TableCell>
                  <TableCell align="center">{file.path}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => removeDocument(file._id)}>Remove</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => viewDocument(file.path, file.name)}>View</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No files uploaded yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UploadMedicalHistory;
