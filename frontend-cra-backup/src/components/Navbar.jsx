import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      {/* Brand */}
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate('/')}
      >
        ParkEasy
      </div>

      {/* Menu */}
      <div className="flex items-center gap-4">
        {isHost && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1"
            >
              Host Menu <span className="text-xs">▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-blue-600 rounded shadow-lg w-48">
                <button
                  onClick={() => {
                    navigate('/add-spot');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Add New Spot
                </button>
                <button
                  onClick={() => {
                    navigate('/host-spots');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Hosted Spots
                </button>
                <button
                  onClick={() => {
                    navigate('/host-bookings');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Approve / Reject Bookings
                </button>
              </div>
            )}
          </div>
        )}

        {token && (
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            My Bookings
          </button>
        )}

        {user && <span className="text-sm">Hi, {user.name.split(' ')[0]}</span>}

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
