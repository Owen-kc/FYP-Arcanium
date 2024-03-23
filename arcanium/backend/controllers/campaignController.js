const UserProfile = require('../models/ProfileSchema');
const Character = require('../models/CharacterSchema'); 
const Campaign = require('../models/campaignSchema');

// Create a new campaign
exports.createCampaign = async (req, res) => {
    const { name, description, creatorAuth0Id } = req.body; 
    try {
        console.log('Creating campaign:', name, description, creatorAuth0Id);
        
        const newCampaign = new Campaign({
            name,
            description,
            creator: creatorAuth0Id, 
            members: [],
            invitations: []
        });
  
        await newCampaign.save();
        console.log('Campaign created successfully:', newCampaign);
        res.status(201).json(newCampaign);
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).send('Server error');
    }
};

exports.inviteToCampaign = async (req, res) => {
    const { campaignId, friendAuth0Ids } = req.body;
  
    try {
        console.log('Inviting users to campaign:', campaignId, friendAuth0Ids);
        
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ msg: 'Campaign not found.' });
        }

        // Directly add Auth0 IDs to the campaign's invitations
        campaign.invitations = [...new Set([...campaign.invitations, ...friendAuth0Ids])];
        await campaign.save();
  
        console.log('Users invited successfully to campaign:', campaignId);
        res.json({ msg: 'Users invited successfully.', campaign });
    } catch (error) {
        console.error('Error inviting users to campaign:', error);
        res.status(500).send('Server error');
    }
};

exports.getMyCampaigns = async (req, res) => {
    try {
        const userAuth0Id = req.params.userId; 
        const campaigns = await Campaign.find({
            $or: [
                { creator: userAuth0Id },
                { 'members.user': userAuth0Id },
                { invitations: userAuth0Id }
            ]
        });

        console.log('Campaigns for user:', userAuth0Id, campaigns);
        res.json(campaigns);
    } catch (error) {
        console.error('Error fetching campaigns for user:', userAuth0Id, error);
        res.status(500).send('Server error');
    }
};


exports.fetchInvitationsForUser = async (req, res) => {
    const userAuth0Id = req.params.userId;

    try {
        const invitedCampaigns = await Campaign.find({ invitations: userAuth0Id }).lean();

        console.log("Fetched invited campaigns for user:", userAuth0Id, invitedCampaigns);
        res.json(invitedCampaigns);
    } catch (error) {
        console.error('Error fetching invited campaigns for user:', userAuth0Id, error);
        res.status(500).send('Server error');
    }
};

exports.acceptInvitation = async (req, res) => {
    const { campaignId, userAuth0Id, characterId } = req.body;
    console.log('A', campaignId);
    try {
        console.log('Accepting invitation for user:', userAuth0Id, 'to campaign:', campaignId);
        
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ msg: 'Campaign not found.' });
        }

        // Ensure the user is invited
        if (!campaign.invitations.includes(userAuth0Id)) {
            return res.status(400).json({ msg: 'No invitation found for this user.' });
        }

        // Remove user's Auth0 ID from invitations
        campaign.invitations = campaign.invitations.filter(inviteeAuth0Id => inviteeAuth0Id !== userAuth0Id);

        // Find user's profile ObjectId
        const userProfile = await UserProfile.findOne({ auth0Id: userAuth0Id });
        if (!userProfile) {
            return res.status(404).json({ msg: 'User profile not found.' });
        }

        // Add user to members
        campaign.members.push({ user: userProfile._id, character: characterId });

        await campaign.save();
  
        console.log('Invitation accepted successfully for user:', userAuth0Id);
        res.json({ msg: 'Invitation accepted successfully.', campaign });
    } catch (error) {
        console.error('Error accepting campaign invitation:', error);
        res.status(500).send('Server error');
    }
};
