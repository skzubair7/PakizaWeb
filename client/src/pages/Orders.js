import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPackage, FiTruck, FiCheckCircle } from 'react-icons/fi';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/login');
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/user/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.orders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle className="status-icon" />;
      case 'shipped':
        return <FiTruck className="status-icon" />;
      default:
        return <FiPackage className="status-icon" />;
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <div className="empty-content">
          <p className="empty-icon">📦</p>
          <h2>No Orders Yet</h2>
          <p>Start shopping to place your first order</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>My Orders</h1>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.orderNumber}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status">
                  {getStatusIcon(order.orderStatus)}
                  <span className={`status-badge ${order.orderStatus}`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="order-items">
                <h4>Items</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <img
                      src={item.product.images[0] || 'https://via.placeholder.com/80'}
                      alt={item.product.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80';
                      }}
                    />
                    <div className="item-details">
                      <p className="item-name">{item.product.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">Rs {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-totals">
                  <p>
                    <strong>Total:</strong> Rs {order.finalAmount}
                  </p>
                  <p>
                    <strong>Payment:</strong>
                    <span className={`payment-status ${order.paymentStatus}`}>
                      {order.paymentStatus.toUpperCase()}
                    </span>
                  </p>
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
