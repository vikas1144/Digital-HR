import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@123.com' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {!isLoggedIn ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Hello, Admin!</h2>

            <Link to="/post-job">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                ➕ Post Job
              </button>
            </Link>

            <Link to="/employee-dashboard">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 ml-4">
                📊 Employee Analysis
              </button>
            </Link>

            <br />

            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline mt-4"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
