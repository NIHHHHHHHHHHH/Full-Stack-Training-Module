
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Congratulations = () => {
  // React Router's useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  
    //Handles restarting the training. Navigates the user back to the homepage or starting point of the training.
  
  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="congratulations-container">
      {/* Main heading for the congratulatory message */}
      <h1>Congratulations!</h1>
      
      {/* Subheading with a success message */}
      <p>You’ve successfully completed all the modules.</p>
      
      {/* Button to restart the training */}
      <button className="restart-button" onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default Congratulations;







