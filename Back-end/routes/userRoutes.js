// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser } = require('./controllers/userController');

router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
