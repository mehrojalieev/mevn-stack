const express = require('express');
const UserSchema = require('../models/users');
const router = express.Router()


router.get('/all', async (req, res) => {
    try {
            const UserAll = await UserSchema.find()
            res.status(200).json(UserAll)
    } 
    catch (error) {
        res.status(500).json({message: error.message})    
    }
})


router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = UserSchema.findOne({email})
        if(!user){
            return res.status(400).json({message: 'Email is incorrect !'})
        }
        res.status(200).json({
            status: "OK",
            message: "Login successfully",
            data: {email: email, password: password}
        })
    }
     catch (error) {
        res.status(500).json({message: error.message})    
    }
})


module.exports = router