const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  creator: { type: String, ref: 'UserProfile', required: true },
    members: [{
  user: { type: String, ref: 'UserProfile', required: true },
  character: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true }
}],
invitations: [{ type: String }], // For closed campaigns
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;

