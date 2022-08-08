const fs = require('fs')
const Jimp = require('jimp');
const _ = require('lodash')
const appConstant = require('./constant.helper')

class UploadFile {
    async uploadToDisk(dir, name, extension, base64String, width = 200, height = 300) {
        return new Promise((resolve, reject) => {
            fs.writeFile(`${dir}/${name}.${extension}`, base64String, 'base64', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            });
        })
    }

    async removeFromDisk(dir) {
        return new Promise((resolve, reject) => {
            fs.unlink(dir, (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve()
                }
            });
        })
    }

    async readFile(pathFile) {
        return new Promise((resolve, reject) => {
            fs.readFile(pathFile, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            });
        })
    }
}

module.exports = new UploadFile();
