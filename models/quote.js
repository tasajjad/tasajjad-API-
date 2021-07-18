const { Schema, model } = require('mongoose')
const Joi = require('joi')

const quoteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quote: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        enum: ['black', 'blue', 'white'],
        default: 'blue'
    }

}, { timestamps: true })

module.exports.Quote = model("Quote", quoteSchema)
module.exports.quoteValidation = (user) => {
    const validationSchema = Joi.object({
        quote: Joi.string().required(),
        date: Joi.string().required(),
        time: Joi.string().required()
    })
    return validationSchema.validate(user)
}
