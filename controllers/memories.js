
const Year = require('../models/year')
const Month = require('../models/months')
const Images = require('../models/images')

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


/**
 * 
 * @required all field required if any field empty so whole application is
 * doesn`t wotk beacuse i can`t check all are in here or no 
 * i can check front site
 * @param {*} res 
 */


module.exports.uploadImages = async function (req, res) {
    const { year, month } = req.body
    const imagesPath = []
    const path = req.files.photos;
    for (let data of path) {
        imagesPath.push(data.path)
    }

    try {
        const uploadImages = await new Images({ imagesPath: [...imagesPath], year: year, month: month })

        const returnData = await uploadImages.save()
        if (returnData) {
            res.status(200).send({
                message: "Images Upload Succesfull",
                payload: returnData
            })
        } else {
            res.status(500).send("Can`t Upload images ! Something went wrong !")
        }

    } catch (err) {
        res.status(500).send("Some Database Problem !")
        console.log(err)
    }
}

module.exports.getAllMemories = async function (req, res) {

    try {
        const allMemories = await Images.find().populate(["year", "month"])

        if (allMemories) {
            res.status(200).send(allMemories)
        } else {
            res.status(500).send("Something wen wrong !")
        }
    } catch (err) {
        res.status(500).send("Some Database Problem !")
        // console.log(err)
    }

}