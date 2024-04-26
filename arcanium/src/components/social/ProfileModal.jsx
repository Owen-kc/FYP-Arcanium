import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { motion } from 'framer-motion';

// simple user profile modal to set username
const SimpleModal = ({ open, onClose, onAcknowledge, user }) => {
  return (
    <Dialog open={open} onClose={onClose}>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={user.picture} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h2>{user.name}</h2>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onAcknowledge} variant="contained" color="primary">
          Acknowledge
        </Button>
      </DialogActions>
      </motion.div>
    </Dialog>
  );
};

export default SimpleModal;
