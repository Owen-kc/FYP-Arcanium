import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import CampaignInvitations from './CampaignInvitations';
import MyCampaigns from './MyCampaigns';
import CreateCampaignForm from './CreateCampaignForm';
import InviteFriendsToCampaign from './InviteFriendsToCampaign';
import CustomAlert from '../CustomAlert'; 

const CampaignsPage = ({ userId }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [newCampaignId, setNewCampaignId] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: ''
    });

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        if (newValue !== 2) {
            setNewCampaignId(null);
        }
    };

    const onCampaignCreated = (campaignId) => {
        setNewCampaignId(campaignId);
        setAlert({ open: true, message: 'Campaign created successfully!', severity: 'success' });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const tabStyle = {
        borderBottom: 1, 
        borderColor: 'divider', 
        my: 3
    };

    return (
        <Container maxWidth="md">
            <Box sx={tabStyle}>
                <Tabs 
                    value={selectedTab} 
                    onChange={handleTabChange} 
                    aria-label="campaign tabs" 
                    variant="fullWidth"
                >
                    <Tab label="My Campaigns" />
                    <Tab label="Campaign Invitations" />
                    <Tab label="Create Campaign" />
                </Tabs>
            </Box>
            <motion.div
                key={selectedTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
            >
                {selectedTab === 0 && <MyCampaigns userId={userId} />}
                {selectedTab === 1 && <CampaignInvitations userId={userId} />}
                {selectedTab === 2 && (
                    newCampaignId ? (
                        <InviteFriendsToCampaign userId={userId} campaignId={newCampaignId} />
                    ) : (
                        <CreateCampaignForm 
                            userId={userId}
                            onCampaignCreated={onCampaignCreated}
                        />
                    )
                )}
            </motion.div>
            <CustomAlert open={alert.open} handleClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
        </Container>
    );
};

export default CampaignsPage;
