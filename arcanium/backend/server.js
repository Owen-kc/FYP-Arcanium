const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Make sure this is imported
require('dotenv').config();


const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Ensure CORS is used if needed

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/arcaniumdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Import user routes
const userRoutes = require('./routes/userRoutes'); // Adjust the path as needed

// Use user routes
app.use('/api/users', userRoutes); // Prefix all user routes

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
