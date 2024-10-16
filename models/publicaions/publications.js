const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Publication schema
const PublicationSchema = new Schema({
    content: { type: String, required: true },
    coverImage: { type: String, required: false }  // Assuming coverImage is a URL or file path
});

// Define the Year schema
const YearSchema = new Schema({
    year: { type: Number, required: true, unique: true },
    publications: [PublicationSchema]  // Replacing 'articles' with 'publications'
});

// Create and export the model
module.exports = mongoose.model('Year', YearSchema);
