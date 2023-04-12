const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const PurchaseService = require('../../services/PurchaseService')
const randomstring = require('randomstring')
const PurchaseFile = require('../../../config/fileUpload')
const fs = require('fs')

exports.createPurchase = async (req, res) => {
    try {
        // let v = new Validator(req.body, {
        //     customerId: 'required',
        //     productId: 'required',
        // })

        // let matched = await v.check()
        // if (!matched) {
        //     return res.json({
        //         statusCode: 400,
        //         success: false,
        //         message: v.errors
        //     })
        // }

        var purchase_dir = "public/purchase";
        if (!fs.existsSync(purchase_dir)) {
            fs.mkdirSync(purchase_dir);
        }

        let purchase = []

        if (req.body.attach_file.length > 0) {
            for (var o = 0; o <= req.body.attach_file.length - 1; o++) {
                var image_type = req.body.attach_file[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "purchase-" + randomstring.generate();

                await PurchaseFile.imageUpload(
                    req.body.attach_file[o],
                    purchase_dir,
                    file_name,
                    image_type
                );
                purchase.push(file_name + "." + image_type);
            }
        }
        req.body.attach_file = purchase
        let query = await PurchaseService.createPurchase(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Purchase Created Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllPurchase = async (req, res) => {
    try {
        let resultPurchase = await pool.query('SELECT * FROM purchase_master WHERE is_deleted = $1 ORDER BY purchase_id DESC', [false])
        let finalResultPurchase = await Pagination.paginator(resultPurchase.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultPurchase,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editPurchase = async (req, res) => {
    try {
        let resultPurchase = await pool.query('SELECT * FROM purchase_master WHERE purchase_id = $1', [req.params.purchaseId])
        return res.status(200).json({
            success: true,
            data: resultPurchase.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updatePurchase = async (req, res) => {
    try {
        // let v = new Validator(req.body, {
        //     category_name: 'required'
        // })

        // let matched = await v.check()
        // if (!matched) {
        //     return res.json({
        //         statusCode: 400,
        //         success: false,
        //         message: v.errors
        //     })
        // }
        var purchase_dir = "public/purchase";
        if (!fs.existsSync(purchase_dir)) {
            fs.mkdirSync(purchase_dir);
        }

        let purchase = []

        if (req.body.attach_file.length > 0) {
            for (var o = 0; o <= req.body.attach_file.length - 1; o++) {
                var image_type = req.body.attach_file[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "purchase-" + randomstring.generate();

                await PurchaseFile.imageUpload(
                    req.body.attach_file[o],
                    purchase_dir,
                    file_name,
                    image_type
                );
                purchase.push(file_name + "." + image_type);
            }
        }
        req.body.attach_file = purchase
        let query = await PurchaseService.updatePurchase(req.params.purchaseId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Purchase Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deletePurchase = async (req, res) => {
    try {
        await PurchaseService.deletePurchase(req.params.purchaseId)
        return res.status(200).json({
            success: true,
            message: 'Purchase Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.cancelPurchase = async (req, res) => {
    try {
        await PurchaseService.cancelPurchase(req.params.purchaseId)
        return res.status(200).json({
            success: true,
            message: 'Purchase Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}