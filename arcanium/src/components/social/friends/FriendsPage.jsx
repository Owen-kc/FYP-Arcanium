// FriendsPage.jsx
import React from 'react';
import FriendRequestButton from './FriendRequestButton'; 
import FriendRequestsList from './FriendRequestsList'; 
import FriendsList from './FriendsList'; 
import UserSearch from './UserSearch';

const FriendsPage = () => {
  return (
    <div>
      <h2>Friends</h2>
      <h3>Incoming Friend Requests</h3>
      <FriendRequestsList />
      <h3>My Friends</h3>
      <FriendsList />
      <UserSearch/>
    </div>
  );
};

export default FriendsPage;
