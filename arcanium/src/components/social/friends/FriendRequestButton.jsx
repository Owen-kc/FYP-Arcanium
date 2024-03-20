import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const FriendRequestButton = ({ recipientAuth0Id }) => {
  const [loading, setLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const { user } = useAuth0();
  
  const sendFriendRequest = async () => {
    if (!user?.sub || !recipientAuth0Id) {
      console.error("Missing requester or recipient ID.");
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/friends/send-request', {
        requesterAuth0Id: user?.sub,
        recipientAuth0Id: recipientAuth0Id,
      });
      setRequestSent(true);
      alert('Friend request sent successfully.');
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Failed to send friend request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={sendFriendRequest} disabled={loading || requestSent}>
      {loading ? <CircularProgress size={24} /> : 'Add Friend'}
    </Button>
  );
};

export default FriendRequestButton;
