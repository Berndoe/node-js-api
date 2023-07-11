const mongoose = require('mongoose');

// creating the table and properties
const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)

// allowing database operations to happen
const Product = mongoose.model('Product', productSchema)

module.exports = Product;