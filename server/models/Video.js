
// Importing the Mongoose library for defining MongoDB schemas and models
const mongoose = require('mongoose');

/*
 *  Schema for storing video information in the database.
 * This schema includes fields for the video's title, its URL, and the order in which it appears.
 */
const VideoSchema = new mongoose.Schema({
    // The title of the video (Required)
    title: { 
        type: String, 
        required: true 
    },

    // The URL of the video (Required)
    url: { 
        type: String, 
        required: true 
    },

    // The order in which the video should be displayed (Required)
    order: { 
        type: Number, 
        required: true 
    }
});

// Exporting the Mongoose model for the Video schema
module.exports = mongoose.model('Video', VideoSchema);