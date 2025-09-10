import React, { useState } from 'react';
import { useCart } from './CartContext';
import './CSS/Jewelry.css';
const placeholder = require('../assests/necklace1.jpg');

const jewellerySets = [
  { name: 'Bridal Diamond Set', image: placeholder, price: 150000, subcategory: 'Diamond' },
  { name: 'Traditional Gold Set', image: placeholder, price: 120000, subcategory: 'Gold' },
  { name: 'Pearl Wedding Set', image: placeholder, price: 85000, subcategory: 'Pearl' },
  { name: 'Silver Party Set', image: placeholder, price: 45000, subcategory: 'Silver' }
];

const subcategories = ['All', 'Gold', 'Silver', 'Pearl', 'Diamond'];

const JewellerySet = () => {
  const [quantities, setQuantities] = useState(Array(jewellerySets.length).fill(1));
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const { addToCart } = useCart();

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleAddToCart = (set, quantity) => {
    addToCart({ ...set, quantity });
  };

  const handlePlaceOrder = (set, quantity) => {
    alert(`Order placed: ${quantity} x ${set.name}`);
  };

  const filteredSets = selectedSubcat === 'All' ? jewellerySets : jewellerySets.filter(set => set.subcategory === selectedSubcat);
  const displaySets = filteredSets.slice(0, 4);

  return (
    <div className="home-page">
      <section className="jewelry-grid-section">
        <h2>Jewellery Sets Collection</h2>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="subcategory-select">Subcategory: </label>
          <select id="subcategory-select" value={selectedSubcat} onChange={e => setSelectedSubcat(e.target.value)}>
            {subcategories.map(subcat => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
        <div className="jewelry-grid">
          {displaySets.map((set, idx) => (
            <div className="jewelry-card" key={set.name}>
              <img src={set.image} alt={set.name} className="jewelry-image" />
              <div className="jewelry-info">
                <h4>{set.name}</h4>
                <p className="jewelry-price">₹ {set.price}</p>
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
                  <button className="order-btn" onClick={() => handleAddToCart(set, quantities[idx])}>Add to Cart</button>
                  <button className="order-btn place-order" onClick={() => handlePlaceOrder(set, quantities[idx])}>Place Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JewellerySet; 