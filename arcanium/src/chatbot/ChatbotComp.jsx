import React, { useState, useEffect, useRef } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput
} from '@chatscope/chat-ui-kit-react';
import './Chatbot.css';
import {Box, Fab, Typography} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import {trefoil} from 'ldrs';
import { chatbotSystemMessage } from './chatbotConfig';



// ******** IMPORTANT ******** PUT API KEY HERE ******** IMPORTANT ********
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

trefoil.register()
const renderTypingIndicator = () => {
  return {
    __html: `<l-trefoil size="20" stroke="4" stroke-length="0.05" bg-opacity="0.1" speed="1.4" color="purple"></l-trefoil>`
  };
};

const systemMessage = chatbotSystemMessage;

const ChatbotComp = () => {
  const [messages, setMessages] = useState([{ message: "Greetings! I'm Arcanium Advisor. Ask me anything relating to Arcanium, or Dungeons & Dragons. I am happy to help!", sentTime: "just now", sender: "Arcanium Advisor" }]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (isOpen && messageListRef.current) {
      messageListRef.current.scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSend = async (message) => {
    const newMessage = { message, sender: "user" };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsTyping(true);
    
    // Simulate a delay for chatbot typing effect 
    setTimeout(() => {
      processMessage([...messages, newMessage]);
    }, 500); 
  };

  const typeMessage = async (message, sender) => {
    const words = message.split(' ');
    let currentMessage = '';
    
    for (let i = 0; i < words.length; i++) {
      currentMessage += (i === 0 ? '' : ' ') + words[i];
      // Temporarily show the chatbot's message being typed
      setMessages(prevMessages => {
        if (prevMessages.length > 0 && prevMessages[prevMessages.length - 1].sender === "Arcanium Advisor" && sender === "Arcanium Advisor") {
          return [...prevMessages.slice(0, prevMessages.length - 1), { message: currentMessage, sender }];
        } else {
          return [...prevMessages, { message: currentMessage, sender }];
        }
      });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  async function processMessage(chatMessages) {
    const apiMessages = chatMessages.map(msg => ({
      role: msg.sender === "Arcanium Advisor" ? "assistant" : "user",
      content: msg.message
    }));
  
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [systemMessage, ...apiMessages]
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
  
    await typeMessage(data.choices[0].message.content, "Arcanium Advisor");
    setIsTyping(false);
  }

  return (
    <Box sx={{ position: 'fixed', bottom: 10, right: 10, zIndex: 1100 }}>
      <Fab
        color="primary"
        aria-label="chat"
        variant="extended"
        onClick={toggleChatbot}
      >
        {isOpen ? <><CloseIcon sx={{ mr: 1 }} />Close</> : <><ChatIcon sx={{ mr: 1 }} />Chat</>}
      </Fab>
  
      {isOpen && (
        <MainContainer className="chatbot-container">
          <Box className="chat-header">
            <Typography variant="h9" component="div" sx={{ flexGrow: 1, color: 'common.white' }}>
              Arcanium Advisor
            </Typography>
          </Box>
          <ChatContainer className='chat-body'>
            <MessageList ref={messageListRef}>
              {messages.map((msg, i) => (
                <Message model={{
                  message: msg.message,
                  sentTime: msg.sentTime,
                  direction: msg.sender === "Arcanium Advisor" ? "incoming" : "outgoing"
                }} key={i} />
              ))}
              {isTyping && (
  <div className="typing-indicator" dangerouslySetInnerHTML={renderTypingIndicator()}></div>
)}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      )}
    </Box>
  );
};

export default ChatbotComp;