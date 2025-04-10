

// // Importing the Mongoose library for defining MongoDB schemas and models
// const mongoose = require('mongoose');

// /**
//  *  Schema for tracking the progress of a user watching a video.
//  * This schema includes fields for storing the user's ID, the video's ID,
//  * the last watched position in the video, and whether the video has been completed.
//  */

// const ProgressSchema = new mongoose.Schema({
//     // The ID of the user watching the video (Required)
//     userId: { 
//         type: String, 
//         required: true 
//     },

//     // The ObjectId referencing the Video being watched (Required)
//     videoId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Video', 
//         required: true 
//     },

//     // The last watched position in the video (Required)
//     lastWatchedPosition: { 
//         type: Number, 
//         required: true 
//     },

//     // Flag indicating if the video has been completed (Default: false)
//     isCompleted: { 
//         type: Boolean, 
//         default: false 
//     }
// });

// // Exporting the Mongoose model for the Progress schema
// module.exports = mongoose.model('Progress', ProgressSchema);












const mongoose = require('mongoose');


const ProgressSchema = new mongoose.Schema({
   
    userId: { 
        type: String, 
        required: true 
    },

   
    videoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Video', 
        required: true 
    },

    lastWatchedPosition: { 
        type: Number, 
        required: true 
    },

    isCompleted: { 
        type: Boolean, 
        default: false 
    }
});


module.exports = mongoose.model('Progress', ProgressSchema);
