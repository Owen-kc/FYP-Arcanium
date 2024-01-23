const express = require('express');
const router = express.Router();

const {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter
} = require('../controllers/characterController');

// Route to get all characters
router.get('/', getAllCharacters);

// Route to get a single character by id
router.get('/:id', getCharacterById);

// Route to create a new character
router.post('/', createCharacter);

// Route to update a character
router.put('/:id', updateCharacter);

// Route to delete a character
router.delete('/:id', deleteCharacter);

module.exports = router;
