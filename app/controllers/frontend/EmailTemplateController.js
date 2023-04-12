const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const EmailTemplateService = require('../../services/EmailTemplateService')

exports.createEmailTemplate = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            template_name: 'required',
            email_text: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.status(400).json({
                success: false,
                message: v.errors
            })
        }
        
        let query = await EmailTemplateService.createEmailTemplate(req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        let result = await pool.query(query, colValues)

        return res.status(200).json({
            success: true,
            data: result.rows[0],
            message: 'Email Template Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllEmailTemplate = async (req, res) => {
    try {
        let resultEmailTemplate = await pool.query('SELECT * FROM email_template_master WHERE is_deleted = $1 ORDER BY email_template_id DESC', [false])
        let finalResultEmailTemplate = await Pagination.paginator(resultEmailTemplate.rows, req.body.page, req.body.limit)
        return res.status(200).json({
            success: true,
            data: finalResultEmailTemplate,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editEmailTemplate = async (req, res) => {
    try {
        let resultEmailTemplate = await pool.query('SELECT * FROM email_template_master WHERE email_template_id = $1', [req.params.emailTemplateId])
        return res.status(200).json({
            success: true,
            data: resultEmailTemplate.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateEmailTemplate = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            template_name: 'required',
            email_text: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await EmailTemplateService.updateEmailTemplate(req.params.emailTemplateId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.status(200).json({
            success: true,
            message: 'Email Template Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteEmailTemplate = async (req, res) => {
    try {
        await EmailTemplateService.deleteEmailTemplate(req.params.emailTemplateId)
        return res.status(200).json({
            success: true,
            message: 'Email Template Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveEmailTemplate = async (req, res) => {
    try {
        await EmailTemplateService.activeInactiveEmailTemplate(req.body.isActive, req.params.emailTemplateId)
        if (req.body.isActive == true) {
            return res.status(200).json({
                success: true,
                message: 'Document Notes Activated Successfully'
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'Document Notes Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}

exports.defaultEmailTemplate = async (req, res) => {
    try {
        await EmailTemplateService.defaultEmailTemplate(req.body.isDefault, req.params.emailTemplateId)
        return res.status(200).json({
            success: true,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}