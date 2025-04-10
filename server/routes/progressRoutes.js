

// // Importing the Express framework for building the web server
// const express = require('express');

// // Creating a new router object for handling routes
// const router = express.Router();

// // Importing the Progress model to interact with the Progress collection in the database
// const Progress = require('../models/Progress');

// /*
//  * Updates the progress of a user for a specific video.
//  * If the user has already started watching the video, their progress is updated.
//  * If the user has not started the video, a new progress record is created.
//  */

// router.post('/progress', async (req, res) => {
//     const { userId, videoId, lastWatchedPosition } = req.body;

//     try {
//         // Find an existing progress record for the user and video, or create a new one
//         const progress = await Progress.findOneAndUpdate(
//             { userId, videoId },
//             { lastWatchedPosition, isCompleted: false },
//             { new: true, upsert: true } // Create a new record if it doesn't exist
//         );

//         // Send the updated progress object as a JSON response
//         res.json(progress);
//     } catch (err) {
//         // Log any errors that occur and send a 500 status code with an error message
//         console.error('Error updating progress:', err);
//         res.status(500).send('Server Error');
//     }
// });

// /*
//  * Fetches the progress of a user for a specific video.
//  * Returns the progress details if found.
//  */

// router.get('/progress/:userId/:videoId', async (req, res) => {
//     const { userId, videoId } = req.params;

//     try {
//         // Fetch the progress record for the specified user and video
//         const progress = await Progress.findOne({ userId, videoId });

//         // Send the progress object as a JSON response, or null if no progress is found
//         res.json(progress);
//     } catch (err) {
//         // Log any errors that occur and send a 500 status code with an error message
//         console.error('Error fetching progress:', err);
//         res.status(500).send('Server Error');
//     }
// });

// // Exporting the router to be used in other parts of the application
// module.exports = router;








const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

router.post('/progress', async (req, res) => {
    const { userId, videoId, lastWatchedPosition } = req.body;

    try {
      
        const progress = await Progress.findOneAndUpdate(
            { userId, videoId },
            { lastWatchedPosition, isCompleted: false },
            { new: true, upsert: true } 
        );

     
        res.json(progress);
    } catch (err) {
       
        console.error('Error updating progress:', err);
        res.status(500).send('Server Error');
    }
});



router.get('/progress/:userId/:videoId', async (req, res) => {
    const { userId, videoId } = req.params;

    try {
    
        const progress = await Progress.findOne({ userId, videoId });

        res.json(progress);
    } catch (err) {
     
        console.error('Error fetching progress:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
