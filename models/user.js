const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  profilePic: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  socialLinks: {
    twitter: {
      type: String,
      default: ''
    },
    google_scholar: {
      type: String,
      default: ''
    },


    orcid: {
      type: String,
      default: ''
    },
    github: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    }
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
  



});

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
