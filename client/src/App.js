
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; 
import Introduction from './components/Introduction';        
import Congratulation from './components/Congratulation';            


function App() {
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




