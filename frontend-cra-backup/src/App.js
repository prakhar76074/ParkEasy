import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HostSpots from './pages/HostSpots';
import SpotDetail from './pages/SpotDetail';
import EditSpot from './pages/EditSpot';
import SpotForm from './pages/SpotForm';
import SpotList from './pages/SpotList';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <div className="App">
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/spots" element={<SpotList />} />
        <Route path="/add-spot" element={<SpotForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/spot/:id" element={<SpotDetail />} />
         <Route path="/host-spots" element={<HostSpots />} />
          <Route path="/edit-spot/:id" element={<EditSpot />} />

      </Routes>
   
      </div>
    </Router>
  );
}

export default App;
