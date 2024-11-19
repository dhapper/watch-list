const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express
const app = express();

// Enable CORS to allow communication from Angular frontend
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://watch-list-db-user:watch-list-db-password@cluster0.tyzvxaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // After successful connection, print all the documents in the collection
    UserProfile.find()
      .then(profiles => {
        console.log('All user profiles in DB:');
        console.log(profiles);
      })
      .catch(err => {
        console.log('Error fetching profiles:', err);
      });
  })
  .catch(err => console.log('Failed to connect to MongoDB Atlas:', err));

// Define the UserProfile schema with showIds
const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Ensure username is unique
  showIds: { type: [Number], default: [] }, // Array of show IDs
});

// Create the UserProfile model with the correct collection name ('user-profile')
const UserProfile = mongoose.model('UserProfile', userProfileSchema, 'user-profile');

// Endpoint to create a new user profile (only if it doesn't exist)
app.post('/api/user-profiles', async (req, res) => {
  try {
    const { username, showIds } = req.body;

    // Check if the user profile already exists
    const existingProfile = await UserProfile.findOne({ username });
    if (existingProfile) {
      return res.status(400).json({ error: 'User profile already exists' });
    }

    // Create a new user profile document
    const newProfile = new UserProfile({ username, showIds });
    await newProfile.save();
    res.status(201).json(newProfile); // Return the new profile
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user profile', details: error });
  }
});

// Endpoint to get the user profile by username (show IDs)
app.get('/api/user-profiles/:username', async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ username: req.params.username });
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.json(userProfile); // Return the user profile with show IDs
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile', details: error });
  }
});

// Endpoint to update the show IDs of an existing user
app.put('/api/user-profiles/:username', async (req, res) => {
  try {
    const { showIds } = req.body;
    const userProfile = await UserProfile.findOneAndUpdate(
      { username: req.params.username },
      { showIds },
      { new: true } // Return the updated document
    );
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.json(userProfile); // Return the updated user profile
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile', details: error });
  }
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
