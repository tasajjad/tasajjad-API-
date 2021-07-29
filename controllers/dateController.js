const Date = require('../models/date')

module.exports.createDate = async function (req, res) {

    const { date, description } = req.body;

    try {

        const myDate = new Date({ date, description })
        const returnData = await myDate.save()
        if (returnData) {
            res.status(200).send({
                message: "Date created successfully",
                data: returnData
            })
        } else {
            res.status(500).send("Unexpecteed error occured")
        }

    } catch (err) {
        res.status(500).send("Database Problem !")
    }

}
module.exports.getAllDate = async function (req, res) {

    try {
        const date = await Date.find()

        if (date) {
            res.status(200).send(date)
        } else {
            res.status(500).send("Unexpecteed error occured")
        }

    } catch (err) {
        res.status(500).send("Database Problem !")
    }

}

module.exports.deleteDateById = async function (req, res) {

    const { id } = req.params;
    try {
        const deletedDate = await Date.findByIdAndDelete({ _id: id })
        if (deletedDate) {
            res.status(500).send({
                message: "Deleted date Succesfull",
                data: deletedDate
            })
        } else {
            res.status(500).send("Unexpecteed error occured")
        }
    } catch (err) {
        res.status(500).send("Database Problem !")
    }

}