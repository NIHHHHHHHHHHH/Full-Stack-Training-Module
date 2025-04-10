
// Importing the Express framework for building the web server
const express = require('express');

// Importing the Video model to interact with the Video collection in the database
const Video = require('../models/Video');

// Creating a new router object for handling routes
const router = express.Router();

/**
 * Fetches all videos from the database, sorted by their order field.
 * The videos are returned in ascending order based on the `order` field.
 */

router.get('/videos', async (req, res) => {
    try {
        // Fetch all videos from the database, sorted by the 'order' field in ascending order
        const videos = await Video.find().sort({ order: 1 });

        // Send the videos as a JSON response
        res.json(videos);
    } catch (err) {
        // Log any errors that occur and send a 500 status code with an error message
        console.error('Error fetching videos:', err);
        res.status(500).send('Server Error');
    }
});

// Exporting the router to be used in other parts of the application
module.exports = router;









// const express = require('express');

// const Video = require('../models/Video');

// const router = express.Router();


// router.get('./videos', async(req, res) => {
//      try{
//     const videos = await Video.find().sort({order : 1});

//     res.json(videos);
//         }
//      catch(err){
//      console.error('Error Fetching videos:',err );
//      res.status(500).send('server error');
//        }
// });


// module.exports = router;




