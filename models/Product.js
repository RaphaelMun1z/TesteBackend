const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    title: String,
    brand: String,
    amount: Number,
    description: String,
    assesment: Number,
    sold: Number,
    price: String,
    active: Boolean,
    section: String,
    category: String,
    createdAt: Date,
})

module.exports = Product