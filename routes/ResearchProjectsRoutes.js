const express = require('express');
const router = express.Router();
const ResearchProject = require('../models/researchprojects'); // Import the ResearchProject model
const ResearchCover= require('../models/researchcover');
const cloudinary = require('../cloudinaryConfig'); // Import your Cloudinary config
const upload = require('../multerConfig'); // Import multer config
const fs = require('fs'); // Import file system module


router.put('/cover', upload.single('coverImg'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded:', req.file.path); // Log file path

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'image',
      folder: 'research'
    });

    console.log('Cloudinary upload result:', result); // Log Cloudinary result

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });

    let coverImage = await ResearchCover.findOne();

    if (coverImage) {
      coverImage.url = result.secure_url;
      const updatedCoverImage = await coverImage.save();
      res.status(200).json({ message: 'Cover image updated', coverImage: updatedCoverImage });
    } else {
      const newCoverImage = new ResearchCover({
        url: result.secure_url,
      });

      const createdCoverImage = await newCoverImage.save();
      res.status(201).json({ message: 'Cover image created', coverImage: createdCoverImage });
    }
  } catch (error) {
    console.error('Image upload failed:', error); // Log errors
    res.status(500).json({ error: 'Image upload failed', details: error.message });
  }
});






router.get('/cover', async (req, res) => {
  try {

    
    const coverImage = await ResearchCover.findOne();
    if (coverImage) {
      res.status(200).json(coverImage);
    } else {
      res.status(404).json({ message: 'Cover image not found.' });
    }
  } catch (err) {
    console.error('Error fetching cover image:', err);
    res.status(500).json({ error: 'An error occurred while fetching the cover image.' });
  }
});







// Create a new research project
router.post('/',upload.single('image1'), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded:', req.file.path); // Log file path

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'image',
      folder: 'research'
    });

    const project = new ResearchProject(req.body);
    project.image1=result.secure_url;
    await project.save();
    res.status(201).send(project);
  } catch (err) {
    res.status(400).send(err);
  }
});

























// Get all research projects
router.get('/', async (req, res) => {
  try {
    const projects = await ResearchProject.find();
    res.send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a research project by ID
router.get('/:id', async (req, res) => {
  try {
    
    const project = await ResearchProject.findById(req.params.id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});




// Update a research project by ID
router.put('/:id', upload.single('image2'), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File uploaded:', req.file.path); // Log file path

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'image',
      folder: 'research'
    });
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
    });


    const updatedFields = { ...req.body, image1: result.secure_url }; // Update image1 field

    const project = await ResearchProject.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.send(project);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a research project by ID
router.delete('/:id', async (req, res) => {
  try {
    const project = await ResearchProject.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.send('Project deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});











module.exports = router;
