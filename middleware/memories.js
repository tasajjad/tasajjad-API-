const multer = require('multer')
const filter = require('../utils/fileFilter')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
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

module.exports = upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 18,
    },
    fileFilter: filter

})
