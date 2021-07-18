const fs = require('fs');
const { Error } = require('mongoose');
const path = require('path')


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