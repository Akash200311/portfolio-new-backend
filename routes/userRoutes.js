const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your user model
const cloudinary = require('../cloudinaryConfig'); // Import your Cloudinary config
const upload = require('../multerConfig'); // Import multer config
const fs = require('fs'); // Import file system module

// Create a new user (only if no user exists)
router.post('/', async (req, res) => {
  try {
    const existingUser = await User.findOne();
    if (existingUser) {
      return res.status(403).send('User already exists');
    }

    const user = new User({
      ...req.body,
      role: 'admin' // Set the role to admin
    });

    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.put('/upload/:id', upload.single('profilePic'), async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload image to Cloudinary into 'profile_pics' folder
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'image',
      folder: 'profile_pics' // Specify the folder name
    });

    // Image uploaded successfully, now update the user's profilePic field
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // Find user by ID
      { profilePic: result.secure_url }, // Update profilePic with Cloudinary URL
      { new: true } // Return the updated user object
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Optionally, delete the file from local storage
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });

    // Respond with the updated user and image URL
    res.json({ message: 'Profile updated', user: updatedUser, imageUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed', details: error.message });
  }
});

module.exports = router;
