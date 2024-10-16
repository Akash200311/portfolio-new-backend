const express = require('express');
const router = express.Router();
const ResearchProject = require('../models/researchprojects'); // Import the ResearchProject model
const ResearchCover = require('../models/researchcover'); // Import the ResearchCover model
const cloudinary = require('./config/cloudinaryConfig'); // Import Cloudinary config
const upload = require('./config/multerConfig'); // Import multer config
const fs = require('fs'); // Import file system module

// Upload and update cover image
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

    // Delete local file
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });

    let coverImage = await ResearchCover.findOne();
    if (coverImage) {
      coverImage.url = result.secure_url;
      const updatedCoverImage = await coverImage.save();
      res.status(200).json({ message: 'Cover image updated', coverImage: updatedCoverImage });
    } else {
      const newCoverImage = new ResearchCover({ url: result.secure_url });
      const createdCoverImage = await newCoverImage.save();
      res.status(201).json({ message: 'Cover image created', coverImage: createdCoverImage });
    }
  } catch (error) {
    console.error('Image upload failed:', error); // Log errors
    res.status(500).json({ error: 'Image upload failed', details: error.message });
  }
});

// Fetch cover image
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
router.post('/', upload.single('image1'), async (req, res) => {
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
    project.image1 = result.secure_url;
    await project.save();

    // Delete local file
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });

    res.status(201).send(project);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(400).send(err);
  }
});

// Get all research projects
router.get('/', async (req, res) => {
  try {
    const projects = await ResearchProject.find();
    res.status(200).send(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
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
    res.status(200).send(project);
  } catch (err) {
    console.error('Error fetching project by ID:', err);
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

    // Delete local file
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });

    const updatedFields = { ...req.body, image2: result.secure_url }; // Update image2 field
    const project = await ResearchProject.findByIdAndUpdate(req.params.id, updatedFields, { new: true });

    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.status(200).send(project);
  } catch (err) {
    console.error('Error updating project:', err);
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

    // If the project had an image in Cloudinary, you can delete it as well
    if (project.image1) {
      const publicId = project.image1.split('/').pop().split('.')[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy(`research/${publicId}`);
      console.log('Image deleted from Cloudinary');
    }

    res.status(200).send('Project deleted');
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).send(err);
  }
});

module.exports = router;
