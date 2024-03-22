const express = require('express');
const http = require('http'); // socket
const { Server } = require('socket.io');
const connectDB = require('./db/connect');
const characterRoutes = require('./routes/characters');
const storyRoutes = require('./routes/stories');
const path = require('path');
const cors = require('cors');
const { generateUploadURL, generateGetUrl } = require('./aws/aws-config'); 
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { createProxyMiddleware } = require('http-proxy-middleware');
const profileRoutes = require('./routes/profiles');
const friendRoutes = require('./routes/friends');

const app = express();
const server = http.createServer(app);

//socket init
const io = new Server(server, {
  cors: {
    origin: '*', 
  },
});

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/characters', characterRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api', profileRoutes);
app.use('/api/friends', friendRoutes);

app.use('/api/s3proxy', createProxyMiddleware({ 
  target: 'https://arcanium.s3.eu-north-1.amazonaws.com', 
  changeOrigin: true,
  pathRewrite: {'^/api/s3proxy': '/'},
}));

app.get('/api/upload-url', async (req, res) => {
  const { fileName, fileType } = req.query;
  try {
    const url = await generateUploadURL(fileName, fileType);
    res.json({ url });
  } catch (error) {
    console.error('Error generating upload URL:', error.message);
    res.status(500).json({ message: 'Could not generate upload URL.' });
  }
});

app.get('/api/get-image-url', async (req, res) => {
  const { objectKey } = req.query;
  try {
    const url = await generateGetUrl(objectKey);
    res.json({ url });
  } catch (error) {
    console.error('Error generating get URL:', error);
    res.status(500).send('Could not generate get URL.');
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`[Server] User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on('send_message', ({ room, content, sender }) => {
    if (content) {
      console.log(`[Server] Sending message to room ${room} by ${sender}: ${content}`);
      io.in(room).emit('receive_message', { room, content, sender });
    } else {
      console.error(`[Server] Received undefined content for room ${room}`);
    }
  });
  
  

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});



// update to server instd of app
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
