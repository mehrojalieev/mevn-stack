const mongoose = require('mongoose')
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        trim: true,
        required: [true, 'Email address is required'],
        validate: {
            validator: validator.isEmail,
            message: "Provide a valid email"
        }
        
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: (value) => validator.isStrongPassword(value, {minLength: 8, minNumbers: 1}),
            message: "Password must be at least 8 characters long and contain at least 1 number"
        }
    },
    role: {
        type: String,
        default: "user"
    }
})


const UserSchema = mongoose.model('users', userSchema)

module.exports = UserSchema;