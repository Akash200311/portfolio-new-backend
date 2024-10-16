const express = require('express');
const router = express.Router();
const AboutMe = require('../models/aboutme'); // Import the AboutMe model

// Create or update About Me data (only if no existing data)
router.post('/', async (req, res) => {
  try {
    // Check if there is already an existing About Me entry
    const existingAboutMe = await AboutMe.findOne();
    if (existingAboutMe) {
      return res.status(403).send('About Me data already exists. Update the existing data instead.');
    }

    // If it does not exist, create a new entry
    const aboutMe = new AboutMe(req.body);
    await aboutMe.save();
    res.status(201).send(aboutMe);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update About Me data (assuming there is already an entry)
router.put('/', async (req, res) => {
  try {
    const existingAboutMe = await AboutMe.findOne();
    if (!existingAboutMe) {
      return res.status(404).send('About Me data not found. Create the data instead.');
    }

    // Update existing About Me entry
    const updatedAboutMe = await AboutMe.findByIdAndUpdate(existingAboutMe._id, req.body, { new: true });
    res.send(updatedAboutMe);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get About Me data
router.get('/', async (req, res) => {
  try {
    const aboutMe = await AboutMe.findOne();
    if (!aboutMe) {
      return res.status(404).send('About Me data not found');
    }
    res.send(aboutMe);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
