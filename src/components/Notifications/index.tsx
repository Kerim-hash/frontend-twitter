import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { SocketContext } from '../../Context';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
       
        </div>
      )}
    </>
  );
};

export default Notifications;