module.exports = function (err, req, res, next) {
    if (err.message) {
        res.status(500).send(err.message)
    } else {
        res.status(500).send("There Was an Error ![My Custom Error Handler]")
    }
}
