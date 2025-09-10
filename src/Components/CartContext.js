import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to get auth token
  const getToken = () => localStorage.getItem('token');

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await (await import('../api')).default.get('/cart');
        const data = res.data;
        if (data.success && data.data && data.data.items) {
          setCart(data.data.items.map(item => ({
            ...item.product,
            productId: item.product._id,
            quantity: item.quantity
          })));
        } else {
          setCart([]);
        }
      } catch (err) {
        setCart([]);
      }
      setLoading(false);
    };
    fetchCart();
  }, []);

  const addToCart = async (item) => {
    try {
      const res = await (await import('../api')).default.post('/cart/add', { productId: item._id || item.productId, quantity: item.quantity || 1 });
      const data = res.data;
      if (data.success && data.data && data.data.items) {
        setCart(data.data.items.map(item => ({
          ...item.product,
          productId: item.product._id,
          quantity: item.quantity
        })));
      }
    } catch (err) {
      // Optionally show error
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await (await import('../api')).default.post('/cart/remove', { productId });
      const data = res.data;
      if (data.success && data.data && data.data.items) {
        setCart(data.data.items.map(item => ({
          ...item.product,
          productId: item.product._id,
          quantity: item.quantity
        })));
      }
    } catch (err) {
      // Optionally show error
    }
  };

  const clearCart = () => {
    setCart([]);
    // Optionally, add backend endpoint to clear cart
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
