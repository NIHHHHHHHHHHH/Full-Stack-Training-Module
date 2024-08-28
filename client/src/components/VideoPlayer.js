


import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../App.css';


const VideoPlayer = ({ video, watchedTime, setWatchedTime, setIsVideoCompleted }) => {
  const videoRef = useRef(null); // Reference to the video DOM element
  const playerRef = useRef(null); // Reference to the Video.js player instance
  const userId = '123'; // Placeholder for user ID

  useEffect(() => {
    
     //Initializes the Video.js player and sets the current time from the saved progress.
     
    const initializePlayer = () => {
      if (videoRef.current && !playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          preload: 'auto',
        });

        // Fetch progress and set the current time
        fetch(`http://localhost:5000/api/progress/${userId}/${video._id}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.lastWatchedPosition) {
              setWatchedTime(data.lastWatchedPosition);
              playerRef.current.currentTime(data.lastWatchedPosition);
            }
          })
          .catch(err => console.error('Error fetching progress:', err));
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

  
    //Handles the time update event of the video player. Updates the watched time and sends progress updates to the server.
   
  const handleTimeUpdate = () => {
    const videoPlayer = playerRef.current;
    if (videoPlayer.currentTime() > watchedTime + 1) {
      videoPlayer.currentTime(watchedTime);
    } else {
      setWatchedTime(videoPlayer.currentTime());

      fetch('http://localhost:5000/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          videoId: video._id,
          lastWatchedPosition: videoPlayer.currentTime(),
        }),
      }).catch(err => console.error('Error updating progress:', err));
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
