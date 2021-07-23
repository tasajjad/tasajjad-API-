
const Year = require('../models/year')
const Month = require('../models/months')

module.exports.createYear = async function (req, res) {
    const { year, description } = req.body;

    try {
        const createyear = new Year({ year, description })

        const returnData = await createyear.save()
        if (returnData) {
            res.status(200).send({
                message: 'Year created successfull !',
                payload: returnData
            })
        }
    } catch (err) {
        res.status(400).send("Database Problem")
    }


}

module.exports.createMonth = async function (req, res) {

    const { month, description } = req.body;

    try {
        const createmonth = new Month({ month, description })

        const returnData = await createmonth.save()
        if (returnData) {
            res.status(200).send({
                message: 'Month created successfull !',
                payload: returnData
            })
        }
    } catch (err) {
        res.status(400).send("Database Problem")
    }



}

module.exports.uploadImages = function (req, res) {

    console.log("Body: ", req.body)
    console.log("FILES: ", req.files)

}