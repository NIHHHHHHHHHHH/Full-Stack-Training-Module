
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../App.css';
import axios from 'axios';

const VideoPlayer = ({ video, watchedTime, setWatchedTime, setIsVideoCompleted }) => {
  const videoRef = useRef(null); // Reference to the video DOM element
  const playerRef = useRef(null); // Reference to the Video.js player instance
  const userId = '123'; // Placeholder for user ID

  useEffect(() => {
    // Initializes the Video.js player and sets the current time from the saved progress.
    const initializePlayer = () => {
      if (videoRef.current && !playerRef.current) {
        // Initialize the Video.js player
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          preload: 'auto',
        });

        // Define the API URL based on the environment
        const apiUrl = process.env.REACT_APP_API_URL;

        // Fetch progress and set the current time
        axios.get(`${apiUrl}/api/progress/${userId}/${video._id}`)
          .then(response => {
            if (response.data && response.data.lastWatchedPosition) {
              setWatchedTime(response.data.lastWatchedPosition);
              playerRef.current.currentTime(response.data.lastWatchedPosition);
            }
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
      }
    };

    // Delay initialization to ensure the video element is in the DOM
    setTimeout(initializePlayer, 100);

    // Cleanup the player on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null; // Reset playerRef to null after disposing
      }
    };
  }, [video, setWatchedTime]);

  // Handles the time update event of the video player. Updates the watched time and sends progress updates to the server.
  const handleTimeUpdate = () => {
    const videoPlayer = playerRef.current;

    if (videoPlayer.currentTime() > watchedTime + 1) {
      videoPlayer.currentTime(watchedTime); // Prevent fast-forwarding
    } else {
      setWatchedTime(videoPlayer.currentTime());

      // Define the API URL based on the environment
      const apiUrl = process.env.REACT_APP_API_URL;

      // Update the progress in the backend using axios
      axios.post(`${apiUrl}/api/progress`, {
        userId: userId,
        videoId: video._id,
        lastWatchedPosition: videoPlayer.currentTime(),
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
    }
  };

  // Handles the event when the video ends. Sets the video completion status.
  const handleVideoEnded = () => {
    setIsVideoCompleted(true);
  };

  return (
    <video
      ref={videoRef}
      className="video-js"
      controls
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleVideoEnded}
    >
      <source src={video?.url} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
