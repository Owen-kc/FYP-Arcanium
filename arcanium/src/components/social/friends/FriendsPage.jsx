import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { motion } from 'framer-motion';
import FriendRequestsList from './FriendRequestsList';
import FriendsList from './FriendsList';
import UserSearch from './UserSearch';

const FriendsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange} aria-label="Friends page tabs">
          <Tab label="My Friends" />
          <Tab label="Add Friends" />
          <Tab label="Friend Requests" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <FriendsList />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <UserSearch />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <FriendRequestsList />
      </TabPanel>
    </Box>
  );
};

export default FriendsPage;
