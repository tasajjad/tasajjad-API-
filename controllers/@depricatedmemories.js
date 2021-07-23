
const { Memories } = require('../models/@depricatedmemories')
const AddImages = require('../models/updateImages')

/**
 * 
 * @param {} req 
 * @param {*} res 
 * @returns {res.send()}
 * @createMemories is a multipart form data recieve and send response.
 * @createMemories proccess multiple images 
 */


module.exports.createMemories = async function (req, res) {

    /**
     * @name  empty then {} and value is empty then "" req.body
     * @name empty then undefined and value emty then "" req.body.[name]
     * @req files.photos & req.files  both undefined
     */


    const filesObject = req.files

    const fileArray = Object.keys(filesObject)
    if (fileArray.length === 0) {
        res.status(500).send("Image Not Send Please Send Image !")
    } else {
        const fieldObject = req.body;
        const fieldArray = Object.keys(fieldObject)
        if (fieldArray.length === 0) {
            res.status(500).send("No Fields Provided")
        } else {

            if (fieldArray.length < 2) {
                return res.status(500).send("All Fields Not Send !")
            } else {
                /**
                 * @main logic here 
                 */
                const { year, month } = req.body;
                const photosArray = req.files.photos;
                const blankPhotos = []

                let photosArrayLen = photosArray.length;
                for (let i = 0; i < photosArrayLen; i++) {
                    blankPhotos.push(photosArray[i].path)
                }

                let allFormData = {
                    year,
                    month,
                    path: blankPhotos.map(function (item) {
                        return item;
                    })
                }
                /**
                 * 
                 * @Database Logic
                 * 
                 */

                try {
                    let memoriesSend = new Memories({ year: allFormData.year, month: allFormData.month, imagesPath: allFormData.path })

                    let returnData = await memoriesSend.save()
                    if (returnData) {
                        res.status(200).send({
                            message: "Upload Succesfull !"

                        })
                    }

                } catch (err) {

                    console.log(err)
                    res.status(500).send("There Have a Database Error")

                }


            }
        }


    }





}

/**
 * @add images in memories route in authenticated user
 * no add data option find . Now i create a new model and schema for push 
 * new file path. and if i can get request so two models data store in 
 * a array and then all are send in response
 *
 */

module.exports.addImages = async function (req, res) {

    if (req.files.photos.length === 0) {
        res.status(500).send("No images Providen ! ")
    } else {
        const filePath = []
        for (let array of req.files.photos) {
            filePath.push(array.path)
        }
        if (!req.body.year || !req.body.month) {
            res.status(500).send("Year Field Not Providen !")
        }
        try {
            const updateImages = new AddImages({ imagesPath: [...filePath], year: req.body.year, month: req.body.month })
            const path = await updateImages.save()
            res.status(200).send({
                message: "Add Images Succesfull",
                path: path
            })

        } catch (err) {
            res.status(500).send(err)
        }

    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @GET  {Memories,AddImages} request query two models and finally all are compressed in array
 * @query locallhost:3001/user/memories/?year=2021&month=1
 * @in db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
 * @and db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
 */

module.exports.getImages = async function (req, res) {
    const { year: qyear, month: qmonth } = req.query

    if (!qyear || !qmonth) {
        if (qyear) {
            const ALL_DATA = []
            const updateData = await getUpdateMemories(qyear, null)

            // console.log("TASIN MONI", updateData)


            const yearMemoris = await Memories.find({ year: { $in: [qyear] } }).select({ imagesPath: 1, year: 1, month: 1, _id: 0 })

            console.log("yearMemoris", yearMemoris)
            if (!yearMemoris.length) {
                res.status(404).send("Not Year Match")
            } else {

                if (!updateData) {
                    res.status(yearMemoris)
                } else {
                    for (let data of yearMemoris) {
                        ALL_DATA.push(data)

                    }
                    // Problem

                    for (let upData of updateData) {
                        ALL_DATA.push(upData)
                        // console.log(upData)

                    }
                    res.status(200).send({
                        ALL_DATA
                    })
                }

            }

        }
        if (qmonth) {
            const ALL_DATA = []
            const updateData = await getUpdateMemories(null, qmonth)

            const monthMemoris = await Memories.find({ month: { $in: [qmonth] } }).select({ imagesPath: 1, year: 1, month: 1, _id: 0 })
            if (!monthMemoris.length) {
                res.status(404).send("Not Month Match")
            } else {
                if (!updateData) {
                    res.status(200).send(monthMemoris)
                } else {
                    for (let element of monthMemoris) {
                        ALL_DATA.push(element)
                    }
                    for (let upData of updateData) {
                        ALL_DATA.push(upData)
                    }
                    res.status(200).send({
                        ALL_DATA
                    })

                }


            }

        }
    } else if (qyear && qmonth) {
        const ALL_DATA = []
        const updateData = await getUpdateMemories(qyear, qmonth)

        const allData = await Memories.find({ $and: [{ year: qyear, month: qmonth }] }).select({ imagesPath: 1, year: 1, month: 1, _id: 0 })
        if (!allData.length) {
            res.status(404).send("Not Month and year Match !")
        } else {
            if (!updateData) {
                res.status(200).send(allData)
            } else {
                for (let data of allData) {
                    ALL_DATA.push(data)
                }
                for (let element of updateData) {
                    ALL_DATA.push(element)
                }
                res.status(200).send({
                    ALL_DATA
                })
            }
        }

    } else {
        res.status(404).send("No Data Found in Here !")
    }


}


/**
 *
 * @param {*} req
 * @param {*} res
 * @GET  {Memories,AddImages} request query two models and finally all are compressed in array
 * @query locallhost:3001/user/memories/?year=2021&month=1
 * @in db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
 * @and db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
 */

async function getUpdateMemories(year = false, month = false) {

    if (!year || !month) {
        if (year) {
            const updateImagesByYear = await AddImages.find({ year: { $in: [year] } })
            if (!updateImagesByYear) {
                return false;
            } else {
                return updateImagesByYear;
            }

        }

        if (month) {
            const updateImagesByMonth = await AddImages.find({ month: { $in: [month] } })
            if (!updateImagesByMonth) {
                return false;
            } else {
                return updateImagesByMonth;
            }

        }
    } else if (year && month) {
        const updateImagesByYearAndMonth = AddImages.find({ $and: [{ year: year }, { month: month }] })
        if (!updateImagesByYearAndMonth) {
            return false;
        } else {
            return updateImagesByYearAndMonth;
        }

    } else {
        console.log("LAST")
        false;
    }

}

