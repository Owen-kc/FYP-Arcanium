import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FriendRequestsList from './FriendRequestsList';
import FriendsList from './FriendsList';
import UserSearch from './UserSearch';

const FriendsPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const MotionTabPanel = ({ children, isSelected }) => (
    <AnimatePresence mode="wait">
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          style={{ margin: '0 auto' }} 
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      mt: 4, 
    }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="Friends page tabs"
        sx={{
          '.MuiTabs-indicator': {
            backgroundColor: 'primary.main', 
          }
        }}
        centered 
      >
        <Tab label="My Friends" />
        <Tab label="Add Friends" />
        <Tab label="Friend Requests" />
      </Tabs>
      {selectedTab === 0 && (
        <MotionTabPanel isSelected={selectedTab === 0}>
          <FriendsList />
        </MotionTabPanel>
      )}
      {selectedTab === 1 && (
        <MotionTabPanel isSelected={selectedTab === 1}>
          <UserSearch />
        </MotionTabPanel>
      )}
      {selectedTab === 2 && (
        <MotionTabPanel isSelected={selectedTab === 2}>
          <FriendRequestsList />
        </MotionTabPanel>
      )}
    </Box>
  );
};

export default FriendsPage;
