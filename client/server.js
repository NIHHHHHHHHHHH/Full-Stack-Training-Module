const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Determine the build path - in Cloud Run, the files should be in the same directory
let buildPath = path.join(__dirname, 'build');
if (!fs.existsSync(buildPath)) {
  buildPath = path.join(__dirname, 'client', 'build');
}
if (!fs.existsSync(buildPath)) {
  buildPath = path.join(__dirname, 'public');
}

// Debug logging
console.log('Server starting with:', {
  nodeEnv: process.env.NODE_ENV,
  currentDir: __dirname,
  buildPath: buildPath,
  buildExists: fs.existsSync(buildPath)
});

if (fs.existsSync(buildPath)) {
  try {
    console.log('Files in build directory:', fs.readdirSync(buildPath));
    // Also check for static directory
    const staticDir = path.join(buildPath, 'static');
    if (fs.existsSync(staticDir)) {
      console.log('static directory exists with:', fs.readdirSync(staticDir));
    }
  } catch (err) {
    console.error('Error listing build directory:', err);
  }
}

// Disable caching for development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
}

// Serve static files with explicit content types
app.use(express.static(buildPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=UTF-8');
    } else if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    // Force no caching during development
    if (process.env.NODE_ENV !== 'production') {
      res.setHeader('Cache-Control', 'no-store');
    }
  }
}));

// Health check route
app.get('/health', (req, res) => {
  res.send('Frontend is alive 🚀');
});

// API env check with more diagnostic info
app.get('/api/debug', (req, res) => {
  res.json({
    environment: process.env.NODE_ENV || 'not set',
    isProduction: process.env.NODE_ENV === 'production',
    buildPath: buildPath,
    buildExists: fs.existsSync(buildPath),
    directories: fs.existsSync(buildPath) ? 
      fs.readdirSync(buildPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name) : [],
    staticJsFiles: fs.existsSync(path.join(buildPath, 'static', 'js')) ? 
      fs.readdirSync(path.join(buildPath, 'static', 'js')) : 'js dir not found'
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
