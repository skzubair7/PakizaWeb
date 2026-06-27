import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!token || userRole !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [token, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'products') {
        const res = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.products);
      } else if (activeTab === 'categories') {
        const res = await axios.get('http://localhost:5000/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data.categories);
      } else if (activeTab === 'orders') {
        const res = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1>Admin Dashboard</h1>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>

        {/* Content */}
        <div className="admin-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : activeTab === 'products' ? (
            <div className="admin-section">
              <div className="section-header">
                <h2>Products Management</h2>
                <button className="btn btn-primary">
                  <FiPlus /> Add Product
                </button>
              </div>
              <div className="products-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.category.name}</td>
                        <td>Rs {product.finalPrice}</td>
                        <td>{product.totalStock}</td>
                        <td>
                          <button className="action-btn edit">
                            <FiEdit2 />
                          </button>
                          <button className="action-btn delete">
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'categories' ? (
            <div className="admin-section">
              <div className="section-header">
                <h2>Categories Management</h2>
                <button className="btn btn-primary">
                  <FiPlus /> Add Category
                </button>
              </div>
              <div className="categories-grid">
                {categories.map((category) => (
                  <div key={category._id} className="category-item">
                    <div className="category-header">
                      <span className="category-icon">{category.icon}</span>
                      <h3>{category.name}</h3>
                    </div>
                    <p>{category.description}</p>
                    <div className="category-actions">
                      <button className="action-btn edit">
                        <FiEdit2 /> Edit
                      </button>
                      <button className="action-btn delete">
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="admin-section">
              <div className="section-header">
                <h2>Orders Management</h2>
              </div>
              <div className="orders-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order Number</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.user.name}</td>
                        <td>Rs {order.finalAmount}</td>
                        <td>
                          <span className={`status-badge ${order.orderStatus}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td>{order.paymentStatus}</td>
                        <td>
                          <button className="action-btn edit">
                            <FiEdit2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
