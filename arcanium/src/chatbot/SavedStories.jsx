import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

const SaveStories = ({ savedStories, activeStoryId, loadStory, exitReadOnlyMode, isAnimatingMessage }) => {

  const handleStoryClick = (story) => {
    if (isAnimatingMessage) return;
    loadStory(story);
  };

  // Define a base style for stories
  const baseStyle = {
    cursor: "pointer",
    padding: 1,
    borderRadius: "8px",
    marginBottom: 2,
    backgroundColor: "transparent",
    '&:hover': {
      backgroundColor: "#333",
    },
    transition: "background-color 0.3s ease, opacity 0.3s ease", // Smooth transitions for visual feedback
  };

  // Define a style for disabled stories
  const disabledStyle = {
    ...baseStyle,
    cursor: "not-allowed",
    opacity: 0.5, // Lowered opacity to indicate it's disabled
    '&:hover': {
      backgroundColor: "transparent", // Prevents hover style when disabled
    },
  };

  return (
    <Box
      className="stories-section"
      sx={{
        width: "15%",
        overflowY: "auto",
        backgroundColor: "#1E1E1E",
        color: "white",
        padding: 2,
        borderLeft: "1px solid #333",
        boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
        borderRadius: "0 10px 10px 0",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
        Saved Stories
      </Typography>
      {savedStories.map((story, index) => (
        <Box
          key={story.id}
          onClick={() => handleStoryClick(story)}
          sx={{
            ...(story.id === activeStoryId ? { borderLeft: "4px solid #BF40BF" } : {}),
            ...(isAnimatingMessage ? disabledStyle : baseStyle),
            backgroundColor: story.id === activeStoryId ? "#4A4A4A" : "transparent",
          }}
        >
          {story.id === activeStoryId && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <BookIcon sx={{ color: "#BF40BF", marginBottom: 1 }} />
            </Box>
          )}
          <Typography variant="body2" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {story.name || `Story ${index + 1}`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SaveStories;
