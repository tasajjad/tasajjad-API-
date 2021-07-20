const { Schema, model } = require('mongoose')

const updateImages = new Schema({
    imagesPath: Array,
    year: String,
    month: String,
})

const AddImages = model('addimages', updateImages)

module.exports = AddImages