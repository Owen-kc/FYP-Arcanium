const express = require('express');
const campaignController = require('../controllers/campaignController'); 
const router = express.Router();

// Route to create a new campaign
router.post('/create', campaignController.createCampaign);

// Route to invite users to a campaign
router.post('/invite', campaignController.inviteToCampaign);

// Route to accept an invitation to a campaign
router.post('/accept-invitation', campaignController.acceptInvitation);

router.get('/my-campaigns/:userId', campaignController.getMyCampaigns);

// to be removed
router.get('/invitations/:userId', campaignController.fetchInvitationsForUser);

// Inside the file where you define your campaignRoutes
router.get('/details/:campaignId', campaignController.getCampaignDetails);



module.exports = router;
