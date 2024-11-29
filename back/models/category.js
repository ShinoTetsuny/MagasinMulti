const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    descriptions: { type: String },
});

module.exports = mongoose.model('Category', categorySchema);