// Internal Imports
const bcrypt = require('bcrypt')
// external Import
const { User, validateUser } = require('../models/user')

module.exports.signUp = async (req, res) => {
    // console.log(req.body)
    const { name, email, password, anniversaryDate, secret } = req.body;
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
        let user = new User({ name, email, password, anniversaryDate, secret })
        let salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        let returnData = await user.save()
        let { name: returnName, email: returnEmail, anniversaryDate: returnanniversaryDate } = returnData;
        let token = user.generateJwt()
        res.status(200).send({
            message: "Registration Succesfully",
            token: token,
            name: returnName,
            email: returnEmail,
            anniversaryDate: returnanniversaryDate
        })

    } catch (err) {
        res.status(500).send(err.message)



    }








}

module.exports.signIn = async (req, res) => {
    const { email, password, secret } = req.body;

    let user = await User.findOne({ email })
    if (!user) {
        res.status(500).send("Invalid Email or Password")
    } else {
        let validUser = await bcrypt.compare(password, user.password)

        if (validUser && secret == user.secret) {

            const token = user.generateJwt()
            res.status(200).send({
                message: "Login Succesfull",
                token: token,
                name: user.name,
                email: user.email,
                secret: user.secret
            })


        } else {
            res.status(400).send("Invalid Email or Password(password)")
        }
    }

}