const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Contributed Presentations
const Section2 = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

// Create and export the model
module.exports = mongoose.model('Section2', Section2);
