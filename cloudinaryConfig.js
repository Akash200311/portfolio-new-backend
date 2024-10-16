const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load dotenv only in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Fallback to hardcoded values if env variables are missing
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debugging log to ensure values are being loaded
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);

module.exports = cloudinary;
