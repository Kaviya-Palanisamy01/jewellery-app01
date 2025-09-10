import React, { useEffect, useState } from 'react';
import api from '../api';

const initialProduct = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  image: '',
  category: '',
  subcategory: ''
};

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialProduct);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form, { withCredentials: true });
        setEditingId(null);
      } else {
        await api.post('/products', form, { withCredentials: true });
      }
      setForm(initialProduct);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setLoading(true);
    try {
      await api.delete(`/products/${id}`, { withCredentials: true });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h2>Admin Product Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <input name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="Subcategory" />
        <button type="submit" disabled={loading}>{editingId ? 'Update' : 'Add'} Product</button>
        {editingId && <button type="button" onClick={() => { setForm(initialProduct); setEditingId(null); }}>Cancel</button>}
      </form>
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Description</th><th>Price</th><th>Qty</th><th>Category</th><th>Subcategory</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.category}</td>
              <td>{p.subcategory}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductManager; 