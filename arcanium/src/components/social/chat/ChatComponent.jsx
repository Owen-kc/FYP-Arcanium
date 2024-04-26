import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import './ChatComponent.css';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import config from '../../../config';

const ChatPage = () => {
  const navigate = useNavigate()
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const socketRef = useRef(socketIO.connect(config.apiUrl));
  const [friends, setFriends] = useState([]); 
  const { user } = useAuth0();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(''); 

  const typingVariants = {
    typingStart: { scale: 1.1 },
    typingEnd: { scale: 1 },
  };

  const typingDotVariants = {
    initial: { y: '0%', opacity: 0.5 },
    animate: i => ({
      y: ['0%', '-50%', '0%'],
      opacity: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        repeatDelay: 0.5,
        duration: 0.5,
        delay: i * 0.2 // Stagger the animation of each dot
      },
    }),
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const sendButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  // Connect to the socket server and join the chat room, handle incoming messages and other socket events
  useEffect(() => {
    socketRef.current = socketIO.connect(config.apiUrl);

    // Get the user and friend IDs from the URL search params
    const searchParams = new URLSearchParams(location.search);
    const userParam = searchParams.get('user');
    const friend = searchParams.get('friend');
    const room = [userParam, friend].sort().join('_');

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/messages/${room}`); // Fetch the message history
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching message history:', error);
      }
    };

    fetchMessages();
    socketRef.current.emit('join_room', room);

    socketRef.current.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socketRef.current.on('user_typing', (data) => {
      setIsTyping(data.typing);
      setTypingUser(data.user);
    });

    return () => {
      socketRef.current.off('receive_message');
      socketRef.current.off('user_typing');
      socketRef.current.disconnect();
    };
  }, [location.search]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Fetch the user's friends when the component mounts, and set the friends state
  useEffect(() => {
    const fetchFriends = async () => {
      if (!user?.sub) return;

      try {
        const response = await axios.get(`${config.apiUrl}/api/friends/list-friends/${user.sub}`);
        setFriends(response.data);
        console.log('Fetched friends:', response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [user?.sub]);

  const typingTimeoutRef = useRef(null);

  // Handle input change in the chat input field, and emit typing events
  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);

    // Emit typing events
    const searchParams = new URLSearchParams(location.search);
    const room = [searchParams.get('user'), searchParams.get('friend')].sort().join('_');
    socketRef.current.emit('start_typing', { room, user: user.name || user.nickname || 'Someone' });

    // Clear the typing timeout and set a new one
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit('stop_typing', { room, user: user.name || user.nickname || 'Someone' });
    }, 500);
  };

  // Send a message to the chat room
  const sendMessage = () => {
    if (currentMessage.trim()) {
      const searchParams = new URLSearchParams(location.search);
      const userParam = searchParams.get('user');

      const timestamp = new Date().toISOString();

      socketRef.current.emit('send_message', {
        room: [userParam, searchParams.get('friend')].sort().join('_'), // Sort the user IDs to create a unique room ID
        content: currentMessage,
        sender: userParam,
        timestamp: timestamp
      });

      setCurrentMessage('');
    }
  };

  // Get the friend data based on the sender ID
  const getFriendData = (senderId) => {
    const friendData = friends.find(friend =>
      friend.requester.auth0Id === senderId || friend.recipient.auth0Id === senderId // find the friend data based on the sender ID
    );
    if (!friendData) {
      console.log(`No friend data found for senderId: ${senderId}`);
      return null;
    }
    return friendData.requester.auth0Id === user.sub ? friendData.recipient : friendData.requester;
  };

  // Check if the message was sent by the current user
  const isMyMessage = (sender) => {
    const searchParams = new URLSearchParams(location.search); // Get the URL search params
    return sender === searchParams.get('user');
  };

  // Format the timestamp to display the time only
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    if (!isNaN(date)) {
      return date.toLocaleTimeString([], { timeStyle: 'short' }); // Format the time only
    } else {
      return 'Fetching time...';
    }
  };

  return (
    <Paper elevation={3} className="chat-container">
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Button
          startIcon={<ArrowBackIosIcon />}
          onClick={() => window.history.back()}
        >
        </Button>
        <Typography variant="h4" className="chat-title">
          Chat with {getFriendData(location.search.split('friend=')[1])?.name || 'Friend'}
        </Typography>
      </Box>
      <Box className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => {
          const senderInfo = !isMyMessage(message.sender) ? getFriendData(message.sender) : user;
          return (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              transition={{ duration: 0.5 }}
              className={`message-bubble ${isMyMessage(message.sender) ? 'sent-message' : 'received-message'}`}
            >
              <Box className="message-sender-info">
                <img src={senderInfo?.picture || 'default-avatar.png'} alt={`${senderInfo?.name || 'User'}'s avatar`} className="message-avatar" />
                <Typography variant="caption" className="message-sender-name">
                  {senderInfo?.name || 'Unknown User'}
                </Typography>
              </Box>
              <Box className="message-content">
                <Typography variant="body2" className="message-text">
                  {message.content}
                </Typography>
                <Typography variant="caption" className="message-timestamp">
                  {formatTimestamp(message.timestamp)}
                </Typography>
              </Box>
            </motion.div>
          );
        })}
        {isTyping && (
          <motion.div className="typing-indicator" initial="initial" animate="animate">
            <Typography variant="body2">
              {`${typingUser} is typing`}
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="typing-dot"
                  custom={i} 
                  variants={typingDotVariants}
                  initial="initial"
                  animate="animate"
                >
                  .
                </motion.span>
              ))}
            </Typography>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box className="chat-input-section">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={currentMessage}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="chat-input"
        />
        <motion.button
          className="send-button"
          whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
          onClick={sendMessage}
        >
          Send
        </motion.button>
      </Box>
    </Paper>
  );
  
  

};

export default ChatPage;
