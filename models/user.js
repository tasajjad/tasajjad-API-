const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const Joi = require('joi')

const mySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024

    },
    secret: {
        type: String,
        required: true
    }
}, { timestamps: true })

mySchema.methods.generateJwt = () => {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        secret: this.secret
    }, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

    return token;
}

module.exports.validateUser = (user) => {
    const schema = Joi.Object({
        name: Joi.string().required().min(4).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(255),
        secret: Joi.string().required().min(6)
    })

}

module.exports.User = model("User", mySchema)
