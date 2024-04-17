import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import { Container, Paper, Fab, useMediaQuery, useTheme } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import config from "../chatbot/chatbotConfig";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";

const ChatbotComponent = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleChatbot = () => {
    setOpen(!open);
  };

  const fabStyle = {
    position: "fixed",
    bottom: 20,
    right: isMobile ? 10 : 20, // Adjust position to the left on mobile
    width: isMobile ? 40 : 'auto', // Smaller size on mobile
    height: isMobile ? 40 : 'auto', // Smaller size on mobile
    minHeight: isMobile ? 40 : 'auto' // Ensure the FAB doesn't shrink below 40px
  };

  return (
    <>
      {open && (
        <Container style={{ position: "fixed", bottom: 80, right: 20, zIndex: 1000, width: '350px', height: '500px' }}>
          <Paper elevation={3} style={{ margin: 0, padding: 0, overflow: 'hidden', height: '100%' }}>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </Paper>
        </Container>
      )}
      <Fab color="primary" aria-label="chat" style={fabStyle} onClick={toggleChatbot}>
        <ChatBubbleOutlineIcon />
      </Fab>
    </>
  );
};

export default ChatbotComponent;
