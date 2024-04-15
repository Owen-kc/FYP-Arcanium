import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import axios from 'axios';

const InviteFriendsToCampaign = ({ userId, campaignId }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`/api/friends/list-friends/${userId}`);
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
            await axios.post('/api/campaigns/invite', {
                campaignId,
                friendAuth0Ids,
            });
            alert("Friends invited successfully.");
        } catch (error) {
            console.error('Error inviting friends:', error);
            alert("Failed to invite friends.");
        }
    };


    const toggleFriendSelection = (friendId) => {
        setSelectedFriends(prev => 
            prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]
        );
    };

    return (
        <Box>
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
