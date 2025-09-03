import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
// import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const API_KEY = 'AIzaSyAGSGvt1cjbAlqNTjOLzs0WlRyYbJo1JRw';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const idToken = response.data.idToken;
  login(idToken);
  navigate('/store');
      console.log("✅ User logged in, JWT:", idToken);
    } catch (err) {
      console.error('❌ Login failed:', err);
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center p-4 w-50 mx-auto mt-5">
      <h1 className="fs-4 mt-5 fw-bold">Login</h1>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form className="" onSubmit={handleLogin}>
        <div className="d-flex flex-column mb-4">
          <label className="label">Email</label>
          <input
            type="email"
            placeholder="test@gmail.com"
            className="p-1 border-0  rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="d-flex flex-column mb-4">
          <label className="label">Password</label>
          <input
            type="password"
            placeholder="••••••"
            className="p-1 border-0  rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="btn-container">
          {loading ? (
            <div className="loading">
              <div className="spin"></div>
            </div>
          ) : (
            <button
              type="submit"
              className="border-0 p-1 w-50 fw-bold"
            >
              Login
            </button>
          )}
        </div>
      </form>
      <p className="account">
        Already have an account?{' '}
        <Link to="/signup" className="border-0 p-1 w-50 fw-bold">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginForm;