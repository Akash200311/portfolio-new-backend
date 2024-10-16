const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Research Project schema
const researchProjectSchema = new Schema({
  image1: {
    type: String, // URL or path to the first image
    required: true
  },
  heading: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  }
});

// Create and export the model
const ResearchProject = mongoose.model('ResearchProject', researchProjectSchema);
module.exports = ResearchProject;