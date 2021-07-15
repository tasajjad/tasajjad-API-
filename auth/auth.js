const jwt = require('jsonwebtoken');
module.exports = async function auth(req, res, next) {

    const data = req.header('Jannat')


    if (data) {
        try {
            const token = data.split(" ")[1];
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            req.jannat = decode
            next()
        } catch (err) {
            return res.status(500).send("Token Doesn`t Match")
        }

    } else {
        res.status(500).send("Authorization Failed to token provided !")
    }



}