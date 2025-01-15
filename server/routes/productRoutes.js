const express = require("express")
const verify_admin = require("../middleware/verify-admin")
const { deleteProduct, updateProduct, productById, allProducts } = require("../controllers/productController")

const router = express.Router()


router.get('/all', allProducts)
router.get('/:id', productById)
router.put("/update/:id", verify_admin, updateProduct)
router.delete('/delete/:id', verify_admin, deleteProduct)

module.exports = router