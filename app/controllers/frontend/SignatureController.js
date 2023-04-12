const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const SignatureService = require('../../services/SignatureService')
const randomstring = require('randomstring')
const SignatureFile = require('../../../config/fileUpload')
const fs = require('fs')

exports.createSignature = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            signature_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        var signature_dir = "public/signature";
        if (!fs.existsSync(signature_dir)) {
            fs.mkdirSync(signature_dir);
        }

        let signature = []

        if (req.body.attach_file.length > 0) {
            for (var o = 0; o <= req.body.attach_file.length - 1; o++) {
                var image_type = req.body.attach_file[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "signature-" + randomstring.generate();

                await SignatureFile.imageUpload(
                    req.body.attach_file[o],
                    signature_dir,
                    file_name,
                    image_type
                );
                signature.push(file_name + "." + image_type);
            }
        }
        req.body.attach_file = signature
        let query = await SignatureService.createSignature(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Signature Created Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllSignature = async (req, res) => {
    try {
        let resultSignature = await pool.query('SELECT * FROM signature_master WHERE is_deleted = $1 ORDER BY signature_id DESC', [false])
        let finalResultSignature = await Pagination.paginator(resultSignature.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultSignature,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editSignature = async (req, res) => {
    try {
        let resultSignature = await pool.query('SELECT * FROM signature_master WHERE signature_id = $1', [req.params.signatureId])
        return res.status(200).json({
            success: true,
            data: resultSignature.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateSignature = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            category_name: 'required'
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        var signature_dir = "public/signature";
        if (!fs.existsSync(signature_dir)) {
            fs.mkdirSync(signature_dir);
        }

        let signature = []

        if (req.body.attach_file.length > 0) {
            for (var o = 0; o <= req.body.attach_file.length - 1; o++) {
                var image_type = req.body.attach_file[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "signature-" + randomstring.generate();

                await SignatureFile.imageUpload(
                    req.body.attach_file[o],
                    signature_dir,
                    file_name,
                    image_type
                );
                signature.push(file_name + "." + image_type);
            }
        }
        req.body.attach_file = signature
        let query = await SignatureService.updateSignature(req.params.signatureId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Signature Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteSignature = async (req, res) => {
    try {
        await SignatureService.deleteSignature(req.params.signatureId)
        return res.status(200).json({
            success: true,
            message: 'Signature Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}