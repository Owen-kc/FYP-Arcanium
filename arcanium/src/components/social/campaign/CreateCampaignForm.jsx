import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';

const CreateCampaignForm = ({ userId, onCampaignCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); 

        try {
            const response = await axios.post('/api/campaigns/create', {
                name,
                description,
                creatorAuth0Id: userId
            });
            if (response.data && response.data._id) {
                onCampaignCreated(response.data._id);
            } else {
                setError('Failed to get campaign ID after creation.');
            }
        } catch (error) {
            console.error('Failed to create campaign', error);
            setError('Failed to create campaign.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TextField
                margin="normal"
                required
                fullWidth
                label="Campaign Name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Create Campaign
            </Button>
        </Box>
    );
};

export default CreateCampaignForm;
