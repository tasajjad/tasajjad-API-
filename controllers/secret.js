const { User } = require('../models/user')
module.exports.secret = async (req, res) => {
    const { oldSecret, newSecret } = req.body;
    // console.log("Secret : ", req.jannat)
    let secret = await User.findOneAndUpdate({ secret: oldSecret }, { secret: newSecret })
    // let updatedSecret = await User.findOne({ secret: newSecret })
    // console.log("Return Update Data", secret)
    // console.log("After Update", updatedSecret.secret)

    if (secret) {
        res.status(200).send({
            message: "Updated Succesfully",
            updatedSecret: newSecret
        })
    } else {
        res.status(500).send("Doesn`t Match Old Secret in Databse")

    }

}