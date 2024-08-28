# Training Module

Develop a full-stack software application that provides an interactive and sequential training module for employees to watch video content in an organized manner. This module includes features that ensure employees complete the course step-by-step while tracking their progress.

## 📖 Project Overview

The **Training Module** application allows employees to:

- Watch a series of training videos in a specific order.
- Resume videos from the last watched point.
- Track their overall progress.
- Navigate backward but restrict fast-forwarding.

This project ensures an interactive and efficient training experience.

## 🎯 Features

1. **📚 Video Library**  
   A comprehensive list of video topics, each containing unique video files.

2. **⏯️ Sequential Video Playback**  
   Employees are required to watch videos in a specified sequence without the ability to skip ahead or fast-forward.

3. **⏪ Resume from Last Stop**  
   If a video is paused or the employee leaves, they can resume watching from the last viewed position.

4. **🔙 Back Navigation**  
   Users can go back and review previously watched videos but are restricted from fast-forwarding.

5. **📊 Progress Tracking**  
   Employee progress is visually represented as a percentage on the dashboard, showing how much of the training is complete.

## 💻 Technologies Used

- **Frontend:** React  
  - The user interface is built with React, ensuring a smooth and dynamic experience.
  
- **Backend:** Node.js with Express  
  - Manages the server-side logic, APIs, and communicates with the database.
  
- **Database:** MongoDB  
  - Stores the video metadata and user progress for seamless resume and progress tracking.

- **Video Player:** Video.js  
  - Powers the video playback with controls like play, pause, and resume.

- **Progress Indicator:** react-circular-progressbar  
  - Displays the progress of each employee as a circular visual tracker.

- **Hosting:** Vercel  
  - Deployed using Vercel, making the application accessible from anywhere.

## 🚀 How to Run Locally

1. **Clone the Repository**
   git clone https://github.com/yourusername/training-module.git
   cd training-module npm install
2. **Set Up Environment Variables**  
   Create a `.env` file in the server folder and add your MongoDB URI and other necessary credentials.
3. **Run the Backend**
   cd server npm start
4. **Run the Frontend**
    In another terminal window: cd client npm start
5. **Access the Application**  
   Once the frontend and backend are running, visit http://localhost:3000 in your browser to access the training module.

## 📺 Project Demo

Check out the live demo here: [https://full-stack-training-module.vercel.app/](#)

## 🛠️ Key Components

- **Video.js Player**: Used to handle video playback, with controls customized to enforce sequential video playback and back navigation.
- **react-circular-progressbar**: Displays the employee’s progress as a percentage completed, adding a visual cue to track training progression.
- **MongoDB**: Stores video metadata, user details, and video progress, ensuring smooth data retrieval and updating.



Made with ❤️ by Nihhhhhh


