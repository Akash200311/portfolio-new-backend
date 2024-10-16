const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Journal Articles and Preprints
const linkSchema = new Schema({
    url: { type: String, required: true },
    description: { type: String, required: true }
});

// Create and export the model
module.exports = mongoose.model('LinkSchema', linkSchema);
