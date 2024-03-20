import React, { useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import FriendRequestButton from './FriendRequestButton'; 
import UserProfile from '../UserProfile'; 

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]); // Ensure this is always an array

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${searchTerm}`);
      const users = response.data.users || []; 
      setResults(users);
      console.log(users); 
    } catch (error) {
      console.error('Error searching users:', error);
      setResults([]); 
    }
  };
  

  return (
    <div>
      <TextField
        label="Search Users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
      />
      <Button onClick={handleSearch}>Search</Button>
      <List>
  {results.map((user) => (
    <ListItem key={user._id}>
      <UserProfile userData={user} />
    </ListItem>
  ))}
</List>
    </div>
  );
};

export default UserSearch;
