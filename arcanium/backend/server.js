const express = require('express');
const connectDB = require('./db/connect');
const characterRoutes = require('./routes/characters');
const path = require('path');
const cors = require('cors'); 
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors()); //CORS
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/characters', characterRoutes);

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
