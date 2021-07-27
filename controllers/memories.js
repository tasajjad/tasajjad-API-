
const Year = require('../models/year')
const Month = require('../models/months')
const Images = require('../models/images');
const { func } = require('joi');

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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @queryString year,month > year>month
 * @accept a year _id and month _id for query perfectly ! 
 * @link http://localhost:3001/api/user/memories/individual/?year=60fa4334c3a93f1b3b0f4238
 */




module.exports.getImagesIndivisual = async function (req, res) {

    const { year: qyear, month: qmonth } = req.query


    if (qyear && qmonth) {

        const returnData = await Images.find({ $and: [{ year: qyear }, { month: qmonth }] })
            .populate(['year', 'month'])
        if (returnData) {
            res.status(200).send(returnData)
        } else {
            res.status(500).send("Nothing Failed !")
        }


    } else if (qyear || qmonth) {
        if (qyear) {
            const returnYear = await Images.find({ year: { $in: [qyear] } }).populate(['year', 'month'])
            if (returnYear) {
                res.status(200).send(returnYear)
            } else {
                res.status(500).send("Something went wrong !")
            }
        } else if (qmonth) {
            const returnMonth = await Images.find({ month: { $in: [qmonth] } }).populate(['year', 'month'])
            if (returnMonth) {
                res.status(200).send(returnMonth)
            } else {
                res.status(500).send("Something went wrong !")
            }
        }

    } else {
        res.status(404).send("Not Found !")
    }





}


/**
 * @GET year
 */

module.exports.getYear = async function (req, res) {
    try {
        const year = await Year.find().select()
        if (year) {
            res.status(200).send(year)
        }
    } catch (err) {
        res.status(500).send("Something went wrong !")
    }
}

/**
 * @GET month
 */

module.exports.getMonth = async function (req, res) {
    try {
        const month = await Month.find()
        if (month) {
            res.status(200).send(month)
        }
    } catch (err) {
        res.status(500).send("Something wrong !")
    }
}

module.exports.deleteYearById = async function (req, res) {
    const { id } = req.params;
    try {
        const deletedYear = await Year.findByIdAndDelete({ _id: id })
        if (deletedYear) {
            res.status(200).send({
                message: "Deleted Succesfull",
                data: deletedYear
            })
        }
    } catch (err) {
        res.status(500).send("Something went wrong !")
        console.log(err.message)
    }
}

module.exports.deleteMonthById = async function (req, res) {
    const { id } = req.params;
    try {
        const deletedMonth = await Month.findByIdAndDelete({ _id: id })
        if (deletedMonth) {
            res.status(200).send({
                message: "Deleted month Succesfull",
                data: deletedMonth
            })
        }

    } catch (err) {
        res.status(500).send("Something went wrong !")
    }
}