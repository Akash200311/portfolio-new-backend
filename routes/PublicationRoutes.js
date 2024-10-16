const express = require('express');
const router = express.Router();
const Year = require('../models/publicaions/publications');
const Links = require('../models/publicaions/links');

const Section1 = require('../models/publicaions/subsection/section1');
const Section2 = require('../models/publicaions/subsection/section2');

// Routes for 'Year' (Publications)
router.get('/year', async (req, res) => {
    try {
        const years = await Year.find();
        res.json(years);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to add a new year
router.post('/year', async (req, res) => {
    const { year } = req.body;
    try {
        let yearData = await Year.findOne({ year });
        if (yearData) {
            return res.status(400).json({ error: 'Year already exists' });
        }
        yearData = new Year({ year, publications: [] });
        await yearData.save();
        res.status(201).json(yearData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to add a publication to a specific year
router.post('/year/:year/publications', async (req, res) => {
    const { year } = req.params;
    const { content, coverImage } = req.body;
    try {
        const yearData = await Year.findOne({ year });
        if (!yearData) return res.status(404).json({ error: 'Year not found' });

        const newPublication = { content, coverImage };
        yearData.publications.push(newPublication);
        await yearData.save();
        res.json(yearData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});








router.get('/year/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const yearData = await Year.findOne({ year });
        if (!yearData) return res.status(404).json({ error: 'Year not found' });
        res.json(yearData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Assuming you're using Express and have a Year model
router.delete('/year/:year', async (req, res) => {
    const { year } = req.params;
    try {
        const yearData = await Year.findOneAndDelete({ year });
        if (!yearData) return res.status(404).json({ error: 'Year not found' });
        
        res.json({ message: 'Year deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});







router.put('/year/:year/publications/:publicationId', async (req, res) => {
    const { year, publicationId } = req.params;
    const { content, coverImage } = req.body;
    try {
        const yearData = await Year.findOneAndUpdate(
            { year, 'publications._id': publicationId },
            { $set: { 'publications.$.content': content, 'publications.$.coverImage': coverImage } },
            { new: true }
        );
        if (!yearData) return res.status(404).json({ error: 'Year or publication not found' });
        res.json(yearData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/year/:year/publications/:publicationId', async (req, res) => {
    const { year, publicationId } = req.params;
    try {
        const yearData = await Year.findOneAndUpdate(
            { year },
            { $pull: { publications: { _id: publicationId } } },
            { new: true }
        );
        if (!yearData) return res.status(404).json({ error: 'Year not found' });
        
        // No message is returned here
        res.status(204).send(); // Send a 204 No Content status
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Routes for 'Links'
router.get('/links', async (req, res) => {
    try {
        const allLinks = await Links.find();
        res.json(allLinks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/links', async (req, res) => {
    const { url, description } = req.body;
    try {
        const newLink = new Links({ url, description });
        await newLink.save();
        res.json(newLink);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/links/:linkId', async (req, res) => {
    const { linkId } = req.params;
    const { url, description } = req.body;
    try {
        const updatedLink = await Links.findByIdAndUpdate(
            linkId,
            { url, description },
            { new: true }
        );
        if (!updatedLink) return res.status(404).json({ error: 'Link not found' });
        res.json(updatedLink);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/links/:linkId', async (req, res) => {
    const { linkId } = req.params;
    try {
        const deletedLink = await Links.findByIdAndDelete(linkId);
        if (!deletedLink) return res.status(404).json({ error: 'Link not found' });
        res.json({ message: 'Link deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Routes for 'Section1'
router.get('/section1', async (req, res) => {
    try {
        const allSection1 = await Section1.find();
        res.json(allSection1);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/section1', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newSection1 = new Section1({ title, content });
        await newSection1.save();
        res.json(newSection1);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/section1/:section1Id', async (req, res) => {
    const { section1Id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedSection1 = await Section1.findByIdAndUpdate(
            section1Id,
            { title, content },
            { new: true }
        );
        if (!updatedSection1) return res.status(404).json({ error: 'Entry not found' });
        res.json(updatedSection1);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/section1/:section1Id', async (req, res) => {
    const { section1Id } = req.params;
    try {
        const deletedSection1 = await Section1.findByIdAndDelete(section1Id);
        if (!deletedSection1) return res.status(404).json({ error: 'Entry not found' });
        res.json({ message: 'Entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Routes for 'Section2'
router.get('/section2', async (req, res) => {
    try {
        const allSection2 = await Section2.find();
        res.json(allSection2);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/section2', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newSection2 = new Section2({ title, content });
        await newSection2.save();
        res.json(newSection2);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/section2/:section2Id', async (req, res) => {
    const { section2Id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedSection2 = await Section2.findByIdAndUpdate(
            section2Id,
            { title, content },
            { new: true }
        );
        if (!updatedSection2) return res.status(404).json({ error: 'Entry not found' });
        res.json(updatedSection2);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/section2/:section2Id', async (req, res) => {
    const { section2Id } = req.params;
    try {
        const deletedSection2 = await Section2.findByIdAndDelete(section2Id);
        if (!deletedSection2) return res.status(404).json({ error: 'Entry not found' });
        res.json({ message: 'Entry deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
