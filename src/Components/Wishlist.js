import React from 'react';
import { useWishlist } from './WishlistContext';
import './CSS/Jewelry.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="home-page">
      <section className="jewelry-grid-section">
        <h2>Your Wishlist</h2>
        {(!wishlist || wishlist.length === 0) ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', fontSize: '1.3rem', color: '#8d5524', fontWeight: 500 }}>
            Your wishlist is empty.
          </div>
        ) : (
          <div className="jewelry-grid">
            {wishlist.map((item, idx) => (
              <div className="jewelry-card" key={item.productId || item.name || idx}>
                <img src={item.image} alt={item.name} className="jewelry-image" />
                <div className="jewelry-info">
                  <h4>{item.name}</h4>
                  <p className="jewelry-price">₹ {item.price}</p>
                  <button className="order-btn" onClick={() => removeFromWishlist(item.productId || item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Wishlist; 