import React, { useState, useEffect } from 'react';
import api from '../api';
import './CSS/AdminDashboard.css';

const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'user',
    isActive: true
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/users');
      if (response.data.success) {
        // Transform database users to include additional fields for display
        const transformedUsers = response.data.data.map(user => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`,
          totalOrders: Math.floor(Math.random() * 15) + 1, // Random orders for demo
          totalSpent: Math.floor(Math.random() * 80000) + 10000, // Random spending
          lastOrderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          favoriteCategory: ['Gold Earrings', 'Diamond Rings', 'Silver Bracelets', 'Gold Necklaces', 'Diamond Earrings'][Math.floor(Math.random() * 5)],
          address: user.address || `${Math.floor(Math.random() * 999) + 1} Sample Street, City, State ${Math.floor(Math.random() * 999999) + 100000}`
        }));
        setCustomers(transformedUsers);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Mock data for demo purposes
      setCustomers([
        {
          _id: '1',
          name: 'Sumathi',
          email: 'sumathi@gmail.com',
          phone: '+91 9876543210',
          address: '123 Anna Nagar, Chennai, Tamil Nadu 600040',
          role: 'user',
          isActive: true,
          createdAt: '2024-01-15',
          totalOrders: 8,
          totalSpent: 45670,
          lastOrderDate: '2024-03-10',
          favoriteCategory: 'Gold Earrings'
        },
        {
          _id: '2',
          name: 'Priya Sharma',
          email: 'priya.sharma@gmail.com',
          phone: '+91 9876543211',
          address: '456 Banjara Hills, Hyderabad, Telangana 500034',
          role: 'user',
          isActive: true,
          createdAt: '2024-02-10',
          totalOrders: 5,
          totalSpent: 28900,
          lastOrderDate: '2024-03-05',
          favoriteCategory: 'Diamond Rings'
        },
        {
          _id: '3',
          name: 'Kavya Reddy',
          email: 'kavya.reddy@gmail.com',
          phone: '+91 9876543212',
          address: '789 Koramangala, Bangalore, Karnataka 560095',
          role: 'user',
          isActive: true,
          createdAt: '2024-01-20',
          totalOrders: 12,
          totalSpent: 67800,
          lastOrderDate: '2024-03-12',
          favoriteCategory: 'Gold Necklaces'
        },
        {
          _id: '4',
          name: 'Meera Patel',
          email: 'meera.patel@gmail.com',
          phone: '+91 9876543213',
          address: '321 Satellite, Ahmedabad, Gujarat 380015',
          role: 'user',
          isActive: true,
          createdAt: '2024-02-05',
          totalOrders: 3,
          totalSpent: 15600,
          lastOrderDate: '2024-02-28',
          favoriteCategory: 'Silver Bracelets'
        },
        {
          _id: '5',
          name: 'Anjali Singh',
          email: 'anjali.singh@gmail.com',
          phone: '+91 9876543214',
          address: '654 Connaught Place, New Delhi, Delhi 110001',
          role: 'user',
          isActive: true,
          createdAt: '2024-01-30',
          totalOrders: 7,
          totalSpent: 38900,
          lastOrderDate: '2024-03-08',
          favoriteCategory: 'Diamond Earrings'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        firstName: formData.name.split(' ')[0] || formData.name,
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        role: formData.role,
        password: editingCustomer ? undefined : 'TempPass123!', // Default password for new users
        isActive: formData.isActive
      };
      
      if (editingCustomer) {
        await api.put(`/users/${editingCustomer._id}`, submitData);
        alert('Customer updated successfully!');
      } else {
        await api.post('/users', submitData);
        alert('Customer created successfully!');
      }
      resetForm();
      fetchCustomers();
    } catch (error) {
      alert('Error saving customer: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || '',
      role: customer.role || 'user',
      isActive: customer.isActive !== false
    });
    setShowForm(true);
  };

  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/users/${customerId}`);
        alert('Customer deleted successfully!');
        fetchCustomers();
      } catch (error) {
        alert('Error deleting customer: ' + error.message);
      }
    }
  };

  const handleStatusToggle = async (customer) => {
    try {
      await api.put(`/users/${customer._id}`, {
        ...customer,
        isActive: !customer.isActive
      });
      fetchCustomers();
    } catch (error) {
      alert('Error updating customer status: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      role: 'user',
      isActive: true
    });
    setEditingCustomer(null);
    setShowForm(false);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div className="customer-manager">
      <div className="manager-header">
        <h2>Customer Management</h2>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern search-input"
            />
          </div>
          <button 
            className="btn-modern add-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Customer
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="customer-form-modal card-modern">
            <div className="modal-header">
              <h3>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="customer-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-modern"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-modern"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-modern"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="input-modern"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-modern"
                  rows="3"
                  placeholder="Customer address..."
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  Active Account
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-modern">
                  {editingCustomer ? 'Update Customer' : 'Create Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Favorite Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer._id} className={!customer.isActive ? 'inactive-row' : ''}>
                <td>
                  <div className="customer-name">
                    <div className="customer-avatar">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    {customer.name}
                  </div>
                </td>
                <td>{customer.email}</td>
                <td>{customer.phone || 'N/A'}</td>
                <td>
                  <div className="customer-address" title={customer.address}>
                    {customer.address ? customer.address.substring(0, 30) + '...' : 'N/A'}
                  </div>
                </td>
                <td>
                  <span className="orders-count">
                    {customer.totalOrders || 0} orders
                  </span>
                </td>
                <td>
                  <span className="total-spent">
                    ₹{customer.totalSpent ? customer.totalSpent.toLocaleString() : '0'}
                  </span>
                </td>
                <td>
                  <span className="favorite-category">
                    {customer.favoriteCategory || 'N/A'}
                  </span>
                </td>
                <td>
                  <button
                    className={`status-toggle ${customer.isActive ? 'active' : 'inactive'}`}
                    onClick={() => handleStatusToggle(customer)}
                  >
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <div className="table-actions">
                    <button 
                      className="btn-edit-small"
                      onClick={() => handleEdit(customer)}
                      title="Edit Customer"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-delete-small"
                      onClick={() => handleDelete(customer._id)}
                      title="Delete Customer"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="empty-state">
          <h3>No customers found</h3>
          <p>{searchTerm ? 'Try adjusting your search terms.' : 'Start by adding your first customer!'}</p>
        </div>
      )}

      <div className="customers-summary">
        <div className="summary-card">
          <h4>Total Customers</h4>
          <p>{customers.length}</p>
        </div>
        <div className="summary-card">
          <h4>Active Customers</h4>
          <p>{customers.filter(c => c.isActive).length}</p>
        </div>
        <div className="summary-card">
          <h4>Admin Users</h4>
          <p>{customers.filter(c => c.role === 'admin').length}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerManager;
