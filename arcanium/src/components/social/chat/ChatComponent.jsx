import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import socketIO from 'socket.io-client';
import { Box, TextField, Button, Typography } from '@mui/material';

const socket = socketIO();

const ChatPage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Extracting query parameters
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get('user');
    const friend = searchParams.get('friend');
    const room = [user, friend].sort().join('_');

    // Initialize Socket.IO client
    const socketEndpoint = process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:5000';
    const socket = socketIO.connect(socketEndpoint);

    // Join the chat room
    socket.emit('join_room', room);

    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => socket.disconnect();
  }, [location.search]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const searchParams = new URLSearchParams(location.search);
      const user = searchParams.get('user');
      const friend = searchParams.get('friend');
      const room = [user, friend].sort().join('_');

      // Emit message to server
      socket.emit('send_message', {
        room,
        content: currentMessage,
        sender: user,
      });
      setCurrentMessage('');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ my: 4 }}>Chat Room</Typography>
      <Box sx={{
        maxHeight: '70vh',
        overflowY: 'auto',
        mb: 2,
        p: 2,
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}>
        {messages.map((message, index) => (
          <Box key={index} sx={{ my: 2 }}>
            <Typography variant="subtitle1" component="span"><b>{message.sender}:</b></Typography>
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>{message.content}</Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
    </Box>
  );
};

export default ChatPage;
