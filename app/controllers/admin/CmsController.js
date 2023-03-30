const { pool } = require('../../../config/database')
const { Validator } = require('node-input-validator')
const Pagination = require('../../../config/config')
const CmsService = require('../../services/CmsService')

exports.createCms = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            cms_title: 'required',
            cms_description: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }

        let result = await CmsService.createCms(req.body.cms_title, req.body.cms_description, req.file.filename)

        return res.json({
            statusCode: 200,
            success: true,
            data: result.rows[0],
            message: 'CMS Added Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.getAllCms = async (req, res) => {
    try {
        let resultCms = await pool.query('SELECT * FROM cms_master WHERE is_deleted = $1 ORDER BY cms_id DESC', [false])
        let finalResultCms = await Pagination.paginator(resultCms.rows, req.body.page, req.body.limit)
        return res.json({
            statusCode: 200,
            success: true,
            data: finalResultCms,
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.editCms = async (req, res) => {
    try {
        let resultCms = await pool.query('SELECT * FROM cms_master WHERE cms_id = $1', [req.params.cmsId])
        return res.json({
            statusCode: 200,
            success: true,
            data: resultCms.rows[0],
            message: 'Data Retrived Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.updateCms = async (req, res) => {
    try {
        let v = new Validator(req.body, {
            cms_title: 'required',
            cms_description: 'required',
        })

        let matched = await v.check()
        if (!matched) {
            return res.json({
                statusCode: 400,
                success: false,
                message: v.errors
            })
        }
        req.body.cms_image = req.file.filename
        let query = await CmsService.updateCms(req.params.cmsId, req.body)
        let colValues = Object.keys(req.body).map((key) => {
            return req.body[key];
        });
        await pool.query(query, colValues)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'CMS Updated Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.deleteCms = async (req, res) => {
    try {
        await CmsService.deleteCms(req.params.cmsId)
        return res.json({
            statusCode: 200,
            success: true,
            message: 'CMS Deleted Successfully'
        })
    } catch (error) {
        console.log('error', error)
    }
}

exports.activeInactiveCms = async (req, res) => {
    try {
        await CmsService.activeInactiveCms(req.body.isActive, req.params.cmsId)
        if (req.body.isActive == true) {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'CMS Activated Successfully'
            })
        } else {
            return res.json({
                statusCode: 200,
                success: true,
                message: 'CMS Deactivated Successfully'
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}