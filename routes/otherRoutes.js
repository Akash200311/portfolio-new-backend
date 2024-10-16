const express = require('express');
const router = express.Router();
const Others = require('../models/other');

// Routes for 'Others'
router.get('/others', async (req, res) => {
    try {
        const allOthers = await Others.find();
        res.json(allOthers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post route to create new 'Other'
router.post('/others', async (req, res) => {
    const { heading, content } = req.body;

    try {
        const newOther = new Others({
            heading,
            content
        });

        await newOther.save();
        res.json(newOther);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Put route to update an existing 'Other' entry
router.put('/others/:otherId', async (req, res) => {
    const { otherId } = req.params;
    const { heading, content } = req.body;

    try {
        const updateData = {
            heading,
            content
        };

        const updatedOther = await Others.findByIdAndUpdate(
            otherId,
            updateData,
            { new: true }
        );

        if (!updatedOther) return res.status(404).json({ error: 'Entry not found' });
        res.json(updatedOther);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete route to remove an 'Other' entry
router.delete('/others/:otherId', async (req, res) => {
    const { otherId } = req.params;

    try {
        const deletedOther = await Others.findByIdAndDelete(otherId);
        if (!deletedOther) return res.status(404).json({ error: 'Entry not found' });
        res.json({ message: 'Entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
