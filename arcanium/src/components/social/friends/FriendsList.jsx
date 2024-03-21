import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { List, CircularProgress, Typography, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth0();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user?.sub) return;

      setLoading(true);
      try {
        const response = await axios.get(`/api/friends/list-friends/${user.sub}`);
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
        setError('Failed to load friends.');
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
    // Function to handle chat opening
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="body1" color="error">{error}</Typography>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box width="100%" maxWidth={600}>
        <AnimatePresence>
          {friends.length > 0 ? (
            <List>
              {friends.map((friend) => {
                const friendInfo = friend.requester.auth0Id === user.sub ? friend.recipient : friend.requester;
                return (
                  <motion.div
                    key={friend._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card variant="outlined" sx={{ display: 'flex', mb: 1, alignItems: 'center', cursor: 'pointer' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 90, height: 90, borderRadius: '50%' }}
                        image={friendInfo.picture}
                        alt={`${friendInfo.name}'s profile`}
                      />
                      <CardContent onClick={(e) => e.stopPropagation()}>
                        <Typography variant="h6">{friendInfo.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{friendInfo.nickname}</Typography>
                        <Button variant="contained" color="primary" onClick={() => openChat(friendInfo._id)}>Chat</Button>
                        <Button variant="contained" color="secondary" onClick={(e) => {e.stopPropagation(); navigateToFriendProfile(friendInfo.auth0Id);}}>Profile</Button>
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
