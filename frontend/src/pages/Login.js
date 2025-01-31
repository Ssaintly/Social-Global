  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { FaUserAlt, FaLock } from "react-icons/fa"; // React Icons
  import authService from "../api/authService";

  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await authService.login({ email, password });
        localStorage.setItem("token", response.token); // Store token
        navigate("/profile"); // Redirect to profile
      } catch (error) {
        alert("Login failed!");
      }
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg mt-2">
                <FaUserAlt className="ml-3 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg mt-2">
                <FaLock className="ml-3 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300">
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-700">Register</Link></p>
          </div>
        </div>
      </div>
    );
  };

  export default Login;
