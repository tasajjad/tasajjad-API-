const mongoose = require('mongoose')

const url = process.env.LOCALE_DATABASE_URL

module.exports = function () {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })


}

// console.log(url)

