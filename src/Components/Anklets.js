import React, { useState } from 'react';
import { useCart } from './CartContext';
import './CSS/Jewelry.css';
const placeholder = require('../assests/necklace1.jpg');

const anklets = [
  { name: 'Traditional Gold Anklet', image: placeholder, price: 15000, subcategory: 'Gold' },
  { name: 'Silver Payal with Bells', image: placeholder, price: 8000, subcategory: 'Silver' },
  { name: 'Pearl and Gold Anklet', image: placeholder, price: 12000, subcategory: 'Pearl' },
  { name: 'Diamond Studded Anklet', image: placeholder, price: 25000, subcategory: 'Diamond' }
];

const subcategories = ['All', 'Gold', 'Silver', 'Pearl', 'Diamond'];

const Anklets = () => {
  const [quantities, setQuantities] = useState(Array(anklets.length).fill(1));
  const [selectedSubcat, setSelectedSubcat] = useState('All');
  const { addToCart } = useCart();

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleAddToCart = (anklet, quantity) => {
    addToCart({ ...anklet, quantity });
  };

  const handlePlaceOrder = (anklet, quantity) => {
    alert(`Order placed: ${quantity} x ${anklet.name}`);
  };

  const filteredAnklets = selectedSubcat === 'All' ? anklets : anklets.filter(anklet => anklet.subcategory === selectedSubcat);
  const displayAnklets = filteredAnklets.slice(0, 4);

  return (
    <div className="home-page">
      <section className="jewelry-grid-section">
        <h2>Anklets Collection</h2>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="subcategory-select">Subcategory: </label>
          <select id="subcategory-select" value={selectedSubcat} onChange={e => setSelectedSubcat(e.target.value)}>
            {subcategories.map(subcat => (
              <option key={subcat} value={subcat}>{subcat}</option>
            ))}
          </select>
        </div>
        <div className="jewelry-grid">
          {displayAnklets.map((anklet, idx) => (
            <div className="jewelry-card" key={anklet.name}>
              <img src={anklet.image} alt={anklet.name} className="jewelry-image" />
              <div className="jewelry-info">
                <h4>{anklet.name}</h4>
                <p className="jewelry-price">₹ {anklet.price}</p>
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
                  <button className="order-btn" onClick={() => handleAddToCart(anklet, quantities[idx])}>Add to Cart</button>
                  <button className="order-btn place-order" onClick={() => handlePlaceOrder(anklet, quantities[idx])}>Place Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Anklets; 