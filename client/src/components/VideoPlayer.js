import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../App.css'; // Assuming this path is correct
import axios from 'axios';

const VideoPlayer = ({ video, watchedTime, setWatchedTime, setIsVideoCompleted }) => {
  const videoRef = useRef(null); // Reference to the video DOM element
  const playerRef = useRef(null); // Reference to the Video.js player instance
  const userId = '123'; // Placeholder for user ID (consider getting this dynamically from auth)

  useEffect(() => {
    // Ensure the video element exists and the player hasn't been initialized yet
    if (videoRef.current && !playerRef.current) {
      const videoElement = videoRef.current;

      // Initialize the Video.js player
      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: 'auto',
        fluid: true, // Makes the player responsive and fill its parent container
      });

      // --- CRUCIAL CHANGE: Explicitly set the video source via Video.js API ---
      if (video?.url) { // Only set source if video.url is available
        playerRef.current.src({
          src: video.url,
          type: 'video/mp4' // Ensure this MIME type is correct for your Cloudinary videos
        });
      }

      // Add an error listener to the Video.js player for more specific feedback
      playerRef.current.on('error', () => {
        const error = playerRef.current.error();
        console.error('Video.js Player Error:', error);
        // You might want to display a user-friendly message to the user here
        // e.g., "Could not load video. Please try again later."
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
            console.error('Server error fetching progress:', error.response.data);
          } else if (error.request) {
            console.error('No response received for progress fetch:', error.request);
          } else {
            console.error('Axios error fetching progress:', error.message);
          }
        });
    }

    // Cleanup function: disposes the Video.js player when the component unmounts
    // or when the 'video' prop changes (to re-initialize for a new video)
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null; // Reset playerRef to null after disposing
      }
    };
  }, [video, setWatchedTime, userId]); // Dependencies: re-run effect if these props/state change

  // Handles the time update event of the video player.
  // Updates the watched time and sends progress updates to the server.
  const handleTimeUpdate = () => {
    const videoPlayer = playerRef.current;
    if (!videoPlayer || !video) return; // Ensure player and video data exist

    // Prevent fast-forwarding logic (keep if this is a desired feature)
    if (videoPlayer.currentTime() > watchedTime + 1) {
      videoPlayer.currentTime(watchedTime);
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
          console.error('Server error updating progress:', error.response.data);
        } else if (error.request) {
          console.error('No response received for progress update:', error.request);
        } else {
          console.error('Axios error updating progress:', error.message);
        }
      });
    }
  };

  // Handles the event when the video ends. Sets the video completion status.
  const handleVideoEnded = () => {
    setIsVideoCompleted(true);
  };

  return (
    <div data-vjs-player> {/* Wrapper div for Video.js player */}
      <video
        ref={videoRef}
        className="video-js vjs-default-skin" // Add default skin class for styling
        controls
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
      >
        {/* The <source> tag is still useful for initial load, but player.src() will explicitly set it */}
        {/* Ensure video.url is present before rendering source tag */}
        {video?.url && <source src={video.url} type="video/mp4" />}
      </video>
    </div>
  );
};

export default VideoPlayer;