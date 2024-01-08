import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';



export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={() => { window.location.href = '/patient'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Dashboard"/>
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/addFamilyMember'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Add Family Member" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/FilterAppointmentsPatient'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <DateRangeIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Filter Appointments" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/uploadMedicalHistory'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <CloudUploadIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Upload Documents" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/docList'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <FilterListIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Search & Filter Docs" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/patient/prescrptions'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Search Prescriptions" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Personal Details
    </ListSubheader>   
    <ListItemButton onClick={() => { window.location.href = '/ChangeMyPassword'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <LockIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Change Password" />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);