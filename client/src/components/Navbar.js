import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">Pakiza</span>
        </Link>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search: Nakab under 800, Naira dress..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            <FiSearch />
          </button>
        </form>

        {/* Desktop Menu */}
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          
          {token ? (
            <>
              {userRole === 'admin' && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
              <Link to="/profile" className="nav-link">
                <FiUser /> Profile
              </Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link signup-link">Sign Up</Link>
            </>
          )}

          <Link to="/cart" className="nav-link cart-icon">
            <FiShoppingCart />
            <span className="cart-badge">0</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="nav-toggle">
          <Link to="/cart" className="mobile-cart">
            <FiShoppingCart />
          </Link>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="mobile-link" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          {token ? (
            <>
              {userRole === 'admin' && (
                <Link to="/admin" className="mobile-link" onClick={() => setMenuOpen(false)}>
                  Admin
                </Link>
              )}
              <Link to="/profile" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <Link to="/orders" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="mobile-link logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
