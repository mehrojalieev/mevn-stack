const express = require('express');
const { UserSchema, validateUser } = require('../models/user.model');
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const verify_admin = require('../middleware/verify-admin');
const mongoose = require('mongoose');
const { register } = require('../controllers/authController');
const { getAllUers, getUserById, deleteUser } = require('../controllers/userController');



// ------------------------------- AUTH GET ALL ----------------------------------------
router.get('/all', verify_admin, getAllUers);
router.get('/:id', verify_admin, getUserById);
router.delete('/delete/:id', verify_admin, deleteUser);
/** 
 * @swagger
 * /api/auth/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users were retrieved successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: string
 */








module.exports = router