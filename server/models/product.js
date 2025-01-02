const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    }
})