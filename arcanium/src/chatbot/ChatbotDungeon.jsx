import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, MenuItem, Box, Typography, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ReplayIcon from '@mui/icons-material/Replay';
import ChatIcon from '@mui/icons-material/Chat';
import ActionIcon from '@mui/icons-material/TouchApp';
import StoryIcon from '@mui/icons-material/MenuBook';
import './ChatbotDungeon.css';
import { trefoil } from 'ldrs';
import { useAuth0 } from '@auth0/auth0-react';

trefoil.register();

const renderTypingIndicator = () => {
  return {
    __html: `<l-trefoil size="20" stroke="4" stroke-length="0.05" bg-opacity="0.1" speed="1.4" color="purple"></l-trefoil>`
  };
};

const API_KEY = 'PLC-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const systemMessage = {
  role: "system",
  content: `This is an AI Dungeon experience. Guide the player through an immersive and interactive narrative journey, responding to their actions with creativity and depth. 
  - For "story" inputs, enrich the narrative by expanding the world's lore, introducing new characters, or advancing the plot. 
  - For "say" inputs, have characters or the world itself react in a manner consistent with the story's current state, as if the characters are engaging directly with the player's dialogue. 
  - For "do" inputs, describe the outcomes of the player's actions, taking into account the feasibility and potential consequences within the game world's logic. 
  Each response should be in the context of a continuous, player-driven story unfolding in a dynamic, responsive world. Keep the narrative engaging, ensuring that each response propels the player deeper into the adventure, regardless of whether their input is to "do," "say," or explore the "story".`
};


/// to be optimized. in progress.
const ChatbotDungeon = () => {
  const [messages, setMessages] = useState([{ message: "Your journey begins in a dark, mysterious dungeon...", sender: "system" }]);
  const [userInput, setUserInput] = useState('');
  const [actionType, setActionType] = useState('do');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [characterSelected, setCharacterSelected] = useState(null);
  const messagesEndRef = useRef(null);
  const [savedStories, setSavedStories] = useState([]);
  const [showSavedStories, setShowSavedStories] = useState(window.innerWidth > 768);
  const [storyName, setStoryName] = useState('');
  const [isNamingDialogOpen, setIsNamingDialogOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  const { user } = useAuth0();
  const userId = user?.sub;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setShowSavedStories(window.innerWidth > 768);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSavedStories = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`http://localhost:5000/api/stories/user/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch stories');
            const data = await response.json();
            setSavedStories(data);
        } catch (error) {
            console.error("Error fetching stories:", error.message);
        }
    };

    fetchSavedStories();
}, [userId]);

const promptForStoryName = () => {
  setIsNamingDialogOpen(true);
};

const actuallySaveStory = async () => {
  if (!storyName.trim()) return;

  const storyData = {
    userId,
    name: storyName,
    messages: messages.map(m => m.message),
  };

  try {
    const response = await fetch('http://localhost:5000/api/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    });

    if (!response.ok) throw new Error('Failed to save story');
    const newStory = await response.json();

    setSavedStories(prevStories => [...prevStories, newStory]);
    setIsNamingDialogOpen(false);
    setStoryName('');
  } catch (error) {
    console.error("Error saving story:", error.message);
  }
};


const loadStory = (story) => {
  setActiveStory(story);
  setMessages(story.messages.map(message => ({ message, sender: "system" })));
  setConversationHistory();
};

const saveCurrentChatAsStory = async () => {
  const story = {
    userId,
    messages: messages
  };

  try {
    const response = await fetch('http://localhost:5000/api/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(story),
    });

    if (!response.ok) throw new Error('Failed to save story');

    const newStory = await response.json();

    setSavedStories(prevStories => [...prevStories, newStory]);
  } catch (error) {
    console.error("Error saving story:", error.message);
  }
};
  

  const getMessageStyles = (message) => ({
    margin: '10px auto',
    padding: '10px 20px',
    maxWidth: '90%',
    borderRadius: '10px',
    backgroundColor: message.sender === "user" ? '#333333' : '#222222',
    color: 'white',
    textAlign: 'left',
    wordBreak: 'break-word',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    display: 'flex',
    alignItems: 'center',

  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const typeMessage = async (message, sender = "system") => {
    const words = message.split(' ');
    let currentMessage = '';
  
    for (let i = 0; i < words.length; i++) {
      currentMessage += (i === 0 ? '' : ' ') + words[i];
      if (i < words.length - 1) {
        setMessages(prevMessages => {
          const newMessages = prevMessages.filter(m => m.sender !== "typing");
          return [...newMessages, { message: currentMessage + '...', sender: "typing" }];
        });
      } else {
        setMessages(prevMessages => prevMessages.filter(m => m.sender !== "typing").concat({ message: currentMessage, sender }));
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };
  
  

  const processMessage = async (userMessage, actionType) => {
    setIsTyping(true);
  
    const userMessageFormatted = {
      role: "user",
      content: userMessage,
      type: actionType,
    };
  
    const newConversationHistory = [...conversationHistory, userMessageFormatted];
  
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...newConversationHistory],
    };
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });
  
    const data = await response.json();
    const apiResponse = data.choices[0].message.content;
  
    const systemResponseFormatted = {
      role: "system",
      content: apiResponse,
    };
  
    setConversationHistory([...newConversationHistory, systemResponseFormatted]);
  
    setIsTyping(false);
  
    await typeMessage(apiResponse, "system");
  
    scrollToBottom();
  };

  const sendMessage = async (text, type = actionType) => {
    if (text.trim()) {
      setMessages(messages => [...messages, { message: text, sender: "user", actionType: type }]);
      await processMessage(text);
    }
  };

  const renderMessageContent = (message) => {
    let actionText = '';
    switch (message.actionType) {
      case 'do':
        actionText = 'You do';
        break;
      case 'say':
        actionText = 'You say';
        break;
      case 'story':
        actionText = 'Story addition';
        break;
      default:
        actionText = '';
    }
    
    const actionIcon = getActionIcon(message.actionType);
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {message.sender === "user" && (
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, backgroundColor: '#4a4a4a', borderRadius: '4px', padding: '2px 6px' }}>
            {actionIcon}
            <Typography variant="caption" sx={{ marginLeft: '4px', color: '#ffffff' }}>
              {actionText}
            </Typography>
          </Box>
        )}
        <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
          {message.message}
        </Typography>
      </Box>
    );
  };
  

  const getActionIcon = (actionType) => ({
    'do': <ActionIcon style={{ color: '#800080', marginRight: '8px' }} />,
    'say': <ChatIcon style={{ color: '#7F00FF', marginRight: '8px' }} />,
    'story': <StoryIcon style={{ color: '#BF40BF', marginRight: '8px' }} />
  })[actionType] || null;

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(userInput);
      setUserInput('');
    }
  };

  const handleActionChange = (event) => {
    setActionType(event.target.value);
  };

  return (
    <Box className="chatbot-dungeon" sx={{ display: 'flex', flexDirection: 'row', height: '100vh', boxSizing: 'border-box' }}>
      <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
        <Box className="chatbot-messages" sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: 2 }}>
          {messages.map((message, index) => (
            <Box key={index} sx={getMessageStyles(message)}>
              {renderMessageContent(message)}
            </Box>
          ))}
          {isTyping && (
            <Box sx={{ margin: '10px auto', textAlign: 'center' }} dangerouslySetInnerHTML={renderTypingIndicator()} />
          )}
          <div ref={messagesEndRef} />
        </Box>
        <Box className="action-controls" sx={{ display: 'flex', alignItems: 'center', p: 1, borderTop: '1px solid #ccc' }}>
          <TextField
            select
            value={actionType}
            onChange={handleActionChange}
            variant="outlined"
            sx={{ width: '20ch', mr: 1 }}
          >
            <MenuItem value="do">Do</MenuItem>
            <MenuItem value="say">Say</MenuItem>
            <MenuItem value="story">Story</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="What will you do next..."
            sx={{ flexGrow: 1, mr: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getActionIcon(actionType)}
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" endIcon={<SendIcon />} onClick={() => sendMessage(userInput, actionType)} sx={{ mr: 1 }}>
            Send
          </Button>
          <Button variant="outlined" startIcon={<ReplayIcon />} onClick={() => {}} sx={{ borderColor: 'transparent' }}>
            Retry
          </Button>
  
          <Button
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={() => promptForStoryName()}
            sx={{ mr: 1, borderColor: 'transparent' }}
            disabled={messages.length <= 1}
          >
            Save Story
          </Button>
        </Box>
      </Box>
  
      {showSavedStories && (
        <Box sx={{ width: '25%', overflowY: 'auto', backgroundColor: '#1E1E1E', color: 'white', padding: 2 }}>
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>Saved Stories</Typography>
          {savedStories.map((story, index) => (
  <Box key={index} sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={() => loadStory(story)}>
    <Typography variant="body2">{story.name || `Story ${index + 1}`}</Typography>
  </Box>
))}
        </Box>
      )}
  
      {isNamingDialogOpen && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', zIndex: 100 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={storyName}
            onChange={(e) => setStoryName(e.target.value)}
            placeholder="Enter story name..."
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={() => actuallySaveStory()}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => setIsNamingDialogOpen(false)} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </div>
      )}
    </Box>
  );
};

export default ChatbotDungeon;