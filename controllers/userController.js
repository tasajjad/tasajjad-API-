// Internal Imports
const bcrypt = require('bcrypt')
// external Import
const { User, validateUser } = require('../models/user')

module.exports.signUp = async (req, res) => {
    // console.log(req.body)
    const { name, email, password, secret } = req.body;
    const functionParameter = req.body;

    const { error } = validateUser(functionParameter)

    if (error) {
        res.status(500).send(error.details[0].message)
    }


    let data = await User.findOne({ email: email })
    if (data) {
        res.status(500).send("User Already Exists")
    }


    try {

        // const hashingPassword = await bcrypt.hash(password, salt)
        let user = new User({ name: name, email: email, password: password, secret: secret })
        let salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        let returnData = await user.save()
        let { name: returnName, email: returnEmail } = returnData;
        let token = user.generateJwt()
        res.status(200).send({
            message: "Registration Succesfully",
            token: token,
            name: returnName,
            email: returnEmail
        })

    } catch (err) {
        res.status(500).send(err.message)



    }








}