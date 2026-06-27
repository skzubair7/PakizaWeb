const Product = require('../models/Product');

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, sortBy } = req.query;

    let query = { isActive: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.finalPrice = {};
      if (minPrice) query.finalPrice.$gte = parseInt(minPrice);
      if (maxPrice) query.finalPrice.$lte = parseInt(maxPrice);
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let products = await Product.find(query).populate('category');

    // Sort
    if (sortBy === 'price-low') {
      products.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => b.finalPrice - a.finalPrice);
    } else if (sortBy === 'newest') {
      products.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.status(200).json({ products, count: products.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create Product (Admin)
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, discount, images, sizes, colors } = req.body;

    if (!name || !description || !category || !price || !images || images.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const discountAmount = (price * (discount || 0)) / 100;
    const finalPrice = price - discountAmount;

    const product = new Product({
      name,
      description,
      category,
      price,
      discount: discount || 0,
      finalPrice,
      images,
      sizes: sizes || [],
      colors: colors || [],
      totalStock: sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || 0,
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Product (Admin)
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, discount, images, sizes, colors, isActive } = req.body;

    const discountAmount = (price * (discount || 0)) / 100;
    const finalPrice = price - discountAmount;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        discount: discount || 0,
        finalPrice,
        images,
        sizes,
        colors,
        totalStock: sizes?.reduce((sum, s) => sum + (s.stock || 0), 0) || 0,
        isActive,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Product (Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
