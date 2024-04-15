import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserDetailModal = ({ user, onClose }) => {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        onClose();
        navigate(`/profile/${user.auth0Id}`);
    };

    console.log(user); // check user object structure

    return (
        <Dialog open={Boolean(user)} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{user?.name}'s Profile</DialogTitle>
            <DialogContent>
                {user?.picture && (
                    <img src={user.picture} alt={`${user.name}'s profile`} style={{ width: '100%', marginBottom: '20px' }} />
                )}
                <DialogContentText>Nickname: {user?.nickname}</DialogContentText>
                <DialogContentText>Email: {user?.email}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleViewProfile}>View Full Profile</Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailModal;
