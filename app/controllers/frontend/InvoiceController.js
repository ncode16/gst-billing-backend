const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const InvoiceService = require('../../services/InvoiceService')
const randomstring = require('randomstring')
const invoiceFile = require('../../../config/fileUpload')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
        user: '003895d9616543',
        pass: 'acc5ef32ebd52c'
    }
})

exports.createInvoice = async (req, res) => {
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

        var invoice_dir = "public/invoice";
        if (!fs.existsSync(invoice_dir)) {
            fs.mkdirSync(invoice_dir);
        }

        let invoice = []

        if (req.body.attach_file.length > 0) {
            for (var o = 0; o <= req.body.attach_file.length - 1; o++) {
                var image_type = req.body.attach_file[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "invoice-" + randomstring.generate();

                await invoiceFile.imageUpload(
                    req.body.attach_file[o],
                    invoice_dir,
                    file_name,
                    image_type
                );
                invoice.push(file_name + "." + image_type);
            }
        }
        req.body.attach_file = invoice
        let query = await InvoiceService.createInvoice(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Invoice Created Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllInvoice = async (req, res) => {
    try {
        let resultInvoice = await pool.query('SELECT * FROM invoice_master WHERE is_deleted = $1 ORDER BY invoice_id DESC', [false])
        let finalResultInvoice = await Pagination.paginator(resultInvoice.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultInvoice,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editInvoice = async (req, res) => {
    try {
        let resultInvoice = await pool.query('SELECT * FROM invoice_master WHERE invoice_id = $1', [req.params.invoiceId])
        return res.status(200).json({
            success: true,
            data: resultInvoice.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateInvoice = async (req, res) => {
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
        var invoice_dir = "public/invoice";
        if (!fs.existsSync(invoice_dir)) {
            fs.mkdirSync(invoice_dir);
        }

        let invoice = []

        if (req.body.attach_file.length > 0) {
            for (var o = 0; o <= req.body.attach_file.length - 1; o++) {
                var image_type = req.body.attach_file[o].split(";")[0].split("/")[1];

                if (image_type == "jpeg") {
                    image_type = "jpg";
                }

                const file_name = "invoice-" + randomstring.generate();

                await invoiceFile.imageUpload(
                    req.body.attach_file[o],
                    invoice_dir,
                    file_name,
                    image_type
                );
                invoice.push(file_name + "." + image_type);
            }
        }
        req.body.attach_file = invoice
        let query = await InvoiceService.updateInvoice(req.params.invoiceId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Invoice Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteInvoice = async (req, res) => {
    try {
        await InvoiceService.deleteInvoice(req.params.invoiceId)
        return res.status(200).json({
            success: true,
            message: 'Invoice Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.cancelInvoice = async (req, res) => {
    try {
        await InvoiceService.cancelInvoice(req.params.invoiceId)
        return res.status(200).json({
            success: true,
            message: 'Invoice Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.sendPendingInvoicePaymentReminder = async (req, res) => {
    try {
        let object = {
            from: 'prajapatimahin@gmail.com',
            to: req.body.email,
            cc: req.body.cc_email,
            bcc: req.body.bcc_email,
            subject: req.body.subject,
            html: req.body.email_template,
            attachments: [
                {
                    filename: req.file.filename,
                    path: path.join(__dirname, '../../../public/invoice/') + req.file.filename,
                    cid: req.file.filename
                }
            ]
        }
        transporter.sendMail(object, (err, data) => {
            if (err) {
                console.log('error', err)
            }
            return res.status(200).json({
                success: true,
                message: 'Email Sent Successfully'
            })
        })
    } catch (error) {
        console.log('error', error)
    }
}