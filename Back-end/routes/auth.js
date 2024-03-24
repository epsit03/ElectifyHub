// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' }); // Changed message for user not found
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Password is correct, user is authenticated
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error.message); // Log the error message for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other authentication routes...

module.exports = router;
