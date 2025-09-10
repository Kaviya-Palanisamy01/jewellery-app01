import React from 'react';
import './CSS/Front.css';
import logo from '../assests/ziva.png';
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    <div className="front-container">
      <img src={logo} alt="Ziva Jewelry" className="front-image" />
      <h1 className="front-title">Ziva</h1>
      <p className="front-tagline">Discover exquisite jewelry that captures your unique style and elegance</p>
      <div className="button-group">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
      </div>
    </div>
  );
};

export default Body;
