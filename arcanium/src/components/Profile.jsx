import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { DialogContent, DialogTitle, Card, CardContent, Avatar, Typography, Table, TableBody, TableCell, TableRow, Box } from '@mui/material';


// Profile component, displays simple user profile information
const Profile = () => {
    const { user } = useAuth0();

    // Prepare user data for display
    const userData = Object.entries(user).filter(([key, value]) => key !== 'picture' && typeof value !== 'object');

    // information to display, got from auth0 user object
    return (
        <>
            <DialogTitle>User Profile</DialogTitle>
            <DialogContent>
                <Card sx={{ maxWidth: 345, mx: 'auto', textAlign: 'center' }}>
                    <Box sx={{ p: 2 }}>
                        {user?.picture && (
                            <Avatar
                                src={user.picture}
                                alt={user?.name}
                                sx={{ width: 100, height: 100, margin: 'auto' }}
                            />
                        )}
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">      
                            {user?.name}
                        </Typography>
                        <Table>
                            <TableBody>
                                {userData.map(([key, value], index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="subtitle2">
                                                {key.replace(/_/g, ' ')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2">
                                                {value}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </DialogContent>
        </>
    );
};

export default Profile;
