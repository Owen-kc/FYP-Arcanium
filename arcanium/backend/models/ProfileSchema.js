const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  name: String,
  nickname: String, 
  picture: String,
  profile: String, 
  email: String, 
  email_verified: Boolean, 
  preferred_username: String, 
  bio: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
