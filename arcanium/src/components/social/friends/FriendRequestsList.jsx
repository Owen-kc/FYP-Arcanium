import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const FriendRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth0();

  useEffect(() => {
    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/friends/incoming-requests/${user.sub}`);
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
            setError('Failed to load friend requests.');
        } finally {
            setLoading(false);
        }
    };

    if (user?.sub) {
        fetchRequests();
    }
}, [user?.sub]);

  const handleResponse = async (requestId, action) => {
    try {
      await axios.post(`/api/friends/${action}-request`, { requestId });
      setRequests(requests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error(`Error ${action}ing friend request:`, error);
      alert(`Failed to ${action} friend request.`);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <List>
      {requests.length > 0 ? requests.map((request) => (
        <ListItem key={request.id}>
          <ListItemText primary={request.senderName} />
          <Button onClick={() => handleResponse(request.id, 'accept')}>Accept</Button>
          <Button onClick={() => handleResponse(request.id, 'reject')}>Reject</Button>
        </ListItem>
      )) : <p>No friend requests.</p>}
    </List>
  );
};

export default FriendRequestsList;
