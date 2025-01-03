const express = require('express');
const { UserSchema, validateUser } = require('../models/users');
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.get('/all', async (req, res) => {
    try {
        const UserAll = await UserSchema.find()
        res.status(200).json(UserAll)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = UserSchema.findOne({ email })
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
            status: "OK",
            message: "Login successfully",
            token: token
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router