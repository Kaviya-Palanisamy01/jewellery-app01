import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

const JewelryCard = ({ image, name, price, tag, productId }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = () => {
    try {
      setAddingToCart(true);
      addToCart({ productId, name, price, image, quantity: 1 });
      alert('Added to cart successfully!');
      // Optionally navigate to cart
      // navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist({ productId, name, price, image });
    alert('Added to wishlist!');
  };

  return (
    <div className="jewelry-card">
      <img src={image} alt={name} className="jewelry-image" />
      <div className="jewelry-info">
        <h4>{name}</h4>
        {tag && <span className="bestseller-tag">{tag}</span>}
        <p>₹ {price}</p>
        <button 
          className="order-btn" 
          onClick={handleAddToCart}
          disabled={addingToCart}
        >
          {addingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
        <button 
          className="order-btn" 
          style={{ marginLeft: 8, background: '#f5c542' }} 
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default JewelryCard;
