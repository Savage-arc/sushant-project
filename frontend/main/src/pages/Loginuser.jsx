import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';
import { loginUserApi } from '../api/api';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tabId, setTabId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a unique tab ID if it doesn't exist
    let currentTabId = sessionStorage.getItem('tabId');
    if (!currentTabId) {
      currentTabId = 'tab_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('tabId', currentTabId);
    }
    setTabId(currentTabId);
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError("Email and Password are required.");
      return;
    }

    setError('');
    try {
      const response = await loginUserApi({ email, password });

      if (response.data.success) {
        // Store token with tab-specific key
        const tokenKey = `token_${tabId}`;
        const userKey = `user_${tabId}`;
        
        sessionStorage.setItem(tokenKey, response.data.token);
        sessionStorage.setItem(userKey, JSON.stringify(response.data.user));
        
        toast.success(response?.data?.message);

        const decode = jwtDecode(response?.data?.token);
        setTimeout(() => {
          if (decode.role === "user") {
            navigate('/userdashboard');
          } else {
            navigate('/admindashboard');
          }
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-orange-800 to-red-700 px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-amber-300">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-amber-300 mb-2">🍽️ TasteBite</h1>
          <h2 className="text-2xl font-semibold text-amber-200">Welcome Back</h2>
          <p className="text-amber-300 text-sm mt-2">Sign in to your account</p>
        </div>
        
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white bg-opacity-10 text-white placeholder-amber-200"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm bg-red-900 bg-opacity-30 p-2 rounded">{error}</p>}
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition duration-300 font-semibold text-lg"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-amber-200 mt-6">
          Don't have an account?{' '}
          <Link to="/signupuser" className="text-amber-300 hover:text-amber-100 underline font-semibold">Create Account</Link>
        </p>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold"
          >
            🏠 Back to Homepage
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-amber-300">
            Experience the finest dining at TasteBite Restaurant
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;