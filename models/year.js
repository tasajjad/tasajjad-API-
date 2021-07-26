const { Schema, model } = require('mongoose')

const yearSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = Year = model("Year", yearSchema)