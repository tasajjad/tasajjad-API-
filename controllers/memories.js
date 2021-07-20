
const { Memories } = require('../models/memories')
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
 * @PAUSED NOt Completed
 */

module.exports.getImages = async function (req, res) {
    const { year, month } = req.query


    // try {
    //    const allMemories = await Memories.find({ year,month }).select({ imagesPath: 1, year: 1, month: 1 })
    //   console.log("ALL IMAGES: ", allMemories)
    //     const addimages = await AddImages.find().select({ year: 1, month: 1 })
    //     console.log("ADD IMAGES: ", addimages)

    // } catch (err) {
    //     console.log(err)
    // }

    res.status(500).send("GET ALL Memories Function Not Completed")
}


