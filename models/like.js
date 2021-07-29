const { Schema, model } = require('mongoose')


const likeSchema = new Schema({
    like: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Like = model('Like', likeSchema)

module.exports = Like;