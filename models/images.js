const { Schema, model } = require('mongoose')

const imagesSchema = new Schema({
    imagesPath: {
        type: String,
        required: true,
    },
    year: {
        type: Schema.Types.ObjectId,
        ref: "Year",
        required: true,
    },
    month: {
        type: Schema.Types.ObjectId,
        ref: "Month",
        required: true,
    }
}, { timestamps: true })

module.exports = Images = model("Image", imagesSchema)