import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import CustomAlert from '../CustomAlert';
import config from '../../../config';


const FriendRequestButton = ({ recipientAuth0Id }) => {
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const { user } = useAuth0();
  const [alert, setAlert] = useState({ open: false, severity: '', message: '' });
  
  const sendFriendRequest = async () => {
    if (!user?.sub || !recipientAuth0Id) {
      console.error("Missing requester or recipient ID.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${config.apiUrl}/api/friends/send-request`, {
        requesterAuth0Id: user?.sub,
        recipientAuth0Id: recipientAuth0Id,
      });
      setRequestSent(true);
      setAlert({ open: true, severity: 'success', message: 'Friend request sent successfully.' });
    } catch (error) {
      console.error('Error sending friend request:', error);
      setAlert({ open: true, severity: 'error', message: 'Failed to send friend request.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={sendFriendRequest} disabled={loading || requestSent}>
        {loading ? <CircularProgress size={24} /> : 'Add Friend'}
      </Button>
      <CustomAlert open={alert.open} handleClose={handleClose} severity={alert.severity} message={alert.message} />
    </>
  );
};

export default FriendRequestButton;
