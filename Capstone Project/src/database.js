// src/database.js

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/voting-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Handle MongoDB connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
