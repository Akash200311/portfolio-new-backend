const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Cover Image schema
const coverImageSchema = new Schema({
  url: {
    type: String, // URL or path to the cover image
    required: true  
  },
  // Optionally, you can add more fields here if needed
  // For example, a description or upload date
});

// Create and export the model
const CoverImage = mongoose.model('CoverImage', coverImageSchema);
module.exports = CoverImage;
