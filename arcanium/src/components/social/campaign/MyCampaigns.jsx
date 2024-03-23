import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';

const MyCampaigns = ({ userId }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMyCampaigns = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/api/campaigns/my-campaigns/${userId}`);
                setCampaigns(response.data);
            } catch (error) {
                console.error('Failed to fetch campaigns:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchMyCampaigns();
    }, [userId]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <List>
            {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                    <ListItem key={campaign.id}>
                        <ListItemText primary={campaign.name} secondary={campaign.description} />
                    </ListItem>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No campaigns found" />
                </ListItem>
            )}
        </List>
    );
};

export default MyCampaigns;
