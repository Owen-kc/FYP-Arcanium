import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import CampaignInvitations from './CampaignInvitations';
import MyCampaigns from './MyCampaigns';
import CreateCampaignForm from './CreateCampaignForm';
import InviteFriendsToCampaign from './InviteFriendsToCampaign';

const CampaignsPage = ({ userId }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [newCampaignId, setNewCampaignId] = useState(null);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        if (newValue !== 2) {
            setNewCampaignId(null);
        }
    };

    const onCampaignCreated = (campaignId) => {
        setNewCampaignId(campaignId);
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
        </Container>
    );
};

export default CampaignsPage;
