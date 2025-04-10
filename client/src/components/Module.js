
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import VideoPlayer from './VideoPlayer';
import '../App.css';


const Module = ({ video, currentModule, videos, watchedTime, setWatchedTime, setIsVideoCompleted }) => {
  // Calculate the completion percentage based on the current module index
  const completionPercentage = Math.round((currentModule / videos.length) * 100);

  return (
    <div key={video?._id} className="module-container">
      <div className="module-header">
        {/* Display the title of the current video */}
        <h2>{`${video?.title}`}</h2>

        {/* Display the progress indicator */}
        <div className="progress-indicator">
          <CircularProgressbar
            value={completionPercentage}
            text={`${completionPercentage}%`}
            styles={buildStyles({
              textColor: '#fff',
              pathColor: '#00b3b3',
              trailColor: '#d6d6d6',
            })}
          />
          <p>{`${currentModule}/${videos.length} completed`}</p>
        </div>
      </div>

      <div className="module-content">
        {/* Display the video description */}
        <div className="module-description">
          {video?.description?.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
        </div>

        {/* Render the VideoPlayer component */}
        <div className="module-video">
          <VideoPlayer
            video={video}
            watchedTime={watchedTime}
            setWatchedTime={setWatchedTime}
            setIsVideoCompleted={setIsVideoCompleted}
          />
        </div>
      </div>
    </div>
  );
};

export default Module;


// import React from 'react';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import VideoPlayer from './VideoPlayer';
// import '../App.css';


// const Module = ({ video, currentModule, videos, watchedTime, setWatchedTime, setIsVideoCompleted }) => {
//   // Calculate the completion percentage based on the current module index
//   const completionPercentage = Math.round((currentModule / videos.length) * 100);

//   return (
//     <div key={video?._id} className="module-container">
//       <div className="module-header">
//         {/* Display the title of the current video */}
//         <h2>{`${video?.title}`}</h2>

//         {/* Display the progress indicator */}
//         <div className="progress-indicator">
//           <CircularProgressbar
//             value={completionPercentage}
//             text={`${completionPercentage}%`}
//             styles={buildStyles({
//               textColor: '#fff',
//               pathColor: '#00b3b3',
//               trailColor: '#d6d6d6',
//             })}
//           />
//           <p>{`${currentModule}/${videos.length} completed`}</p>
//         </div>
//       </div>

//       <div className="module-content">
//         {/* Display the video description */}
//         <div className="module-description">
//           {video?.description?.map((desc, index) => (
//             <p key={index}>{desc}</p>
//           ))}
//         </div>

//         {/* Render the VideoPlayer component */}
//         <div className="module-video">
//           <VideoPlayer
//             video={video}
//             watchedTime={watchedTime}
//             setWatchedTime={setWatchedTime}
//             setIsVideoCompleted={setIsVideoCompleted}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Module;






