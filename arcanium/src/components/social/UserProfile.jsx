import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import FriendRequestButton from './friends/FriendRequestButton';

const UserProfile = ({ userData }) => {
  const { user } = useAuth0();

  return (
    <motion.Box
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card sx={{ maxWidth: 345, m: 2, bgcolor: 'background.paper' }}>
        <CardMedia
          component="img"
          image={userData.picture}
          alt={`${userData.name}'s profile`}
          sx={{ width: 150, height: 150, borderRadius: '50%', mx: 'auto', mt: 2 }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            {userData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userData.nickname}
          </Typography>
          {user.sub !== userData.auth0Id && (
            <FriendRequestButton recipientAuth0Id={userData.auth0Id} />
          )}
        </CardContent>
      </Card>
    </motion.Box>
  );
};

export default UserProfile;
