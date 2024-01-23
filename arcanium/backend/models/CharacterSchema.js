const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true }, // Ensured this matches the data from the API
  race: { type: String, required: true },  // Add race to the schema
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 20 
  },
  userId: {
    type: String, 
    required: true
}
});

module.exports = mongoose.model('Character', CharacterSchema);
