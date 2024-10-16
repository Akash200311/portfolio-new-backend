

const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');  // Import user routes
const AboutMeRoutes=require('./routes/AboutmeRoutes');
const ResearchProjectRoutes=require('./routes/ResearchProjectsRoutes')
const PublicationsRoutes=require("./routes/PublicationRoutes")
const AwardRoutr=require('./routes/awardsRoute')
const OtherRouter=require('./routes/otherRoutes')





const cors = require('cors');
const AuthRoutes = require('./routes/authRoutes');
// Load environment variables
dotenv.config();

const app = express();

const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT;


// Middleware to parse JSON
app.use(express.json());
app.use(cors());



















// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Use user routes
app.use('/users', userRoutes);
app.use('/about-me', AboutMeRoutes);
app.use('/research-projects', ResearchProjectRoutes);
app.use('/publications',PublicationsRoutes);
app.use('/awards',AwardRoutr);
app.use('/api',AuthRoutes);
app.use('/',OtherRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js app');
});



// Proxy endpoint to fetch the content from nature.com
app.get('/proxy', async (req, res) => {
  const { url } = req.query; // URL of the target (nature.com publication)
  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  try {
    // Fetch the content using Axios
    const response = await axios.get(url);
    // Return the fetched HTML content
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching publication:', error);
    res.status(500).send('Error fetching the publication');
  }
});







// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
