import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductManager from './ProductManager';
import CustomerManager from './CustomerManager';
import AdminAnalytics from './AdminAnalytics';
import './CSS/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManager />;
      case 'customers':
        return <CustomerManager />;
      case 'analytics':
        return <AdminAnalytics />;
      default:
        return <ProductManager />;
    }
  };

  return (
    <div className="admin-dashboard fade-in">
      <div className="admin-header">
        <div className="header-content">
          <span className="home-icon" onClick={handleHomeClick}>🏠</span>
          <h1 className="admin-title">
            Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};


export default AdminDashboard;