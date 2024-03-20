// friendController.js
const Friendship = require('../models/FriendSchema');
const UserProfile = require('../models/ProfileSchema');

exports.sendFriendRequest = async (req, res) => {
    const { requesterAuth0Id, recipientAuth0Id } = req.body;

    // Validate presence of requester and recipient Auth0 IDs
    if (!requesterAuth0Id || !recipientAuth0Id) {
        return res.status(400).json({ msg: "Both requester and recipient IDs are required." });
    }

    try {
        // Find the requester and recipient profiles
        const requesterProfile = await UserProfile.findOne({ auth0Id: requesterAuth0Id });
        const recipientProfile = await UserProfile.findOne({ auth0Id: recipientAuth0Id });

        if (!requesterProfile || !recipientProfile) {
            return res.status(404).json({ msg: "Requester or recipient profile not found." });
        }

        // Check for self requesting
        if (requesterProfile._id.toString() === recipientProfile._id.toString()) {
            return res.status(400).json({ msg: "You cannot send a friend request to yourself." });
        }

        // Check for existing friend request between two users
        const existingRequest = await Friendship.findOne({
            $or: [
                { requester: requesterProfile._id, recipient: recipientProfile._id },
                { requester: recipientProfile._id, recipient: requesterProfile._id }
            ]
        });

        // Prevent duplicate friend requests
        if (existingRequest) {
            return res.status(400).json({ msg: 'A friend request already exists between these users.' });
        }

        // Proceed to create the friend request
        const newFriendRequest = new Friendship({
            requester: requesterProfile._id, // MongoDB ObjectId for the requester
            recipient: recipientProfile._id, // MongoDB ObjectId for the recipient
            status: 'pending',
        });

        await newFriendRequest.save();
        res.status(201).json({ msg: 'Friend request sent successfully.' });
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).send('Server error');
    }
};

exports.getIncomingFriendRequests = async (req, res) => {
    const { auth0Id } = req.params; 

    try {
        const recipientProfile = await UserProfile.findOne({ auth0Id: auth0Id });

        if (!recipientProfile) {
            return res.status(404).json({ msg: "Recipient profile not found." });
        }

        // Find incoming friend requests where the recipient is the UserProfile ObjectId
        const incomingRequests = await Friendship.find({
            recipient: recipientProfile._id,
            status: 'pending'
        }).populate('requester', 'name nickname auth0Id'); //updt

        res.json(incomingRequests.map(request => ({
          id: request._id,
          senderName: request.requester.name, 
          senderAuth0Id: request.requester.auth0Id 
        })));
    } catch (error) {
        console.error('Error fetching incoming friend requests:', error);
        res.status(500).send('Server error');
    }
};

// Accept a Friend Request
exports.acceptFriendRequest = async (req, res) => {
    const { requestId } = req.body;

    try {
        const request = await Friendship.findByIdAndUpdate(requestId, { status: 'accepted' }, { new: true });
        if (!request) {
            return res.status(404).json({ msg: 'Friend request not found.' });
        }
        res.json({ msg: 'Friend request accepted.', request });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Reject a Friend Request
exports.rejectFriendRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        const request = await Friendship.findByIdAndUpdate(requestId, { status: 'rejected' }, { new: true });
        if (!request) {
            return res.status(404).json({ msg: 'Friend request not found.' });
        }
        res.json({ msg: 'Friend request rejected.', request });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// List Friends
exports.listFriends = async (req, res) => {
    const { auth0Id } = req.params; 

    try {
        const userProfile = await UserProfile.findOne({ auth0Id: auth0Id });
        if (!userProfile) {
            return res.status(404).json({ msg: "User profile not found." });
        }

        // Then find the friendships
        const friends = await Friendship.find({
            $or: [{ requester: userProfile._id }, { recipient: userProfile._id }],
            status: 'accepted'
        }).populate('requester recipient', 'name nickname auth0Id'); // Adjust fields as needed

        res.json(friends);
    } catch (error) {
        console.error('Error listing friends:', error);
        res.status(500).send('Server error');
    }
};


// End a Friendship
exports.endFriendship = async (req, res) => {
    const { friendshipId } = req.body;
    try {
        await Friendship.findByIdAndDelete(friendshipId);
        res.json({ msg: 'Friendship ended successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
