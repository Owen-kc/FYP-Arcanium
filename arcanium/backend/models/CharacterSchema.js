const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }, // Ensure this matches the data from the API
  race: { type: String, required: true },  // Add race to the schema
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 20 // Assuming you're enforcing standard D&D character levels
  },
  // Add any additional attributes here
  // e.g., abilities, equipment, background, alignment, etc.
});

module.exports = mongoose.model('Character', CharacterSchema);
