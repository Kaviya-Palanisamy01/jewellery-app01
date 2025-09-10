import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String },
}, { timestamps: true });

// Seed sample products if none exist
productSchema.statics.seedSampleProducts = async function() {
  const jewelry = [
    {
      name: 'Diamond Solitaire Ring',
      description: 'Elegant diamond solitaire ring in 18K gold.',
      price: 25000,
      quantity: 5,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      category: 'Rings',
      subcategory: 'Diamond'
    },
    {
      name: 'Pearl Necklace',
      description: 'Classic freshwater pearl necklace.',
      price: 12000,
      quantity: 8,
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      category: 'Necklaces',
      subcategory: 'Pearl'
    },
    {
      name: 'Gold Hoop Earrings',
      description: 'Timeless 22K gold hoop earrings.',
      price: 8000,
      quantity: 12,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      category: 'Earrings',
      subcategory: 'Gold'
    },
    {
      name: 'Emerald Pendant',
      description: 'Stunning emerald pendant with gold chain.',
      price: 18000,
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
      category: 'Necklaces',
      subcategory: 'Emerald'
    },
    {
      name: 'Sapphire Stud Earrings',
      description: 'Blue sapphire stud earrings in white gold.',
      price: 9500,
      quantity: 10,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      category: 'Earrings',
      subcategory: 'Sapphire'
    },
    {
      name: 'Ruby Bracelet',
      description: 'Delicate ruby bracelet with adjustable clasp.',
      price: 15000,
      quantity: 6,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
      category: 'Bracelets',
      subcategory: 'Ruby'
    },
    {
      name: 'Platinum Wedding Band',
      description: 'Classic platinum wedding band for all occasions.',
      price: 20000,
      quantity: 7,
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80',
      category: 'Rings',
      subcategory: 'Platinum'
    },
    {
      name: 'Opal Drop Earrings',
      description: 'Opal drop earrings with rose gold setting.',
      price: 11000,
      quantity: 9,
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80',
      category: 'Earrings',
      subcategory: 'Opal'
    },
    {
      name: 'Silver Charm Bracelet',
      description: 'Sterling silver charm bracelet with heart pendant.',
      price: 6000,
      quantity: 15,
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      category: 'Bracelets',
      subcategory: 'Silver'
    }
  ];
  for (const item of jewelry) {
    await this.updateOne(
      { name: item.name },
      { $set: item },
      { upsert: true }
    );
  }
};

const Product = mongoose.model('Product', productSchema);

export default Product; 