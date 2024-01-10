import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LockIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AlarmIcon from '@mui/icons-material/Alarm';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HealthRecordIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={() => { window.location.href = '/DoctorPage'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Dashboard"/>
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/DocPharmacistsList'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Chat With Pharmacist" />
    </ListItemButton>
    {/* <ListItemButton onClick={() => { window.location.href = '/Info'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Search Patients" />
    </ListItemButton> */}
    <ListItemButton onClick={() => { window.location.href = '/ViewAcceptContract'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="View Contracts" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/DoctorPatientPage'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <HealthRecordIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Patient's Data" />
    </ListItemButton>
    {/* <ListItemButton onClick={() => { window.location.href = '/AddAppointment'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Add Appointment" /> 
    </ListItemButton>*/}
    {/* <ListItemButton onClick={() => { window.location.href = '/AddNewHR'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <HealthRecordIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Add Health Record" />
    </ListItemButton> */}
    <ListItemButton onClick={() => { window.location.href = '/PresDoctor'; }}>
        {/* PresDoctor */}
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="View Prescriptions" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Personal Details
    </ListSubheader>   
    {/* <ListItemButton onClick={() => { window.location.href = '/setting'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <EditIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Edit Profile" />
    </ListItemButton> */}
    <ListItemButton onClick={() => { window.location.href = '/ChangeMyPasswordDoc'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <LockIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Change Password" />
    </ListItemButton>
  </React.Fragment>
);
