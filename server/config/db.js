
// Importing the Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Load environment variables from a .env file into process.env
require('dotenv').config();


const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the URI from the environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,        // Use the new URL parser instead of the deprecated one
            useUnifiedTopology: true,     // Use the new server discovery and monitoring engine
        });
        
        // Log a success message if the connection is established
        console.log('MongoDB Connected...');
    } catch (err) {
        // Log the error message and terminate the process with a failure code (1)
        console.error(err.message);
        process.exit(1);
    }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
