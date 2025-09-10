import React, { useState } from 'react';
import { useCart } from './CartContext';
import './CSS/Jewelry.css';
const placeholder = require('../assests/necklace1.jpg');

const brooches = [
  { name: 'Vintage Diamond Brooch', image: placeholder, price: 45000, subcategory: 'Diamond' },
  { name: 'Pearl Flower Brooch', image: placeholder, price: 18000, subcategory: 'Pearl' },
  { name: 'Gold Butterfly Brooch', image: placeholder, price: 25000, subcategory: 'Gold' },
  { name: 'Silver Crystal Brooch', image: placeholder, price: 15000, subcategory: 'Silver' }
];

const subcategories = ['All', 'Gold', 'Silver', 'Pearl', 'Diamond'];

const Brooch = () => {
  const [quantities, setQuantities] = useState(Array(brooches.length).fill(1));
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const { addToCart } = useCart();

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleAddToCart = (brooch, quantity) => {
    addToCart({ ...brooch, quantity });
  };

  const handlePlaceOrder = (brooch, quantity) => {
    alert(`Order placed: ${quantity} x ${brooch.name}`);
  };

  const filteredBrooches = selectedSubcat === 'All' ? brooches : brooches.filter(brooch => brooch.subcategory === selectedSubcat);
  const displayBrooches = filteredBrooches.slice(0, 4);

  return (
    <div className="home-page">
      <section className="jewelry-grid-section">
        <h2>Brooch Collection</h2>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="subcategory-select">Subcategory: </label>
          <select id="subcategory-select" value={selectedSubcat} onChange={e => setSelectedSubcat(e.target.value)}>
            {subcategories.map(subcat => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
        <div className="jewelry-grid">
          {displayBrooches.map((brooch, idx) => (
            <div className="jewelry-card" key={brooch.name}>
              <img src={brooch.image} alt={brooch.name} className="jewelry-image" />
              <div className="jewelry-info">
                <h4>{brooch.name}</h4>
                <p className="jewelry-price">₹ {brooch.price}</p>
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
                  <button className="order-btn" onClick={() => handleAddToCart(brooch, quantities[idx])}>Add to Cart</button>
                  <button className="order-btn place-order" onClick={() => handlePlaceOrder(brooch, quantities[idx])}>Place Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Brooch; 