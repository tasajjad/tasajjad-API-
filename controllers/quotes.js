const { Quote, quoteValidation } = require('../models/quote')
const _ = require('lodash')
const { } = require('../models/user')
module.exports.createQuotes = async (req, res) => {
    // It`s for populate or reletional database 
    const { _id: creator } = req.jannat;

    const { quote, date, time, theme } = req.body;
    try {
        const returnData = new Quote({ creator, quote, date, time, theme });
        const saveData = await returnData.save();
        if (saveData) {
            res.status(200).send({
                message: "Quote Created Succesfully",
                payload: saveData
            });
        };
    } catch (err) {
        if (err) {
            res.status(500).send(err.message)
            console.log("Error", err)
        };
    };

};

module.exports.getQuotes = async (req, res) => {
    const returnData = await Quote.find().populate('creator', { name: 1, email: 1 });
    if (returnData && returnData.length !== 0) {
        res.status(200).send({
            message: "This is Data",
            payload: returnData

        });
    } else {
        res.status(404).send("No Quotes Available !")
    }

};

module.exports.deleteQuotesById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQuotes = await Quote.findByIdAndDelete({ _id: id })
        if (deletedQuotes) {
            res.status(200).send({
                message: "Quotes deleted Succesfully",
                data: deletedQuotes
            })
        }

    } catch (err) {
        res.status(500).status("Something Went Wrong !")
    }
}