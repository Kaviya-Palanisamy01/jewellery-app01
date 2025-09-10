// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Body from './Components/Front';
import Navbar from './Components/Navbar';
import JewelryList from './Components/JewelryList';
import About from './Components/About';
import Creative from './Components/Creative';
import Signature from './Components/Signature';
import Regular from './Components/Regular';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Rings from './Components/Rings';
import Earrings from './Components/Earrings';
import Necklaces from './Components/Necklaces';
import Anklets from './Components/Anklets';
import Bracelets from './Components/Bracelets';
import HairAccessories from './Components/HairAccessories';
import JewellerySet from './Components/JewellerySet';
import Cart from './Components/Cart';
import { CartProvider } from './Components/CartContext';
import { Outlet, useLocation } from 'react-router-dom';
import Wishlist from './Components/Wishlist';
import UserDashboard from './Components/UserDashboard';
import AdminDashboard from './Components/AdminDashboard';
import AdminAuth from './Components/AdminAuth';
import AdminProtectedRoute from './Components/AdminProtectedRoute';
import OrderConfirmation from './Components/OrderConfirmation';

// Admin Layout component (no nav/footer for admin)
function AdminLayout() {
  return <Outlet />;
}

// Layout component
function Layout() {
  const location = useLocation();
  const hideNavAndFooter = ['/', '/login', '/signup', '/admin', '/admin-login'].includes(location.pathname);

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Outlet />
    </>
  );
}

// Main App
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Routes without Layout */}
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-login" element={<AdminAuth />} />

          {/* Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/creative" element={<Creative />} />
            <Route path="/signature" element={<Signature />} />
            <Route path="/regular" element={<Regular />} />
            <Route path="/products" element={<JewelryList />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rings" element={<Rings />} />
            <Route path="/earrings" element={<Earrings />} />
            <Route path="/necklaces" element={<Necklaces />} />
            <Route path="/anklets" element={<Anklets />} />
            <Route path="/bracelets" element={<Bracelets />} />
            <Route path="/hair-accessories" element={<HairAccessories />} />
            <Route path="/jewellery-set" element={<JewellerySet />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
