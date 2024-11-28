const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = (req, res, next) => {
    const { name, description, price, stock, category } = req.body;
    const product = new Product({
        owner: req.user._id,
        name,
        description,
        price,
        stock,
        category,
    });
    product.save()
        .then(product => res.status(201).json(product))
        .catch(err => res.status(400).json(err));
};

exports.getProducts = (req, res, next) => {
    Product.find()
        .populate('category')
        .then(products => res.status(200).json(products))
        .catch(err => res.status(400).json(err));
}

exports.searchProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, name, owner } = req.query;

        // Initialize an empty filter object
        const filter = {};

        // Add filters based on the parameters provided
        if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive search

        if (category) {
            // Find the category by its name
            const categoryDoc = await Category.findOne({ name: new RegExp(category, 'i') }); // Case-insensitive
            if (categoryDoc) {
                filter.category = categoryDoc._id; // Use the category ID in the filter
            } else {
                return res.status(404).json({ error: 'Category not found' });
            }
        }

        if (owner) {
            // Find the user by username or email
            const user = await User.findOne({
                $or: [
                    { username: new RegExp(owner, 'i') }, // Case-insensitive
                    { email: new RegExp(owner, 'i') }
                ]
            });
            if (user) {
                filter.owner = user._id; // Use the user ID in the filter
            } else {
                return res.status(404).json({ error: 'Owner not found' });
            }
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice); // Minimum price
            if (maxPrice) filter.price.$lte = Number(maxPrice); // Maximum price
        }

        // Perform the search
        const products = await Product.find(filter)
            .populate('owner', 'username email') // Populate user details
            .populate('category', 'name'); // Populate category details
        res.json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.getProductsByCategory = (req, res, next) => {
    Product.find({ category: req.params.id })
        .populate('category')
        .then(products => res.status(200).json(products))
        .catch(err => res.status(400).json(err));
}

exports.getProductsByOwner = (req, res, next) => {
    Product.find({ owner: req.user._id })
        .populate('category')
        .then(products => res.status(200).json(products))
        .catch(err => res.status(400).json(err));
}

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.id)
        .populate('category')
        .then(product => res.status(200).json(product))
        .catch(err => res.status(400).json(err));
}

exports.updateProduct = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(product => res.status(200).json(product))
        .catch(err => res.status(400).json(err));
}

exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => res.status(200).json(product))
        .catch(err => res.status(400).json(err));
}

