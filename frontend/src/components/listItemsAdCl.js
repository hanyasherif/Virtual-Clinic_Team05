import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment'; // Import the icon


export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={() => { window.location.href = '/AdminPage'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Dashboard"/>
    </ListItemButton>
    {/* <ListItemButton onClick={() => { window.location.href = '/addAdminPage'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Add New Admin" />
    </ListItemButton> */}
    <ListItemButton onClick={() => { window.location.href = '/adminAddPackage'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Add/Delete Packages" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/admin/update'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <UpdateIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Update Packages" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/CreateContract'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Create New Contract" />
    </ListItemButton>
    {/* <ListItemButton onClick={() => { window.location.href = '/remove'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Delete Users" />
    </ListItemButton> */}
    <ListItemButton onClick={() => { window.location.href = '/ViewReAdminDoc'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="View Doc Requests" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Personal Details
    </ListSubheader>   
    <ListItemButton onClick={() => { window.location.href = '/ChangePassAdmin'; }}>
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