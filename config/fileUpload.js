const fs = require('fs')
const path = require('path')
const randomString = require('randomstring')
const base64Img = require('base64-img')

module.exports = class UploadFile {
    static async imageUpload(image, directory, image_name, image_type) {
        var aPromise = new Promise(function (resolve, reject) {
            try {
                base64Img.img(
                    image,
                    directory,
                    image_name,
                    async function (err, filepath) {
                        if (err) {
                            console.log("invoice image upload error ", err);
                            reject(err);
                        } else {
                            var invoice_image_name = image_name + "." + image_type;
                            resolve(invoice_image_name);
                        }
                    }
                );
            } catch (error) {
                console.log("invoice image upload error", error);
                reject(error);
            }
        });
        return aPromise;
    }
}