import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CustomAlert from '../CustomAlert';  
import config from '../../../config';

const FriendRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const { user } = useAuth0();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.apiUrl}/api/friends/incoming-requests/${user.sub}`);
        setRequests(response.data);
        setAlert(currentAlert => ({ ...currentAlert, open: false }));
      } catch (error) {
        console.error('Error fetching friend requests:', error);
        setAlert({ open: true, message: 'Failed to load friend requests.', severity: 'error' });
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
      await axios.post(`${config.apiUrl}/api/friends/${action}-request`, { requestId });
      setRequests(requests.filter(request => request.id !== requestId));
      setAlert({ open: true, message: `Friend request ${action === 'accept' ? 'accepted' : 'rejected'}.`, severity: 'success' });
    } catch (error) {
      console.error(`Error ${action}ing friend request:`, error);
      setAlert({ open: true, message: `Failed to ${action} friend request.`, severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box width="100%" maxWidth={600}>
        <CustomAlert open={alert.open} handleClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
        <AnimatePresence>
          {requests.length > 0 ? requests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="outlined" sx={{
                display: 'flex',
                mb: 2,
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: 3,
                padding: '16px',
                backgroundColor: 'rgba(52,58,64,255)',
                borderRadius: '16px',
                '&:hover': {
                  boxShadow: 6,
                },
                color: 'white',
                '.MuiButton-contained': {
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#138496',
                  },
                },
                '.MuiButton-outlined': {
                  borderColor: '#f50057',
                  color: '#f50057',
                  '&:hover': {
                    borderColor: '#c51162',
                  },
                }
              }}>
                <CardMedia
                  component="img"
                  sx={{ width: 90, height: 90, borderRadius: '50%', mr: 2 }}
                  image={request.senderPicture}
                  alt={`${request.senderName}'s profile`}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                  <Typography variant="h6">{request.senderName}</Typography>
                  <Typography variant="body2" color="textSecondary">{request.senderNickname}</Typography>
                  <Box mt={1} display="flex" justifyContent="space-between">
                    <Button variant="contained" onClick={() => handleResponse(request.id, 'accept')}>Accept</Button>
                    <Button variant="outlined" color="error" onClick={() => handleResponse(request.id, 'reject')}>Reject</Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          )) : <Typography variant="body1" textAlign="center">No friend requests.</Typography>}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default FriendRequestsList;
