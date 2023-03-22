const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const ContactUsService = require('../../services/ContactUsService')

exports.createUserContact = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            contactName: 'required',
            contactPhone: 'required',
            contactMessage: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let result = await ContactUsService.createContactUs(
            req.body.contactName,
            req.body.contactPhone,
            req.body.contactMessage,
            req.body.contactEmail,
            req.body.contactCountry,
            req.body.contactCity,
        )

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'User Contact Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}