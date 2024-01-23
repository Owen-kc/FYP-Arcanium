const Character = require('../models/CharacterSchema');

// @desc Get all characters
// @route GET /api/characters
const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get a single character by ID (CHAR ID)
// @route GET /api/characters/:id
const getCharacterById = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get a single character by ID (USER ID)
// @route GET /api/characters/:id
const getCharacterByUID = async (req, res) => {
  try {
    const userId = req.params.userId;
    const characters = await Character.find({ userId }); // Fetch characters associated with the user ID
    if (!characters.length) {
      return res.status(404).json({ message: 'No characters found for this user' });
    }
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create a new character
// @route POST /api/characters
const createCharacter = async (req, res) => {
  const character = new Character({...req.body, userId: req.body.userId});
  try {
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// @desc Update a character
// @route PUT /api/characters/:id
const updateCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(character);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Delete a character
// @route DELETE /api/characters/:id
const deleteCharacter = async (req, res) => {
  try {
    const character = await Character.findByIdAndDelete(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json({ message: 'Character deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacterByUID
};
