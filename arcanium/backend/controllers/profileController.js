const UserProfile = require('../models/ProfileSchema');

// Function to save or update a user's profile
async function saveOrUpdateUserProfile(req, res) {
    const { auth0Id, name, nickname, picture, profile, email, preferred_username } = req.body; // Extracting the user data from the request body

  try {
    // Update the usr's profile if it exists, or create a new one
    const userProfile = await UserProfile.findOneAndUpdate(
      { auth0Id }, // Query condition
      { name, nickname, picture, profile, email, preferred_username },
      { new: true, upsert: true, setDefaultsOnInsert: true } 
    );

    // Respond with the updated or new user profile
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error saving or updating user profile:', error);
    res.status(500).send('Server error');
  }
}

module.exports = { saveOrUpdateUserProfile };
