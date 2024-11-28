const Category = require('../models/category');

exports.createCategory = (req, res, next) => {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    category.save()
        .then(category => res.status(201).json(category))
        .catch(err => res.status(400).json(err));
}

exports.getCategories = (req, res, next) => {
    Category.find()
        .then(categories => res.status(200).json(categories))
        .catch(err => res.status(400).json(err));
}

// GetCategory function, if empty, return 404
exports.getCategory = (req, res, next) => {
    Category.findById(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(404).json('Category not found');
            }
            res.status(200).json(category);
        })
        .catch(err => res.status(400).json(err));
}

exports.updateCategory = (req, res, next) => {
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(category => res.status(200).json(category))
        .catch(err => res.status(400).json(err));
}

exports.deleteCategory = (req, res, next) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).json('Category deleted'))
        .catch(err => res.status(400).json(err));
}