const express = require('express');
const connectDB = require('./db/connect');
const characterRoutes = require('./routes/characters');
const storyRoutes = require('./routes/stories');
const path = require('path');
const cors = require('cors');
const { generateUploadURL, generateGetUrl } = require('./aws/aws-config'); 
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const { createProxyMiddleware } = require('http-proxy-middleware');
const profileRoutes = require('./routes/profiles');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/characters', characterRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api', profileRoutes);

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
