import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Module from './Module';
import '../App.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [currentModule, setCurrentModule] = useState(1);
  const [watchedTime, setWatchedTime] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    axios.get(`${apiUrl}/api/videos`)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        if (error.response) {
          console.error('Server error:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios error:', error.message);
        }
      });
  }, []);

  const handleNext = () => {
    if (currentModule < videos.length) {
      setCurrentModule(currentModule + 1);
      setWatchedTime(0);
      setIsVideoCompleted(false);
    } else {
      navigate('/congratulations');
    }
  };

  const handlePrevious = () => {
    if (currentModule > 1) {
      setCurrentModule(currentModule - 1);
      setWatchedTime(0);
      setIsVideoCompleted(false);
    }
  };

  return (
    <div className="dashboard-container">
      {videos.length > 0 && (
        <Module
          video={videos[currentModule - 1]}
          currentModule={currentModule}
          videos={videos}
          watchedTime={watchedTime}
          setWatchedTime={setWatchedTime}
          setIsVideoCompleted={setIsVideoCompleted}
        />
      )}

      <div className="navigation-buttons">
        {currentModule > 1 && (
          <button className="nav-button prev-button" onClick={handlePrevious}>
            <FaArrowLeft className="icon-left" />
            {`${videos[currentModule - 2].title}`}
          </button>
        )}

        {isVideoCompleted && currentModule < videos.length && (
          <button className="nav-button next-button" onClick={handleNext}>
            {`${videos[currentModule].title}`}
            <FaArrowRight className="icon-right" />
          </button>
        )}

        {isVideoCompleted && currentModule === videos.length && (
          <button className="nav-button finish-button" onClick={handleNext}>
            END TRAINING
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



