import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './CSS/FilterSection.css';

const FilterSection = ({ onCategoryChange, activeCategory }) => {
  const toggleFilter = (filterName) => {
    onCategoryChange(filterName);
  };

  const filterOptions = [
    { key: 'all', label: 'ALL' },
    { key: 'necklaces', label: 'NECKLACES' },
    { key: 'bracelets', label: 'BRACELETS' },
    { key: 'earrings', label: 'EARRINGS' },
    { key: 'rings', label: 'RINGS' },
    { key: 'mens', label: 'MENS' },
    { key: 'mangalsutra', label: 'MANGALSUTRA' }
  ];

  const sortOptions = ['Featured', 'Best Selling', 'Price: Low to High', 'Price: High to Low', 'Newest'];

  return (
    <div className="filter-section">
      <div className="category-title">
        <h2>SHOP BY CATEGORY</h2>
      </div>
      <div className="filter-container">
        <div className="filter-items">
          {filterOptions.map((filter) => (
            <div 
              key={filter.key}
              className={`filter-item ${activeCategory === filter.key ? 'active' : ''}`}
              onClick={() => toggleFilter(filter.key)}
            >
              <span>{filter.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
