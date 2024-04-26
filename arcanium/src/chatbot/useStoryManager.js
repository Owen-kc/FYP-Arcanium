import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import { useAuth0 } from '@auth0/auth0-react'; 
import config from '../config';

const useStoryManager = () => {
  const [savedStories, setSavedStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(false);
  const { user } = useAuth0();
  const userId = user?.sub;

  // Fetch saved stories for the current user
  useEffect(() => {
    const fetchSavedStories = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${config.apiUrl}/api/stories/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch stories');
        const data = await response.json();
        const storiesWithId = data.map(story => ({ ...story, id: uuidv4() }));
        setSavedStories(storiesWithId);
      } catch (error) {
        console.error('Error fetching stories:', error.message);
      }
    };

    fetchSavedStories();
  }, [userId]);

  const saveStory = async (storyName, messages) => {
    if (!storyName.trim()) return;

    const storyData = {
  userId,
  name: storyName,
  messages: messages.map((m) => m.message), 
};


    // Save the story
    try {
      const response = await fetch(`${config.apiUrl}/api/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
      });

      if (!response.ok) throw new Error('Failed to save story');
      const newStory = await response.json();
      setSavedStories((prevStories) => [...prevStories, newStory]);
    } catch (error) {
      console.error('Error saving story:', error.message);
    }
  };

  // Delete a story
  const deleteStory = async (storyId) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/stories/${storyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to delete story');
      setSavedStories(prevStories => prevStories.filter(story => story.id !== storyId));
    } catch (error) {
      console.error("Error deleting story:", error.message);
    }
  };

  // Exit read-only mode
  const exitReadOnlyMode = () => {
    setIsReadOnlyMode(false);
    setActiveStoryId(null);
    setActiveStory(null);
  };

  // Load a story
  const loadStory = (storyToLoad) => {
    console.log('Attempting to load story:', storyToLoad.id);
    setActiveStory(storyToLoad);
    setActiveStoryId(storyToLoad.id);
    setIsReadOnlyMode(true);
  };
  
  return {
    savedStories,
    activeStory,
    activeStoryId,
    setActiveStoryId, 
    isReadOnlyMode,
    setIsReadOnlyMode, 
    saveStory,
    deleteStory,
    loadStory,
    exitReadOnlyMode,
  };
};

export default useStoryManager;