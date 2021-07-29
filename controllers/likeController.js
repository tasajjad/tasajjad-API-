
const Like = require('../models/like')

module.exports.createLike = async function (req, res) {
    const { like: jannatLike, description } = req.body;

    try {
        const like = new Like({ like: jannatLike, description: description })
        const returnData = await like.save()
        if (returnData) {
            res.status(200).send({
                message: 'Like created Succesfull',
                payload: returnData
            })
        } else {
            res.status(500).send("Something Went wrong")

        }
    } catch (err) {
        res.status(500).send("Database Error !")
        console.log(err.message)

    }

}

module.exports.getAllLikes = async function (req, res) {
    try {

        const like = await Like.find()
        if (like) {
            res.status(200).send(like)
        } else {
            res.status(500).send("Something went wrong !")
        }

    } catch (err) {
        res.status(500).send("Database or any technical error !")
    }

}

module.exports.deleteLikeById = async function (req, res) {
    const { id } = req.params;

    try {
        const data = await Like.findByIdAndDelete({ _id: id })
        if (data) {
            res.status(200).send({
                message: "Deleted Succesfull",
                data: data
            })
        } else {
            res.status(500).send("Something went wrong !")
        }

    } catch (err) {
        res.status(500).send("Some Problem ocurred !")
    }
}