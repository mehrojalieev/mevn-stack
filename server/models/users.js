const mongoose = require('mongoose')
const validator = require("validator")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required: [true, 'Email address is required'],
        validate: [validator.isEmail, 'Provide a valid email'],
        
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: (value) => {
            validator.isStrongPassword(value, {
                minLength: 8,
                minNumbers: 1
            })   
        }
    }
})


const UserSchema = mongoose.model('users', userSchema)

module.exports = UserSchema;