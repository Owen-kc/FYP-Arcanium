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

// Route to handle saving/updating user profiles
router.post('/user/profile', saveUserProfile);

module.exports = router;
