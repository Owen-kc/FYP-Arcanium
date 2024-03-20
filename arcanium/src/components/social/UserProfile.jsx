import React from 'react';
import FriendRequestButton from './friends/FriendRequestButton'; 
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = ({ userData }) => {
  const { user } = useAuth0();

  return (
    <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>{userData.name}</h2>
      <img src={userData.picture} alt={`${userData.name}'s profile`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <p>{userData.email}</p>
      <p>Nickname: {userData.nickname}</p>
      {user.sub !== userData.auth0Id && (
        <FriendRequestButton recipientAuth0Id={userData.auth0Id} />
      )}
    </div>
  );
};

export default UserProfile;