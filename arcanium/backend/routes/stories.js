const express = require('express');
const router = express.Router();
const { saveStory, getStoriesByUserId, deleteStory } = require('../controllers/storyController');

// Route to save a story
router.post('/', saveStory);

// Route to get all stories for a specific user
router.get('/user/:userId', getStoriesByUserId);

// Route to delete a story by its ID
router.delete('/:id', deleteStory);

module.exports = router;
