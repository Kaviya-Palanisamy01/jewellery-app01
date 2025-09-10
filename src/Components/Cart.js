import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/Home.css';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart = [], removeFromCart, clearCart } = useCart() || {};
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const getTotal = () => (cart || []).reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!cart || cart.length === 0) return;
    
    setIsPlacingOrder(true);
    
    try {
      // Generate a unique order ID
      const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // Prepare order details
      const orderDetails = {
        orderId,
        items: cart,
        total: getTotal(),
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        orderDate: new Date().toISOString(),
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear the cart after successful order
      clearCart();
      
      // Navigate to order confirmation page with order details
      navigate('/order-confirmation', { 
        state: { orderDetails },
        replace: true 
      });
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="home-page">
      <section className="cake-grid-section">
        <h2>Your Cart</h2>
        {!cart || cart.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', fontSize: '1.3rem', color: '#8d5524', fontWeight: 500 }}>
            Your cart is empty.
          </div>
        ) : (
          <div className="cake-grid">
            {cart.map((item, idx) => (
              <div className="cake-card" key={item.productId || idx}>
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cake-info">
                  <h4>{item.name}</h4>
                  <p className="cake-price">₹ {item.price} x {item.quantity}</p>
                  <button className="order-btn" onClick={() => removeFromCart(item.productId || item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart && cart.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <h3>Total: ₹ {getTotal()}</h3>
            <button 
              className="place-order-btn" 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              style={{
                marginTop: '1rem',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: isPlacingOrder 
                  ? 'linear-gradient(135deg, #ccc 0%, #999 100%)' 
                  : 'linear-gradient(135deg, #ff1493 0%, #ff69b4 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: isPlacingOrder ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 20, 147, 0.3)',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (!isPlacingOrder) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 20, 147, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isPlacingOrder) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 20, 147, 0.3)';
                }
              }}
            >
              {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart; 