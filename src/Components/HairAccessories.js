import React, { useState } from 'react';
import { useCart } from './CartContext';
import './CSS/Jewelry.css';
const placeholder = require('../assests/necklace1.jpg');

const hairAccessories = [
  { name: 'Diamond Hair Pin Set', image: placeholder, price: 28000, subcategory: 'Diamond' },
  { name: 'Gold Hair Comb', image: placeholder, price: 22000, subcategory: 'Gold' },
  { name: 'Pearl Hair Clips', image: placeholder, price: 15000, subcategory: 'Pearl' },
  { name: 'Silver Hair Band', image: placeholder, price: 12000, subcategory: 'Silver' }
];

const subcategories = ['All', 'Gold', 'Silver', 'Pearl', 'Diamond'];

const HairAccessories = () => {
  const [quantities, setQuantities] = useState(Array(hairAccessories.length).fill(1));
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const { addToCart } = useCart();

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleAddToCart = (accessory, quantity) => {
    addToCart({ ...accessory, quantity });
  };

  const handlePlaceOrder = (accessory, quantity) => {
    alert(`Order placed: ${quantity} x ${accessory.name}`);
  };

  const filteredAccessories = selectedSubcat === 'All' ? hairAccessories : hairAccessories.filter(accessory => accessory.subcategory === selectedSubcat);
  const displayAccessories = filteredAccessories.slice(0, 4);

  return (
    <div className="home-page">
      <section className="jewelry-grid-section">
        <h2>Hair Accessories Collection</h2>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="subcategory-select">Subcategory: </label>
          <select id="subcategory-select" value={selectedSubcat} onChange={e => setSelectedSubcat(e.target.value)}>
            {subcategories.map(subcat => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
        <div className="jewelry-grid">
          {displayAccessories.map((accessory, idx) => (
            <div className="jewelry-card" key={accessory.name}>
              <img src={accessory.image} alt={accessory.name} className="jewelry-image" />
              <div className="jewelry-info">
                <h4>{accessory.name}</h4>
                <p className="jewelry-price">₹ {accessory.price}</p>
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
                  <button className="order-btn" onClick={() => handleAddToCart(accessory, quantities[idx])}>Add to Cart</button>
                  <button className="order-btn place-order" onClick={() => handlePlaceOrder(accessory, quantities[idx])}>Place Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HairAccessories; 