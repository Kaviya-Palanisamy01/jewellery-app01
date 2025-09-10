import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import './CSS/Jewelry.css';
import zivaLogo from '../assests/ziva.png';

const UserDashboard = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/fullstack/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setUser(data.data);
        } else {
          setError('Failed to load user details');
        }
      } catch (err) {
        setError('Failed to load user details');
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <div className="home-page"><p>Loading user details...</p></div>;
  if (error) return <div className="home-page"><p>{error}</p></div>;

  return (
    <div className="home-page" style={{ background: 'linear-gradient(135deg, #f3e7fa 0%, #e3c0f9 100%)', minHeight: '100vh' }}>
      <section className="jewelry-grid-section" style={{ maxWidth: 900, margin: '0 auto', padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 32, background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(191,161,74,0.08)', padding: 32 }}>
          <img src={zivaLogo} alt="User Avatar" style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid #bfa14a', background: '#f7f6f2' }} />
          <div>
            <h2 style={{ margin: 0, color: '#6d2997', fontFamily: 'Pacifico, cursive', fontSize: '2.2rem' }}>Welcome, {user.firstName || user.name || 'User'}!</h2>
            <div style={{ color: '#bfa14a', fontWeight: 500, marginTop: 8 }}>{user.email}</div>
            <div style={{ color: '#555', marginTop: 2 }}>{user.phone}</div>
            <div style={{ color: '#888', marginTop: 2, fontSize: 14 }}>Role: {user.role}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(191,161,74,0.07)', padding: 24 }}>
            <h3 style={{ color: '#6d2997', borderBottom: '2px solid #bfa14a', paddingBottom: 8, marginBottom: 18, fontFamily: 'Georgia, serif' }}>Cart Items</h3>
            {(!cart || cart.length === 0) ? (
              <div style={{ color: '#8d5524', textAlign: 'center' }}>Your cart is empty.</div>
            ) : (
              <ul style={{ paddingLeft: 18 }}>
                {cart.map((item, idx) => (
                  <li key={item.productId || item.name || idx} style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span> <span style={{ color: '#bfa14a' }}>(Qty: {item.quantity})</span> <span style={{ color: '#6d2997' }}>₹{item.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(191,161,74,0.07)', padding: 24 }}>
            <h3 style={{ color: '#6d2997', borderBottom: '2px solid #bfa14a', paddingBottom: 8, marginBottom: 18, fontFamily: 'Georgia, serif' }}>Wishlist Items</h3>
            {(!wishlist || wishlist.length === 0) ? (
              <div style={{ color: '#8d5524', textAlign: 'center' }}>Your wishlist is empty.</div>
            ) : (
              <ul style={{ paddingLeft: 18 }}>
                {wishlist.map((item, idx) => (
                  <li key={item.productId || item.name || idx} style={{ marginBottom: 10 }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span> <span style={{ color: '#6d2997' }}>₹{item.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard; 