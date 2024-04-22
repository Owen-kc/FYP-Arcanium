import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import axios from 'axios';
import CustomAlert from '../CustomAlert'; 
import config from '../../../config';

const InviteFriendsToCampaign = ({ userId, campaignId }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: ''
    });

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`${config.apiUrl}/api/friends/list-friends/${userId}`);
                const formattedFriends = res.data.map(friend => ({
                    id: friend._id,
                    name: friend.requester.auth0Id === userId ? friend.recipient.name : friend.requester.name,
                    auth0Id: friend.requester.auth0Id === userId ? friend.recipient.auth0Id : friend.requester.auth0Id
                }));
                setFriends(formattedFriends);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };
        fetchFriends();
    }, [userId]);

    const handleInvite = async () => {
        try {
            const friendAuth0Ids = selectedFriends.map(friendId => 
                friends.find(friend => friend.id === friendId).auth0Id
            );
            await axios.post('${config.apiUrl}/api/campaigns/invite', {
                campaignId,
                friendAuth0Ids,
            });
            setAlert({ open: true, message: 'Friends invited successfully.', severity: 'success' });
        } catch (error) {
            console.error('Error inviting friends:', error);
            setAlert({ open: true, message: 'Failed to invite friends.', severity: 'error' });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const toggleFriendSelection = (friendId) => {
        setSelectedFriends(prev => 
            prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]
        );
    };

    return (
        <Box>
            <CustomAlert open={alert.open} handleClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
            <FormGroup>
                {friends.map(friend => (
                    <FormControlLabel
                        key={friend.id}
                        control={<Checkbox checked={selectedFriends.includes(friend.id)} onChange={() => toggleFriendSelection(friend.id)} />}
                        label={friend.name}
                    />
                ))}
            </FormGroup>
            <Button onClick={handleInvite}>Invite Selected Friends</Button>
        </Box>
    );
};

export default InviteFriendsToCampaign;
