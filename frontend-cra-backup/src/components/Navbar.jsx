import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson && userJson !== 'undefined' ? JSON.parse(userJson) : null;
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };
  const isHost = user?.roles?.includes('HOST');

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        ParkEasy
      </div>

      <div className="flex items-center gap-4">
        {isHost && (
          <>
          <button
            onClick={() => navigate('/host-spots')}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            My Hosted Spots
          </button>
           <button
           onClick={() => navigate('/add-spot')}
           className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
         >
           Add new Spot
         </button>
         </>
        )}
        </div>
        {user?.roles?.includes('HOST') && (
  <button
    onClick={() => navigate('/host-bookings')}
    className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
  >
    Bookings
  </button>
)}
      <div className="flex items-center gap-4">
       
        {user && <span className="text-sm">Hi, {user.name.split(' ')[0]}</span>}
        {token && (
  <button
    onClick={() => navigate('/my-bookings')}
    className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
  >
    My Bookings
  </button>
)}

        {token ? (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
