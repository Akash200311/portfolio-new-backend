const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the About Me schema
const aboutMeSchema = new Schema({
  aboutMeDescription: {
    type: String,
    required: true
  },
  cvPdfLink: {
    type: String, // URL or path to the CV PDF
    default: ''
  },
  contactNumber: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  aboutMyNameDescription: {
    type: String,
    default: ''
  }
});

// Create and export the model
const AboutMe = mongoose.model('AboutMe', aboutMeSchema);
module.exports = AboutMe;
