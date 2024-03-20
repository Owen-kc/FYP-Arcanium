import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailModal from '../UserDetailModal'; 

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null); // State to hold the selected friend's details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth0();

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

  // Function to handle opening the modal with the friend's details - to update
  const handleOpenModal = (friendInfo) => {
    setSelectedFriend(friendInfo); 
  };

  const handleCloseModal = () => {
    setSelectedFriend(null); 
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <List>
        {friends.length > 0 ? friends.map((friend) => {
          const friendInfo = friend.requester.auth0Id === user.sub ? friend.recipient : friend.requester;
          return (
            <ListItem key={friend._id} button onClick={() => handleOpenModal(friendInfo)}>
              <ListItemText primary={friendInfo.name} secondary={friendInfo.nickname} />
            </ListItem>
          );
        }) : <p>You have no friends added.</p>}
      </List>
      {selectedFriend && (
        <UserDetailModal user={selectedFriend} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default FriendsList;
