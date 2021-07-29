const { Schema, model } = require('mongoose')

const golamSchema = new Schema({
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Golam = model('Golam', golamSchema)

module.exports = Golam;