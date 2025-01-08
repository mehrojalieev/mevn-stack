const express = require("express")
const ProductSchema = require("../models/product.model")


const router = express.Router()


router.get('/all', async (req, res) => {
        try {
            const productData = await ProductSchema.find()
            res.status(200).json(productData)
        } 
        catch (error) {
            res.status(500).json({message: error.message})   
        }
})



module.exports = router