import React, { useState } from 'react';
import './CSS/Signup.css';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role;


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { ...form, role });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
      }
      const userRole = res.data?.user?.role;
      if (userRole === 'admin') {
        setForm({ email: '', password: '' });
        navigate('/admin'); // AdminProductManager.js
      } else {
        setForm({ email: '', password: '' });
        navigate('/home');
      }
    } catch (error) {
      // Improved error handling
      if (error.response && error.response.data && error.response.data.error) {
        alert('Error: ' + error.response.data.error);
      } else if (error.response && error.response.data && error.response.data.message) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Login failed. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
