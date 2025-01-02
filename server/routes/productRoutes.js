const express = require("express")


const router = express.Router()


router.get('/all', async (req, res) => {
        try {
            const allProducts = [
                {
                    id: 1,
                    title: "Mobile Phone",
                    price: 200,
                    description: "This is made by material",
                    image: 'http://images/client'
                }
            ]
            res.status(200).json(allProducts)
        } 
        catch (error) {
            res.status(500).json({message: error.message})   
        }
})



module.exports = router