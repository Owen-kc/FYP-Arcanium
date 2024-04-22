import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Paper, TextField, Button
} from '@mui/material';
import { styled } from '@mui/system';
import Carousel from 'react-material-ui-carousel';
import io from 'socket.io-client';
import config from '../config';
import monsterImage from '../images/monsters.jpg';
import spellImage from '../images/spells.jpg';
import itemImage from '../images/items.jpeg';
import ModelViewer from '../scenes/ModelViewer';
import AnimatedHeading from '../styling/AnimatedHeading';
import bg1 from '../images/bg1.jpg';
import bg2 from '../images/bg2.jpg';
import bg3 from '../images/bg3.jpg';
import useTheme from '@mui/material/styles/useTheme';
import { useAuth0 } from '@auth0/auth0-react';
import socketIO from 'socket.io-client';
import axios from 'axios';

const images = [
  { src: bg1, label: 'First Slide' },
  { src: bg2, label: 'Second Slide' },
  { src: bg3, label: 'Third Slide' }
];

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale3d(1.05, 1.05, 1)'
  }
}));

const ScrollableBox = styled(Box)(({ theme }) => ({
  maxHeight: '400px',
  overflowY: 'auto',
  backgroundColor: '#282a36',
  borderRadius: '10px',
  padding: '16px',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#44475a',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#5D3FD3',
    borderRadius: '10px',
  },
}));

const HomePageContent = () => {
  const theme = useTheme();
  const [showTitle, setShowTitle] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const socketRef = useRef(null);
  const { user } = useAuth0();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 9000); // Show the title for 9 seconds before running the exit animation

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Connect to socket server
    socketRef.current = socketIO.connect(config.apiUrl);

    // Join the general chat room
    socketRef.current.emit('join_room', 'generalChatRoom');

    // Fetch messages initially
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/messages/generalChatRoom`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching general chat messages:', error);
      }
    };

    fetchMessages();

    // Handle incoming messages
    socketRef.current.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const messageData = {
        room: 'generalChatRoom', 
        content: currentMessage,
        sender: user.name || user.email || 'Anonymous' 
      };
  
      socketRef.current.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 10 }}>
      <Box sx={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
        <ModelViewer modelPath="/scene/scene.gltf" />
        <Box sx={{
          position: 'absolute',
          top: '2rem',
          left: '1rem',
          zIndex: 10
        }}>
          <AnimatedHeading text="Welcome to Arcanium" show={showTitle} theme={theme} />
        </Box>
      </Box>

      <Paper elevation={4} sx={{ my: 4, mx: 2, overflow: 'hidden', borderRadius: '16px' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Carousel indicators={false}>
              {images.map((item, i) => (
                <Box key={i} sx={{
                  height: 400,
                  display: 'flex',
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <Typography variant="h3" component="h1" sx={{
                    color: '#fff',
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    textShadow: '2px 2px 8px rgba(0,0,0,0.6)'
                  }}>
                    Arcanium
                  </Typography>
                </Box>
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Paper elevation={0} sx={{ padding: 4, maxWidth: '90%', margin: 'auto', height: 'fit-content', bgcolor: 'background.default' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                About Arcanium
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Welcome to Arcanium, the Dungeons and Dragons companion application!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Arcanium is a multi-faceted tool designed to enhance the tabletop role-playing experience. Arcanium provides a wide array of resources for new and experienced players alike, including resource searching functionality, artificial intelligence integration, and social connectivity.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Navigate to the seamless functionality of Arcanium with the navigation bar at the top of the page. Let Arcanium be your guide to the world of Dungeons and Dragons.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Message Board Section, inline css for simplicity */}
      <Paper style={{ padding: '20px', maxWidth: '1300px', margin: '40px auto', backgroundColor: '#2a2a2d', color: '#f8f8f2', borderRadius: '10px' }} elevation={3}>
  <Typography variant="h4" style={{ marginBottom: '30px', textAlign: 'center', color: '#f8f8f2', borderBottom: '1px solid #5D3FD3' }}>Message Board</Typography>
        <ScrollableBox>
          {messages.map((msg, index) => (
            <Box key={index} style={{
              backgroundColor: '#44475a',
              margin: '8px 0',
              padding: '8px',
              borderRadius: '8px',
              color: '#f8f8f2',
              wordWrap: 'break-word',
              marginBottom: '16px',
            }}>
              <Typography variant="body2" style={{ fontSize: '0.95rem', marginBottom: '4px', color: '#f8f8f2' }}>
                {msg.sender || 'Anonymous'}
              </Typography>
              <Typography style={{ fontSize: '0.75rem', color: '#999791', alignSelf: 'flex-end', marginBottom: '4px' }}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
              <Typography style={{ fontSize: '0.85rem', color: '#f8f8f2' }}>
                {msg.content}
              </Typography>
            </Box>
          ))}
        </ScrollableBox>
        <Box style={{ display: 'flex', alignItems: 'center', backgroundColor: '#282a36', borderRadius: '10px', padding: '10px', boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)', marginTop: '16px' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={e => setCurrentMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            style={{
              backgroundColor: '#44475a',
              color: '#f8f8f2',
              borderRadius: '20px',
              padding: '12px 20px',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
              marginRight: '8px'
            }}
            InputProps={{
              disableUnderline: true,
              style: { color: '#f8f8f2' }
            }}
          />

          <Button variant="contained" onClick={sendMessage} style={{ backgroundColor: '#5D3FD3', color: '#FFFFFF', borderRadius: '20px', padding: '12px 24px' }}>
            Send
          </Button>
        </Box>
      </Paper>

    </Box>
  );
}

export default HomePageContent;
