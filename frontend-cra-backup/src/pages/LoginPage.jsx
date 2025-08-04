import React, { useState } from 'react';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'DRIVER' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Call login API here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login to ParkEasy</h2>

        <label className="block mb-2 text-sm font-semibold">Role</label>
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="DRIVER">Driver</option>
          <option value="HOST">Host</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
