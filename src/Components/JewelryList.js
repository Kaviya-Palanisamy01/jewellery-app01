import React, { useEffect, useState } from 'react';
import JewelryCard from './JewelryCard';
import './CSS/Jewelry.css';
import api from '../api';

const JewelryList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.data || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="jewelry-page">
      <aside className="filter-sidebar">
        <h3>FILTERS</h3>
        <div>
          <label><input type="checkbox" /> Gold</label><br />
          <label><input type="checkbox" /> Silver</label><br />
          <label><input type="checkbox" /> Diamond</label><br />
          <label><input type="checkbox" /> Pearl</label>
        </div>
        <hr />
        <h4>PRODUCTS</h4>
        <ul>
          <li>Rings</li>
          <li>Necklaces</li>
          <li>Earrings</li>
          <li>Bracelets</li>
        </ul>
      </aside>

      <main className="jewelry-grid">
        {loading ? <div>Loading...</div> : products.filter(p => p.category === 'Rings').map((jewelry) => (
          <JewelryCard key={jewelry._id} {...jewelry} productId={jewelry._id} />
        ))}
      </main>
    </div>
  );
};

export default JewelryList;
