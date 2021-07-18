
const filter = function (req, file, cb) {
    if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(new Error("Only .jpg .png .jpeg format allowed ! Please Try again !"))
    }

}


module.exports = filter

// if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
//     cb(null, true)
// } else {
//     cb(new Error("Only .jpg .png .jpeg format allowed ! Please Try again !"))
// }