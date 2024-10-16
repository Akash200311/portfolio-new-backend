const express = require('express');
const router = express.Router();
const User = require('../models/admin'); // Adjust path if necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');








// User Registration Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password }); // Log request data
  
    try {
      const user = await User.findOne({ email });
      console.log('Retrieved user:', user); // Log retrieved user data
  
      if (!user) {
        console.log('No user found with email:', email); // Log missing user
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Log the password and hashed password
      console.log('Password to compare:', password);
      console.log('Stored hashed password:', user.password);
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match result:', isMatch); // Log result of password comparison
  
      if (!isMatch) {
        console.log('Password does not match for email:', email); // Log password mismatch
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      console.error('Server error:', err); // Log server errors
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
module.exports = router;
