import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const domainPattern = /^[a-zA-Z0-9._%+-]+@talentmesh\.com$/;

    if (!domainPattern.test(email)) {
      setError('Please use a valid @talentmesh.com email address.');
      return;
    }

    // Here you can add your API validation logic
    // For demo: accept any password if email matches
    console.log("Email:", email, "Password:", password);

    // Set login status in localStorage
    localStorage.setItem("isLoggedIn", "true");

    setError('');
    navigate('/dashboard'); // redirect after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Welcome Employee</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-blue-700 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@talentmesh.com"
                className="w-full border border-blue-300 rounded px-3 py-2 outline-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-blue-700 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-blue-300 rounded px-3 py-2 outline-blue-500"
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-between items-center text-sm text-blue-700">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="accent-blue-600" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="hover:underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-all duration-200 font-semibold"
            >
              Sign In
            </button>

            <p className="text-sm text-center mt-4 text-blue-700">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center p-4 bg-blue-200">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="login"
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
