import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { List, CircularProgress, Typography, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import CustomAlert from '../CustomAlert'; 
import config from '../../../config';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const { user } = useAuth0();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user?.sub) return;

      setLoading(true);
      try {
        const response = await axios.get(`${config.apiUrl}/api/friends/list-friends/${user.sub}`);
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
        setError('Failed to load friends.');
        setAlert({ open: true, message: 'Failed to load friends.', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user?.sub]);

  const navigateToFriendProfile = (auth0Id) => {
    console.log(auth0Id)
    navigate(`/friend-profile/${auth0Id}`); 
  };

  const openChat = (friendId) => {
    if (user?.sub && friendId && user.sub !== friendId) { 
      // Log to check the IDs being passed
      console.log(`Navigating to chat with User ID: ${user.sub} and Friend ID: ${friendId}`);
      
      navigate(`/chat?user=${user.sub}&friend=${friendId}`);
    } else {
      console.error("Error: Trying to open chat with oneself or missing IDs.");
      setAlert({ open: true, message: 'Error: Trying to open chat with oneself or missing IDs.', severity: 'error' });
    }
  };
  

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1" color="error">{error}</Typography>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box width="100%" maxWidth={600}>
        <CustomAlert open={alert.open} handleClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
        <AnimatePresence>
          {friends.length > 0 ? (
            <List>
              {friends.map((friend) => {
                const friendInfo = friend.requester.auth0Id === user.sub ? friend.recipient : friend.requester;
                return (
                  <motion.div
                    key={friend._id}
                    variants={{
                      hidden: { scale: 0.95, opacity: 0 },
                      visible: { scale: 1, opacity: 1 }
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    layout // Enable layout animation
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
                      }
                    }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 90, height: 90, borderRadius: '50%', mr: 2 }}
                        image={friendInfo.picture}
                        alt={`${friendInfo.name}'s profile`}
                      />
                      <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                        <Typography variant="h6">{friendInfo.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{friendInfo.nickname}</Typography>
                        <Box mt={1} display="flex" justifyContent="space-between">
                          <Button variant="contained" color="primary" onClick={() => openChat(friendInfo.auth0Id)}>Chat</Button>
                          <Button variant="contained" color="secondary" onClick={(e) => {e.stopPropagation(); navigateToFriendProfile(friendInfo.auth0Id);}}>Profile</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </List>
          ) : (
            <Typography variant="body1" textAlign="center">You have no friends added.</Typography>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default FriendsList;
