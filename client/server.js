const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes with React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// const express = require('express');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const PORT = process.env.PORT || 8080; // Change to 8080 to match Cloud Run's default

// // Determine the build path
// const buildPath = path.join(__dirname, 'build');

// console.log('Server starting with:', {
//   nodeEnv: process.env.NODE_ENV,
//   currentDir: __dirname,
//   buildPath: buildPath,
//   buildExists: fs.existsSync(buildPath)
// });

// // Debug the JS file content directly
// const jsFilePath = path.join(buildPath, 'static', 'js', 'main.f8bc7263.js');
// if (fs.existsSync(jsFilePath)) {
//   try {
//     const jsContent = fs.readFileSync(jsFilePath, 'utf8');
//     console.log('JS file size:', jsContent.length);
//     console.log('JS file first 100 chars:', jsContent.substring(0, 100));
    
//     // Check if it starts with HTML
//     if (jsContent.trim().startsWith('<!DOCTYPE') || jsContent.trim().startsWith('<html')) {
//       console.error('ERROR: JS file contains HTML content!');
//     }
//   } catch (err) {
//     console.error('Error reading JS file:', err);
//   }
// }

// // Force no caching for all responses
// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//   res.setHeader('Pragma', 'no-cache');
//   res.setHeader('Expires', '0');
//   res.setHeader('Surrogate-Control', 'no-store');
//   next();
// });

// // Create a special debug route for the JS file
// app.get('/debug-js', (req, res) => {
//   if (fs.existsSync(jsFilePath)) {
//     const content = fs.readFileSync(jsFilePath, 'utf8');
//     res.setHeader('Content-Type', 'text/plain'); // Plain text to view the content
//     res.send(content.substring(0, 500) + '... (truncated)');
//   } else {
//     res.status(404).send('JS file not found at: ' + jsFilePath);
//   }
// });

// // Serve static files with explicit content types
// app.use(express.static(buildPath, {
//   etag: false, // Disable ETag to prevent 304 responses
//   lastModified: false, // Disable Last-Modified to prevent 304 responses
//   setHeaders: (res, filePath) => {
//     if (filePath.endsWith('.js')) {
//       res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
//     } else if (filePath.endsWith('.css')) {
//       res.setHeader('Content-Type', 'text/css; charset=UTF-8');
//     } else if (filePath.endsWith('.json')) {
//       res.setHeader('Content-Type', 'application/json; charset=UTF-8');
//     }
    
//     // Force no caching
//     res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
//     res.setHeader('Pragma', 'no-cache');
//     res.setHeader('Expires', '0');
//   }
// }));

// // API debug info with file content check
// app.get('/api/debug', (req, res) => {
//   const jsDir = path.join(buildPath, 'static', 'js');
//   let jsFiles = [];
//   let mainJsContent = 'Not found';
  
//   if (fs.existsSync(jsDir)) {
//     jsFiles = fs.readdirSync(jsDir);
    
//     if (jsFiles.includes('main.f8bc7263.js')) {
//       try {
//         const content = fs.readFileSync(path.join(jsDir, 'main.f8bc7263.js'), 'utf8');
//         mainJsContent = content.substring(0, 100) + '... (truncated)';
//       } catch (err) {
//         mainJsContent = 'Error reading: ' + err.message;
//       }
//     }
//   }
  
//   res.json({
//     environment: process.env.NODE_ENV || 'not set',
//     buildPath: buildPath,
//     jsFiles: jsFiles,
//     mainJsContent: mainJsContent,
//     indexHtmlExists: fs.existsSync(path.join(buildPath, 'index.html')),
//     // Read the first part of index.html to check if it looks correct
//     indexHtmlStart: fs.existsSync(path.join(buildPath, 'index.html')) ? 
//       fs.readFileSync(path.join(buildPath, 'index.html'), 'utf8').substring(0, 100) : 'Not found'
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