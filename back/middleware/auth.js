const jwt = require('jsonwebtoken');
const Product = require('../models/product');
const User = require('../models/user');

exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); 
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

exports.isOwnerMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        console.log('Decoded Token:', req.user);

        const productId = req.params.id;
        const product = await Product.findById(productId); 

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        if (product.owner.toString() !== req.user.id) { 
            return res.status(403).json({ error: 'Access denied. You are not the owner.' });
        }

        next();
    } catch (err) {
        console.error('Error in isOwnerMiddleware:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({ error: 'Invalid token.' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired.' });
        }
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.isAdminMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        next();
    } catch (err) {
        console.error('Error in isAdminMiddleware:', err);
        if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({ error: 'Invalid token.' });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired.' });
        }
        res.status(500).json({ error: 'Server error.' });
    }
};