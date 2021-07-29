const Golam = require("../models/golam")

module.exports.createDescription = async function (req, res) {

    const { description } = req.body;

    try {
        const golam = new Golam({ description })
        let returnData = await golam.save()
        if (returnData) {
            res.status(200).send({
                message: "Golam Create Succesfull",
                data: returnData
            })
        } else {
            res.status(500).send("Some error occurred !")
        }

    } catch (err) {
        res.status(500).send("Database error !")
    }

}
module.exports.getDescription = async function (req, res) {
    try {
        const golamQuotes = await Golam.find()
        if (golamQuotes) {
            res.status(200).send(golamQuotes)
        } else {
            res.status(500).send("Some error occurred !")
        }
    } catch (err) {
        res.status(500).send("Database error !")
    }

}
module.exports.deleteDescription = async function (req, res) {
    const { id } = req.params
    try {
        const deleteGolamQuote = await Golam.findByIdAndDelete({ _id: id })
        if (deleteGolamQuote) {
            res.status(200).send({ message: "Deleted Succesfull", data: deleteGolamQuote })
        } else {
            res.status(404).send("Some error occurred !")
        }
    } catch (err) {
        res.status(500).send("Database error !")
    }

}