import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SimpleModal = ({ open, onClose, onAcknowledge, user }) => {
  return (
    <Dialog open={open} onClose={onClose}>
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
    </Dialog>
  );
};

export default SimpleModal;
