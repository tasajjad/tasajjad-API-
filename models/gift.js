const { Schema, model } = require('mongoose')

const giftSchema = new Schema({
    imagesPath: {
        type: Array,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Gift = model('Gift', giftSchema)

module.exports = Gift;