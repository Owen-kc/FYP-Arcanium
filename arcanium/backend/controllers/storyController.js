const Story = require('../models/StorySchema');


// Save a new story
exports.saveStory = async (req, res) => {
  const { userId, name, messages } = req.body; 

  try {
    const newStory = new Story({
      userId,
      name,
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

// Delete a story
exports.deleteStory = async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting story with ID: ${id}`);
  const userId = req.params.userId;

  try {
    const story = await Story.findOne({ _id: id, userId });
    if (!story) {
      return res.status(404).json({ message: 'Story not found or you do not have permission to delete this story.' });
    }

    await Story.deleteOne({ _id: id });
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
