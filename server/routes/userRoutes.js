const express = require('express');
const router = express.Router()
const verify_admin = require('../middleware/verify-admin');
const { getAllUers, getUserById, deleteUser } = require('../controllers/userController');


router.get('/all', getAllUers);
router.get('/:id', verify_admin, getUserById);
router.delete('/delete/:id', verify_admin, deleteUser);


module.exports = router