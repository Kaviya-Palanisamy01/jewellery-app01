import React, { useState } from 'react'
import './CSS/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from 'react-icons/fa';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import zivaLogo from '../assests/ziva.png';

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
  const safeCart = Array.isArray(cart) ? cart : [];
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>

      {/* Main Navbar */}
      <div className='navbar giva-navbar'>
        <div className="navbar-container">
          <div className="nav-center">
            <div className="brand-section">
              <img src={zivaLogo} alt="Ziva Logo" className='nav-logo-giva' />
              <h1 className='nav-title-giva'>ZIVA</h1>
            </div>
            
            <div className='nav-search-giva'>
              <input 
                type='text' 
                placeholder='Search "Pure Gold Jewellery"' 
                className='search-input-giva'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className='search-icon-giva' />
            </div>
          </div>

          <div className='nav-right-giva'>
            <div className='nav-icon-group'>
              <div className='nav-icon-item' onClick={() => navigate('/dashboard')}>
                <FaUser className='nav-icon-giva' />
                <span className='nav-icon-label'>ACCOUNT</span>
              </div>
              <div className='nav-icon-item' onClick={() => navigate('/wishlist')}>
                <FaHeart className='nav-icon-giva' />
                <span className='nav-icon-label'>WISHLIST</span>
                {safeWishlist?.length > 0 && <span className='nav-badge-giva'>{safeWishlist.length}</span>}
              </div>
              <div className='nav-icon-item' onClick={() => navigate('/cart')}>
                <FaShoppingCart className='nav-icon-giva' />
                <span className='nav-icon-label'>CART</span>
                {safeCart?.length > 0 && <span className='nav-badge-giva'>{safeCart.length}</span>}
              </div>
              <div className='nav-icon-item' onClick={() => navigate('/admin-login')}>
                <FaUser className='nav-icon-giva' />
                <span className='nav-icon-label'>ADMIN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Navbar