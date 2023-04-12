const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const VendorService = require('../../services/VendorService')
const randomstring = require('randomstring')
const VendorFile = require('../../../config/fileUpload')
const fs = require('fs')

exports.createVendor = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            vendor_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }

        var vendor_dir = "public/vendor";
        if (!fs.existsSync(vendor_dir)) {
            fs.mkdirSync(vendor_dir);
        }

        let vendor = []

        if (req.body.attach_file.length > 0) {
            for (var o = 0; o <= req.body.attach_file.length - 1; o++) {
                var image_type = req.body.attach_file[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "Vendor-" + randomstring.generate();

                await VendorFile.imageUpload(
                    req.body.attach_file[o],
                    vendor_dir,
                    file_name,
                    image_type
                );
                vendor.push(file_name + "." + image_type);
            }
        }
        req.body.attach_file = vendor
        let query = await VendorService.createVendor(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Vendor Created Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllVendor = async (req, res) => {
    try {
        let resultVendor = await pool.query('SELECT * FROM vendor_master WHERE is_deleted = $1 ORDER BY vendor_id DESC', [false])
        let finalResultVendor = await Pagination.paginator(resultVendor.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultVendor,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editVendor = async (req, res) => {
    try {
        let resultVendor = await pool.query('SELECT * FROM vendor_master WHERE vendor_id = $1', [req.params.vendorId])
        return res.status(200).json({
            success: true,
            data: resultVendor.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateVendor = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            vendor_name: 'required'
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        var vendor_dir = "public/vendor";
        if (!fs.existsSync(vendor_dir)) {
            fs.mkdirSync(vendor_dir);
        }

        let vendor = []

        if (req.body.attach_file.length > 0) {
            for (var o = 0; o <= req.body.attach_file.length - 1; o++) {
                var image_type = req.body.attach_file[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "Vendor-" + randomstring.generate();

                await VendorFile.imageUpload(
                    req.body.attach_file[o],
                    vendor_dir,
                    file_name,
                    image_type
                );
                vendor.push(file_name + "." + image_type);
            }
        }
        req.body.attach_file = vendor
        let query = await VendorService.updateVendor(req.params.vendorId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Vendor Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteVendor = async (req, res) => {
    try {
        await VendorService.deleteVendor(req.params.vendorId)
        return res.status(200).json({
            success: true,
            message: 'Vendor Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.cancelVendor = async (req, res) => {
    try {
        await VendorService.cancelVendor(req.params.vendorId)
        return res.status(200).json({
            success: true,
            message: 'Vendor Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}