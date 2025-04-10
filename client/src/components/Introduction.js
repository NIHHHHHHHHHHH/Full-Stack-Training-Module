

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Introduction = () => {
  // React Router's useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  
   // Handles starting the training. Navigates the user to the dashboard page to begin the training module.
  
  const handleStart = () => {
    navigate('/dashboard');
  };

  return (
    <div className="introduction-container">
      {/* Main heading for the introduction */}
      <h1>Welcome to the Training Module for Employees</h1>
      
      {/* Description of the training content */}
      <p>
        This training will cover essential topics to ensure your safety in the workplace, including the proper use of Personal Protective Equipment (PPE), fire safety and prevention, and how to prevent slips, trips, and falls.
      </p>
      <p>
        Throughout this course, you'll learn about the importance of PPE in preventing workplace injuries, the correct way to use and maintain fire extinguishers, and key measures to avoid common hazards like slippery floors and cluttered walkways.
      </p>
      <p>
        By the end of this training, you’ll be equipped with the knowledge to maintain a safe and secure working environment.
      </p>
      
      {/* Button to start the training */}
      <button onClick={handleStart} className="start-button">Start Training</button>
    </div>
  );
}

export default Introduction;





