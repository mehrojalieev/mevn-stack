const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    model: {
        required: true,
        type: String
    },
    category: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    brand:{
        type: String,
        default: Date.now
    },
    images: {
        type: [String],
        required: true
    },
    createdAt: {
      type: String,
      default: Date.now
    }
    
})


const ProductSchema = mongoose.model('products', productSchema)

module.exports = ProductSchema

