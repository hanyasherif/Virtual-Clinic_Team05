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
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import Wallet from './WalletPH';




export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={() => { window.location.href = '/pharmacistPagePh'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <HomeIcon/>
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Home"/>
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/sales'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
      <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Sales report" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/pharmacistPagePh'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary="Upload Documents" />
    </ListItemButton>
    <ListItemButton onClick={() => { window.location.href = '/DashPharmaWallet'; }}>
      <ListItemIcon sx={{ color: '#25A18E' }}>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primaryTypographyProps={{ style: { color: 'black' } }} primary=" My Wallet" />
    </ListItemButton>
    
    

    {/* <ListItemButton onClick={() => { window.location.href = '/uploadMedicalHistory'; }}>
    <ListItemIcon sx={{ color: '#25A18E' }}>
        <ShoppingCartIcon />
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
    </ListItemButton> */}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      {/* Personal Details */}
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