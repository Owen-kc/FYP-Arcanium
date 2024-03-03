const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  class: { type: String, required: true },
  race: { type: String, required: true },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 20 
  },
  userId: {
    type: String, 
    required: true
  },
  background: { type: String, required: false },
  speed: { type: String, required: false },
  proficiencyBonus: { type: Number, required: false },
  abilityScores: {
    type: Map,
    of: Number,
    required: false
  },
  spells: [{ type: String, required: false }],
  skills: [{ type: String, required: false }],
  equipment: [{ type: String, required: false }],
  details: {
    name: { type: String, required: false },
    backstory: { type: String, required: false },
    height: { type: String, required: false },
    weight: { type: String, required: false },
    image: { type: String, required: false },
    hairColor: { type: String, required: false },
    eyeColor: { type: String, required: false },
    alignment: { type: String, required: false },
  }
}, {collection: 'characters'});

module.exports = mongoose.model('Character', CharacterSchema);
