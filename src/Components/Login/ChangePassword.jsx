import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // adjust the path if needed
import { useNavigate, Navigate } from 'react-router-dom';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const API_KEY = 'AIzaSyBiaxomOFD2z_BkztXkMcUo7i-nlMCvU1s'; // Replace with your API key

  // ✅ If user is not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setMessage('❌ Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          idToken: token,
          newPassword: newPassword,
          returnSecureToken: true,
        }
      );

      console.log('✅ Password changed:', response.data);
      setMessage('✅ Password updated successfully. Please login again.');
      setLoading(false);

      // Logout after password change
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('❌ Error changing password:', error.response?.data || error);
      setMessage('❌ Failed to update password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="chngepass">
      <h2 className="chngepass-text">Change Password</h2>

      {message && (
        <div className="bg-yellow-500 text-black p-3 mb-4 rounded-md text-center font-semibold">
          {message}
        </div>
      )}

      <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="p-3 rounded-md text-black"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-white text-purple-950 font-bold py-2 px-4 rounded-md hover:bg-gray-100 transition"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;