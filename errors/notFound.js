
//Browser Specific error Handle and res a html file and other res send a json or res.send()

const path = require('path')
module.exports = function (req, res, next) {
    res.status(404).send("Wrong Url ! res not Found")

}