import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import axios from 'axios'; 

const Profile = ({ handleClose }) => {
    const { user, getAccessTokenSilently } = useAuth0();

    const handleAcknowledge = async () => {
        try {
            const token = await getAccessTokenSilently();
            await axios.post('/api/user/profile', user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleClose();
        } catch (error) {
            console.error('Error saving user profile:', error);
        }
    };

    return (
        <>
            <DialogTitle>User Profile</DialogTitle>
            <DialogContent>
                <article>
                    {user?.picture && <img src={user.picture} alt={user?.name} />}
                    <h2>{user?.name}</h2>
                    <ul>
                        {Object.keys(user).map((objKey, i) => (
                            <li key={i}>{`${objKey}: ${user[objKey]}`}</li>
                        ))}
                    </ul>
                </article>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAcknowledge}>Acknowledge/Accept</Button>
            </DialogActions>
        </>
    );
};

export default Profile;
