const { Schema, model } = require('mongoose')

const memoriesSchema = new Schema({

    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true

    },
    imagesPath: {
        type: Array,
        required: true,
    }

}, { timestamps: true })

module.exports.Memories = model('Memories', memoriesSchema)