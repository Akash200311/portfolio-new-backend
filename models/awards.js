// models/publicaions/awards.js
const mongoose = require('mongoose');

const awardsSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false  // This field is optional
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

const Awards = mongoose.model('Awards', awardsSchema);

module.exports = Awards;
