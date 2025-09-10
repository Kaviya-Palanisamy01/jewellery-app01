import React, { useState } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const ActivateAccount = () => {
  const { userId } = useParams();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleActivate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/activate-account', { userId });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Activation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Account Activation</h2>
      <button onClick={handleActivate} disabled={loading} className="auth-btn">
        {loading ? 'Activating...' : 'Activate Account'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ActivateAccount; 