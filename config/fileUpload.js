const fs = require('fs')
const path = require('path')
const randomString = require('randomstring')

module.exports = class UploadFile {
    static async uploadTemplateImage(req) {
        let aPromise = new Promise((resolve, reject) => {
            try {
                console.log('fdfds', req.body.template_image)
                let image_dir = 'public/template/'
                if(!fs.existsSync(image_dir)) {
                    fs.mkdirSync(image_dir)
                }
                let oldPath = req.body.template_image.path
                var newPath = path.join(__dirname, '../')
                let fileSplit = req.body.template_image.originalFilename.split('.')
                let fileExtension = fileSplit[fileSplit.length - 1]
                let fileName = randomString.generate()
                var newPath = newPath + image_dir + fileName + '.' + fileExtension
                let rowData = fs.readFileSync(oldPath)
                fs.writeFile(newPath, rowData, async(err) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(fileName + '.' + fileExtension)
                    }
                })
            } catch (error) {
                reject(error)
            }
        })
        return aPromise
    }
}