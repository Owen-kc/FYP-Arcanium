import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ReplayIcon from "@mui/icons-material/Replay";
import ChatIcon from "@mui/icons-material/Chat";
import ActionIcon from "@mui/icons-material/TouchApp";
import StoryIcon from "@mui/icons-material/MenuBook";
import "./ChatbotDungeon.css";
import { trefoil } from "ldrs";
import { useAuth0 } from "@auth0/auth0-react";
import SaveStories from "./SavedStories";
import useStoryManager from "./useStoryManager";
import { fetchCharactersByUserId } from "../components/FetchCharacters";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ForestIcon from "@mui/icons-material/Park"; 
import MagicIcon from "@mui/icons-material/AutoAwesome"; 
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { dungeonSystemMessage } from "./dungeonConfig";
import MenuIcon from '@mui/icons-material/Menu';


trefoil.register();

const renderTypingIndicator = () => {
  return {
    __html: `<l-trefoil size="20" stroke="4" stroke-length="0.05" bg-opacity="0.1" speed="1.4" color="purple"></l-trefoil>`,
  };
};

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const systemMessage = dungeonSystemMessage;

/// to be optimized. in progress.
const ChatbotDungeon = () => {
  const [messages, setMessages] = useState([
    {
      message: "The journey begins...",
      sender: "system",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [actionType, setActionType] = useState("do");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const [showSavedStories, setShowSavedStories] = useState(false);
  const [storyName, setStoryName] = useState("");
  const [isNamingDialogOpen, setIsNamingDialogOpen] = useState(false);
  const { user } = useAuth0();
  const userId = user?.sub;
  const {
    savedStories,
    activeStoryId,
    setActiveStoryId,
    isReadOnlyMode,
    activeStory,
    setIsReadOnlyMode,
    saveStory,
    deleteStory,
    loadStory,
  } = useStoryManager();
  const [isPromptDialogOpen, setIsPromptDialogOpen] = useState(true); 
  const [initialPrompt, setInitialPrompt] = useState(""); 
  const [isAnimatingMessage, setIsAnimatingMessage] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [showCharactersModal, setShowCharactersModal] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [selectedCharacterDetails, setSelectedCharacterDetails] =
    useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (activeStory && activeStory.messages) {
      const formattedMessages = activeStory.messages.map((msg) => ({
        message: msg,
        sender: "system",
      }));
      setMessages(formattedMessages);
    }
  }, [activeStory]);

  useEffect(() => {
    const handleResize = () => {

      setShowSavedStories(window.innerWidth >= 768);
    };
    
    // Call once to set initial state based on current window size
    handleResize();
  
    // Set up the event listener
    window.addEventListener("resize", handleResize);
  
    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  useEffect(() => {
    const fetchCharacters = async () => {
      if (user?.sub) {
        try {
          const fetchedCharacters = await fetchCharactersByUserId(user.sub);
          // Fetch signed URLs for each character image
          const charactersWithSignedUrls = await Promise.all(
            fetchedCharacters.map(async (character) => {
              if (character.details.imageKey) {
                try {
                  const response = await axios.get(`/api/get-image-url`, {
                    params: { objectKey: character.details.imageKey },
                  });
                  return { ...character, details: { ...character.details, image: response.data.url } };
                } catch (error) {
                  console.error('Error fetching signed URL for character image:', error);
                  return character; // Return the original character if there's an error fetching the URL
                }
              } else {
                return character; // Return the original character if no imageKey is present
              }
            })
          );
          setCharacters(charactersWithSignedUrls);
        } catch (error) {
          console.error("Error fetching characters:", error);
        }
      }
    };
  
    fetchCharacters();
  }, [user?.sub]);

  const promptForStoryName = () => {
    setIsNamingDialogOpen(true);
  };

  const toggleSavedStoriesVisibility = () => {
    setShowSavedStories(!showSavedStories);
  };

  const handleCharacterSelection = (characterId) => {
    setSelectedCharacterId(characterId);
    const characterDetails = characters.find(
      (char) => char._id === characterId
    );
    setSelectedCharacterDetails(
      characterDetails ? characterDetails.details : null
    );
  };

  const handleSaveStoryDialog = () => {
    if (!storyName.trim()) return;
    saveStory(storyName, messages);
    setIsNamingDialogOpen(false);
    setStoryName("");
  };

  const getMessageStyles = (message) => {
    // Define a base style object
    let styles = {
      margin: "10px auto",
      padding: "10px 20px",
      maxWidth: "75%", // Adjust to match the CSS
      borderRadius: "18px",
      color: "white",
      textAlign: "left",
      wordBreak: "break-word",
      boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      display: "flex",
      alignItems: "center",
      transition: "all 0.3s ease",
    };

    // Apply different backgrounds based on the sender and if the message is saved
    if (message.saved) {
      styles.backgroundColor = "#2a2a2a";
      styles.color = "#bbb";
      styles.opacity = "0.8";
      styles.borderLeft = "2px solid #BF40BF";
    } else if (message.sender === "user") {
      styles.backgroundColor = "#333333";
    } else {
      styles.backgroundColor = "#222222";
      styles.borderLeft = "2px solid #BF40BF";
    }

    return styles;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const typeMessage = async (message, sender = "system") => {
    setIsAnimatingMessage(true); // Start animating message
    const words = message.split(" ");
    let currentMessage = "";

    for (let i = 0; i < words.length; i++) {
      currentMessage += (i === 0 ? "" : " ") + words[i];
      if (i < words.length - 1) {
        setMessages((prevMessages) => {
          const newMessages = prevMessages.filter((m) => m.sender !== "typing");
          return [
            ...newMessages,
            { message: currentMessage + "...", sender: "typing" },
          ];
        });
      } else {
        setMessages((prevMessages) =>
          prevMessages
            .filter((m) => m.sender !== "typing")
            .concat({ message: currentMessage, sender })
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setIsAnimatingMessage(false);
  };

  const handlePromptSelection = (prompt) => {
    setSelectedLocation(prompt);
    const formattedPrompt = `Your journey begins in ${prompt}`;
    setInitialPrompt(formattedPrompt);
  };

  const startAdventureWithPrompt = () => {
    setIsPromptDialogOpen(false); 

    const selectedCharacter = characters.find(
      (character) => character._id === selectedCharacterId
    );

    let characterDetailsMessage =
      "You embark on your journey alone, unbound by allegiance or legacy.";
    if (selectedCharacter) {
      characterDetailsMessage = `You are ${selectedCharacter.details.name}, a ${selectedCharacter.class} of ${selectedCharacter.race} origin, with a background in ${selectedCharacter.background}.`;
    }

    let adventureStartMessage = initialPrompt.trim()
      ? initialPrompt
      : "your journey begins in an unknown land...";

    let fullInitialMessage = `${characterDetailsMessage} ${adventureStartMessage}`;

  
    sendMessage(fullInitialMessage, "story");
  };

  const processMessage = async (userMessage, actionType) => {
    setIsTyping(true);

    const userMessageFormatted = {
      role: "user",
      content: userMessage,
      type: actionType,
    };

    const newConversationHistory = [
      ...conversationHistory,
      userMessageFormatted,
    ];

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...newConversationHistory],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();
    const apiResponse = data.choices[0].message.content;

    const systemResponseFormatted = {
      role: "system",
      content: apiResponse,
    };

    setConversationHistory([
      ...newConversationHistory,
      systemResponseFormatted,
    ]);

    setIsTyping(false);

    await typeMessage(apiResponse, "system");

    scrollToBottom();
  };

  const sendMessage = async (text, type = actionType) => {
    if (text.trim()) {
      setMessages((messages) => [
        ...messages,
        { message: text, sender: "user", actionType: type },
      ]);
      await processMessage(text);
    }
  };

  const renderMessageContent = (message, isSaved) => {
    let actionText = "";
    switch (message.actionType) {
      case "do":
        actionText = "You do";
        break;
      case "say":
        actionText = "You say";
        break;
      case "story":
        actionText = "Story addition";
        break;
      default:
        actionText = "";
    }

    const actionIcon = getActionIcon(message.actionType);
    const messageClass = isSaved ? "saved-message" : "active-message"; 

    return (
      <Box
        className={messageClass}
        sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
      >
        {message.sender === "user" && (
          <Box className="action-text-box">
            {actionIcon}
            <Typography variant="caption">{actionText}</Typography>
          </Box>
        )}
        <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
          {message.message}
        </Typography>
      </Box>
    );
  };

  const getActionIcon = (actionType) =>
    ({
      do: <ActionIcon style={{ color: "#800080", marginRight: "8px" }} />,
      say: <ChatIcon style={{ color: "#7F00FF", marginRight: "8px" }} />,
      story: <StoryIcon style={{ color: "#BF40BF", marginRight: "8px" }} />,
    }[actionType] || null);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(userInput);
      setUserInput("");
    }
  };

  const handleActionChange = (event) => {
    setActionType(event.target.value);
  };

  const selectedCharacter = characters.find(
    (character) => character._id === selectedCharacterId
  );

  return (
    <Box className="chatbot-dungeon" sx={{ display: "flex", flexDirection: "row", height: "100vh", boxSizing: "border-box" }}>
    {/* Toggle Button for showing/hiding saved stories */}
    <IconButton
  onClick={toggleSavedStoriesVisibility} 
  color="primary"
  aria-label="toggle stories visibility"
  component="span"
  sx={{
    position: 'absolute',
    top: 16, 
    right: 16,
    zIndex: 10 
  }}
>
  <MenuIcon />
</IconButton>


    {/* Saved Stories Panel */}
    {showSavedStories && (
      <Box className="saved-stories" sx={{ width: "15%", overflowY: "auto", background: "#2a2a3b", color: "#fff", padding: '10px' }}>
        {/* Dynamic content of saved stories */}
      </Box>
    )}

    {/* Main Chat Content Area */}
    <Box sx={{ flexGrow: 1, width: showSavedStories ? "85%" : "100%" }}>
      {/* All your existing chat interface and components */}
      <Box className="chatbot-messages" sx={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", padding: 2 }}>
        {messages.map((message, index) => (
          <Box key={index} sx={getMessageStyles(message)}>
            {renderMessageContent(message, message.saved)}
          </Box>
        ))}
        {isTyping && (
          <Box sx={{ margin: "10px auto", textAlign: "center" }} dangerouslySetInnerHTML={renderTypingIndicator()} />
        )}
        <div ref={messagesEndRef} />
      </Box>
        {isReadOnlyMode ? (
          // If in Read-Only mode, display a button to return to the new story mode
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setIsReadOnlyMode(false);
                setActiveStoryId(null);
                setMessages([
                  { message: "Start a new journey...", sender: "system" },
                ]);
                setIsPromptDialogOpen(true);
              }}
            >
              Return to New Story
            </Button>
          </Box>
        ) : (
          <Box
            className="action-controls"
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              borderTop: "1px solid #ccc",
            }}
          >
            <TextField
              select
              value={actionType}
              onChange={handleActionChange}
              variant="outlined"
              sx={{ width: "20ch", mr: 1 }}
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
              disabled={isAnimatingMessage}
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
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={() => sendMessage(userInput, actionType)}
              disabled={isAnimatingMessage}
              sx={{ mr: 1 }}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              startIcon={<ReplayIcon />}
              onClick={promptForStoryName}
              sx={{ mr: 1, borderColor: "transparent" }}
              disabled={messages.length <= 1}
            >
              Save Story
            </Button>
          </Box>
        )}
      </Box>
      {showSavedStories && (
        <SaveStories
          savedStories={savedStories}
          activeStoryId={activeStoryId}
          loadStory={loadStory}
          isAnimatingMessage={isAnimatingMessage}
        />
      )}
      <Dialog
        open={isPromptDialogOpen}
        disableEscapeKeyDown
        PaperProps={{
          style: {
            backgroundColor: "#2A2A2A",
            color: "white",
            padding: "20px",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", color: "white" }}>
          Choose Your Adventure's Starting Point
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center", marginBottom: "20px", color: "white" }}
          >
            Select a starting scenario for your adventure, choose your
            character, or create your own adventure.
          </DialogContentText>
          {/* Location Heading */}
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "white", marginBottom: 2 }}
          >
            Location
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
            {[
              {
                label: "Big City",
                icon: (
                  <LocationCityIcon
                    sx={{
                      fontSize: 40,
                      color:
                        selectedLocation ===
                        "a bustling big city, full of secrets and opportunities"
                          ? "secondary.main"
                          : "primary.main",
                    }}
                  />
                ),
                value: "a bustling big city, full of secrets and opportunities",
              },
              {
                label: "Dark Forest",
                icon: (
                  <ForestIcon
                    sx={{
                      fontSize: 40,
                      color:
                        selectedLocation ===
                        "a dark, mysterious forest, home to ancient mysteries"
                          ? "secondary.main"
                          : "primary.main",
                    }}
                  />
                ),
                value: "a dark, mysterious forest, home to ancient mysteries",
              },
              {
                label: "Magical Place",
                icon: (
                  <MagicIcon
                    sx={{
                      fontSize: 40,
                      color:
                        selectedLocation ===
                        "a magical place, where anything is possible"
                          ? "secondary.main"
                          : "primary.main",
                    }}
                  />
                ),
                value: "a magical place, where anything is possible",
              },
            ].map((location) => (
              <Box
                key={location.label}
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                  border:
                    selectedLocation === location.value
                      ? "2px solid #4caf50"
                      : "none",
                  borderRadius: "4px",
                  padding: "10px",
                }}
                onClick={() => handlePromptSelection(location.value)}
              >
                {location.icon}
                <Typography sx={{ color: "white", mt: 1 }}>
                  {location.label}
                </Typography>
                {selectedLocation === location.value && (
                  <CheckCircleIcon
                    sx={{ color: "#4caf50", fontSize: 20, mt: 1 }}
                  />
                )}
              </Box>
            ))}
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="custom-prompt"
            label="Or enter your own adventure start"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Your journey begins in..."
            value={initialPrompt}
            onChange={(e) => setInitialPrompt(e.target.value)}
            InputProps={{ style: { color: "white" } }}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "primary.light" },
                "&:hover fieldset": { borderColor: "primary.main" },
                "&.Mui-focused fieldset": { borderColor: "primary.main" },
              },
              mb: 4, // Increased margin for separation
            }}
          />
          {/* Character Heading */}
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "white", marginBottom: 2 }}
          >
            Character
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
          {characters.map((character) => (
  <Box
    key={character._id}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "4px",
      border:
        selectedCharacterId === character._id
          ? "2px solid #4caf50"
          : "1px solid transparent",
    }}
    onClick={() => handleCharacterSelection(character._id)}
  >
    <Avatar
      src={character.details.image || ""}
      sx={{ bgcolor: "primary.main", width: 56, height: 56 }}
      alt={character.details.name}
    >
      {!character.details.image && character.details.name[0]}
    </Avatar>
    <Typography sx={{ color: "white", mt: 1 }}>
      {character.details.name}
    </Typography>
    <Typography sx={{ color: "white" }}>
      {`${character.race} ${character.class}`}
    </Typography>
  </Box>
))}
</Stack>

        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={() => startAdventureWithPrompt()}
            disabled={!initialPrompt && !selectedCharacterId}
            variant="contained"
            sx={{
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            Start Adventure
          </Button>
        </DialogActions>
      </Dialog>

      {isNamingDialogOpen && (
        <Dialog
          open={isNamingDialogOpen}
          onClose={() => setIsNamingDialogOpen(false)}
        >
          <DialogTitle>Save Your Story</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter a name for your story.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Story Name"
              type="text"
              fullWidth
              variant="outlined"
              value={storyName}
              onChange={(e) => setStoryName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsNamingDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                saveStory(storyName, messages);
                setIsNamingDialogOpen(false);
                setStoryName("");
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ChatbotDungeon;
