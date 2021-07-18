
const { Memories } = require('../models/memories')


module.exports.createMemories = async function (req, res) {

    /**
     * name  empty then {} and value is empty then "" req.body
     * name empty then undefined and value emty then "" req.body.[name]
     * req.files.photos & req.files  both undefined
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
                 * Main logic here 
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
                // console.log("Input Data: ", allFormData)
                /**
                 * 
                 * Database Logic
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