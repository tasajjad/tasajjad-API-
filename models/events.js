const { Schema, model } = require('mongoose')

const eventSchema = new Schema({
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
})

const Event = model("Event", eventSchema)

module.exports = Event