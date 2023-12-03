const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  level: { type: Number, required: true },
  // add other character attributes
});

module.exports = mongoose.model('Character', CharacterSchema);
