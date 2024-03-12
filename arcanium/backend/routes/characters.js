const express = require('express');
const router = express.Router();
const upload = require('../aws/upload'); 

const {
  getAllCharacters,
  getCharacterById,
  getCharacterByUID,
  createCharacter,
  updateCharacter,
  deleteCharacter
} = require('../controllers/characterController');

// Route to get all characters
router.get('/', getAllCharacters);

// Route to get a single character by id (CHAR)
router.get('/:id', getCharacterById);

// Route to get a single character by id (USER)
router.get('/user/:userId', getCharacterByUID);

// Route to create a new character without image upload middleware
router.post('/', createCharacter);

// Route to update a character without new image upload middleware
router.put('/:id', updateCharacter);

// Route to delete a character
router.delete('/:id', deleteCharacter);

module.exports = router;