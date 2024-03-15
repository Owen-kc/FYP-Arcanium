// models/StorySchema.js

const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  messages: [{ type: String, required: true }]
  
}, { timestamps: true }); 

module.exports = mongoose.model('Story', StorySchema);
