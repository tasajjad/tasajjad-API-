const fs = require('fs');
const { Error } = require('mongoose');
const path = require('path')


/**
 * 
 * @param {folderpath} folderpath where is create directory
 * @resolove for data resolve
 */
function createDir(folderpath) {
    const myPath = folderpath;
    return new Promise((resolve, reject) => {
        fs.opendir(myPath, function (err, dir) {
            if (err) {
                fs.mkdir(myPath, function (err) {
                    if (err) {
                        reject(new Error("(mkdir): " + err.message))
                    } else {
                        resolve(myPath)
                    }
                });
            } else {

                resolve(dir.path)

            }
        });



    });
}

module.exports = createDir;