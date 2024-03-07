// routes/stories.js

const express = require('express');
const router = express.Router();
const { saveStory, getStoriesByUserId } = require('../controllers/storyController');

router.post('/', saveStory);
router.get('/user/:userId', getStoriesByUserId);

module.exports = router;
