import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from location state
    if (location.state && location.state.orderDetails) {
      setOrderDetails(location.state.orderDetails);
    } else {
      // If no order details, redirect to home
      navigate('/home');
    }
  }, [location.state, navigate]);

  const handleContinueShopping = () => {
    navigate('/home');
  };

  const handleViewOrders = () => {
    navigate('/dashboard');
  };

  if (!orderDetails) {
    return (
      <div className="order-confirmation-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-container">
      <div className="order-confirmation-card">
        <div className="success-icon">
          <span>✅</span>
        </div>
        
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="order-info">
            <div className="order-row">
              <span>Order ID:</span>
              <span className="order-id">{orderDetails.orderId}</span>
            </div>
            <div className="order-row">
              <span>Total Amount:</span>
              <span className="order-total">₹{orderDetails.total}</span>
            </div>
            <div className="order-row">
              <span>Items:</span>
              <span>{orderDetails.itemCount} items</span>
            </div>
            <div className="order-row">
              <span>Estimated Delivery:</span>
              <span>3-5 business days</span>
            </div>
          </div>
        </div>

        <div className="order-items">
          <h4>Items Ordered:</h4>
          <div className="items-list">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">Qty: {item.quantity}</span>
                  <span className="item-price">₹{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-secondary" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <button className="btn-primary" onClick={handleViewOrders}>
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
