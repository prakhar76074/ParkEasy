// src/pages/AuthForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER', // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login';
      const payload = {
        ...form,
        roles: isSignup
          ? form.role.includes(',') ? form.role.split(',') : [form.role]
          : undefined,
      };
  
      const res = await fetch(`http://localhost:8082${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error('Auth failed');
  
      const data = await res.json();
      localStorage.setItem('token', data.token);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      navigate('/spots');
    } catch (err) {
      alert('Authentication failed.');
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
            {isSignup ? 'Create Account' : 'Login'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
              value={form.password}
              onChange={handleChange}
              required
            />

            {isSignup && (
              <select
                name="role"
                className="w-full px-4 py-2 border rounded"
                value={form.role}
                onChange={handleChange}
              >
                <option value="USER">Rent Spots</option>
                <option value="HOST">List Spots</option>
                <option value="USER,HOST">Both</option>
              </select>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {isSignup ? 'Already have an account?' : 'New to ParkEasy?'}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 hover:underline"
            >
              {isSignup ? 'Login here' : 'Create an account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
