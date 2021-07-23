const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        cb(null, '/media/tasajjad/Others/Works/tasajjad_app/backend/upload/images')
    },
    filename: function (req, file, cb) {
        const extention = path.extname(file.originalname)
        const fileName = file.originalname.replace(extention, "")
            .toLocaleLowerCase()
            .split(" ")
            .join("-")

        cb(null, +  Date.now() + "--" + fileName + extention)
    },
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 40,
    },

    filefilter: function (req, file, cb) {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error("Only .jpg .png .jpeg format allowed ! Please Try again !"))
        }

    }
})

module.exports = upload;