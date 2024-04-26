import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import UserProfile from '../UserProfile';
import CustomAlert from '../CustomAlert'; 
import config from '../../../config';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });

  // Function to fetch users
  const fetchUsers = async (query = '') => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/search?query=${query}`);
      const users = response.data.users || [];
      setResults(users);
      setAlert({ open: false });
    } catch (error) {
      console.error('Error fetching users:', error);
      setResults([]);
      setAlert({ open: true, message: 'Failed to fetch users.', severity: 'error' });
    }
  };

  // Use useEffect to fetch all users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    fetchUsers(searchTerm);
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Search Users"
          value={searchTerm}
          fullWidth
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 1 }}>
          Search
        </Button>
      </Paper>
      <CustomAlert open={alert.open} handleClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
      <Grid container spacing={2} justifyContent="center">
        {results.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <UserProfile userData={user} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserSearch;
