import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import api from '../api';
import './CSS/Home.css';

const Bracelets = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    api.get('/products', { params: { category: 'Bracelets', limit: 5 } })
      .then(res => {
        const data = res.data;
        if (data.success && data.data) {
          setProducts(data.data);
          setQuantities(Array(data.data.length).fill(1));
        } else {
          setError('Failed to load products');
        }
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleAddToCart = (product, quantity) => {
    addToCart({ ...product, quantity });
  };

  if (loading) return <div className="home-page"><p>Loading products...</p></div>;
  if (error) return <div className="home-page"><p>{error}</p></div>;

  return (
    <div className="home-page">
      <section className="jewelry-grid-section">
        <h2>Bracelets Collection</h2>
        <div className="jewelry-grid">
          {products.map((product, idx) => (
            <div className="jewelry-card" key={product._id || product.name}>
              <img src={product.image} alt={product.name} className="jewelry-image" />
              <div className="jewelry-info">
                <h4>{product.name}</h4>
                <p className="jewelry-price">₹ {product.price}</p>
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
                  <button className="order-btn" onClick={() => handleAddToCart(product, quantities[idx])}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Bracelets; 