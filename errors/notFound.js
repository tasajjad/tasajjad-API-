
//Browser Specific error Handle and res a html file and other res send a json or res.send()

const path = require('path')
module.exports = function (req, res, next) {
    let options = {
        root: path.join(__dirname)
    }
    const fileName = 'error.html'
    res.status(404).sendFile(fileName, options, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('SendFile', fileName)
        }
    })

}