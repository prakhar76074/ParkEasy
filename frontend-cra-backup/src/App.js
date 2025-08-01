import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SpotForm from './pages/SpotForm';
import SpotList from './pages/SpotList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/spots" element={<SpotList />} />
          <Route path="/add-spot" element={<SpotForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
