


import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../App.css';


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
        const apiUrl = process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000' // Localhost URL for development
          : process.env.REACT_APP_API_URL; // Live server URL for production
  
        // Fetch progress and set the current time
        fetch(`${apiUrl}/api/progress/${userId}/${video._id}`)
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
        videoPlayer.currentTime(watchedTime); // Prevent fast-forwarding
      } else {
        setWatchedTime(videoPlayer.currentTime());
    
        // Define the API URL based on the environment
        const apiUrl = process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000' // Localhost URL for development
          : process.env.REACT_APP_API_URL; // Live server URL for production
    
        // Update the progress in the backend
        fetch(`${apiUrl}/api/progress`, {
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



// import React, { useEffect, useRef } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import '../App.css';


// const VideoPlayer = ({ video, watchedTime, setWatchedTime, setIsVideoCompleted }) => {
//   const videoRef = useRef(null); // Reference to the video DOM element
//   const playerRef = useRef(null); // Reference to the Video.js player instance
//   const userId = '123'; // Placeholder for user ID

//   useEffect(() => {
    
//      //Initializes the Video.js player and sets the current time from the saved progress.
     
//     const initializePlayer = () => {
//       if (videoRef.current && !playerRef.current) {
//         playerRef.current = videojs(videoRef.current, {
//           controls: true,
//           autoplay: false,
//           preload: 'auto',
//         });

//         // Fetch progress and set the current time
//         // const apiUrl = process.env.REACT_APP_API_URL 
//         // fetch(`${apiUrl}/api/progress/${userId}/${video._id}`)
//        fetch('http://localhost:5000/api/videos') 
//           .then(res => res.json())
//           .then(data => {
//             if (data && data.lastWatchedPosition) {
//               setWatchedTime(data.lastWatchedPosition);
//               playerRef.current.currentTime(data.lastWatchedPosition);
//             }
//           })
//           .catch(err => console.error('Error fetching progress:', err));
//       }
//     };

//     // Delay initialization to ensure the video element is in the DOM
//     setTimeout(initializePlayer, 100);

//     // Cleanup the player on unmount
//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null; // Reset playerRef to null after disposing
//       }
//     };
//   }, [video, setWatchedTime]);

  
//     //Handles the time update event of the video player. Updates the watched time and sends progress updates to the server.
   
//   const handleTimeUpdate = () => {
//     const videoPlayer = playerRef.current;
//     if (videoPlayer.currentTime() > watchedTime + 1) {
//       videoPlayer.currentTime(watchedTime);
//     } else {
//       setWatchedTime(videoPlayer.currentTime());
//       // const apiUrl = process.env.REACT_APP_API_URL 
//       // fetch(`${apiUrl}/api/progress`
//       fetch('http://localhost:5000/api/videos', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: userId,
//           videoId: video._id,
//           lastWatchedPosition: videoPlayer.currentTime(),
//         }),
//       }).catch(err => console.error('Error updating progress:', err));
//     }
//   };

  
//    // Handles the event when the video ends. Sets the video completion status.
  
//   const handleVideoEnded = () => {
//     setIsVideoCompleted(true);
//   };

//   return (
//     <video
//       ref={videoRef}
//       className="video-js"
//       controls
//       onTimeUpdate={handleTimeUpdate}
//       onEnded={handleVideoEnded}
//     >
//       <source src={video?.url} type="video/mp4" />
//     </video>
//   );
// };

// export default VideoPlayer;







// import React, { useEffect, useRef } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import '../App.css';


// const VideoPlayer = ({ video, watchedTime, setWatchedTime, setIsVideoCompleted }) => {
//   const videoRef = useRef(null); // Reference to the video DOM element
//   const playerRef = useRef(null); // Reference to the Video.js player instance
//   const userId = '123'; // Placeholder for user ID

//   useEffect(() => {
    
//      //Initializes the Video.js player and sets the current time from the saved progress.
     
//     const initializePlayer = () => {
//       if (videoRef.current && !playerRef.current) {
//         playerRef.current = videojs(videoRef.current, {
//           controls: true,
//           autoplay: false,
//           preload: 'auto',
//         });

//         // Fetch progress and set the current time
//         const apiUrl = process.env.REACT_APP_API_URL 
//         fetch(`${apiUrl}/api/progress/${userId}/${video._id}`)
//           .then(res => res.json())
//           .then(data => {
//             if (data && data.lastWatchedPosition) {
//               setWatchedTime(data.lastWatchedPosition);
//               playerRef.current.currentTime(data.lastWatchedPosition);
//             }
//           })
//           .catch(err => console.error('Error fetching progress:', err));
//       }
//     };

//     // Delay initialization to ensure the video element is in the DOM
//     setTimeout(initializePlayer, 100);

//     // Cleanup the player on unmount
//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null; // Reset playerRef to null after disposing
//       }
//     };
//   }, [video, setWatchedTime]);

  
//     //Handles the time update event of the video player. Updates the watched time and sends progress updates to the server.
   
//   const handleTimeUpdate = () => {
//     const videoPlayer = playerRef.current; 
// // Ensure that the player is initialized and available
// if (!videoPlayer) return;

// // Update the watched time if the current time has increased
// if (videoPlayer.currentTime() > watchedTime + 1) {
//   videoPlayer.currentTime(watchedTime); // Synchronize time
// } else {
//   setWatchedTime(videoPlayer.currentTime());
      
//       const apiUrl = process.env.REACT_APP_API_URL 
//       fetch(`${apiUrl}/api/progress`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId: userId,
//           videoId: video._id,
//           lastWatchedPosition: videoPlayer.currentTime(),
//         }),
//       }).catch(err => console.error('Error updating progress:', err));
//     }
//   };

  
//    // Handles the event when the video ends. Sets the video completion status.
  
//   const handleVideoEnded = () => {
//     setIsVideoCompleted(true);
//   };

//   return (
//     <video
//       ref={videoRef}
//       className="video-js"
//       controls
//       onTimeUpdate={handleTimeUpdate}
//       onEnded={handleVideoEnded}
//     >
//       <source src={video?.url} type="video/mp4" />
//     </video>
//   );
// };

// export default VideoPlayer;