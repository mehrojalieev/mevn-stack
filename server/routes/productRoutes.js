const express = require("express")
const ProductSchema = require("../models/product.model")
const  mongoose  = require("mongoose")
const verify_admin = require("../middleware/verify-admin")


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

router.get('/:id', async (req, res) => {
    try {
        const singleProduct = await ProductSchema.findById(req.params.id);

        if(!singleProduct){
            return res.status(404).json({message: 'Product not found!'})
        }

        res.status(200).json(singleProduct)
    } 
    catch (error) {
        res.status(500).json({message: error.message})    
    }
})


router.put("/update/:id", verify_admin, async (req, res) => {
    try { 
        const updatedProduct = await ProductSchema.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedProduct){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({
            status: 200,
            message: "Product updated successfully!",
            data: updatedProduct
        })
    } 
    catch (error) {
        res.status(500).json({message: error.message})    
    }
})


router.delete('/delete/:id', verify_admin, async (req, res) => {
    const productId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({message: 'Invalid Product ID!'})
    }

    try {
        const deletedProduct = await ProductSchema.findOneAndDelete({_id: productId});

        if(!deletedProduct){
            res.status(404).json({message: 'Product not found!'})
        }

        res.status(200).json({
            message: `Product with ID ${deletedProduct._id} deleted successfully!`,
            product: deletedProduct
        })

    }
     catch (error) {
        res.status(500).json({message: error.message})    
    }
})


module.exports = router