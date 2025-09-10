import express from 'express'
import { registerUber, login, getMe, activateAccount } from '../controller/authController.js';
import { protect } from '../middleware/auth.js';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, getWishlist, addToWishlist, removeFromWishlist, getCart, addToCart, removeFromCart, getAllUsers, getUserById, updateUser, deleteUser, createUser } from '../controller/controller.js';

 const route = express.Router();
 route.post("/signup", registerUber)
 route.post("/login", login)
 route.post("/activate-account", activateAccount)
 route.get("/me", protect, getMe)
 route.post('/products', protect, createProduct); // Admin only
 route.get('/products', getProducts);
 route.get('/products/:id', getProductById);
 route.put('/products/:id', protect, updateProduct); // Admin only
 route.delete('/products/:id', protect, deleteProduct); // Admin only
 route.get('/wishlist', protect, getWishlist);
 route.post('/wishlist/add', protect, addToWishlist);
 route.post('/wishlist/remove', protect, removeFromWishlist);
 route.get('/cart', protect, getCart);
 route.post('/cart/add', protect, addToCart);
 route.post('/cart/remove', protect, removeFromCart);

 // User management routes for Admin
 route.get('/users', protect, getAllUsers); // Admin only
 route.get('/users/:id', protect, getUserById); // Admin only
 route.post('/users', protect, createUser); // Admin only
 route.put('/users/:id', protect, updateUser); // Admin only
 route.delete('/users/:id', protect, deleteUser); // Admin only

 export default route;