const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'blocked'],
    default: 'pending',
  },
}, { timestamps: true });

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;
