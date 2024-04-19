import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import CustomAlert from '../CustomAlert';

const CreateCampaignForm = ({ userId, onCampaignCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: ''
    });

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
                setAlert({ open: true, message: 'Failed to get campaign ID after creation.', severity: 'error' });
            }
        } catch (error) {
            console.error('Failed to create campaign', error);
            setAlert({ open: true, message: 'Failed to create campaign.', severity: 'error' });
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <CustomAlert open={alert.open} handleClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
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
