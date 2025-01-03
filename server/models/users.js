const mongoose = require('mongoose')
const Joi = require("joi")
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: "user"
    }
}, {timestamps: true}
)


const UserSchema = mongoose.model('users', userSchema);

const validateUser = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().min(2).max(30).required(),
        lastname: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid("user", "admin").optional()
    });
    return schema.validate(data)
}

module.exports = { UserSchema, validateUser };