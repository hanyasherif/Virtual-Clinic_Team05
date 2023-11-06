import { Button } from '@mui/material';
import React from 'react';

function Menu() {
  return (
    <div>
      <Button  onClick={() => window.location.href=`http://localhost:3000/ShowPatients`}
      >ShowPatients</Button>
      <Button onClick={() => window.location.href=`http://localhost:3000/Info`}>SearchClient</Button>
      <Button onClick={() => window.location.href=`http://localhost:3000/Meeting`}>ShowMeetings</Button>
      <Button onClick={() => window.location.href=`http://localhost:3000/setting`}>EditMyProfile</Button>

    </div>
  );
}

export default Menu;