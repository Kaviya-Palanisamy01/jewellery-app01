import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/AdminAuth.css';

const AdminAuth = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simple admin credentials (in production, use proper authentication)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (credentials.username === ADMIN_CREDENTIALS.username && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      // Create a simple JWT-like token for demo purposes
      const tokenPayload = {
        username: credentials.username,
        isAdmin: true,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours from now
      };
      
      // Create a simple base64 encoded token (for demo - use proper JWT in production)
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = btoa(JSON.stringify(tokenPayload));
      const signature = btoa('demo-signature'); // In production, use proper signing
      const token = `${header}.${payload}.${signature}`;
      
      // Store admin session data that matches AdminProtectedRoute expectations
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminData', JSON.stringify({
        username: credentials.username,
        isAdmin: true
      }));
      localStorage.setItem('isAdmin', 'true');
      
      navigate('/admin');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-card card-modern">
        <div className="admin-auth-header">
          <h2>🔐 Admin Login</h2>
          <p>Access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-auth-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="input-modern"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="input-modern"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" className="btn-modern admin-login-btn">
            Login to Admin Panel
          </button>

          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Username: <code>admin</code></p>
            <p>Password: <code>admin123</code></p>
          </div>
        </form>

        <button 
          className="back-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminAuth;
