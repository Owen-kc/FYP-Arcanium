const express = require('express');
const UserProfile = require('../models/ProfileSchema');
const router = express.Router();

// Function to save or update a user's profile in the database
async function saveUserProfile(req, res) {
    const { auth0Id, name, nickname, picture, profile, email, preferred_username } = req.body;

  try {
    let userProfile = await UserProfile.findOneAndUpdate(
      { auth0Id },
      { name, nickname, picture, profile, email, preferred_username },
      { new: true, upsert: true } 
    );

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Failed to save user profile:', error);
    res.status(500).send('Server error');
  }
}

// fetch prof by auth0id 
router.get('/profile/:auth0Id', async (req, res) => {
  const { auth0Id } = req.params;
  try {
    const userProfile = await UserProfile.findOne({ auth0Id });
    if (!userProfile) {
      return res.status(404).send('Profile not found');
    }
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Server error');
  }
});

router.get('/profile-exists/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const profile = await UserProfile.findOne({ auth0Id: userId });
      res.json({ exists: !!profile });
    } catch (error) {
      console.error('Error checking profile existence:', error);
      res.status(500).send('Server error');
    }
  });

router.get('/search', async (req, res) => {
    const searchTerm = req.query.query;
  
    try {
      if (!searchTerm) {
        const profiles = await UserProfile.find({});
        return res.json({ users: profiles });
      }
  
      const profiles = await UserProfile.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { nickname: { $regex: searchTerm, $options: 'i' } },
        ],
      });
  
      res.json({ users: profiles }); 
    } catch (error) {
      console.error('Error searching for profiles:', error);
      res.status(500).send('Server error');
    }
  });

router.post('/user/profile', saveUserProfile);

module.exports = router;
