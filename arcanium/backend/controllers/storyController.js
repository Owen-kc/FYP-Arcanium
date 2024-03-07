// controllers/storyController.js

const Story = require('../models/StorySchema');

// Save a new story
exports.saveStory = async (req, res) => {
  const { userId, messages } = req.body;

  try {
    const newStory = new Story({
      userId,
      name: 'Story',
      messages
    });
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all stories for a specific user
exports.getStoriesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const stories = await Story.find({ userId });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
