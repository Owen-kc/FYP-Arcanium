// Profile.jsx
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';

const Profile = ({ handleClose }) => {
    const { user } = useAuth0();

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
        </>
    );
};

export default Profile;
