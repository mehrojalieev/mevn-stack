const express = require('express');
const { register, login, delete: deleteUser } = require('../controllers/authController');
const router = express.Router()



router.post('/register', register );
router.post('/login', login)
router.delete('/:id', deleteUser )

module.exports = router;