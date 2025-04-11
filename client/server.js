const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Log the environment when server starts
console.log('Frontend running in environment:', process.env.NODE_ENV);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Add the check endpoint - PLACE THIS BEFORE THE CATCH-ALL ROUTE
app.get('/api/check-env', (req, res) => {
  res.json({ 
    environment: process.env.NODE_ENV || 'not set',
    isProduction: process.env.NODE_ENV === 'production'
  });
});

// For any other routes, serve the index.html file
// This should be LAST because it's a catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});



// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 8080;

// // Serve static files from the build directory (assuming a React/Vue/Angular build)
// app.use(express.static(path.join(__dirname, 'build')));

// // For any other routes, serve the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log('Press Ctrl+C to quit.');
// });


// console.log('Frontend running in environment:', process.env.NODE_ENV);

// // Add the check endpoint
// app.get('/api/check-env', (req, res) => {
//   res.json({ 
//     environment: process.env.NODE_ENV || 'not set',
//     isProduction: process.env.NODE_ENV === 'production'
//   });
// });