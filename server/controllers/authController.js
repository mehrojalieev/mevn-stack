const { UserSchema } = require("../models/user.model");
const { registerValidation, loginValidation } = require("../validations/authValidation")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    const {error} = registerValidation.validate(req.body);

    if (error) return res.status(400).send({ message: error.details[0].message });
    try {
        const userExists = await UserSchema.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: "Email already exists !" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserSchema.create({ firstname, lastname, email, password: hashedPassword})

        res.status(201).json({
            data: newUser,
            statusCode: 201,
            message: "Registered successfully"
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.login = async (req, res) => {
    const {error} = loginValidation.validate(req.body);

    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const { email, password } = req.body;
        const user = await UserSchema.findOne({ email })
        if (!user) return res.status(400).json({ message: 'Invalid email !' });
    

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: "Invalid password !" })

        const userJWT = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            role: user.role
        }

        const token = jwt.sign(userJWT, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).json({
            status: 200,
            message: "Login successfully",
            token: token
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await UserSchema.schema.findOneAndDelete({_id: id});
        
        if(!deletedUser){
            return res.status(404).json({ message: 'User not found!' }); 
        }

        res.status(200).json({
            message: `User with ID ${deletedUser._id} deleted successfully!`,
            user: deletedUser
        });
    } 
    catch (error) {
        res.status(500).json({message: error.message})    
    }
}