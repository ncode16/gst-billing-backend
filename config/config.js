const fs = require('fs')
const path = require('path')
const randomString = require('randomstring')

module.exports = class UploadFile {
    static async uploadTemplateImage(req) {
        let aPromise = new Promise((resolve, reject) => {
            try {
                let image_dir = 'public/template/'
                if (!fs.existsSync(image_dir)) {
                    fs.mkdirSync(image_dir)
                }
                let oldPath = req.body.template_image.path
                var newPath = path.join(__dirname, '../')
                let fileSplit = req.body.template_image.originalFilename.split('.')
                let fileExtension = fileSplit[fileSplit.length - 1]
                let fileName = randomString.generate()
                var newPath = newPath + image_dir + fileName + '.' + fileExtension
                let rowData = fs.readFileSync(oldPath)
                fs.writeFile(newPath, rowData, async (err) => {
                    if (err) {
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

    static async paginator(items, current_page, per_page_items) {
        let page = current_page || 1,
            per_page = per_page_items || 4,
            offset = (page - 1) * per_page,
            paginatedItems = items.slice(offset).slice(0, per_page_items),
            total_pages = Math.ceil(items.length / per_page)

        return {
            page: page,
            perPge: per_page,
            prePage: page - 1 ? page - 1 : null,
            nextPage: total_pages > page ? page + 1 : null,
            total: items.length,
            totalPages: total_pages,
            data: paginatedItems,
            totalDocs: items.length
        }
    }
}