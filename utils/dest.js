const createDir = require('./createDir')
// const createPath = require('../upload/path')


async function destination(dirPath) {

    const path = await createDir(dirPath)
    // console.log(path)
    if (path) {
        return function (req, file, cb) {
            console.log("REQUEST: ", req)
            console.log("FILE: ", file)
            cb(null, path)

        }
    }
}



module.exports = destination;




// destination(createPath)
//     .then(data => {
//         data("SAJJAD", "TASIN MONI", "JANAT")
//     })
//     .catch(err => {
//         console.log(err)
//     })

// console.log(destination(path))



