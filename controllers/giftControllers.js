const Gift = require('../models/gift')


module.exports.createGift = async function (req, res) {

    const { year, month, day } = req.body;
    const imagesPath = []

    const files = req.files.photos;

    for (let data of files) {
        imagesPath.push(data.path)
    }

    try {
        const gift = new Gift({ year, month, day, imagesPath: [...imagesPath] })

        const returnData = await gift.save()
        if (returnData) {
            res.status(200).send({
                message: "Gift Created successfully",
                path: returnData
            })
        } else {
            res.status(500).send("Some thing went wrong !")
        }
    } catch (err) {
        res.status(500).send("Nothing Failed !")
        console.log(err.message)
    }



}
module.exports.getGift = async function (req, res) {

    try {
        const gift = await Gift.find()
        if (gift) {
            res.status(200).send(gift)

        } else {
            res.status(500).send("Something went wrong !")
        }
    } catch (err) {
        res.status(500).send("Some database Problem !")
    }



}