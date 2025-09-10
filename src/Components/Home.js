import React, { useState, useEffect } from 'react';
import './CSS/Jewelry.css';
import { useCart } from './CartContext';
import api from '../api';
import FilterSection from './FilterSection';
import { useWishlist } from './WishlistContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const data = res.data;
        if (data.success) {
          setProducts(data.data);
          setFilteredProducts(data.data);
          setQuantities(Array(data.data.length).fill(1));
        } else {
          setError('Failed to load products');
        }
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.category && product.category.toLowerCase() === activeCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleAddToCart = (item, quantity) => {
    addToCart({ ...item, quantity });
    alert(`Added ${quantity} x ${item.name} to cart!`);
  };

  const handleAddToWishlist = async (item) => {
    await addToWishlist({ ...item });
    alert('Added to wishlist!');
  };

  if (loading) return (
    <div className="home-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="loading-spinner" style={{ margin: '0 auto 1rem' }}></div>
        <p style={{ fontSize: '1.2rem', color: '#6a1b9a', fontFamily: 'Inter, sans-serif' }}>Loading products...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="home-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="card-modern" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px' }}>
        <p style={{ fontSize: '1.2rem', color: '#e74c3c', fontFamily: 'Inter, sans-serif', marginBottom: '1rem' }}>⚠️ {error}</p>
        <button className="btn-modern" onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="home-page fade-in">
      <FilterSection onCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
      <section className="jewelry-grid-section">
        <h2 className="slide-up" style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          fontWeight: '700', 
          color: '#6a1b9a',
          marginBottom: '3rem',
          fontFamily: 'Inter, sans-serif'
        }}>{activeCategory === 'all' ? 'Featured Jewelry' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Collection`}</h2>
        <div className="jewelry-grid">
          {filteredProducts.map((item, idx) => (
            <div className="jewelry-card scale-in" key={item._id || item.name} style={{ animationDelay: `${idx * 0.1}s` }}>
              <img src={item.image} alt={item.name} className="jewelry-image" />
              <div className="jewelry-info">
                <h4>{item.name}</h4>
                <p className="jewelry-price">₹ {item.price}</p>
                <div className="jewelry-actions">
                  <label>
                    Qty:
                    <input
                      type="number"
                      min="1"
                      value={quantities[idx]}
                      onChange={e => handleQuantityChange(idx, Math.max(1, parseInt(e.target.value) || 1))}
                      className="jewelry-qty-input"
                    />
                  </label>
                  <button className="order-btn" onClick={() => handleAddToCart(item, quantities[idx])}>Add to Cart</button>
                  <button className="order-btn" style={{ 
                    marginLeft: 8, 
                    background: 'linear-gradient(135deg, #f5c542 0%, #f39c12 100%)',
                    boxShadow: '0 4px 15px rgba(245, 197, 66, 0.3)'
                  }} onClick={() => handleAddToWishlist(item)}>Add to Wishlist</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 