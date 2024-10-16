const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Research Project schema
const Section1= new Schema({
  title: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true
  }
});

// Create and export the model
module.exports = mongoose.model('Section1', Section1);