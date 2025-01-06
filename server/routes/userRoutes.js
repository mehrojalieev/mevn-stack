const express = require('express');
const { UserSchema, validateUser } = require('../models/user.model');
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const verify_admin = require('../middleware/verify-admin');



// ------------------------------- AUTH GET ALL ----------------------------------------

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


router.get('/all', verify_admin, async (req, res) => {
    try {
        const UserAll = await UserSchema.find()
        res.status(200).json(UserAll)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


// ------------------------------- AUTH REGISTER ----------------------------------------

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Enter your firstname
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 description: Enter your lastname
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: Enter your email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Enter password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user ID
 *                 firstname:
 *                   type: string
 *                   description: The user's firstname
 *                 lastname:
 *                   type: string
 *                   description: The user's lastname
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 password:
 *                   type: string
 *                   description: Password
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created
 *       400:
 *         description: Validation error or email already exists
 *       500:
 *         description: Server error
 */

// AUTH REGISTER
router.post('/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const { error } = validateUser(req.body);

    if (error) return res.status(400).send({ message: error.details[0].message })

    try {
        const userExists = await UserSchema.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "Email already exists !" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserSchema.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            data: newUser,
            statusCode: 201,
            message: "Registered successfully"
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// ------------------------------- AUTH LOGIN ----------------------------------------
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *                 message:
 *                   type: string
 *                   description: Login success message
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */

// AUTH LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: 'Email is incorrect !' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password !" })
        }

        const userJWT = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            role: user.role
        }

        const token = jwt.sign(userJWT, process.env.JWT_SECRET, { expiresIn: "2d" })

        res.status(200).json({
            status: 200,
            message: "Login successfully",
            token: token
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})



// ------------------------------- AUTH DELETE ----------------------------------------

/**
 * @swagger
 * /api/auth/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *           
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */


router.delete('/delete/:id', verify_admin, async (req, res) =>{
    const userid = req.params.id;
    try {
        const deletedUser = await UserSchema.findOneAndDelete(isExistUser)

        if(!deletedUser){
            return res.status(400).json({message: 'User not found!'})
        }
        res.status(200).json({
            message: `User with ID ${deletedUser._id} deleted successfully!`,
            user: deletedUser
        });
    }
     catch (error) {
        res.status(500).json({message: error.message})    
    }
})


module.exports = router