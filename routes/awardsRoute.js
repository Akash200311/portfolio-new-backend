const express = require('express');
const router = express.Router();
const Awards = require('../models/awards');
const cloudinary = require('./config/cloudinaryConfig'); // Cloudinary config
const upload = require('./config/multerConfig'); // Multer config
const fs = require('fs'); // File system module

// Route to get all awards
router.get('/', async (req, res) => {
    try {
        const allAwards = await Awards.find();
        res.json(allAwards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to add a new award
router.post('/', upload.single('image'), async (req, res) => {
    const { heading, content } = req.body;

    try {
        let imageUrl = null;

        // Only upload image if a file is provided
        if (req.file) {
            console.log('File uploaded:', req.file.path); // Log file path

            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                folder: 'awards'
            });

            console.log('Cloudinary upload result:', result); // Log Cloudinary result
            imageUrl = result.secure_url;

            // Delete the image file from the server after upload
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }

        const newAward = new Awards({ heading, content, image: imageUrl });
        await newAward.save();
        res.json(newAward);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to update a specific award
router.put('/:awardId', upload.single('image'), async (req, res) => {
    const { awardId } = req.params;
    const { heading, content } = req.body;

    try {
        let imageUrl = null;

        // Only upload image if a file is provided
        if (req.file) {
            console.log('File uploaded:', req.file.path); // Log file path

            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image',
                folder: 'awards'
            });

            console.log('Cloudinary upload result:', result); // Log Cloudinary result
            imageUrl = result.secure_url;

            // Delete the image file from the server after upload
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });
        }

        // Update the award, only change image if provided
        const updatedAward = await Awards.findByIdAndUpdate(
            awardId,
            { heading, content, ...(imageUrl && { image: imageUrl }) },
            { new: true }  // Return the updated document
        );

        if (!updatedAward) return res.status(404).json({ error: 'Award not found' });

        res.json(updatedAward);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to delete a specific award
router.delete('/:awardId', async (req, res) => {
    const { awardId } = req.params;

    try {
        const deletedAward = await Awards.findByIdAndDelete(awardId);
        if (!deletedAward) return res.status(404).json({ error: 'Award not found' });
        res.json({ message: 'Award deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
