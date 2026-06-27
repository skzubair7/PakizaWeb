const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// All cart routes require authentication
router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addToCart);
router.put('/update/:itemId', authMiddleware, updateCartItem);
router.delete('/remove/:itemId', authMiddleware, removeFromCart);
router.delete('/clear', authMiddleware, clearCart);

module.exports = router;
