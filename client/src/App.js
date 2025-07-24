
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; 
import Introduction from './components/Introduction';        
import Congratulation from './components/Congratulation';            


function App() {

  // Add debugging at the top of your App component
  console.log('=== FRONTEND ENVIRONMENT DEBUG ===');
  console.log('Environment:', window.env.NODE_ENV);
  console.log('Backend URL:', window.env.REACT_APP_API_URL);
  console.log('All env vars:', Object.keys(window.env));
  console.log('================================');

  return (
    <Router>
      <Routes>
        {/* Route for the introduction page */}
        <Route path="/" element={<Introduction />} />

        {/* Route for the Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for the congratulations page */}
        <Route path="/congratulations" element={<Congratulation />} />
      </Routes>
    </Router>
  );
}

export default App;




