const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// First try the client/build path (common in monorepo setups)
let buildPath = path.join(__dirname, 'client', 'build');

// If that doesn't exist, try the build directory in the current folder
if (!fs.existsSync(buildPath)) {
  buildPath = path.join(__dirname, 'build');
}

// Debugging information
console.log('Frontend server starting...');
console.log('Current directory:', __dirname);
console.log('Using build path:', buildPath);
console.log('Build path exists:', fs.existsSync(buildPath));

if (fs.existsSync(buildPath)) {
  console.log('Files in build directory:', fs.readdirSync(buildPath));
}

// Serve static files with proper MIME types
app.use(express.static(buildPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Health check route
app.get('/health', (req, res) => {
  res.send('Frontend is alive 🚀');
});

// API env check
app.get('/api/check-env', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'not set',
    isProduction: process.env.NODE_ENV === 'production',
    buildPath: buildPath,
    buildExists: fs.existsSync(buildPath)
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


// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Absolute path to the build folder (inside client/)
// const buildPath = path.join(__dirname, 'build');

// // Log the environment
// console.log('Frontend running in environment:', process.env.NODE_ENV);

// // Serve static files
// app.use(express.static(buildPath));

// // Health check route (optional)
// app.get('/health', (req, res) => {
//   res.send('Frontend is alive 🚀');
// });

// // API env check (optional)
// app.get('/api/check-env', (req, res) => {
//   res.json({ 
//     environment: process.env.NODE_ENV || 'not set',
//     isProduction: process.env.NODE_ENV === 'production'
//   });
// });

// // Catch-all route for React Router
// app.get('*', (req, res) => {
//   res.sendFile(path.join(buildPath, 'index.html'));
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Frontend server running on port ${PORT}`);
// });
