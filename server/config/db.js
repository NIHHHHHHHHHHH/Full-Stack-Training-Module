const mongoose = require('mongoose');

// Dynamically load the correct .env file
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` }); // ⬅️ This line loads .env.development or .env.production

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is undefined. Check your .env file.');
    }

    await mongoose.connect(process.env.MONGO_URI, {
    
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// // Importing the Mongoose library for MongoDB interaction
// const mongoose = require('mongoose');

// // Load environment variables from a .env file into process.env
// require('dotenv').config();

// /**
// * @function connectDB
// * @description Establishes a connection to the MongoDB database using 
// Mongoose.
// */


// const connectDB = async () => {
//     try {
//         // Attempt to connect to the MongoDB database using the URI from the environment variables
//         await mongoose.connect(process.env.MONGO_URI, {
           
//         });
        
//         // Log a success message if the connection is established
//         console.log('MongoDB Connected...');
//     } catch (err) {
//         // Log the error message and terminate the process with a failure code (1)
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// // Export the connectDB function to be used in other parts of the application
// module.exports = connectDB;





// const mongoose = require('mongoose');
// require('dotenv').config();


// const connectDB = async() => {

//     try{
//      await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser : true,
//         useUnifiedTopology : true,
//      });
//      console.log('Mongodb Connected ....');
     
//     }
//     catch(err){
//      console.error(err.message);
//      process.exit(1);
//     }
// }


// module.exports = connectDB;