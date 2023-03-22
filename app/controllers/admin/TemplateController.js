const { pool } = require('../../../config/database')
// const uploadTemplateImage = require('../../../config/fileUpload')
const Pagination = require('../../../config/config')
const TemplateService = require('../../services/TemplateService')
const { Validator } = require('node-input-validator')

exports.createTemplate = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            template_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let result = await TemplateService.createTemplate(req.body.template_name, req.file.filename)

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'Template Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllTemplate = async (req, res) => {
    try {
        let resultTemplate = await pool.query('SELECT * FROM template_master WHERE is_deleted = $1 ORDER BY template_id', [false])
        let array = []
        resultTemplate.rows.forEach((item) => {
            let data = {
                template_id: item.template_id,
                template_name: item.template_name,
                template_image: process.env.TEMPLATE_IMAGE_URL + item.template_image,
                is_active: item.is_active,
                is_deleted: item.is_deleted,
            }
            return array.push(data)
        })
        let finalResultTemplate = await Pagination.paginator(array, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultTemplate,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editTemplate = async (req, res) => {
    try {
        let resultTemplate = await pool.query('SELECT * FROM template_master WHERE template_id = $1', [req.params.templateId])
        let finalTemplateData = {
            template_id: resultTemplate.rows[0].template_id,
            template_name: resultTemplate.rows[0].template_name,
            template_image: process.env.TEMPLATE_IMAGE_URL + resultTemplate.rows[0].template_image,
            is_active: resultTemplate.rows[0].is_active,
            is_deleted: resultTemplate.rows[0].is_deleted,
        }
        return res.json({
            statusCode: 200,
            success: true,
            data: finalTemplateData,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateTemplate = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            template_name: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        let query = await TemplateService.updateTemplate(req.params.templateId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Template Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteTemplate = async (req, res) => {
    try {
        await TemplateService.deleteTemplate(req.params.templateId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'Template Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveTemplate = async (req, res) => {
    try {
        await TemplateService.activeInactiveTemplate(req.body.isActive, req.params.templateId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Template Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'Template Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}