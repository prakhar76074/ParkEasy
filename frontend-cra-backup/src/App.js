import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HostSpots from './pages/HostSpots';
import SpotDetail from './pages/SpotDetail';
import EditSpot from './pages/EditSpot';
import SpotForm from './pages/SpotForm';
import SpotList from './pages/SpotList';
import AuthForm from './pages/AuthForm';
import Unauthorized from './pages/UnAuthorized';
import ProtectedRoute from './components/ProtectedRoute';
import HostBookings from './pages/HostBookings';
import UserBookings from './pages/UserBookings';

function App() {
  return (
    <Router>
      <div className="App">
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/spots" element={<SpotList />} />
       
        <Route path="/auth" element={<AuthForm />} />
       <Route path="/unauthorized" element={<Unauthorized />} />
       

<Route path="/host-bookings" element={
  <ProtectedRoute requiredRole="HOST">
    <HostBookings />
  </ProtectedRoute>
} />

  {/* Host-only route */}
  <Route
    path="/host-spots"
    element={
      <ProtectedRoute requiredRole="HOST">
        <HostSpots />
      </ProtectedRoute>
    }
  />
  <Route
    path="/add-spot"
    element={
      <ProtectedRoute requiredRole="HOST">
        <SpotForm />
      </ProtectedRoute>
    }
  />
  

  <Route path="/my-bookings" element={
    <ProtectedRoute requiredRole="HOST">
      <UserBookings />
    </ProtectedRoute>
  } />
       
        <Route path="/spot/:id" element={
      
        <SpotDetail />
     
    }
        
        />
         {/* <Route path="/host-spots" element={<HostSpots />} /> */}
          <Route path="/edit-spot/:id"  element={
      <ProtectedRoute requiredRole="HOST">
        <EditSpot />
      </ProtectedRoute>
    } />

      </Routes>
   
      </div>
    </Router>
  );
}

export default App;
