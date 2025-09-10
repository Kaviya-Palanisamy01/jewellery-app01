// Load environment variables
import dotenv from 'dotenv';
dotenv.config(); // This should be the FIRST import

// Importation
import connectdb from "./db/db.js";
import express from 'express';
import cors from 'cors';
import route from "./routes/routes.js";
import mongoose from 'mongoose';
import axios from 'axios';
import Product from './model/productModel.js';

// Declaration
const PORT = process.env.PORT || 5000;
const app = express();

// Function call
connectdb();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/fullstack', route);

app.get('/test-db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send('MongoDB connection is working!');
  } catch (err) {
    res.status(500).send('MongoDB connection failed: ' + err.message);
  }
});

// Seed products if needed
Product.seedSampleProducts();

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
