import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_KEY = 'AIzaSyAGSGvt1cjbAlqNTjOLzs0WlRyYbJo1JRw';

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const { idToken } = response.data;
      console.log('✅ User signed up, JWT:', idToken);

      setLoading(false);
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data?.error?.message || err.message);
setError(err.response?.data?.error?.message || 'Signup failed.');

      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center p-4 w-50 mx-auto mt-5">
      <h1 className="fs-4 mt-5 fw-bold">Sign Up</h1>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form className="form" onSubmit={handleSignup}>
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
              Sign Up
            </button>
          )}
        </div>
      </form>

      <p className="account">
        Already have an account?{' '}
        <Link to="/login" className="border-0 p-1 w-50 fw-bold">Login</Link>
      </p>
    </div>
  );
};

export default Signup;