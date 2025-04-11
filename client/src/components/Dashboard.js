import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Module from './Module';
import '../App.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const Dashboard = () => {
  // State to store the list of videos fetched from the server
  const [videos, setVideos] = useState([]);
  
  // State to keep track of the current module index
  const [currentModule, setCurrentModule] = useState(1);
  
  // State to track the watched time of the current video
  const [watchedTime, setWatchedTime] = useState(0);
  
  // State to determine if the current video has been completed
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  
  // React Router's useNavigate hook for programmatic navigation
  const navigate = useNavigate();

 
  // Fetches the list of video modules from the server when the component mounts.
  

  // useEffect(() => {
  //   // Define the API URL based on the environment
  //   const apiUrl = process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:5000' // URL for local development server
  //     : process.env.REACT_APP_API_URL; // URL for live server
  
  //   // Fetch videos from the API
  //   fetch(`${apiUrl}/api/videos`)
  //     .then(res => res.json())
  //     .then(data => setVideos(data))
  //     .catch(err => console.error('Error fetching videos:', err));
  // }, []);

  useEffect(() => {
    // Define the API URL based on the environment
    const apiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000' // URL for local development server
      : process.env.REACT_APP_API_URL; // URL for production backend
      
    console.log('Using API URL:', apiUrl); // Debug log
      
    // Fetch videos from the API
    fetch(`${apiUrl}/api/videos`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setVideos(data))
      .catch(err => console.error('Error fetching videos:', err));
  }, []);

  
    //Handles navigation to the next module.If the current module is not the last one, it moves to the next module.If it is the last module, it navigates to the "Congratulations" page.


  const handleNext = () => {
    if (currentModule < videos.length) {
      setCurrentModule(currentModule + 1);
      setWatchedTime(0);
      setIsVideoCompleted(false);
    } else {
      navigate('/congratulations');
    }
  };

  
    //Handles navigation to the previous module. Moves to the previous module if the current module is not the first one.
  
  
  const handlePrevious = () => {
    if (currentModule > 1) {
      setCurrentModule(currentModule - 1);
      setWatchedTime(0);
      setIsVideoCompleted(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Render the current module only if videos have been fetched */}
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

      {/* Navigation buttons for moving between modules */}
      <div className="navigation-buttons">
        {/* Previous button */}
        {currentModule > 1 && (
          <button className="nav-button prev-button" onClick={handlePrevious}>
            <FaArrowLeft className="icon-left" />
            {`${videos[currentModule - 2].title}`}
          </button>
        )}

        {/* Next button */}
        {isVideoCompleted && currentModule < videos.length && (
          <button className="nav-button next-button" onClick={handleNext}>
            {`${videos[currentModule].title}`}
            <FaArrowRight className="icon-right" />
          </button>
        )}

        {/* Finish button for the last module */}
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





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Module from './Module';
// import '../App.css';
// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


// const Dashboard = () => {
//   // State to store the list of videos fetched from the server
//   const [videos, setVideos] = useState([]);
  
//   // State to keep track of the current module index
//   const [currentModule, setCurrentModule] = useState(1);
  
//   // State to track the watched time of the current video
//   const [watchedTime, setWatchedTime] = useState(0);
  
//   // State to determine if the current video has been completed
//   const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  
//   // React Router's useNavigate hook for programmatic navigation
//   const navigate = useNavigate();

 
//   // Fetches the list of video modules from the server when the component mounts.
  

//   useEffect(() => {
//     // Fetch videos from the API
    
//     // const apiUrl = process.env.REACT_APP_API_URL
//     // fetch(`${apiUrl}/api/videos`)
//       fetch('http://localhost:5000/api/videos')
//       .then(res => res.json())
//       .then(data => setVideos(data))
//       .catch(err => console.error('Error fetching videos:', err));
//   }, []);

  
//     //Handles navigation to the next module.If the current module is not the last one, it moves to the next module.If it is the last module, it navigates to the "Congratulations" page.


//   const handleNext = () => {
//     if (currentModule < videos.length) {
//       setCurrentModule(currentModule + 1);
//       setWatchedTime(0);
//       setIsVideoCompleted(false);
//     } else {
//       navigate('/congratulations');
//     }
//   };

  
//     //Handles navigation to the previous module. Moves to the previous module if the current module is not the first one.
  
  
//   const handlePrevious = () => {
//     if (currentModule > 1) {
//       setCurrentModule(currentModule - 1);
//       setWatchedTime(0);
//       setIsVideoCompleted(false);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Render the current module only if videos have been fetched */}
//       {videos.length > 0 && (
//         <Module
//           video={videos[currentModule - 1]}
//           currentModule={currentModule}
//           videos={videos}
//           watchedTime={watchedTime}
//           setWatchedTime={setWatchedTime}
//           setIsVideoCompleted={setIsVideoCompleted}
//         />
//       )}

//       {/* Navigation buttons for moving between modules */}
//       <div className="navigation-buttons">
//         {/* Previous button */}
//         {currentModule > 1 && (
//           <button className="nav-button prev-button" onClick={handlePrevious}>
//             <FaArrowLeft className="icon-left" />
//             {`${videos[currentModule - 2].title}`}
//           </button>
//         )}

//         {/* Next button */}
//         {isVideoCompleted && currentModule < videos.length && (
//           <button className="nav-button next-button" onClick={handleNext}>
//             {`${videos[currentModule].title}`}
//             <FaArrowRight className="icon-right" />
//           </button>
//         )}

//         {/* Finish button for the last module */}
//         {isVideoCompleted && currentModule === videos.length && (
//           <button className="nav-button finish-button" onClick={handleNext}>
//             END TRAINING
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
