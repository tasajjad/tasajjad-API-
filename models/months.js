const { Schema, model } = require('mongoose')

const monthSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = Month = model("Month", monthSchema)