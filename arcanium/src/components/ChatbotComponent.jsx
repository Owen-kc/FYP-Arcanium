import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import { Container, Paper, Fab } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import config from "../chatbot/chatbotConfig";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";


const ChatbotComponent = () => {
  const [open, setOpen] = useState(false);

  const toggleChatbot = () => {
    setOpen(!open);
  };

  return (
    <>
      {open && (
        <Container style={{ position: "fixed", bottom: 80, right: 20, zIndex: 1000, width: 'auto' }}>
          <Paper elevation={3} style={{ margin: 0, padding: 0, overflow: 'hidden'}}>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              style={{ width: '100%' }}
            />
          </Paper>
        </Container>
      )}
      <Fab color="primary" aria-label="chat" style={{ position: "fixed", bottom: 20, right: 20 }} onClick={toggleChatbot}>
        <ChatBubbleOutlineIcon />
      </Fab>
    </>
  );
};

export default ChatbotComponent;
