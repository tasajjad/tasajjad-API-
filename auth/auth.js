const jwt = require('jsonwebtoken');
module.exports = async function auth(req, res, next) {

    const data = req.header('Jannat')


    if (data) {
        try {
            // Verify the Token
            const token = data.split(" ")[1];
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            // It`s Do Not Needed it use for admin check or other`s Purpose
            req.jannat = decode
            next()
        } catch (err) {
            return res.status(500).send("Token Doesn`t Match")
        }

    } else {
        res.status(500).send("Authorization Failed to token provided !")
    }



}