import React from 'react';
import './CSS/HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <div className="sale-badge">
          <div className="badge-top">GRAND</div>
          <div className="badge-main">Festive</div>
          <div className="badge-bottom">Sale</div>
        </div>
        
        <div className="hero-center">
          <div className="jewelry-display">
            <img src="/api/placeholder/300/200" alt="Jewelry" className="hero-jewelry" />
          </div>
        </div>
        
        <div className="hero-offers">
          <div className="offer-card">
            <div className="offer-title">CHIC ANKLETS</div>
            <div className="offer-subtitle">now at</div>
            <div className="offer-discount">
              <span className="flat-text">FLAT</span>
              <span className="percentage">10%</span>
              <span className="off-text">OFF</span>
            </div>
            <div className="offer-condition">on orders above ₹2999</div>
            <div className="offer-code">CODE: GRAND10</div>
          </div>
          
          <div className="offer-card">
            <div className="offer-title">CHIC ANKLETS</div>
            <div className="offer-subtitle">now at</div>
            <div className="offer-discount">
              <span className="flat-text">FLAT</span>
              <span className="percentage">15%</span>
              <span className="off-text">OFF</span>
            </div>
            <div className="offer-condition">on orders above ₹3999</div>
            <div className="offer-code">CODE: GRAND15</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
