const { pool } = require('../../../config/database')
const nodemailer = require('nodemailer')
const ContactUsService = require('../../services/ContactUsService')
const Pagination = require('../../../config/config')

let transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
        user: '003895d9616543',
        pass: 'acc5ef32ebd52c'
    }
})

exports.getAllUserContact = async (req, res) => {
    try {
        let resultContact = await pool.query('SELECT * FROM contact_master WHERE is_deleted = $1 ORDER BY contact_id DESC', [false])
        let finalResultContact = await Pagination.paginator(resultContact.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultContact,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getUserContact = async (req, res) => {
    try {
        let resultFeature = await pool.query('SELECT * FROM contact_master WHERE contact_id = $1', [req.params.contactId])
        return res.status(200).json({
            success: true,
            data: resultFeature.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateUserContact = async (req, res) => {
    try {
        let query = await ContactUsService.updateContactUs(req.params.contactId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'User Contact Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteUserContact = async (req, res) => {
    try {
        await ContactUsService.deleteContactUs(req.params.contactId)
        return res.status(200).json({
            success: true,
            message: 'User Contact Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveUserContact = async (req, res) => {
    try {
        await ContactUsService.activeInactiveContactUs(req.body.isActive, req.params.contactId)
        if (req.body.isActive == true) {
            return res.status(200).json({
                success: true,
                message: 'User Contact Activated Successfully'
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'User Contact Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}

exports.sendUserContactEmail = async (req, res) => {
    try {
        let object = {
            from: 'prajapatimahin@gmail.com',
            to: req.body.email,
            subject: 'Hello World',
            html: req.body.description
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