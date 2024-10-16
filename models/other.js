const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Contributed Presentations
const Other = new Schema({
    heading: { type: String, required: true },
    content: { type: String, required: true },

});

// Create and export the model
module.exports = mongoose.model('other', Other);
