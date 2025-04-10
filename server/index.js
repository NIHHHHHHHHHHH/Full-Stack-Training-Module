

// Importing required modules
const express = require('express'); // Framework for building web applications
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const connectDB = require('./config/db'); // Function to connect to MongoDB
const apiRoutes = require('./routes/api'); // Importing general API routes
const progressRoutes = require('./routes/progressRoutes'); // Importing progress-related routes


// Initializing the Express application
const app = express();


// Middleware setup
app.use(cors()); // Enabling CORS for all routes
app.use(express.json()); // Middleware to parse incoming JSON requests


// Connecting to MongoDB
connectDB(); // Establishing a connection to the MongoDB database


// Route setup
app.use('/api', apiRoutes); // Using general API routes under the '/api' path
app.use('/api', progressRoutes); // Using progress-related routes under the '/api' path


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Training Module API'); // Response for the root URL
});


// Setting up the server to listen on a specified port
const PORT = process.env.PORT || 8080; // The port number is taken from the environment variables or defaults to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Starting the server and logging the port number





