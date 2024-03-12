const express = require('express');
const connectDB = require('./db/connect');
const characterRoutes = require('./routes/characters');
const storyRoutes = require('./routes/stories');
const path = require('path');
const cors = require('cors');
const { generateUploadURL } = require('./aws/aws-config');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors()); //CORS
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/characters', characterRoutes);
app.use('/api/stories', storyRoutes);

app.use('/api/s3proxy', createProxyMiddleware({ 
  target: 'https://arcanium.s3.eu-north-1.amazonaws.com', 
  changeOrigin: true,
  pathRewrite: {
      '^/api/s3proxy': '/', // rewrite path if necessary
  },
}));

// Pre-signed URL Generation Route
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


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
