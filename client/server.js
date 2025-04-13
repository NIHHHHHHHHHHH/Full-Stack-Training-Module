const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Absolute path to the build folder (inside client/)
const buildPath = path.join(__dirname, 'build');

// Log the environment
console.log('Frontend running in environment:', process.env.NODE_ENV);

// Serve static files
app.use(express.static(buildPath));

// Health check route (optional)
app.get('/health', (req, res) => {
  res.send('Frontend is alive 🚀');
});

// API env check (optional)
app.get('/api/check-env', (req, res) => {
  res.json({ 
    environment: process.env.NODE_ENV || 'not set',
    isProduction: process.env.NODE_ENV === 'production'
  });
});

// Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
