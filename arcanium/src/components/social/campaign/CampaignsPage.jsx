import React, { useState } from 'react';
import { Box, Tab, Tabs, Modal, Typography, Button, Paper } from '@mui/material';
import CampaignInvitations from './CampaignInvitations'; 
import MyCampaigns from './MyCampaigns'; 
import CreateCampaignForm from './CreateCampaignForm'; 
import InviteFriendsToCampaign from './InviteFriendsToCampaign'; 

const CampaignsPage = ({ userId }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [newCampaignId, setNewCampaignId] = useState(null);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleOpenCreateModal = () => setOpenCreateModal(true);
    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
        setNewCampaignId(null); 
    };

    // Modal style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none'
    };

    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="campaign tabs">
                    <Tab label="My Campaigns" />
                    <Tab label="Campaign Invitations" />
                    <Tab label="Create Campaign" />
                </Tabs>
            </Box>
            {selectedTab === 0 && <MyCampaigns userId={userId} />}
            {selectedTab === 1 && <CampaignInvitations userId={userId} />}
            {selectedTab === 2 && (
                <Box sx={{ p: 3 }}>
                    <Button variant="outlined" onClick={handleOpenCreateModal}>
                        Create New Campaign
                    </Button>
                </Box>
            )}
            <Modal
                open={openCreateModal}
                onClose={handleCloseCreateModal}
                aria-labelledby="create-campaign-modal-title"
                aria-describedby="create-campaign-modal-description"
            >
                <Paper sx={style}>
                    {newCampaignId ? (
                        <InviteFriendsToCampaign userId={userId} campaignId={newCampaignId} />
                    ) : (
                        <CreateCampaignForm 
                            userId={userId}
                            onCampaignCreated={(campaignId) => {
                                setNewCampaignId(campaignId);
                            }}
                        />
                    )}
                </Paper>
            </Modal>
        </Box>
    );
};

export default CampaignsPage;
