import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const res = await api.get('/wishlist');
        const data = res.data;
        if (data.success && data.data && Array.isArray(data.data.items)) {
          // items are populated product docs
          setWishlist(
            data.data.items.map((product) => ({ ...product, productId: product._id }))
          );
        } else {
          setWishlist([]);
        }
      } catch (err) {
        setWishlist([]);
      }
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  const addToWishlist = async (item) => {
    try {
      const productId = item._id || item.productId;
      if (!productId) {
        // Fallback: local-only wishlist for items without backend id (e.g., static pages)
        setWishlist((prev) => {
          if (prev.some((w) => w.name === item.name)) return prev;
          return [...prev, { ...item }];
        });
        return;
      }
      const res = await api.post('/wishlist/add', { productId });
      const data = res.data;
      if (data.success && data.data && Array.isArray(data.data.items)) {
        // items may be populated or ids; handle populated path
        if (typeof data.data.items[0] === 'object') {
          setWishlist(data.data.items.map((p) => ({ ...p, productId: p._id })));
        } else {
          // fallback: re-fetch to get populated docs
          const refreshed = await api.get('/wishlist');
          const rd = refreshed.data;
          if (rd.success && rd.data && Array.isArray(rd.data.items)) {
            setWishlist(rd.data.items.map((p) => ({ ...p, productId: p._id })));
          }
        }
      }
    } catch (err) {
      // no-op
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await api.post('/wishlist/remove', { productId });
      const data = res.data;
      if (data.success && data.data && Array.isArray(data.data.items)) {
        if (typeof data.data.items[0] === 'object') {
          setWishlist(data.data.items.map((p) => ({ ...p, productId: p._id })));
        } else {
          const refreshed = await api.get('/wishlist');
          const rd = refreshed.data;
          if (rd.success && rd.data && Array.isArray(rd.data.items)) {
            setWishlist(rd.data.items.map((p) => ({ ...p, productId: p._id })));
          }
        }
      }
    } catch (err) {
      // no-op
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext); 