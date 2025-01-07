const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    title: {
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
    }
    
})



const ProductSchema = mongoose.model('products', productSchema)



[
    {
      "title": "",
      "description": "",
      "category": "",
      "price": "",
      "brand": "",
      "images": [
        "",
        "",
        ""
      ]
    },
     {
      "title": "",
      "description": "",
      "category": "",
      "price": "",
      "brand": "",
      "images": [
        "",
        "",
        ""
      ]
    },
     {
      "title": "",
      "description": "",
      "category": "",
      "price": "",
      "brand": "",
      "images": [
        "",
        "",
        ""
      ]
    },
     {
      "title": "",
      "description": "",
      "category": "",
      "price": "",
      "brand": "",
      "images": [
        "",
        "",
        ""
      ]
    },
     {
      "title": "",
      "description": "",
      "category": "",
      "price": "",
      "brand": "",
      "images": [
        "",
        "",
        ""
      ]
    }
  ]