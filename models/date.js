const { Schema, model } = require('mongoose')

const dateSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Date = model('Date', dateSchema)

module.exports = Date;